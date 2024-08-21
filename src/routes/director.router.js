
const { getAll, create, getOne, remove, update, setGenre, setMovies } = require('../controllers/director.contollers');
const express = require('express');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(getAll)
    .post(create);

    routerDirector.route('/:id/movies')
    .post(setMovies)
    routerDirector.route('/:id/genres')
    .post(setGenre)

routerDirector.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerDirector;