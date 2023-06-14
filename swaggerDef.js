const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your Server API",
      version: "1.0.0",
    },
  },
  apis: ["./index.js"], 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
