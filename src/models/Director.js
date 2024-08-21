const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Director = sequelize.define('director', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Director;