import bookRouter from './booksRouter';

function routes(app: any): void {
    app.use('/api/books', bookRouter);
}

export default routes;