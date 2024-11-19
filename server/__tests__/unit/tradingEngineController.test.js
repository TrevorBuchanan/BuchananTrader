// tradingEngineController.test.js

const TradingEngineController = require('../../controllers/tradingEngineController');
const TradingEngineService = require('../../services/tradingEngineService');

// Mock the service methods
jest.mock('../../services/tradingEngineService');

// Suppress console errors temporarily during tests
const originalError = console.error;
beforeAll(() => {
    console.error = jest.fn();
});
afterAll(() => {
    console.error = originalError;
});

describe('TradingEngineController', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock data between tests
    });

    describe('addAssetPrice', () => {
        it('should return 400 for invalid input', async () => {
            const req = { body: { assetName: '', price: 'invalid' } }; // Invalid input
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await TradingEngineController.addAssetPrice(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input: assetName is required and price must be a number.' });
            expect(TradingEngineService.addAssetPrice).not.toHaveBeenCalled();
        });

        it('should return 500 when service fails', async () => {
            const req = { body: { assetName: 'Ethereum', price: 1500, time: 1730502157798 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.addAssetPrice.mockRejectedValue(new Error('Service error'));

            await TradingEngineController.addAssetPrice(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Service error' });
        });

        it('should return 200 and success message on valid input', async () => {
            const req = { body: { assetName: 'Ethereum', price: 1500, time: 1730502157798 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.addAssetPrice.mockResolvedValue();

            await TradingEngineController.addAssetPrice(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Price added successfully' });
        });
    });

    describe('getAssetAction', () => {
        it('should return 400 for missing assetName', async () => {
            const req = { query: {} }; // Missing assetName
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await TradingEngineController.getAssetAction(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input: assetName is required.' });
            expect(TradingEngineService.getAssetAction).not.toHaveBeenCalled();
        });

        it('should return 500 when service fails', async () => {
            const req = { query: { assetName: 'Bitcoin' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.getAssetAction.mockRejectedValue(new Error('Service error'));

            await TradingEngineController.getAssetAction(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Service error' });
        });

        it('should return action on valid input', async () => {
            const req = { query: { assetName: 'Bitcoin' } };
            const res = { json: jest.fn() };

            const mockAction = 'Buy';
            TradingEngineService.getAssetAction.mockResolvedValue(mockAction);

            await TradingEngineController.getAssetAction(req, res);

            expect(res.json).toHaveBeenCalledWith({ action: mockAction });
        });
    });

    describe('getAssetProfitLoss', () => {
        it('should return 400 for missing assetName', async () => {
            const req = { query: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await TradingEngineController.getAssetProfitLoss(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input: assetName is required.' });
            expect(TradingEngineService.getAssetProfitLoss).not.toHaveBeenCalled();
        });

        it('should return 500 when service fails', async () => {
            const req = { query: { assetName: 'Bitcoin' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.getAssetProfitLoss.mockRejectedValue(new Error('Service error'));

            await TradingEngineController.getAssetProfitLoss(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Service error' });
        });

        it('should return profit/loss on valid input', async () => {
            const req = { query: { assetName: 'Bitcoin' } };
            const res = { json: jest.fn() };

            const mockProfitLoss = { profit: 100, loss: 50 };
            TradingEngineService.getAssetProfitLoss.mockResolvedValue(mockProfitLoss);

            await TradingEngineController.getAssetProfitLoss(req, res);

            expect(res.json).toHaveBeenCalledWith({ profitLoss: mockProfitLoss });
        });
    });

    describe('getAssetLongLossLimit', () => {
        it('should return 400 if assetName is missing', async () => {
            const req = { query: {} }; // No assetName provided
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await TradingEngineController.getAssetLongLossLimit(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input: assetName is required.' });
            expect(TradingEngineService.getAssetLongLossLimit).not.toHaveBeenCalled();
        });

        it('should return 500 when service throws an error', async () => {
            const req = { query: { assetName: 'Bitcoin' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.getAssetLongLossLimit.mockRejectedValue(new Error('Service error'));

            await TradingEngineController.getAssetLongLossLimit(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Service error' });
        });

        it('should return long loss limit on valid input', async () => {
            const req = { query: { assetName: 'Bitcoin' } };
            const res = { json: jest.fn() };

            const mockLongLossLimit = 5000;
            TradingEngineService.getAssetLongLossLimit.mockResolvedValue(mockLongLossLimit);

            await TradingEngineController.getAssetLongLossLimit(req, res);

            expect(res.json).toHaveBeenCalledWith({ longLossLimit: mockLongLossLimit });
            expect(TradingEngineService.getAssetLongLossLimit).toHaveBeenCalledWith('Bitcoin');
        });
    });

    describe('getAssetShortLossLimit', () => {
        it('should return 400 if assetName is missing', async () => {
            const req = { query: {} }; // No assetName provided
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await TradingEngineController.getAssetShortLossLimit(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input: assetName is required.' });
            expect(TradingEngineService.getAssetShortLossLimit).not.toHaveBeenCalled();
        });

        it('should return 500 when service throws an error', async () => {
            const req = { query: { assetName: 'Ethereum' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.getAssetShortLossLimit.mockRejectedValue(new Error('Service error'));

            await TradingEngineController.getAssetShortLossLimit(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Service error' });
        });

        it('should return short loss limit on valid input', async () => {
            const req = { query: { assetName: 'Ethereum' } };
            const res = { json: jest.fn() };

            const mockShortLossLimit = 3000;
            TradingEngineService.getAssetShortLossLimit.mockResolvedValue(mockShortLossLimit);

            await TradingEngineController.getAssetShortLossLimit(req, res);

            expect(res.json).toHaveBeenCalledWith({ shortLossLimit: mockShortLossLimit });
            expect(TradingEngineService.getAssetShortLossLimit).toHaveBeenCalledWith('Ethereum');
        });
    });

    describe('removeAsset', () => {
        it('should return 400 for missing assetName', async () => {
            const req = { params: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await TradingEngineController.removeAsset(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input: assetName is required.' });
            expect(TradingEngineService.removeAsset).not.toHaveBeenCalled();
        });

        it('should return 500 when service fails', async () => {
            const req = { params: { assetName: 'Ripple' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            TradingEngineService.removeAsset.mockRejectedValue(new Error('Service error'));

            await TradingEngineController.removeAsset(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Service error' });
        });

        it('should return a result message on valid input', async () => {
            const req = { params: { assetName: 'Ripple' } };
            const res = { json: jest.fn() };

            const mockResultMsg = 'Asset removed successfully';
            TradingEngineService.removeAsset.mockResolvedValue(mockResultMsg);

            await TradingEngineController.removeAsset(req, res);

            expect(res.json).toHaveBeenCalledWith(mockResultMsg);
            expect(TradingEngineService.removeAsset).toHaveBeenCalledWith('Ripple');
        });
    });
});
