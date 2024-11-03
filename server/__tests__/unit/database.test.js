// database.test.js

const { sequelize, testConnection } = require('../../config/database');

describe('Database Connection', () => {
    beforeAll(async () => {
        await testConnection();
    });

    it('should connect to the database', async () => {
        await expect(sequelize.authenticate()).resolves.not.toThrow();
    });

    afterAll(async () => {
        await sequelize.close(); // Close the database connection after tests
    });
});