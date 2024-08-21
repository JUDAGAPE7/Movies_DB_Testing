const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Actor.findAll({include:[Movie,Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Actor.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actor.findByPk(id, {include:[Movie,Genre]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actor.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actor.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


const setMovie = catchError(async (req, res) => {
   
    const { id } = req.params
    const actor = await Actor.findByPk(id)
  
    //!  2- seteo los cursos a los Actores
    await actor.setMovies(req.body)
  
    //!  3- Obtengo lo que setee, con el objetivo de dar la vista
    const movie = await actor.getMovies()
  
    //!  4 finalmente retorno
    return res.json(movie)
  
  })


  const setGenre = catchError(async (req, res) => {
   
    const { id } = req.params
    const actor = await Actor.findByPk(id)
  
    //!  2- seteo los cursos a los Actores
    await actor.setGenres(req.body)
  
    //!  3- Obtengo lo que setee, con el objetivo de dar la vista
    const genre = await actor.getGenres()
  
    //!  4 finalmente retorno
    return res.json(genre)
  
  })

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovie,
    setGenre
}