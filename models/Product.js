const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
    images: { type: DataTypes.ARRAY(DataTypes.STRING) }
});

module.exports = Product;
