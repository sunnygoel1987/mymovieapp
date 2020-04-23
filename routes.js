const controller = require("./controllers/moviesController");

module.exports = function(app) {
  app.get("/movies", controller.getMovies);
  app.get("/movies/:movieId", controller.getMovieById);
  app.post("/movies", controller.CreateMovie);
};
