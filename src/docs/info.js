export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce CODERHOUSE",
            version: "1.0.0",
            description: "Api de ecommerce service",
        },
        servers: [
            {
                url: "http://localhost:8080/api",
            },
        ],
    },
    apis: ['./src/docs/*.yml']
};
