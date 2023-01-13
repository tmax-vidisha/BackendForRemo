"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emphighlight_1 = require("../../controllers/contenteditor/emphighlight");
const router = (0, express_1.Router)();
router.route('/employee/uploadItem').post(emphighlight_1.postEmployee);
// router.route('/announcementlatest/:token').get(getLatestAnnouncement);
exports.default = router;
