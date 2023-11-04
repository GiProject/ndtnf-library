import {IBook} from "../models/IBook";

export default interface BookDto {
    title: IBook['title'];
    description: IBook['description'];
    authors: IBook['authors'];
    favorite: IBook['favorite'];
    fileCover: IBook['fileCover'];
    fileName: IBook['fileName'];
    fileBook: IBook['fileBook']
}