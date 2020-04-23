// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
var moviesDB = require("./movies_db");

// Declare a route
fastify.get("/movies", async (request, response) => {
  return { moviesDB };
});

fastify.get("/movies/:movieId", async (request, response) => {
  let movie = moviesDB.filter(x => x.id == request.params.movieId);
  return { movie };
});

fastify.post("/movies", async (request, response) => {
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
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
