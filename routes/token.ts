// const express = require("express");
import express from 'express';
import {Router} from "express";
import {getToken,
    createToken,
    getEventData,
    getQuicklinkData,
    getRecentFilesData,
    getAnnouncementData,
    getNavigationData,
    getCeoMsgData,
    getNewsData,
    getEmpData,
    getHeroData
} from '../controllers/token'

const router = Router()
router.route('/').get(getToken).post(createToken)


// router.route('/events').get(getEventData)
router.route('/folder/:token').get(getEventData)
// router.route('/folder/events').get(getEventData)
router.route('/quicklink/:token').get(getQuicklinkData)
router.route('/recentfiles/:token').get(getRecentFilesData)
router.route('/announcement/:token').get(getAnnouncementData)
router.route('/navigation/:token').get(getNavigationData)
router.route('/ceomsg/:token').get(getCeoMsgData)
router.route('/news/:token').get(getNewsData)
router.route('/emp/:token').get(getEmpData)
router.route('/hero/:token').get(getHeroData)
// router.route('/folder').post(getFolderData)
// router.route('/recent').get(createRequset);
// router.route('/ssss').get(sendData)

//  router.route('/folder').get(getFolderData)

// module.exports = router
export default router