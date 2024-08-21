const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Director.findAll({include:[Movie,Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Director.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.findByPk(id,{include:[Movie,Genre]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
}); 


const setMovies = catchError(async (req, res) => {
   
    const { id } = req.params;
    const director = await Director.findByPk(id);

    if (!director) {
        return res.status(404).json({ message: 'Director not found!' });
    }

    await director.setMovies(req.body);

    const movies = await director.getMovies();

    return res.json(movies);
  
  })


  const setGenre = catchError(async (req, res) => {
   
    const { id } = req.params
    const director = await Director.findByPk(id)
  
    //!  2- seteo los generos a los Directores
    await director.setGenres(req.body)
  
    //!  3- Obtengo lo que setee, con el objetivo de dar la vista
    const genre = await director.getGenres()
  
    //!  4 finalmente retorno
    return res.json(genre)
  
  })

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovies,
    setGenre

}