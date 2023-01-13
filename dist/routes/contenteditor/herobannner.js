"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const herobanner_1 = require("../../controllers/contenteditor/herobanner");
const router = (0, express_1.Router)();
router.route('/heroBanner/uploadItem').post(herobanner_1.postheroBanner);
// router.route('/announcementlatest/:token').get(getLatestAnnouncement);
exports.default = router;
