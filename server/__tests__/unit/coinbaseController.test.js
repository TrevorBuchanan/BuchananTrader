// coinbaseController.test.js

const coinbaseController = require('../../controllers/coinbaseController'); // Import your controller
const coinbaseService = require('../../services/coinbaseService'); // Import the service

jest.mock('../../services/coinbaseService'); // Mock the coinbaseService

describe('Coinbase Controller', () => {
    let res;

    beforeEach(() => {
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(), // Mocking status to return the response object
        };
    });

    describe('getCurrencies', () => {
        it('should return currencies and respond with 200 when the service call is successful', async () => {
            const req = {}; // No specific properties needed for this request
            const mockCurrencies = ['BTC', 'ETH', 'LTC'];
            coinbaseService.getCurrencies.mockResolvedValue(mockCurrencies); // Mock successful service response

            await coinbaseController.getCurrencies(req, res);

            expect(coinbaseService.getCurrencies).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockCurrencies);
        });

        it('should respond with 500 when the service call fails', async () => {
            const req = {};
            const mockError = new Error('Network Error');
            coinbaseService.getCurrencies.mockRejectedValue(mockError); // Mock service error

            await coinbaseController.getCurrencies(req, res);

            expect(coinbaseService.getCurrencies).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error fetching currencies',
                error: mockError.message,
            });
        });
    });

    describe('getProducts', () => {
        it('should return products and respond with 200 when the service call is successful', async () => {
            const req = {};
            const mockProducts = ['BTC-USD', 'ETH-USD'];
            coinbaseService.getProducts.mockResolvedValue(mockProducts); // Mock successful service response

            await coinbaseController.getProducts(req, res);

            expect(coinbaseService.getProducts).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        it('should respond with 500 when the service call fails', async () => {
            const req = {};
            const mockError = new Error('Network Error');
            coinbaseService.getProducts.mockRejectedValue(mockError); // Mock service error

            await coinbaseController.getProducts(req, res);

            expect(coinbaseService.getProducts).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error fetching products',
                error: mockError.message,
            });
        });
    });

    describe('getProduct', () => {
        it('should return a product and respond with 200 when the service call is successful', async () => {
            const req = { params: { product_id: 'BTC-USD' } }; // Simulating a request with a product_id parameter
            const mockProduct = { id: 'BTC-USD', name: 'Bitcoin to USD' };
            coinbaseService.getProduct.mockResolvedValue(mockProduct); // Mock successful service response

            await coinbaseController.getProduct(req, res);

            expect(coinbaseService.getProduct).toHaveBeenCalledWith(req.params.product_id);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it('should respond with 500 when the service call fails', async () => {
            const req = { params: { product_id: 'BTC-USD' } };
            const mockError = new Error('Network Error');
            coinbaseService.getProduct.mockRejectedValue(mockError); // Mock service error

            await coinbaseController.getProduct(req, res);

            expect(coinbaseService.getProduct).toHaveBeenCalledWith(req.params.product_id);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error fetching product BTC-USD',
                error: mockError.message,
            });
        });
    });

    describe('createTransaction', () => {
        it('should create a transaction and respond with 200 when the service call is successful', async () => {
            const req = { body: { accountId: '12345', amount: '0.01', currency: 'BTC' } }; // Simulating request body
            const mockTransaction = { success: true, transactionId: 'abc123' };
            coinbaseService.createTransaction.mockResolvedValue(mockTransaction); // Mock successful service response

            await coinbaseController.createTransaction(req, res);

            expect(coinbaseService.createTransaction).toHaveBeenCalledWith(req.body.accountId, req.body.amount, req.body.currency);
            expect(res.json).toHaveBeenCalledWith(mockTransaction);
        });

        it('should respond with 500 when the service call fails', async () => {
            const req = { body: { accountId: '12345', amount: '0.01', currency: 'BTC' } };
            const mockError = new Error('Network Error');
            coinbaseService.createTransaction.mockRejectedValue(mockError); // Mock service error

            await coinbaseController.createTransaction(req, res);

            expect(coinbaseService.createTransaction).toHaveBeenCalledWith(req.body.accountId, req.body.amount, req.body.currency);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error creating transaction',
                error: mockError.message,
            });
        });
    });
});
