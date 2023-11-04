import BookRepositoryInterface from '../interfaces/BookRepositoryInterface';
import { injectable } from "inversify";
import { IBook } from '../interfaces/models/IBook'
import {Book} from "../models/Book";

@injectable()
export default class BookRepository implements BookRepositoryInterface {
    async getBooks (): Promise<IBook[]> {
        try {
            return await Book.find().select('-__v')
        } catch (e) {
            console.error(e)
        }
    }

    async getBook(id: string): Promise<IBook> {
        try {
            return await Book.findById(id).select('-__v')
        } catch (e) {
            console.error(e)
        }
    }

    async createBook(data: any): Promise<IBook> {
        try {
            const book = new Book(data);
            await book.save();
            return book;
        } catch (e) {
            console.error(e)
        }
    }

    async updateBook(id: string, data: object): Promise<IBook> {
        try {
            return await Book.findByIdAndUpdate(id, data)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteBook(id: string): Promise<void> {
        try {
            await Book.deleteOne({_id: id})
        } catch (e) {
            console.log(e);
        }
    }
}

