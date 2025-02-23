const coinbaseService = require('../services/coinbaseService');

const getAssetsList = async (req, res) => {
  try {
    const assetsList = await coinbaseService.getAssetsList();
    res.json(assetsList);
  } catch (error) {
    res.status(500).json({ message: 'Error (controller) fetching assets list', error: error.message });
  }
};

const getAssetInfo = async (req, res) => {
  const { assetID } = req.params; 
  try {
    const asset = await coinbaseService.getAssetInfo(assetID); 
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: `Error (controller) fetching asset info for ${assetID}`, error: error.message });
  }
};

const getHistory = async (req, res) => {
  const { assetID, start, end, granularity } = req.body;
  try {
    const history = await coinbaseService.getHistory(assetID, start, end, granularity);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error (controller) fetching history', error: error.message });
  }
};

module.exports = {
  getAssetsList,
  getAssetInfo,
  getHistory,
};
