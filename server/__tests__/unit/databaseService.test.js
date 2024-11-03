// databaseService.test.js

const User = require('../../models/User');
const databaseService = require('../../services/databaseService');
const sequelizeMock = require('sequelize-mock');

const dbMock = new sequelizeMock();
const UserMock = dbMock.define('User', {
    id: 1,
    email: 'test@example.com',
    password: 'hashed_password',
});

describe('Database Service', () => {
    beforeEach(() => {
        User.findAll = jest.fn().mockResolvedValue([UserMock]); // Mock the findAll method
        User.create = jest.fn().mockResolvedValue(UserMock); // Mock the create method
    });

    it('should create a user', async () => {
        const userData = { email: 'test@example.com', password: 'plain_password' };
        const user = await databaseService.createUser(userData);
        expect(user).toEqual(UserMock);
        expect(User.create).toHaveBeenCalledWith(userData);
    });

    it('should throw an error when creating a user fails', async () => {
        User.create.mockRejectedValue(new Error('Database error'));
        const userData = { email: 'test@example.com', password: 'plain_password' };
        await expect(databaseService.createUser(userData)).rejects.toThrow('Database error');
    });
});
