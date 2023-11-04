const router = require("express").Router();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://user:admin1@mongo:27017/?authMechanism=DEFAULT');

router.get('/', async (req, res) => {
    
    await client.connect();

    const db = client.db('test');
    const booksCollection = db.collection('books');

    booksCollection.insertMany([{
            title: "Book 1",
            description: "Book description",
            authors: "Author"
        }, {
            title: "Book 2",
            description: "Book description",
            authors: "Author"
        },
    ])
    
    const book = await booksCollection.findOne({
        title: /^Book/
    });

    booksCollection.updateOne({
        _id: book._id
    }, {
        $set: {
            "description": "update description",
            "authors": "update authors"
        }
    })

    const updateBook = await booksCollection.findOne({
        _id: book._id
    });

    res.status(200);
    res.json(updateBook);
    res.end();
});

module.exports = router;