"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
router.get("/", function (_req, res) {
    res.render("index", { title: "Главная" });
});
exports.default = router;
