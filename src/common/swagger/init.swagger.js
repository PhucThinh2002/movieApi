import datVeSwagger from "./datve.swagger.js";
import movieSwagger from "./movie.swagger.js";
import rapSwagger from "./rap.swagger.js";
import userSwagger from "./user.swagger.js";

const swaggerDocument = {
    openapi: "3.1.0",
    info: {
        title: "Movie API",
        version: "1.0.0",
        description: "API documentation for movie booking system"
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Local Server"
        }
    ],
    components: {
        securitySchemes: {
            movieAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        }
    },
    paths: {
        ...datVeSwagger,
        ...userSwagger,
        ...movieSwagger,
        ...rapSwagger
    },
};

export default swaggerDocument;
