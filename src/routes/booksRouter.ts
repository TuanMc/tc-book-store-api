import express from 'express';
import BooksController from '../controllers/booksController';
import validate from '../middleware/validate';
import { upload } from '../config/multer';
import { getBookByIdSchema, createBookSchema } from '../schema/booksSchema';
import tokenValidate from '../middleware/token-validate';
import container from '../services/container';

const router = express.Router();

// Resolve the BooksController from the container
const booksController = container.resolve<BooksController>(BooksController);

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *       - Books 
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get('/', booksController.findAll.bind(booksController));

/**
 * @swagger
 * /api/books/{bookId}:
 *   get:
 *     tags:
 *       - Books
 *     parameters:
 *      - in: path
 *        name: bookId
 *        required: true
 *        schema:
 *          type: string
 *        description: Book ID
 *     responses:
 *       200:
 *         description: Books Details
 *         content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/BookDetailsResponse'
 */
router.get('/:bookId', validate(getBookByIdSchema), booksController.findOne.bind(booksController));

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     requestBody:
 *       content: 
 *          multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *       201:
 *         description: Books Details
 *         content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/BookDetailsResponse'
 */
router.post('/', upload.single('image'), tokenValidate(), validate(createBookSchema), booksController.create.bind(booksController));

/**
 * @swagger
 * /api/books/{bookId}:
 *   put:
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       content: 
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/UpdateBookInput'
 *     responses:
 *       200:
 *         description: Books Details
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              default: Book was updated successfully.  
 */
router.put('/:bookId', tokenValidate(), booksController.updateByBookId.bind(booksController));

/**
 * @swagger
 * /api/books/{bookId}:
*   delete:
 *     tags:
 *       - Books
 *     parameters:
 *      - in: path
 *        name: bookId
 *        required: true
 *        schema:
 *          type: string
 *        description: Book ID
 *     responses:
 *       204:
 *         description: Delete book success
 */
router.delete('/:bookId', tokenValidate(), booksController.deleteByBookId.bind(booksController));

export default router;