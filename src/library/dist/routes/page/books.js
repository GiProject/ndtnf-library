"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var file_1 = __importDefault(require("../../middleware/file"));
var counter_1 = __importDefault(require("../../services/counter"));
var container_1 = require("../../container");
var BookRepository_1 = __importDefault(require("../../repositories/BookRepository"));
var router = (0, express_1.Router)();
var bookRepository = container_1.container.get(BookRepository_1.default);
router.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bookRepository.getBooks()];
            case 1:
                books = _a.sent();
                res.render("books/list", { title: "Книги", books: books });
                return [2 /*return*/];
        }
    });
}); });
router.get("/create", function (_req, res) {
    res.render("books/create", { title: "Добавление книги", book: {} });
});
router.post("/create", file_1.default.single("fileBook"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, authors, favorite, fileCover, fileName, file, fileBook;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, authors = _a.authors, favorite = _a.favorite, fileCover = _a.fileCover, fileName = _a.fileName;
                file = req.file;
                fileBook = '';
                if (file) {
                    fileBook = file.path;
                }
                return [4 /*yield*/, bookRepository.createBook({ title: title, description: description, authors: authors, favorite: favorite, fileName: fileName, fileCover: fileCover, fileBook: fileBook })];
            case 1:
                _b.sent();
                res.status(201);
                res.redirect("/books/");
                return [2 /*return*/];
        }
    });
}); });
router.get("/update/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, bookRepository.getBook(id)];
            case 1:
                book = _a.sent();
                if (book) {
                    res.render("books/update", {
                        title: "Редактирование книги",
                        book: book,
                    });
                }
                else {
                    res.status(404).redirect("/404");
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/update/:id", file_1.default.single("fileBook"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, description, authors, favorite, fileCover, fileName, file, fileBook;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, authors = _a.authors, favorite = _a.favorite, fileCover = _a.fileCover, fileName = _a.fileName;
                file = req.file;
                fileBook = '';
                if (file) {
                    fileBook = file.path;
                }
                return [4 /*yield*/, bookRepository.updateBook(id, { title: title, description: description, authors: authors, favorite: favorite, fileName: fileName, fileCover: fileCover, fileBook: fileBook })];
            case 1:
                _b.sent();
                res.redirect("/books/view/" + id);
                return [2 /*return*/];
        }
    });
}); });
router.get("/view", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bookRepository.getBooks()];
            case 1:
                books = _a.sent();
                res.render("books/view", { title: "Книги", books: books });
                return [2 /*return*/];
        }
    });
}); });
router.get("/view/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, counter, bookViewCountPromise, bookViewCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, bookRepository.getBook(id)];
            case 1:
                book = _a.sent();
                counter = new counter_1.default;
                return [4 /*yield*/, counter.setViewCount(id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, counter.getViewCount(id)];
            case 3:
                bookViewCountPromise = _a.sent();
                return [4 /*yield*/, bookViewCountPromise.text()];
            case 4:
                bookViewCount = _a.sent();
                if (book) {
                    res.render("books/view", {
                        title: "Просмотр книги",
                        book: book,
                        bookViewCount: bookViewCount
                    });
                }
                else {
                    res.status(404).redirect("/404");
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, bookRepository.deleteBook(id)];
            case 1:
                _a.sent();
                res.status(200).redirect("/books/");
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
