// src/docs/swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // or .yaml if parsed

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwaggerDocs;
