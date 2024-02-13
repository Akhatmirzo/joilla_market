const {
  addProduct,
  getProducts,
  productsPagination,
  editProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/auth");

//* Add product options
const addProductOpts = {
  tags: ["Product"],
  body: {
    type: "object",
    properties: {
      code: { type: "string" },
      name: { type: "string" },
      qty: { type: "number" },
      price: { type: "number" },
      unit: { type: "string" },
    },
  },
  headers: {
    type: "object",
    properties: {
      authorization: {
        type: "string",
        description: "Employer or Employee token",
      },
    },
  },
  response: {
    201: {
      description: "Successfull response",
      properties: {
        message: { type: "string" },
        product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            code: { type: "string" },
            name: { type: "string" },
            qty: { type: "number" },
            price: { type: "number" },
            unit: { type: "string" },
          },
        },
      },
    },
  },
};

//* Product pagination options
const getProdPaginationOpts = {
  tags: ["Product"],
  query: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
    },
  },
  headers: {
    type: "object",
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
              code: { type: "string" },
              name: { type: "string" },
              qty: { type: "number" },
              price: { type: "number" },
              unit: { type: "string" },
            },
          },
        },
      },
    },
  },
};

//* Get one product options
const getProductOpts = {
  tags: ["Product"],
  headers: {
    type: "object",
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
    201: {
      description: "Successfull response",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            code: { type: "string" },
            name: { type: "string" },
            qty: { type: "number" },
            price: { type: "number" },
            unit: { type: "string" },
          },
        },
      },
    },
  },
};

//* Update product options
const updateProdOpts = {
  tags: ["Product"],
  headers: {
    type: "object",
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
      code: { type: "string" },
      name: { type: "string" },
      qty: { type: "number" },
      price: { type: "number" },
      unit: { type: "string" },
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
            code: { type: "string" },
            name: { type: "string" },
            qty: { type: "number" },
            price: { type: "number" },
            unit: { type: "string" },
          },
        },
      },
    },
  },
};

//* Delete product options
const deleteProdOpts = {
  tags: ["Product"],
  headers: {
    type: "object",
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
            code: { type: "string" },
            name: { type: "string" },
            qty: { type: "number" },
            price: { type: "number" },
            unit: { type: "string" },
          },
        },
      },
    },
  },
};

const productRoutes = (fastify, options, done) => {
  //* Add product
  fastify.post("", {
    preHandler: [auth(["employer", "employee"])],
    schema: addProductOpts,
    handler: addProduct,
  });

  //* Products and search
  fastify.get("", {
    preHandler: [auth(["employer", "employee"])],
    handler: getProducts,
  });

  //* Product pagination
  fastify.get("/pagination", {
    preHandler: [auth(["employer", "employee"])],
    schema: getProdPaginationOpts,
    handler: productsPagination,
  });

  //* Get one product
  fastify.get("/:id", {
    preHandler: [auth(["employer", "employee"])],
    schema: getProductOpts,
    handler: getProduct,
  });

  //* Update product
  fastify.put("/:id", {
    preHandler: [auth(["employer", "employee"])],
    schema: updateProdOpts,
    handler: editProduct,
  });

  //* Delete product
  fastify.delete("/:id", {
    preHandler: [auth(["employer", "employee"])],
    schema: deleteProdOpts,
    handler: deleteProduct,
  });

  done();
};

module.exports = productRoutes;
