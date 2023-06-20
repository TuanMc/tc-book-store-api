const bookRouter = require('./booksRouter');

function routes(app) {
    // const usersRouter = require('./routes/users');
    app.use('/api/books', bookRouter);
}

module.exports = routes;