const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AssetPrice = sequelize.define('AssetPrice', {
    asset_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'asset_prices',
});

module.exports = AssetPrice;
