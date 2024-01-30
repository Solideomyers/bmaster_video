import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API endpoints',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        JWTAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token',
        },
      },
    },
    security: [{ JWTAuth: [] }],
  },

  apis: [
    './src/presentation/routes.ts',
    './src/user/user.routes.ts',
    './src/authentication/auth.routes.ts',
  ],
};

const specs = swaggerJsdoc(options);

export { specs };
