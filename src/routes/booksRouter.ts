import express from 'express';
import bookControllers from '../controllers/booksController';
import validate from '../middleware/validate';
import { upload } from '../config/multer';
import { getBookByIdSchema, createBookSchema } from '../schema/booksSchema';

const router = express.Router();

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
router.get('/', bookControllers.findAll);

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
router.get('/:bookId', validate(getBookByIdSchema), bookControllers.findOne);

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
router.post('/', upload.single('image'), validate(createBookSchema), bookControllers.create);

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
router.put('/:bookId', bookControllers.updateByBookId);

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
router.delete('/:bookId', bookControllers.deleteByBookId);

export default router;