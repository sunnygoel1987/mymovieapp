var moviesDB = require("../movies_db");

// Declare a route
module.exports.getMovies = async (request, response) => {
  return { moviesDB };
};

module.exports.getMovieById = async (request, response) => {
  let movie = moviesDB.filter(x => x.id == request.params.movieId);
  return { movie };
};

module.exports.CreateMovie = async (request, response) => {
  let movieId = moviesDB.reduce(
    (max, x) => (x.id > max ? x.id : max),
    moviesDB[0].id
  );
  let movie = {
    id: movieId + 1,
    name: request.body.name,
    duration: request.body.duration
  };
  moviesDB.push(movie);
  response.code(201).send("Created Movie");
};
