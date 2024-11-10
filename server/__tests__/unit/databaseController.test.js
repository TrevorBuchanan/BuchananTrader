const databaseController = require('../../controllers/databaseController');
const databaseService = require('../../services/databaseService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

jest.mock('../../services/databaseService');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Database Controller', () => {
    let originalJwtSecret;

    beforeAll(() => {
        originalJwtSecret = process.env.JWT_SECRET; // Store original JWT_SECRET
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    afterEach(() => {
        process.env.JWT_SECRET = originalJwtSecret; // Ensure JWT_SECRET is reset after tests that modify it
    });

    // Test for user registration
    it('should register a user successfully', async () => {
        const req = {body: {email: 'test@example.com', password: 'plain_password'}};
        const res = mockResponse();
        const userMock = {id: 1, email: 'test@example.com'};

        databaseService.createUser.mockResolvedValue(userMock);

        await databaseController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(userMock);
    });

    // Test for errors during registration
    it('should handle errors during user registration', async () => {
        const req = {body: {email: 'test@example.com', password: 'plain_password'}};
        const res = mockResponse();

        // Mock an error during user creation
        databaseService.createUser.mockRejectedValue(new Error('Database error'));

        // Call the registerUser function, which should handle the error
        await databaseController.registerUser(req, res);

        // Ensure that the error handling works and returns the correct response
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });

    // Test for successful login
    it('should login a user successfully and return a JWT token', async () => {
        const req = {body: {email: 'test@example.com', password: 'correct_password'}};
        const res = mockResponse();
        const userMock = {id: 1, email: 'test@example.com'};

        databaseService.authenticateUser.mockResolvedValue(userMock);

        const tokenMock = 'mocked_jwt_token';
        jwt.sign = jest.fn().mockReturnValue(tokenMock);

        await databaseController.loginUser(req, res);
        expect(jwt.sign).toHaveBeenCalledWith({id: userMock.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        expect(res.json).toHaveBeenCalledWith({token: tokenMock});
    });

    // Test for missing JWT_SECRET
    it('should handle missing JWT_SECRET and return 500 error with specific error message', async () => {
        const originalJwtSign = jwt.sign;  // Backup the original jwt.sign method

        // Temporarily remove JWT_SECRET
        delete process.env.JWT_SECRET;

        // Mock jwt.sign only for this test to simulate an error when JWT_SECRET is missing
        jwt.sign = jest.fn().mockImplementation(() => {
            throw new Error('Missing JWT_SECRET');
        });

        const req = {body: {email: 'test@example.com', password: 'correct_password'}};
        const res = mockResponse();
        const userMock = {id: 1, email: 'test@example.com'};

        databaseService.authenticateUser.mockResolvedValue(userMock);

        await databaseController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Error generating token'});

        // Restore original jwt.sign method after the test
        jwt.sign = originalJwtSign;
    });


    // Test for login with invalid credentials
    it('should return 401 when credentials are invalid', async () => {
        const req = {body: {email: 'test@example.com', password: 'wrong_password'}};
        const res = mockResponse();

        databaseService.authenticateUser.mockResolvedValue(null);

        await databaseController.loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({error: 'Invalid credentials'});
    });

    // Test for server error during login
    it('should handle errors during login', async () => {
        const req = {body: {email: 'test@example.com', password: 'some_password'}};
        const res = mockResponse();

        databaseService.authenticateUser.mockRejectedValue(new Error('Internal server error'));

        await databaseController.loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Server error'});
    });
});
