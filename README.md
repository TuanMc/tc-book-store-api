# BOOK STORE API

This is a practice project for NodeJS with MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)

## Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/TuanMc/tc-book-store-api.git
   ```
2.  Change into the project directory:
    ```shell
    cd tc-book-store-api
    ```
3.  Install the dependencies:
    ```shell
    npm i
    ```
4.  Set up the configuration (if applicable):

- Copy the `.env.example` file and rename it to `.env`.

- Update the configuration values in `.env` according to your environment.

## Usage

### Running on local:
1. Start the development server:
   ```shell
   npm run dev
   ```

   or:
   ```shell
   npm run build
   npm start
   ```

2.  Open your browser and navigate to http://localhost:3000 to access the application.

### Running on Docker:
1. Setup a network to connect to MongoDB:
   ```shell
   docker network tc-book-store-network
   ```

   **Note:** Skip this step after the first run 

2. Start MongoDB with the container name `mongo-example` and connect to `tc-book-store-network` network:
   ```shell
   docker run --network tc-book-store-network -p 27017:27017 -–name=mongo-example mongo:latest
   ```

3. Build the Book store's BE service with tag `tc-book-store-api`:
   ```shell
   docker build -t tc-book-store-api .
   ```

4. Start the Book store's BE service and also connect to `tc-book-store-network` network:
   ```shell
   docker run --network tc-book-store-network -p 3000:3000 tc-book-store-api
   ```

## Routes

### Books
-   GET /api/books: Retrieves a list of books.
-   GET /api/books/:id: Retrieves a specific book by ID.
-   POST /api/books: Creates a new book.
-   PUT /api/books/:id: Updates a book by ID.
-   DELETE /api/books/:id: Deletes a book by ID.

### Book Category
-   GET /api/books/categories: Retrieves a list of books' categories.

### Cart [TBD]
<!-- -   GET /api/carts/:userId: Retrieves unpaid books in cart.
-   TBD -->