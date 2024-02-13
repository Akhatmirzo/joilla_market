const { getStatistics } = require("../controllers/statisticsController");
const auth = require("../middlewares/auth");

function statisticRoute(fastify, options, done) {
  //* get statistics
  fastify.get("/:year/:month", {
    preHandler: [auth(["employer"])],
    schema: {
      tags: ["Statistics"],
    },
    handler: getStatistics,
  });

  done();
}

module.exports = statisticRoute;
