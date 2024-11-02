// coinbase.test.js

process.env.COINBASE_API_KEY = 'test-api-key';
process.env.COINBASE_PRIVATE_KEY = 'test-private-key';
require('dotenv').config();

const axios = require('axios');
const { makeRequest } = require('../../config/coinbase');
const JWTgenerator = require('../../utils/JWTgenerator');

jest.mock('axios');
jest.mock('../../utils/JWTgenerator');

describe('Coinbase API makeRequest', () => {
    const apiKey = 'test-api-key';
    const privateKey = 'test-private-key';
    const USER_AGENT = 'buchanantrader';
    const BASE_URL = 'https://api.coinbase.com';
    const API_PREFIX = '/api/v3/brokerage';

    beforeAll(() => {
        // Set the environment variables before each test
    });

    it('should make a successful GET request with correct headers', async () => {
        const requestPath = '/test-endpoint';
        const method = 'GET';
        const mockJWT = 'mocked-jwt-token';
        const params = { testParam: 'value' };
        const expectedURL = `${BASE_URL}${API_PREFIX}${requestPath}`;
        const mockResponse = { data: { message: 'success' } };

        JWTgenerator.makeJWT.mockReturnValue(mockJWT);
        axios.mockResolvedValue(mockResponse);

        const response = await makeRequest(method, requestPath, params);

        expect(JWTgenerator.makeJWT).toHaveBeenCalledWith(apiKey, privateKey, `${method} api.coinbase.com${API_PREFIX}${requestPath}`);
        expect(axios).toHaveBeenCalledWith({
            method,
            url: expectedURL,
            params,
            data: {},
            headers: {
                'User-agent': USER_AGENT,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockJWT}`
            },
            timeout: 10000,
        });
        expect(response).toEqual(mockResponse.data);
    });

    it('should make a successful POST request with data payload', async () => {
        const requestPath = '/another-endpoint';
        const method = 'POST';
        const mockJWT = 'mocked-jwt-token';
        const data = { amount: 100 };
        const expectedURL = `${BASE_URL}${API_PREFIX}${requestPath}`;
        const mockResponse = { data: { message: 'post success' } };

        JWTgenerator.makeJWT.mockReturnValue(mockJWT);
        axios.mockResolvedValue(mockResponse);

        const response = await makeRequest(method, requestPath, {}, data);

        expect(JWTgenerator.makeJWT).toHaveBeenCalledWith(apiKey, privateKey, `${method} api.coinbase.com${API_PREFIX}${requestPath}`);
        expect(axios).toHaveBeenCalledWith({
            method,
            url: expectedURL,
            params: {},
            data,
            headers: {
                'User-agent': USER_AGENT,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockJWT}`
            },
            timeout: 10000,
        });
        expect(response).toEqual(mockResponse.data);
    });

    it('should handle request errors correctly', async () => {
        const requestPath = '/error-endpoint';
        const method = 'GET';
        const mockJWT = 'mocked-jwt-token';
        const expectedURL = `${BASE_URL}${API_PREFIX}${requestPath}`;
        const mockError = new Error('Request failed');

        JWTgenerator.makeJWT.mockReturnValue(mockJWT);
        axios.mockRejectedValue(mockError);

        await expect(makeRequest(method, requestPath)).rejects.toThrow('Request failed');

        expect(JWTgenerator.makeJWT).toHaveBeenCalledWith(apiKey, privateKey, `${method} api.coinbase.com${API_PREFIX}${requestPath}`);
        expect(axios).toHaveBeenCalledWith({
            method,
            url: expectedURL,
            params: {},
            data: {},
            headers: {
                'User-agent': USER_AGENT,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockJWT}`
            },
            timeout: 10000,
        });
    });
});
