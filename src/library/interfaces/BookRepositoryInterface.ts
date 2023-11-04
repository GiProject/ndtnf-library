import { IBook } from "./models/IBook";

export default interface BookRepositoryInterface {
    getBooks(): Promise<IBook[]>;
    getBook(id: string): Promise<IBook> | undefined;
    createBook(book: IBook): Promise<IBook>;
    updateBook(id: string, data: object): Promise<IBook>;
    deleteBook(id: string): void;
}