const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");

function adminRoutes(fastify, options, done) {
  //* Register admin
  fastify.post("/register", {
    schema: {
      tags: ["Admin"],
      summary: "qwerty",
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Admin created successfully",
            },
            token: { type: "string", description: "Admin token" },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: registerAdmin,
  });

  //* Login admin
  fastify.post("/login", {
    schema: {
      tags: ["Admin"],
      summary: "qwerty",
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Admin created successfully",
            },
            token: { type: "string", description: "Admin token" },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
    handler: loginAdmin,
  });

  done();
}

module.exports = adminRoutes;
