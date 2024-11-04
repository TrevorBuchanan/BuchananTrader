// databaseController.test.js

const databaseController = require('../../controllers/databaseController');
const databaseService = require('../../services/databaseService');

jest.mock('../../services/databaseService');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Database Controller', () => {
    // Test for user registration
    it('should register a user successfully', async () => {
        const req = { body: { email: 'test@example.com', password: 'plain_password' } };
        const res = mockResponse();
        const userMock = { id: 1, email: 'test@example.com' };

        databaseService.createUser = jest.fn().mockResolvedValue(userMock); // Mock service method

        await databaseController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(userMock);
    });

    // Error handling in user registration
    it('should handle errors when registering a user', async () => {
        const req = { body: { email: 'test@example.com', password: 'plain_password' } };
        const res = mockResponse();

        databaseService.createUser = jest.fn().mockRejectedValue(new Error('Internal server error'));

        await databaseController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });

    // Test for successful login
    it('should login a user successfully and return a JWT token', async () => {
        const req = { body: { email: 'test@example.com', password: 'correct_password' } };
        const res = mockResponse();
        const userMock = { id: 1, email: 'test@example.com', comparePassword: jest.fn().mockResolvedValue(true) };
        
        databaseService.authenticateUser = jest.fn().mockResolvedValue(userMock); // Mock successful authentication
        makeJWT.mockReturnValue('mocked_jwt_token'); // Mock JWT generation

        await databaseController.loginUser(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: 'mocked_jwt_token' });
    });

    // Test for login with invalid credentials
    it('should return 401 when credentials are invalid', async () => {
        const req = { body: { email: 'test@example.com', password: 'wrong_password' } };
        const res = mockResponse();
        
        databaseService.authenticateUser = jest.fn().mockResolvedValue(null); // Mock failed authentication

        await databaseController.loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
    });

    // Test for server error during login
    it('should handle errors during login', async () => {
        const req = { body: { email: 'test@example.com', password: 'some_password' } };
        const res = mockResponse();

        databaseService.authenticateUser = jest.fn().mockRejectedValue(new Error('Internal server error'));

        await databaseController.loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
