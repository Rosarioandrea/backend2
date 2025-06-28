import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend 2 - Rosario',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

export default swaggerJSDoc(swaggerOptions);
