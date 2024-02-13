const {
  addOrder,
  getOrders,
  getOrderById,
  getEmployeeOrders,
  getMarketOrders,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middlewares/auth");

const orderRoutes = (fastify, options, done) => {
  //* Add order
  fastify.post("", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Order"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employee token",
          },
        },
      },
      body: {
        type: "object",
        properties: {
          client_type: {
            type: "string",
            enum: ["Market", "Client"],
          },
          market_id: {
            type: "string",
          },
          client_name: {
            type: "string",
          },
          products: {
            type: "array",
            items: {
              type: "object",
              required: ["productId", "qty", "price"],
              properties: {
                productId: {
                  type: "string",
                },
                qty: {
                  type: "number",
                },
                price: {
                  type: "number",
                },
              },
            },
          },
          paid: {
            type: "number",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            order: {
              type: "object",
              properties: {
                client_type: {
                  type: "string",
                  enum: ["Market", "Client"],
                },
                market_id: {
                  type: "string",
                },
                client_name: {
                  type: "string",
                },
                products: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["productId", "qty", "price"],
                    properties: {
                      productId: {
                        type: "string",
                      },
                      qty: {
                        type: "number",
                      },
                      price: {
                        type: "number",
                      },
                    },
                  },
                },
                paid: {
                  type: "number",
                },
                totalAmount: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
    handler: addOrder,
  });

  //* Orders and search
  fastify.get("", {
    preHandler: [auth(["employer", "employee"])],
    schema: {
      tags: ["Order"],
    },
    handler: getOrders,
  });

  //* Get order by id
  fastify.get("/:id", {
    preHandler: [auth(["employee", "employer"])],
    schema: {
      tags: ["Order"],
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string",
          },
        },
      },
    },
    handler: getOrderById,
  });

  //* Order pagination by employee id
  fastify.get("/employee/pagination", {
    preHandler: [auth(["employee", "employer"])],
    schema: {
      tags: ["Order"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employer or Employee token",
          },
        },
      },
      query: {
        type: "object",
        properties: {
          page: {
            type: "number",
          },
          pageSize: {
            type: "number",
          },
          employeeId: {
            type: "string",
            description: "When Employer requests",
          },
        },
      },
    },
    handler: getEmployeeOrders,
  });

  //* Order pagination by market id
  fastify.get("/market/pagination", {
    preHandler: [auth(["employee", "employer"])],
    schema: {
      tags: ["Order"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employer or Employee token",
          },
        },
      },
      query: {
        type: "object",
        properties: {
          page: {
            type: "number",
          },
          pageSize: {
            type: "number",
          },
          employeeId: {
            type: "string",
            description: "When Employer requests",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            qtyOrders: {
              type: "number",
            },
            page: {
              type: "number",
            },
            count: {
              type: "number",
            },
            page_size: {
              type: "number",
            },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                  client_type: {
                    type: "string",
                    enum: ["Market", "Client"],
                  },
                  market_id: {
                    type: "string",
                  },
                  market_name: {
                    type: "string",
                  },
                  client_name: {
                    type: "string",
                  },
                  products: {
                    type: "array",
                  },
                  paid: {
                    type: "number",
                  },
                  totalAmount: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
    handler: getMarketOrders,
  });

  //* Delete order
  fastify.delete("/:id", {
    preHandler: [auth(["employer"])],
    schema: {
      tags: ["Order"],
    },
    handler: deleteOrder,
  });

  done();
};

module.exports = orderRoutes;
