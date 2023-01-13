import express from "express";
import {Router} from "express";
import { postTableAnnouncement,getLatestAnnouncement } from "../../controllers/contenteditor/announcement";

const router = Router();



router.route('/announcement/uploadItem').post(postTableAnnouncement);
router.route('/announcementlatest/:token').get(getLatestAnnouncement);


export default router;