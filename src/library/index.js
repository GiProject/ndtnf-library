require('express-group-routes');
const express = require("express");
const mongoose = require('mongoose');
const error404 = require('./middleware/err-404')
const booksApiRouter = require("./routes/api/books");
const userRouter = require("./routes/api/user");
const testRouter = require("./routes/api/test");
const indexRouter = require('./routes/page/index');
const booksPageRouter = require("./routes/page/books");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/books', booksPageRouter);

// app.use(express.json());

app.use('/api/books', booksApiRouter);
app.use('/api/user', userRouter);

app.use('/api/test', testRouter);

app.use(error404);

(async() => {
    try {
		const mongodb = `mongodb://mongo:27017/library`;
		await mongoose.connect(mongodb);

        const mongod = mongoose.connection;

        mongod.once('open', function (){
            mongod.db.createCollection("book", function(){
                console.log("done");
            })
        })

		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	} catch (e) {
		console.log(e);
	}
})();