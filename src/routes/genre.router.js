const { getAll, create, getOne, remove, update, setMovie, setActor } = require('../controllers/genre.controllers');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAll)
    .post(create);

    routerGenre.route('/:id/movies')
    .post(setMovie)
    routerGenre.route('/:id/actors')
    .post(setActor)


routerGenre.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerGenre;