import { BooksService } from "./../services/booksService";
import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import BookModel from "../models/books";
import Pagination from "../models/pagination";
import Error from "../models/error";
import { Request, Response } from "express";

@injectable()
export default class BooksController {

    constructor(@inject(BooksService) private booksService: BooksService) { }

    /**
    * Retrieve all Books from the database.
    * @param {*} req 
    * @param {*} res 
    */
    async findAll(req: Request, res: Response) {
        const queries = req.query;
        // Apply filter and pagination here
        const condition = {};
        const page = parseInt(queries.page as string) || 1; // Current page number
        const limit = parseInt(queries.limit as string) || 10; // Number of results per page

        try {
            const paginatedBooks: Pagination<typeof BookModel> = await this.booksService.findAll(condition, page, limit);
            res.json(paginatedBooks);
        } catch (error: any) {
            res.status(500)
                .json(new Error(error.message || "Some error occurred while retrieving books."));
        }
    };

    /**
    * Retrieve a book with book id
    * @param {*} req 
    * @param {*} res 
    */
    async findOne(req: Request, res: Response) {
        const id = req.params.bookId;

        try {
            const book = await this.booksService.findById(id);

            if (!book)
                res.status(404)
                    .send(new Error("Not found Book with id " + id));
            else
                res.send(book);
        } catch (err: any) {
            res.status(500)
                .send(new Error(err.message || "Some error occurred while retrieving books."));
        }
    };

    /**
    * Create a book
    * @param {*} req 
    * @param {*} res 
    */
    async create(req: Request, res: Response) {
        // Handle the uploaded file
        if (req.file) {
            console.log('File uploaded successfully:', req.file);
        } else {
            res.status(404)
                .send(new Error("Image could not be empty!"));
        }

        // Create a Book
        const book = new BookModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
            imageUrl: 'http://localhost:3000/uploads/' + (req.file as Express.Multer.File).filename
        });

        // Save Book in the database
        try {
            const data = await this.booksService.create(book);
            res.status(201)
                .send(data);
        } catch (err: any) {
            res.status(500)
                .send(new Error(err.message || "Some error occurred while creating the Book."));
        }
    };

    /**
    * Update a book by bookId
    * @param {*} req 
    * @param {*} res 
    */
    async updateByBookId(req: Request, res: Response) {
        if (!req.body) {
            return res.status(400)
                .send(new Error("Data to update can not be empty!"));
        }

        const id = req.params.bookId;

        try {
            const data = await this.booksService.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

            if (!data)
                res.status(404)
                    .send(new Error("Could not delete Book with id " + id));
            else
                res.send({ message: "Book was updated successfully." });
        } catch (err) {
            res.status(500)
                .send(new Error("Error updating Book with id " + id));
        }
    };

    /**
    * Delete a book by bookId
    * @param {*} req 
    * @param {*} res 
    */
    async deleteByBookId(req: Request, res: Response) {
        const id = req.params.bookId;

        try {
            const data = await this.booksService.findByIdAndRemove(id, { useFindAndModify: false })

            if (!data) {
                res.status(404).send({ message: "Not found Book with id " + id });
            } else {
                res.status(204).send();
            }
        } catch (err) {
            res.status(500)
                .send(new Error("Could not delete Book with id " + id));
        }
    };
}
