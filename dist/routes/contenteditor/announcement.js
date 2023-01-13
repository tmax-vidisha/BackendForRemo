"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcement_1 = require("../../controllers/contenteditor/announcement");
const router = (0, express_1.Router)();
router.route('/announcement/uploadItem').post(announcement_1.postTableAnnouncement);
router.route('/announcementlatest/:token').get(announcement_1.getLatestAnnouncement);
exports.default = router;
