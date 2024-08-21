const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');


const getAll = catchError(async(req, res) => {
    const results = await Genre.findAll({include:[Movie,Director,Actor]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Genre.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Genre.findByPk(id,{include:[Movie,Director,Actor]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Genre.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Genre.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
}); 

const setMovie = catchError(async (req,res) => {
    const { id } = req.params
    const genre  = await Genre.findByPk(id)
    await genre.setMovies(req.body)

    const movies = await genre.getMovies()
    return res.json(movies)

    
}) 

const setActor = catchError(async (req, res) => {
   
    const { id } = req.params
    const genre = await Genre.findByPk(id)
  
    //!  2- seteo los cursos a los Actores
    await genre.setActors(req.body)
  
    //!  3- Obtengo lo que setee, con el objetivo de dar la vista
    const actor = await genre.getActors()
  
    //!  4 finalmente retorno
    return res.json(actor)
  
  })

  const setDirector = catchError(async (req, res) => {
   
    const { id } = req.params
    const genre = await Genre.findByPk(id)
  
    //!  2- seteo los cursos a los Actores
    await genre.setDirectors(req.body)
  
    //!  3- Obtengo lo que setee, con el objetivo de dar la vista
    const diector = await genre.getDirectors()
  
    //!  4 finalmente retorno
    return res.json(diector)
  
  })





//falta setdirector y setactor

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovie,
    setActor,
    setDirector
}