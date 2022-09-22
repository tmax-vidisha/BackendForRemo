"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const header_1 = require("../controllers/header");
const router = (0, express_1.Router)();
router.route('/prayerTime').get(header_1.prayerTime);
exports.default = router;
