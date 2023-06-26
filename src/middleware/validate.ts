import createError from 'http-errors';

const validate = (schema: any) =>
    async (req: any, res: any, next: any) => {
        try {
            const reqProps = {
                ...req.params,
                ...req.body,
                ...req.query,
            }

            await schema.validate(reqProps);
            next();
        } catch (e: any) {
            return next(createError(400, e.errors));
        }
    };

export default validate;