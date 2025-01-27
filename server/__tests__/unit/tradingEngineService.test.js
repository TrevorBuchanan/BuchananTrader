// tradingEngineService.test.js

// Import necessary modules
const tradingEngineClient = require('../../config/tradingengine');
const {
    getAssetAction,
    addAssetPrice,
    getAssetProfitLoss,
    getAssetLongLossLimit,
    getAssetShortLossLimit,
    removeAsset,
} = require('../../services/tradingEngineService');

// Mock the tradingEngineClient methods
jest.mock('../../config/tradingengine', () => ({
    getAssetAction: jest.fn(),
    addAssetPrice: jest.fn(),
    getAssetProfitLoss: jest.fn(),
    getAssetLongLossLimit: jest.fn(),
    getAssetShortLossLimit: jest.fn(),
    removeAsset: jest.fn(),
}));

describe('Trading Engine Service Functions', () => {

    describe('getAssetAction', () => {
        it('should return the action when getAssetAction is successful', async () => {
            const assetName = 'Bitcoin';
            const mockAction = 'buy';
            tradingEngineClient.getAssetAction.mockResolvedValue(mockAction);

            const result = await getAssetAction(assetName);
            expect(result).toBe(mockAction);
            expect(tradingEngineClient.getAssetAction).toHaveBeenCalledWith(assetName);
        });

        it('should throw an error when getAssetAction fails', async () => {
            const assetName = 'Bitcoin';
            const errorMessage = 'Network error';
            tradingEngineClient.getAssetAction.mockRejectedValue(new Error(errorMessage));

            await expect(getAssetAction(assetName)).rejects.toThrow(`Error fetching action for ${assetName}: ${errorMessage}`);
            expect(tradingEngineClient.getAssetAction).toHaveBeenCalledWith(assetName);
        });
    });

    describe('addAssetPrice', () => {
        it('should call addAssetPrice with correct parameters', async () => {
            const assetName = 'Ethereum';
            const price = 1500;
            const time = Date.now();
            tradingEngineClient.addAssetPrice.mockResolvedValue();

            await addAssetPrice(assetName, price, time);
            expect(tradingEngineClient.addAssetPrice).toHaveBeenCalledWith(assetName, price, time);
        });

        it('should throw an error when addAssetPrice fails', async () => {
            const assetName = 'Ethereum';
            const price = 1500;
            const time = Date.now();
            const errorMessage = 'Unable to add price';
            tradingEngineClient.addAssetPrice.mockRejectedValue(new Error(errorMessage));

            await expect(addAssetPrice(assetName, price, time)).rejects.toThrow(`Error adding price to ${assetName} trading engine: ${errorMessage}`);
            expect(tradingEngineClient.addAssetPrice).toHaveBeenCalledWith(assetName, price, time);
        });
    });

    describe('getAssetProfitLoss', () => {
        it('should return profit-loss when getAssetProfitLoss is successful', async () => {
            const assetName = 'Litecoin';
            const mockProfitLoss = 250;
            tradingEngineClient.getAssetProfitLoss.mockResolvedValue(mockProfitLoss);

            const result = await getAssetProfitLoss(assetName);
            expect(result).toBe(mockProfitLoss);
            expect(tradingEngineClient.getAssetProfitLoss).toHaveBeenCalledWith(assetName);
        });

        it('should throw an error when getAssetProfitLoss fails', async () => {
            const assetName = 'Litecoin';
            const errorMessage = 'Profit-loss retrieval failed';
            tradingEngineClient.getAssetProfitLoss.mockRejectedValue(new Error(errorMessage));

            await expect(getAssetProfitLoss(assetName)).rejects.toThrow(`Error fetching profit-loss for ${assetName}: ${errorMessage}`);
            expect(tradingEngineClient.getAssetProfitLoss).toHaveBeenCalledWith(assetName);
        });
    });

    describe('getAssetLongLossLimit', () => {
        it('should return the long loss limit when getAssetLongLossLimit is successful', async () => {
            const assetName = 'Bitcoin';
            const mockLongLossLimit = 5000;
            tradingEngineClient.getAssetLongLossLimit.mockResolvedValue(mockLongLossLimit);

            const result = await getAssetLongLossLimit(assetName);
            expect(result).toBe(mockLongLossLimit);
            expect(tradingEngineClient.getAssetLongLossLimit).toHaveBeenCalledWith(assetName);
        });

        it('should throw an error when getAssetLongLossLimit fails', async () => {
            const assetName = 'Bitcoin';
            const errorMessage = 'Failed to retrieve long loss limit';
            tradingEngineClient.getAssetLongLossLimit.mockRejectedValue(new Error(errorMessage));

            await expect(getAssetLongLossLimit(assetName)).rejects.toThrow(
                `Error fetching asset long limit for ${assetName}: ${errorMessage}`
            );
            expect(tradingEngineClient.getAssetLongLossLimit).toHaveBeenCalledWith(assetName);
        });
    });

    describe('getAssetShortLossLimit', () => {
        it('should return the short loss limit when getAssetShortLossLimit is successful', async () => {
            const assetName = 'Ethereum';
            const mockShortLossLimit = 3000;
            tradingEngineClient.getAssetShortLossLimit.mockResolvedValue(mockShortLossLimit);

            const result = await getAssetShortLossLimit(assetName);
            expect(result).toBe(mockShortLossLimit);
            expect(tradingEngineClient.getAssetShortLossLimit).toHaveBeenCalledWith(assetName);
        });

        it('should throw an error when getAssetShortLossLimit fails', async () => {
            const assetName = 'Ethereum';
            const errorMessage = 'Failed to retrieve short loss limit';
            tradingEngineClient.getAssetShortLossLimit.mockRejectedValue(new Error(errorMessage));

            await expect(getAssetShortLossLimit(assetName)).rejects.toThrow(
                `Error fetching asset long limit for ${assetName}: ${errorMessage}`
            );
            expect(tradingEngineClient.getAssetShortLossLimit).toHaveBeenCalledWith(assetName);
        });
    });

    describe('removeAsset', () => {
        it('should return a result message when removeAsset is successful', async () => {
            const assetName = 'Ripple';
            const mockResultMsg = 'Asset removed successfully';
            tradingEngineClient.removeAsset.mockResolvedValue(mockResultMsg);

            const result = await removeAsset(assetName);
            expect(result).toBe(mockResultMsg);
            expect(tradingEngineClient.removeAsset).toHaveBeenCalledWith(assetName);
        });

        it('should throw an error when removeAsset fails', async () => {
            const assetName = 'Ripple';
            const errorMessage = 'Asset removal failed';
            tradingEngineClient.removeAsset.mockRejectedValue(new Error(errorMessage));

            await expect(removeAsset(assetName)).rejects.toThrow(`Error removing ${assetName}: ${errorMessage}`);
            expect(tradingEngineClient.removeAsset).toHaveBeenCalledWith(assetName);
        });
    });
});
