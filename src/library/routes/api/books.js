const router = require("express").Router();
const Book = require("../../models/Book");
const fileMiddleware = require("../../middleware/file");
const path = require("path");

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select("-__v");

        res.status(200);
        res.json(books);
    } catch (e) {
        res.status(400).send("Bad request");
    }
    res.end();
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select("-__v");

        res.status(200).json(book);
    } catch (e) {
        res.status(404).send("not found");
    }

    res.end();
});

router.get('/:id/download', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select("-__v");

        if (book) {
            res.download(path.join(__dirname, "../..", book.fileBook), (err) => {
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

router.post('/',  fileMiddleware.single("fileBook"), async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {file} = req;
    let fileBook = '';

    if (file) {
        fileBook = file.path 
    }

    try {
        const newBook = new Book({title, description, authors, favorite, fileCover, fileName});
        newBook.save();

        res.status(201).json(newBook);
    } catch (e) {
        console.log(e);
        res.status(400).send('Bad request');
    }

    res.end();
});

router.put('/:id',  fileMiddleware.single("fileBook"), async (req, res) => {
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const book = await Book.findById(id).select("-__v");

    if (!book) {
        res.status(404).send('not found').end();
    }

    const {file} = req;
    let fileBook = '';

    if (file) {
        fileBook = file.path 
    }

    book.title = title;
    book.description = description;
    book.authors = authors;
    book.favorite = favorite;
    book.fileCover = fileCover;
    book.fileName = fileName;

    book.save();

    res.status(200).json(book).end();
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});

        res.status(200).send("ok");
    } catch (e) {
        res.status(404).send("not found");
    }

    res.end();
});

module.exports = router;