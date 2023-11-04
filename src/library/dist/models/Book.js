"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var mongoose_1 = require("mongoose");
var bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        default: "",
    },
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
