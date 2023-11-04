import 'express-group-routes';
import express from 'express';
import mongoose from 'mongoose';
import error from './middleware/error';
import booksApiRouter from './routes/api/books';
import userRouter from './routes/api/user';
import indexRouter from './routes/page/index';
import booksPageRouter from './routes/page/books';

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/books', booksPageRouter);

app.use('/api/books', booksApiRouter);
app.use('/api/user', userRouter);

app.use(error);

(async() => {
    try {
		const mongodb = `mongodb://mongo:27017/library`;
		await mongoose.connect(mongodb);

        const mongod = mongoose.connection;

        mongod.once('open', function (){
            mongod.db.createCollection("book");
        })

		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	} catch (e) {
		console.log(e);
	}
})();