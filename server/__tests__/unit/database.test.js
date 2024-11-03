// database.test.js

const { Pool } = require('pg');
const { closePool, resetTables, createPool } = require('../../config/database');

jest.mock('pg'); // Mock the 'pg' module

describe('Database Module', () => {
    let pool; // Define pool here to use across tests

    afterEach(async () => {
        jest.clearAllMocks(); // Clear mocks after each test
        if (pool) {
            await closePool(pool); // Close pool after each test
        }
    });

    describe('Pool Initialization', () => {
        it('should create a pool with the correct configuration', () => {
            pool = createPool(); // Call the function to create a new pool
            expect(Pool).toHaveBeenCalledWith(expect.objectContaining({
                user: 'buchanan',
                host: 'localhost',
                database: expect.any(String), // Check that it receives a database name
                password: 'Buch514591#',
                port: 5432,
            }));
        });

        it('should select the test database in test environment', () => {
            process.env.NODE_ENV = 'test'; // Set environment variable to test
            pool = createPool(); // Call the function to create a new pool
            expect(Pool).toHaveBeenCalledWith(expect.objectContaining({
                database: 'buchanantraderdb_test' // Check for the test database
            }));
            process.env.NODE_ENV = 'development'; // Reset environment variable
        });

        it('should select the production database in non-test environment', () => {
            process.env.NODE_ENV = 'development'; // Set environment to development
            pool = createPool(); // Call the function to create a new pool
            expect(Pool).toHaveBeenCalledWith(expect.objectContaining({
                database: 'buchanantraderdb' // Check for the production database
            }));
            process.env.NODE_ENV = 'test'; // Reset environment variable
        });
    });

    describe('closePool', () => {
        it('should call pool.end when closePool is invoked', async () => {
            pool = createPool(); // Create a pool instance
            pool.end = jest.fn().mockResolvedValueOnce(); // Mock pool.end
            await closePool(pool); // Pass the pool instance to closePool
            expect(pool.end).toHaveBeenCalled();
        });
    });

    describe('resetTables', () => {
        it('should call TRUNCATE on users table', async () => {
            pool = createPool(); // Create a pool instance
            pool.query = jest.fn().mockResolvedValueOnce(); // Mock pool.query
            await resetTables(pool); // Pass the pool instance to resetTables
            expect(pool.query).toHaveBeenCalledWith('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
        });
    });
});
