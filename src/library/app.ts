import 'express-group-routes';
import express from 'express';
import './db_connection';
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

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

