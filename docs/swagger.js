import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "csv_image_compressor",
      version: "1.0.0",
      description: "A system to efficiently process image data from CSV files",
    },
    
    servers: [
      {
        url: process.env.DEV_BASE_URL,
        description: "Development server",
      },
      {
        url: process.env.PROD_BASE_URL,
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
