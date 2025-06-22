import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operation related to products",
      },
    ],
    info: {
      title: "Rest API node.js - express - ts",
      version: "1.0.0",
      description: "API DOCS for products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
