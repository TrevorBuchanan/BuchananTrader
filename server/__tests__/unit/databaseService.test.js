// databaseService.test.js

const databaseService = require('../../services/databaseService');
const bcrypt = require('bcrypt');
const { pool } = require('../../config/database');

jest.mock('bcrypt');
jest.mock('../../config/database');


describe('databaseService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a new user if email does not exist', async () => {
            // Mocking the response to simulate that no user exists
            pool.query.mockResolvedValueOnce({ rows: [] }); // No existing users
            
            // Mock the password hashing
            bcrypt.hash.mockResolvedValueOnce('hashedPassword'); // Mock password hashing
            
            // Mock the response of the successful registration
            pool.query.mockResolvedValueOnce({ 
                rows: [{ id: 1, email: 'test@example.com', created_at: new Date() }] 
            }); // Simulating user insertion
            
            const result = await databaseService.registerUser('test@example.com', 'password');

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', ['test@example.com']);
            expect(pool.query).toHaveBeenCalledWith(
                'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
                ['test@example.com', 'hashedPassword']
            );
            expect(result).toBeDefined();
            expect(result.email).toBe('test@example.com');
        });

        it('should throw an error if user already exists', async () => {
            pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com' }] }); // Simulating existing user
            
            await expect(databaseService.registerUser('test@example.com', 'password')).rejects.toThrow('User already exists.');
        });
    });

    describe('loginUser', () => {
        it('should log in a user with valid credentials', async () => {
            pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', password: 'hashedPassword' }] });
            bcrypt.compare.mockResolvedValueOnce(true); // Mock password comparison success

            const result = await databaseService.loginUser('test@example.com', 'password');

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', ['test@example.com']);
            expect(result).toBeDefined();
            expect(result.email).toBe('test@example.com');
        });

        it('should throw an error if email does not exist', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] }); // Simulate no users found

            await expect(databaseService.loginUser('test@example.com', 'password')).rejects.toThrow('Invalid email or password.');
        });

        it('should throw an error if password is incorrect', async () => {
            pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', password: 'hashedPassword' }] });
            bcrypt.compare.mockResolvedValueOnce(false); // Mock password comparison failure

            await expect(databaseService.loginUser('test@example.com', 'password')).rejects.toThrow('Invalid email or password.');
        });
    });
});