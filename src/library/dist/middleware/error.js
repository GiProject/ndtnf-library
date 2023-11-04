"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error = function (req, res) {
    res.status(404);
    res.json('404 | страница не найдена');
};
exports.default = error;
