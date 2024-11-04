// databaseService.test.js

const User = require('../../models/User');
const databaseService = require('../../services/databaseService');
jest.mock('../../models/User');
jest.mock('bcrypt');

describe('Database Service', () => {
    beforeEach(() => {
        User.create = jest.fn();
        User.findOne = jest.fn();
    });

    it('should create a user', async () => {
        const userData = { email: 'test@example.com', password: 'plain_password' };
        const userMock = { id: 1, email: 'test@example.com' };
        User.create.mockResolvedValue(userMock);

        const user = await databaseService.createUser(userData);
        expect(user).toEqual(userMock);
        expect(User.create).toHaveBeenCalledWith(userData);
    });

    it('should throw an error when creating a user fails', async () => {
        User.create.mockRejectedValue(new Error('Database error'));
        const userData = { email: 'test@example.com', password: 'plain_password' };
        await expect(databaseService.createUser(userData)).rejects.toThrow('Database error');
    });

    // Test for successful user authentication
    it('should authenticate user with valid credentials', async () => {
        const userMock = { id: 1, email: 'test@example.com', password: 'hashed_password', comparePassword: jest.fn() };
        User.findOne.mockResolvedValue(userMock);
        userMock.comparePassword.mockResolvedValue(true);

        const user = await databaseService.authenticateUser('test@example.com', 'correct_password');
        expect(user).toEqual(userMock);
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });

    // Test for authentication failure with incorrect password
    it('should return null if password is incorrect', async () => {
        const userMock = { id: 1, email: 'test@example.com', comparePassword: jest.fn() };
        User.findOne.mockResolvedValue(userMock);
        userMock.comparePassword.mockResolvedValue(false); // Incorrect password

        const user = await databaseService.authenticateUser('test@example.com', 'wrong_password');
        expect(user).toBeNull();
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });

    // Test for authentication failure if user is not found
    it('should return null if user is not found', async () => {
        User.findOne.mockResolvedValue(null); // No user found

        const user = await databaseService.authenticateUser('notfound@example.com', 'any_password');
        expect(user).toBeNull();
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'notfound@example.com' } });
    });

    // Test for authentication error
    it('should throw an error if authenticateUser encounters a database error', async () => {
        // Mock User.findOne to throw an error
        const error = new Error('Database error');
        User.findOne.mockRejectedValue(error);

        await expect(databaseService.authenticateUser('error@example.com', 'any_password')).rejects.toThrow('Database error');
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'error@example.com' } });
    });
});
