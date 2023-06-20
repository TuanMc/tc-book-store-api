const createError = require('http-errors');

const validate = (schema) =>
    async (req, res, next) => {
        try {
            const reqProps = {
                ...req.params,
                ...req.body,
                ...req.query,
            }

            await schema.validate(reqProps);
            next();
        } catch (e) {
            return next(createError(400, e.errors));
        }
    };

module.exports = validate;