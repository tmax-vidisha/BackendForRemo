"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ceo_1 = require("../../controllers/contenteditor/ceo");
const router = (0, express_1.Router)();
router.route('/ceoData/uploadItem').post(ceo_1.postCeo);
// router.route('/announcementlatest/:token').get(getLatestAnnouncement);
exports.default = router;
