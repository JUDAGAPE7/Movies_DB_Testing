
require('../models/Actor')
require('../models/Director')
require('../models/Genre')
require('../models/Movie')
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");



Actor.belongsToMany(Movie,{through:'actorMovies'})
Movie.belongsToMany(Actor, {through:'actorMovies'}) 

Actor.belongsToMany(Genre,{through:'actorGenres'})
Genre.belongsToMany(Actor,{through:'actorGenres'})

Genre.belongsToMany(Movie, { through: 'movieGenres' });
Movie.belongsToMany(Genre, { through: 'movieGenres' });

Director.belongsToMany(Movie, { through: 'directorMovies' });
Movie.belongsToMany(Director, { through: 'directorMovies' });

Director.belongsToMany(Genre, { through: 'directorGenres' });
Genre.belongsToMany(Director, { through: 'directorGenres' });



// Movie.belongsTo(Director)
// Director.hasMany(Movie)




