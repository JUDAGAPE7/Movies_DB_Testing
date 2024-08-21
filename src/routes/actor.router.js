const { getAll, create, getOne, remove, update, setMovie, setGenre } = require('../controllers/actor.controllers');
const express = require('express');

const routerActor = express.Router();

routerActor.route('/')
    .get(getAll)
    .post(create); 

    routerActor.route('/:id/movies')
    .post(setMovie)
    routerActor.route('/:id/genres')
    .post(setGenre)

routerActor.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerActor;