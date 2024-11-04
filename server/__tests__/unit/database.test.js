// database.test.js

const { sequelize, testConnection } = require('../../config/database');

describe('Database Connection', () => {
    beforeAll(async () => {
        await testConnection();
    });

    it('should connect to the database', async () => {
        await expect(sequelize.authenticate()).resolves.not.toThrow();
    });

    it('should throw an error if unable to connect to the database', async () => {
        // Mock sequelize.authenticate to throw an error
        const authenticateSpy = jest.spyOn(sequelize, 'authenticate').mockImplementationOnce(() => {
            throw new Error('Connection failed');
        });

        // Expect testConnection to throw an error when the connection fails
        await expect(testConnection()).rejects.toThrow('Unable to connect to the database:');

        // Restore the original implementation of authenticate
        authenticateSpy.mockRestore();
    });

    afterAll(async () => {
        await sequelize.close(); // Close the database connection after tests
    });
});
