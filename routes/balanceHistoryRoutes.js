const {
  getBalanceHistory,
} = require("../controllers/balanceHistoryController");
const auth = require("../middlewares/auth");

function balanceHistoryRoute(fastify, options, done) {
  //* get balance history
  fastify.get("", {
    preHandler: [auth(["employer"])],
    schema: {
      tags: ["Balance History"],
    },
    handler: getBalanceHistory,
  });

  done();
}

module.exports = balanceHistoryRoute;
