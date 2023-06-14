const mongoose = require("mongoose");
const BookModel = require("../models/books");

/**
 * Retrieve all Books from the database.
 * @param {*} res 
 */
function findAll(_, res) {
    // Apply filter and pagination here
    var condition = {};

    BookModel.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

/**
 * Retrieve a book with book id
 * @param {*} req 
 * @param {*} res 
 */
function findOne(req, res) {
    const id = req.params.bookId;

    BookModel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

/**
 * Create a book
 * @param {*} req 
 * @param {*} res 
 */
function create(req, res) {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Book
    const book = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        imageUrl: "test"
    });

    // Save Book in the database
    book
        .save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        });
};

/**
 * Update a book by bookId
 * @param {*} req 
 * @param {*} res 
 */
function updateByBookId(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.bookId;

    BookModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Could not delete Book with id " + id });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Book with id " + id });
        });
};

/**
 * Delete a book by bookId
 * @param {*} req 
 * @param {*} res 
 */
function deleteByBookId(req, res) {
    const id = req.params.bookId;

    BookModel.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found Book with id " + id });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Book with id " + id });
        });
};

module.exports = { findAll, findOne, create, updateByBookId, deleteByBookId }