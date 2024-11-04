// apiRoutes.test.js

const request = require('supertest');
const express = require('express');
const router = require('../../routes/apiRoutes');
const coinbaseController = require('../../controllers/coinbaseController');
const tradingEngineController = require('../../controllers/tradingEngineController');
const databaseController = require('../../controllers/databaseController');
const { makeECJWT } = require('../../utils/ECJWTgenerator');

// Initialize app with the router
const app = express();
app.use(express.json());
app.use('/api', router);

// Mock the controller methods
jest.mock('../../controllers/coinbaseController');
jest.mock('../../controllers/tradingEngineController');

jest.mock('../../utils/ECJWTgenerator');

beforeEach(async () => {
    jest.setTimeout(3000); // Set timeout to 3 seconds
});


describe('API Routes', () => {
    describe('Coinbase Routes', () => {
        it('GET /api/coinbase/currencies should call getCurrencies', async () => {
            coinbaseController.getCurrencies.mockImplementation((req, res) => res.json({ message: 'Currencies fetched' }));

            const response = await request(app).get('/api/coinbase/currencies');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Currencies fetched' });
            expect(coinbaseController.getCurrencies).toHaveBeenCalled();
        });

        it('GET /api/coinbase/products should call getProducts', async () => {
            coinbaseController.getProducts.mockImplementation((req, res) => res.json({ message: 'Products fetched' }));

            const response = await request(app).get('/api/coinbase/products');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Products fetched' });
            expect(coinbaseController.getProducts).toHaveBeenCalled();
        });

        it('GET /api/coinbase/products/:product_id should call getProduct', async () => {
            coinbaseController.getProduct.mockImplementation((req, res) => res.json({ message: `Product ${req.params.product_id} fetched` }));

            const response = await request(app).get('/api/coinbase/products/123');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Product 123 fetched' });
            expect(coinbaseController.getProduct).toHaveBeenCalled();
        });

        it('POST /api/coinbase/transactions should call createTransaction', async () => {
            coinbaseController.createTransaction.mockImplementation((req, res) => res.status(201).json({ message: 'Transaction created' }));

            const response = await request(app).post('/api/coinbase/transactions').send({ amount: 100 });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'Transaction created' });
            expect(coinbaseController.createTransaction).toHaveBeenCalled();
        });
    });

    describe('Trading Engine Routes', () => {
        it('POST /api/trading-engine/add-price should call addAssetPrice', async () => {
            tradingEngineController.addAssetPrice.mockImplementation((req, res) => res.status(200).json({ message: 'Price added successfully' }));

            const response = await request(app)
                .post('/api/trading-engine/add-price')
                .send({ assetName: 'Bitcoin', price: 50000, time: '2023-11-01T12:00:00Z' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Price added successfully' });
            expect(tradingEngineController.addAssetPrice).toHaveBeenCalled();
        });

        it('GET /api/trading-engine/action should call getAssetAction', async () => {
            tradingEngineController.getAssetAction.mockImplementation((req, res) => res.json({ action: 'buy' }));

            const response = await request(app)
                .get('/api/trading-engine/action')
                .query({ assetName: 'Ethereum' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ action: 'buy' });
            expect(tradingEngineController.getAssetAction).toHaveBeenCalled();
        });

        it('GET /api/trading-engine/profit-loss should call getAssetProfitLoss', async () => {
            tradingEngineController.getAssetProfitLoss.mockImplementation((req, res) => res.json({ profitLoss: 1200 }));

            const response = await request(app)
                .get('/api/trading-engine/profit-loss')
                .query({ assetName: 'Litecoin' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ profitLoss: 1200 });
            expect(tradingEngineController.getAssetProfitLoss).toHaveBeenCalled();
        });

        it('DELETE /api/trading-engine/remove-asset/:assetName should call removeAsset', async () => {
            tradingEngineController.removeAsset.mockImplementation((req, res) => res.json({ message: 'Asset removed successfully' }));

            const response = await request(app).delete('/api/trading-engine/remove-asset/Bitcoin');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Asset removed successfully' });
            expect(tradingEngineController.removeAsset).toHaveBeenCalled();
        });
    });

    describe('Database Routes', () => {
        
    });
});
