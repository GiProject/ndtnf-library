import { Router } from 'express';
import fileMiddleware from '../../middleware/file';
import path from 'path';
import { container } from '../../container';
import BookRepository from '../../repositories/BookRepository';
import {IBook} from "../../interfaces/models/IBook";

const router: Router = Router();
const bookRepository: BookRepository = container.get(BookRepository);
router.get('/', async (req: any, res: any): Promise<void> => {

    const books: IBook[] = await bookRepository.getBooks();

    res.status(200).json(books).end();
});

router.get('/:id', async (req: any, res: any): Promise<void> => {
    const {id} = req.params;

    const book: IBook = await bookRepository.getBook(id);

    res.status(200).json(book).end();
});

router.get('/:id/download', async (req: any, res: any): Promise<void> => {
    const {id} = req.params;

    try {
        const book: IBook = await bookRepository.getBook(id);

        if (book) {
            res.download(path.join(__dirname, "../..", book.fileName), (err: any): void => {
                if (err) {
                    res.status(404).send("not found");
                }
            });
        } else {
            res.status(404).send('not found');
        }

        res.status(200).json(book);
    } catch (e) {
        res.status(404).send("not found");
    }

    res.end();
});

router.post('/',  fileMiddleware.single("fileBook"), async (req: any, res: any): Promise<void> => {
    const {title, description, authors, favorite, fileCover, fileName, } = req.body;
    const {file} = req;
    let fileBook: string = '';

    if (file) {
        fileBook = file.path
    }

    const book: IBook = await bookRepository.createBook({title, description, authors, favorite, fileName, fileCover, fileBook});

    res.status(201).json(book);
    res.end();
});

router.put('/:id',  fileMiddleware.single("fileBook"), async (req: any, res: any): Promise<void> => {
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {file} = req;
    let fileBook: string = '';

    if (file) {
        fileBook = file.path
    }
    const book: IBook = await bookRepository.updateBook(id, {title, description, authors, favorite, fileName, fileCover, fileBook});

    res.status(200).json(book).end();
});

router.delete('/:id', async (req: any, res: any): Promise<void> => {
    const {id} = req.params;

    await bookRepository.deleteBook(id);

    res.end();
});

export default router;