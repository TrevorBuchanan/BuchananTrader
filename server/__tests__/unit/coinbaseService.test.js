// coinbaseService.test.js

const client = require('../../config/coinbase'); // Import the client
const coinbaseService = require('../../services/coinbaseService'); // Import the service

jest.mock('../../config/coinbase'); // Mock the client module

describe('Coinbase Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('getCurrencies', () => {
        it('should return a list of currencies when the API call is successful', async () => {
            const mockResponse = { data: ['BTC', 'ETH', 'LTC'] };
            client.makeRequest.mockResolvedValue(mockResponse); // Mock successful API response

            const currencies = await coinbaseService.getCurrencies();

            expect(client.makeRequest).toHaveBeenCalledWith('GET', '/currencies');
            expect(currencies).toEqual(mockResponse.data);
        });

        it('should return response when data is undefined', async () => {
            const mockResponse = {}; // No data field
            client.makeRequest.mockResolvedValue(mockResponse); // Mock response without data

            const currencies = await coinbaseService.getCurrencies();

            expect(client.makeRequest).toHaveBeenCalledWith('GET', '/currencies');
            expect(currencies).toEqual(mockResponse); // Expect to get the whole response
        });

        it('should throw an error when the API call fails', async () => {
            const mockError = new Error('Network Error');
            client.makeRequest.mockRejectedValue(mockError); // Mock failed API response

            await expect(coinbaseService.getCurrencies()).rejects.toThrow('Error fetching currencies: Network Error');
        });
    });

    describe('getProducts', () => {
        it('should return a list of products when the API call is successful', async () => {
            const mockResponse = { data: ['BTC-USD', 'ETH-USD'] };
            client.makeRequest.mockResolvedValue(mockResponse); // Mock successful API response

            const products = await coinbaseService.getProducts();

            expect(client.makeRequest).toHaveBeenCalledWith('GET', '/products');
            expect(products).toEqual(mockResponse.data);
        });

        it('should return response when data is undefined', async () => {
            const mockResponse = {}; // No data field
            client.makeRequest.mockResolvedValue(mockResponse); // Mock response without data

            const products = await coinbaseService.getProducts();

            expect(client.makeRequest).toHaveBeenCalledWith('GET', '/products');
            expect(products).toEqual(mockResponse); // Expect to get the whole response
        });

        it('should throw an error when the API call fails', async () => {
            const mockError = new Error('Network Error');
            client.makeRequest.mockRejectedValue(mockError); // Mock failed API response

            await expect(coinbaseService.getProducts()).rejects.toThrow('Error fetching products: Network Error');
        });
    });

    describe('getProduct', () => {
        it('should return a product when the API call is successful', async () => {
            const productId = 'BTC-USD';
            const mockResponse = { data: { id: productId, name: 'Bitcoin to USD' } };
            client.makeRequest.mockResolvedValue(mockResponse); // Mock successful API response

            const product = await coinbaseService.getProduct(productId);

            expect(client.makeRequest).toHaveBeenCalledWith('GET', `/products/${productId}`);
            expect(product).toEqual(mockResponse.data);
        });

        it('should return response when data is undefined', async () => {
            const productId = 'BTC-USD';
            const mockResponse = {}; // No data field
            client.makeRequest.mockResolvedValue(mockResponse); // Mock response without data

            const product = await coinbaseService.getProduct(productId);

            expect(client.makeRequest).toHaveBeenCalledWith('GET', `/products/${productId}`);
            expect(product).toEqual(mockResponse); // Expect to get the whole response
        });

        it('should throw an error when the API call fails', async () => {
            const productId = 'BTC-USD';
            const mockError = new Error('Network Error');
            client.makeRequest.mockRejectedValue(mockError); // Mock failed API response

            await expect(coinbaseService.getProduct(productId)).rejects.toThrow(`Error fetching product ${productId}: Network Error`);
        });
    });

    describe('createTransaction', () => {
        it('should create a transaction when the API call is successful', async () => {
            const accountId = '12345';
            const amount = '0.01';
            const currency = 'BTC';
            const mockResponse = { data: { success: true, transactionId: 'abc123' } };
            client.makeRequest.mockResolvedValue(mockResponse); // Mock successful API response

            const transaction = await coinbaseService.createTransaction(accountId, amount, currency);

            expect(client.makeRequest).toHaveBeenCalledWith('POST', `/accounts/${accountId}/transactions`, { amount, currency });
            expect(transaction).toEqual(mockResponse.data);
        });

        it('should return response when data is undefined', async () => {
            const accountId = '12345';
            const amount = '0.01';
            const currency = 'BTC';
            const mockResponse = {}; // No data field
            client.makeRequest.mockResolvedValue(mockResponse); // Mock response without data

            const transaction = await coinbaseService.createTransaction(accountId, amount, currency);

            expect(client.makeRequest).toHaveBeenCalledWith('POST', `/accounts/${accountId}/transactions`, { amount, currency });
            expect(transaction).toEqual(mockResponse); // Expect to get the whole response
        });

        it('should throw an error when the API call fails', async () => {
            const accountId = '12345';
            const amount = '0.01';
            const currency = 'BTC';
            const mockError = new Error('Network Error');
            client.makeRequest.mockRejectedValue(mockError); // Mock failed API response

            await expect(coinbaseService.createTransaction(accountId, amount, currency)).rejects.toThrow('Error creating transaction: Network Error');
        });
    });
});
