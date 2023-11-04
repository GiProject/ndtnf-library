"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
require("reflect-metadata");
var BookRepository_1 = __importDefault(require("./repositories/BookRepository"));
exports.container = new inversify_1.Container();
exports.container.bind(BookRepository_1.default).toSelf();
