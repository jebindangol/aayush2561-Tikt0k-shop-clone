const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Correct import path

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('buyer', 'seller'), allowNull: false }
});

module.exports = User;
