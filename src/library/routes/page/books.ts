import {Router} from 'express';
import fileMiddleware from '../../middleware/file';
import Counter from '../../services/counter';
import {container} from "../../container";
import BookRepository from "../../repositories/BookRepository";
import {IBook} from "../../interfaces/models/IBook";

const router: Router = Router();
const bookRepository: BookRepository = container.get(BookRepository);
router.get("/", async (_req: any, res: any): Promise<void> => {
    const books: IBook[] = await bookRepository.getBooks();

    res.render("books/list", {title: "Книги", books: books});
});

router.get("/create", (_req: any, res: any): void => {
    res.render("books/create", {title: "Добавление книги", book: {}});
});

router.post("/create", fileMiddleware.single("fileBook"), async (req: any, res: any): Promise<void> => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {file} = req;
    let fileBook: string = '';

    if (file) {
        fileBook = file.path
    }

    await bookRepository.createBook({title, description, authors, favorite, fileName, fileCover, fileBook});

    res.status(201);
    res.redirect("/books/");
});

router.get("/update/:id", async (req: any, res: any): Promise<void> => {
    const {id} = req.params;
    const book: IBook = await bookRepository.getBook(id);

    if (book) {
        res.render("books/update", {
            title: "Редактирование книги",
            book: book,
        });
    } else {
        res.status(404).redirect("/404");
    }
});

router.post("/update/:id", fileMiddleware.single("fileBook"), async (req: any, res: any): Promise<void> => {
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {file} = req;
    let fileBook: string = '';

    if (file) {
        fileBook = file.path
    }
    await bookRepository.updateBook(id, {title, description, authors, favorite, fileName, fileCover, fileBook});

    res.redirect("/books/view/" + id);
});

router.get("/view", async (_req: any, res: any): Promise<void> => {
    const books = await bookRepository.getBooks();
    res.render("books/view", {title: "Книги", books: books});
});

router.get("/view/:id", async (req: any, res: any): Promise<void> => {
    const {id} = req.params;

    const book: IBook = await bookRepository.getBook(id);

    const counter: Counter = new Counter;

    await counter.setViewCount(id);
    let bookViewCountPromise: number | Response = await counter.getViewCount(id);
    // @ts-ignore
    let bookViewCount = await bookViewCountPromise.text();

    if (book) {
        res.render("books/view", {
            title: "Просмотр книги",
            book: book,
            bookViewCount: bookViewCount
        });
    } else {
        res.status(404).redirect("/404");
    }
});

router.post("/delete/:id", async (req: any, res: any): Promise<void> => {
    const {id} = req.params;

    await bookRepository.deleteBook(id);

    res.status(200).redirect("/books/");
});

export default router;