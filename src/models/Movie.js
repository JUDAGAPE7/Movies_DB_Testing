const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movie = sequelize.define('movie', {
    movieName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = Movie;