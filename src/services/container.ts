import { Container } from "inversify";
import { BooksService } from "./booksService";

const container = new Container();
// Bind services to the container
container.bind<BooksService>(BooksService).to(BooksService);

// Export the container
export default container;