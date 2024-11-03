// database.test.js

const { Pool } = require('pg');
const { createPool, closePool, resetTables } = require('../../config/database');

jest.mock('pg'); // Mock the 'pg' module

describe('Database Module', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('createPool', () => {
        it('should create a pool with the correct configuration for test environment', () => {
            process.env.NODE_ENV = 'test'; // Set environment variable to test
            const pool = createPool(); // Call the function to create a new pool

            expect(Pool).toHaveBeenCalledWith(expect.objectContaining({
                user: 'buchanan',
                host: 'localhost',
                database: 'buchanantraderdb_test', // Check for the test database
                password: 'Buch514591#',
                port: 5432,
            }));
        });

        it('should create a pool with the correct configuration for production environment', () => {
            process.env.NODE_ENV = 'development'; // Set environment to development
            const pool = createPool(); // Call the function to create a new pool

            expect(Pool).toHaveBeenCalledWith(expect.objectContaining({
                user: 'buchanan',
                host: 'localhost',
                database: 'buchanantraderdb', // Check for the production database
                password: 'Buch514591#',
                port: 5432,
            }));
        });

        it('should use environment variables if defined', () => {
            process.env.NODE_ENV = 'test';
            process.env.DB_USER = 'testUser';
            process.env.DB_PASSWORD = 'testPassword';
            process.env.DB_HOST = 'testHost';
            process.env.DB_PORT = '5433';

            const pool = createPool();

            expect(Pool).toHaveBeenCalledWith(expect.objectContaining({
                user: 'testUser',
                host: 'testHost',
                database: 'buchanantraderdb_test',
                password: 'testPassword',
                port: 5433,
            }));

            // Clean up environment variables
            delete process.env.DB_USER;
            delete process.env.DB_PASSWORD;
            delete process.env.DB_HOST;
            delete process.env.DB_PORT;
        });
    });

    describe('closePool', () => {
        it('should call pool.end when closePool is invoked', async () => {
            const mockPool = { end: jest.fn().mockResolvedValueOnce() }; // Mock pool.end
            await closePool(mockPool);
            expect(mockPool.end).toHaveBeenCalled();
        });
    });

    describe('resetTables', () => {
        it('should call TRUNCATE on users table', async () => {
            const mockPool = { query: jest.fn().mockResolvedValueOnce() }; // Mock pool.query
            await resetTables(mockPool);
            expect(mockPool.query).toHaveBeenCalledWith('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
        });
    });
});
