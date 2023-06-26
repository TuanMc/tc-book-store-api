import { mongoose } from '../config/db';
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: { type: String },
    imageUrl: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
});

BookSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const BookModel = mongoose.model('books', BookSchema);

export default BookModel;