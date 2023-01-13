"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../controllers/token");
const router = (0, express_1.Router)();
router.route('/').get(token_1.getToken).post(token_1.createToken);
// router.route('/events').get(getEventData)
router.route('/folder/:token').get(token_1.getEventData);
// router.route('/folder/events').get(getEventData)
router.route('/quicklink/:token').get(token_1.getQuicklinkData);
router.route('/recentfiles/:token').get(token_1.getRecentFilesData);
router.route('/announcement/:token').get(token_1.getAnnouncementData);
router.route('/navigation/:token').get(token_1.getNavigationData);
router.route('/ceomsg/:token').get(token_1.getCeoMsgData);
router.route('/news/:token').get(token_1.getRemoNews);
router.route('/emp/:token').get(token_1.getEmpData);
router.route('/hero/:token').get(token_1.getRemoHero);
router.route('/mymeetings/:token').get(token_1.getEventsMeetings);
// router.route('/folder').post(getFolderData)
// router.route('/recent').get(createRequset);
// router.route('/ssss').get(sendData)
//  router.route('/folder').get(getFolderData)
// module.exports = router
exports.default = router;
