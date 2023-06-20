const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Store APIs',
            version: '1.0.0',
        },
    },
    // Path to the API specs
    apis: ['./routes/*.js', './schema/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

function swaggerDoc(app) {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });

    console.info(`Docs available at http://localhost:${process.env.PORT}/api-docs`);
}

module.exports = swaggerDoc;