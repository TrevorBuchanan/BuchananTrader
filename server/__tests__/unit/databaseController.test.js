// unit/databaseController.test.js

const databaseController = require('../../controllers/databaseController');
const databaseService = require('../../services/databaseService');
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Database Controller', () => {
    it('should register a user successfully', async () => {
        const req = {
            body: { email: 'test@example.com', password: 'plain_password' },
        };
        const res = mockResponse();
        const userMock = { id: 1, email: 'test@example.com' };

        databaseService.createUser = jest.fn().mockResolvedValue(userMock); // Mock service method

        await databaseController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(userMock);
    });

    it('should handle errors when registering a user', async () => {
        const req = {
            body: { email: 'test@example.com', password: 'plain_password' },
        };
        const res = mockResponse();

        databaseService.createUser = jest.fn().mockRejectedValue(new Error('Internal server error'));

        await databaseController.registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
