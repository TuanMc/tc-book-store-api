import { object, string, number, date } from 'yup';

const getBookByIdSchema = object().shape({
    bookId: string().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBookInput:
 *      type: object
 *      required:
 *        - image
 *        - title
 *        - category
 *        - description
 *        - quantity
 *        - price
 *      properties: 
 *        image:
 *            type: string
 *            format: binary
 *        title:
 *            type: string
 *        category:
 *            type: string
 *        description:
 *            type: string
 *        quantity:
 *            type: string
 *        price:
 *            type: string
 *    UpdateBookInput:
 *      type: object
 *      properties: 
 *        imageUrl:
 *            type: string
 *        title:
 *            type: string
 *        category:
 *            type: string
 *        description:
 *            type: string
 *        quantity:
 *            type: string
 *        price:
 *            type: string
 *    BookDetailsResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          default: Russians Are Coming 2
 *        imageUrl:
 *          type: string
 *        id:
 *          type: string
 *          default: 648986fdfd9306d2c5f0cd40
 *        quantity:
 *          type: number
 *        price:
 *          type: number
 *        description:
 *          type: string
 */
const createBookSchema = object({
    title: string().required(),
    category: string().required(),
    description: string().required(),
    quantity: number().required().positive().integer(),
    price: number().required().positive().integer(),
});

export { getBookByIdSchema, createBookSchema };