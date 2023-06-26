import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import mongoose, { ConnectOptions } from 'mongoose';
import fs from 'fs';
import path from 'path';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Test Books APIs', () => {
    let createdBookId;

    before((done) => {
        // Connect to the MongoDB test database
        mongoose.connect('mongodb://127.0.0.1:27017/book_store_db', { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        // Disconnect from the MongoDB test database
        mongoose.disconnect()
            .then(() => done())
            .catch((err) => done(err));

    });

    it('should get book list', (done) => {
        chai
            .request(app)
            .get('/api/books')
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.has.status(200);
                done();
            });
    });

    it('should create a book', (done) => {
        chai
            .request(app)
            .post('/api/books')
            .set('content-type', 'multipart/form-data')
            .field('title', 'test')
            .field('description', 'slim')
            .field('category', 'drama')
            .field('price', '10')
            .field('quantity', '01')
            .attach('image', fs.readFileSync(`${__dirname}/mock/image.png`), 'tests/image.png')
            .end((err, res) => {
                if (err) throw err;
                createdBookId = res.body.id;

                expect(res).to.has.status(201);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should update a book', (done) => {
        chai
            .request(app)
            .put(`/api/books/${createdBookId}`)
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.has.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Book was updated successfully.');
                done();
            });
    });

    it('should delete a book', (done) => {
        chai
            .request(app)
            .delete(`/api/books/${createdBookId}`)
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.has.status(204);
                done();
            });
    });
});