// coinbase.test.js

process.env.COINBASE_API_KEY = 'test-api-key';
process.env.COINBASE_PRIVATE_KEY = 'test-private-key';
require('dotenv').config();

const axios = require('axios');
const { makeRequest } = require('../../config/coinbase');
const ECJWTgenerator = require('../../utils/ECJWTgenerator');

jest.mock('axios');
jest.mock('../../utils/ECJWTgenerator');

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
        const mockECJWT = 'mocked-jwt-token';
        const params = { testParam: 'value' };
        const expectedURL = `${BASE_URL}${API_PREFIX}${requestPath}`;
        const mockResponse = { data: { message: 'success' } };

        ECJWTgenerator.makeECJWT.mockReturnValue(mockECJWT);
        axios.mockResolvedValue(mockResponse);

        const response = await makeRequest(method, requestPath, params);

        expect(ECJWTgenerator.makeECJWT).toHaveBeenCalledWith(apiKey, privateKey, `${method} api.coinbase.com${API_PREFIX}${requestPath}`);
        expect(axios).toHaveBeenCalledWith({
            method,
            url: expectedURL,
            params,
            data: {},
            headers: {
                'User-agent': USER_AGENT,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockECJWT}`
            },
            timeout: 10000,
        });
        expect(response).toEqual(mockResponse.data);
    });

    it('should make a successful POST request with data payload', async () => {
        const requestPath = '/another-endpoint';
        const method = 'POST';
        const mockECJWT = 'mocked-jwt-token';
        const data = { amount: 100 };
        const expectedURL = `${BASE_URL}${API_PREFIX}${requestPath}`;
        const mockResponse = { data: { message: 'post success' } };

        ECJWTgenerator.makeECJWT.mockReturnValue(mockECJWT);
        axios.mockResolvedValue(mockResponse);

        const response = await makeRequest(method, requestPath, {}, data);

        expect(ECJWTgenerator.makeECJWT).toHaveBeenCalledWith(apiKey, privateKey, `${method} api.coinbase.com${API_PREFIX}${requestPath}`);
        expect(axios).toHaveBeenCalledWith({
            method,
            url: expectedURL,
            params: {},
            data,
            headers: {
                'User-agent': USER_AGENT,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockECJWT}`
            },
            timeout: 10000,
        });
        expect(response).toEqual(mockResponse.data);
    });

    it('should handle request errors correctly', async () => {
        const requestPath = '/error-endpoint';
        const method = 'GET';
        const mockECJWT = 'mocked-jwt-token';
        const expectedURL = `${BASE_URL}${API_PREFIX}${requestPath}`;
        const mockError = new Error('Request failed');

        ECJWTgenerator.makeECJWT.mockReturnValue(mockECJWT);
        axios.mockRejectedValue(mockError);

        await expect(makeRequest(method, requestPath)).rejects.toThrow('Request failed');

        expect(ECJWTgenerator.makeECJWT).toHaveBeenCalledWith(apiKey, privateKey, `${method} api.coinbase.com${API_PREFIX}${requestPath}`);
        expect(axios).toHaveBeenCalledWith({
            method,
            url: expectedURL,
            params: {},
            data: {},
            headers: {
                'User-agent': USER_AGENT,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockECJWT}`
            },
            timeout: 10000,
        });
    });
});
