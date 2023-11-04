"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.post('/login', function (req, res) {
    res.status(200);
    res.json({
        id: 1,
        mail: 'test@mail.ru'
    });
    res.end();
});
exports.default = router;
