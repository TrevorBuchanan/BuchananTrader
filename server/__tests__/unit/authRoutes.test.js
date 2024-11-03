

const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/authRoutes');
const databaseService = require('../../services/databaseService');
const { makeJWT } = require('../../utils/JWTgenerator');

jest.mock('../../services/databaseService');
jest.mock('../../utils/JWTgenerator');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            databaseService.registerUser.mockResolvedValueOnce({ id: 1, email: 'test@example.com', created_at: new Date() });

            const res = await request(app).post('/api/auth/register').send({
                email: 'test@example.com',
                password: 'password'
            });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.email).toBe('test@example.com');
        });

        it('should return 400 if user already exists', async () => {
            databaseService.registerUser.mockRejectedValueOnce(new Error('User already exists.'));

            const res = await request(app).post('/api/auth/register').send({
                email: 'test@example.com',
                password: 'password'
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('User already exists.');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should log in user and return JWT token', async () => {
            databaseService.loginUser.mockResolvedValueOnce({ id: 1, email: 'test@example.com' });
            makeJWT.mockReturnValueOnce('test.jwt.token');

            const res = await request(app).post('/api/auth/login').send({
                email: 'test@example.com',
                password: 'password'
            });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token', 'test.jwt.token');
        });

        it('should return 400 if credentials are invalid', async () => {
            databaseService.loginUser.mockRejectedValueOnce(new Error('Invalid email or password.'));

            const res = await request(app).post('/api/auth/login').send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Invalid email or password.');
        });
    });
});
