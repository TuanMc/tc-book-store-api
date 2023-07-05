import "reflect-metadata";
import { injectable } from "inversify";
import Pagination from "../models/pagination";
import BookModel from "../models/books";
import { Document } from "mongoose";

@injectable()
export class BooksService {
    findAll(condition: any, page: number, limit: number): Promise<Pagination<typeof BookModel>> {
        return Promise.all([
            BookModel.countDocuments(),
            BookModel.find(condition)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec()
        ]).then((responses: any[]) => new Pagination(responses[1], page, responses[0]));
    }

    create(bookDocument: Document): Promise<any> {
        return bookDocument.save();
    }

    findById = BookModel.findById.bind(BookModel);

    findByIdAndUpdate = BookModel.findByIdAndUpdate.bind(BookModel);

    findByIdAndRemove = BookModel.findByIdAndRemove.bind(BookModel);
}