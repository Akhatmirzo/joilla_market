const {
  addMarket,
  getMarkets,
  marketPagination,
  editMarket,
  deleteMarket,
  getMarket,
} = require("../controllers/marketController");
const auth = require("../middlewares/auth");

//* Add market options
const addMarketOpts = {
  tags: ["Market"],
  body: {
    type: "object",
    properties: {
      market_name: { type: "string" },
      phone_number: { type: "string" },
      location: { type: "string" },
    },
  },
  headers: {
    type: "object",
    required: ["authorization"],
    properties: {
      authorization: {
        type: "string",
        description: "Employer or Employee token",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        market: {
          type: "object",
          properties: {
            _id: { type: "string" },
            market_name: { type: "string" },
            phone_number: { type: "string" },
            location: { type: "string" },
          },
        },
      },
    },
  },
};

//* Market pagination options
const marketPaginationOpts = {
  tags: ["Market"],
  query: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
    },
  },
  headers: {
    type: "object",
    required: ["authorization"],
    properties: {
      authorization: {
        type: "string",
        description: "Employer or Employee token",
      },
    },
  },
  response: {
    200: {
      description: "Successfull response",
      type: "object",
      properties: {
        all: { type: "number" },
        page: { type: "number" },
        count: { type: "number" },
        page_size: { type: "number" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              market_name: { type: "string" },
              phone_number: { type: "string" },
              location: { type: "string" },
              debt: { type: "string" },
            },
          },
        },
      },
    },
  },
};

//* Get one market options
const getMarketOpts = {
  tags: ["Market"],
  headers: {
    type: "object",
    required: ["authorization"],
    properties: {
      authorization: {
        type: "string",
        description: "Employer or Employee token",
      },
    },
  },
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Successfull response",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            market_name: { type: "string" },
            phone_number: { type: "string" },
            location: { type: "string" },
          },
        },
      },
    },
  },
};

//* Update market options
const updateMarketOpts = {
  tags: ["Market"],
  headers: {
    type: "object",
    required: ["authorization"],
    properties: {
      authorization: {
        type: "string",
        description: "Employer or Employee token",
      },
    },
  },
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      _id: { type: "string" },
      market_name: { type: "string" },
      phone_number: { type: "string" },
      location: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Successfull response",
      properties: {
        message: { type: "string" },
        product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            market_name: { type: "string" },
            phone_number: { type: "string" },
            location: { type: "string" },
          },
        },
      },
    },
  },
};

//* Delete market options
const deleteMarketOpts = {
  tags: ["Market"],
  headers: {
    type: "object",
    required: ["authorization"],
    properties: {
      authorization: {
        type: "string",
        description: "Employer or Employee token",
      },
    },
  },
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Successfull response",
      properties: {
        message: { type: "string" },
        product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            market_name: { type: "string" },
            phone_number: { type: "string" },
            location: { type: "string" },
          },
        },
      },
    },
  },
};

const marketRoutes = (fastify, options, done) => {
  //* Add market
  fastify.post("", {
    preHandler: [auth(["employer"])],
    schema: addMarketOpts,
    handler: addMarket,
  });

  //* Markets and search
  fastify.get("", {
    preHandler: [auth(["employer", "employee"])],
    handler: getMarkets,
  });

  //* Market pagination
  fastify.get("/pagination", {
    preHandler: [auth(["employee", "employer"])],
    schema: marketPaginationOpts,
    handler: marketPagination,
  });

  //* Get one market
  fastify.get("/:id", {
    preHandler: [auth(["employee", "employer"])],
    schema: getMarketOpts,
    handler: getMarket,
  });

  //* Update market
  fastify.put("/:id", {
    preHandler: [auth(["employer"])],
    schema: updateMarketOpts,
    handler: editMarket,
  });

  //* Delete market
  fastify.delete("/:id", {
    preHandler: [auth(["employer"])],
    schema: deleteMarketOpts,
    handler: deleteMarket,
  });

  done();
};

module.exports = marketRoutes;
