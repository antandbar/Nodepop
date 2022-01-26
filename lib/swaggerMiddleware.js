'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración cabecera Swagger y archivo que contiene la doc-API
const options = {
  swaggerDefinition: {
    info: {
      title: 'NodePop API',
      version: '0.1',
      description: 'Ads Api'
    }
  },
  apis: ['swagger.yaml']
};

const specification = swaggerJSDoc(options);

module.exports = [swaggerUi.serve, swaggerUi.setup(specification)];