const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const Order = require('./order');

User.hasMany(Product, { foreignKey: 'sellerId' });
Product.belongsTo(User, { foreignKey: 'sellerId' });

sequelize.sync().then(() => console.log("Database synced"));

module.exports = { User, Product, Order };
