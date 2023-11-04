"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-group-routes");
var express_1 = __importDefault(require("express"));
require("./db_connection");
var error_1 = __importDefault(require("./middleware/error"));
var books_1 = __importDefault(require("./routes/api/books"));
var user_1 = __importDefault(require("./routes/api/user"));
var index_1 = __importDefault(require("./routes/page/index"));
var books_2 = __importDefault(require("./routes/page/books"));
var app = (0, express_1.default)();
var port = 3000;
app.set("view engine", "ejs");
app.use('/', index_1.default);
app.use('/books', books_2.default);
app.use('/api/books', books_1.default);
app.use('/api/user', user_1.default);
app.use(error_1.default);
app.listen(port, function () {
    console.log("Server started on port ".concat(port));
});
