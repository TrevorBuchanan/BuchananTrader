// User.test.js

const { sequelize } = require('../../config/database'); // Adjust path if necessary
const User = require('../../models/User');
const bcrypt = require('bcrypt');

jest.mock('bcrypt');

beforeEach(async () => {
    await sequelize.sync({ force: true }); // Resets the database for each test
});

describe('User Model', () => {
    // Ensure database is synchronized before each test
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should define the model correctly', () => {
        expect(User).toBeDefined();
        expect(User.tableName).toBe('users');
    });

    it('should create a new user with valid email and password', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword'); // Mock bcrypt hash

        const user = await User.create({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(user.id).toBeDefined();
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('hashedPassword');
    });

    it('should not create a user with duplicate email', async () => {
        await User.create({
            email: 'test@example.com',
            password: 'password123',
        });

        await expect(User.create({
            email: 'test@example.com',
            password: 'newpassword',
        })).rejects.toThrow();
    });

    it('should hash password before saving', async () => {
        const user = User.build({
            email: 'hash@test.com',
            password: 'testPassword',
        });

        await user.save();
        expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 10);
    });

    it('should compare password correctly', async () => {
        const user = await User.create({
            email: 'compare@test.com',
            password: 'comparePassword',
        });

        bcrypt.compare.mockResolvedValue(true);

        const isMatch = await user.comparePassword('comparePassword');
        expect(isMatch).toBe(true);
        expect(bcrypt.compare).toHaveBeenCalledWith('comparePassword', user.password);
    });

    it('should not create a user without an email', async () => {
        await expect(User.create({ password: 'password123' })).rejects.toThrow();
    });

    it('should not create a user without a password', async () => {
        await expect(User.create({ email: 'test@no-password.com' })).rejects.toThrow();
    });

    it('should validate email format', async () => {
        await expect(User.create({ email: 'invalid-email', password: 'password123' })).rejects.toThrow();
    });

    it('should hash the password if it has changed', async () => {
        const user = User.build({
            email: 'change@test.com',
            password: 'originalPassword',
        });

        bcrypt.hash.mockResolvedValue('hashedPassword');
        await user.save();

        expect(bcrypt.hash).toHaveBeenCalledWith('originalPassword', 10);
    });

    it('should not hash the password if it has not changed', async () => {
        // Create a user and save it with a hashed password initially
        const user = await User.create({
            email: 'nochange@test.com',
            password: 'initialPassword',
        });

        // Reset bcrypt hash mock to detect if it is called again
        bcrypt.hash.mockClear();

        // Simulate updating the user without changing the password
        user.email = 'updated@test.com';
        await user.save();

        expect(bcrypt.hash).not.toHaveBeenCalled(); // bcrypt.hash should not be called
    });
});
