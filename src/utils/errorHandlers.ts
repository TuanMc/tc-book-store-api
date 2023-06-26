import createHttpError from "http-errors";

function errorHandlers(app: any) {
    // catch 404 and forward to error handler
    app.use(function (req: any, res: any, next: any) {
        next(createHttpError(404));
    });

    // error handler
    app.use(function (err: any, req: any, res: any, next: any) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        console.log(err.message);
        res.status(err.status || 500);
        res.send('Internal Server Error');
    });

}

export default errorHandlers;