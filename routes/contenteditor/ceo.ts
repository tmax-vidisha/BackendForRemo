import {Router} from "express";
import {postCeo } from "../../controllers/contenteditor/ceo";

const router = Router();



router.route('/ceoData/uploadItem').post(postCeo);
// router.route('/announcementlatest/:token').get(getLatestAnnouncement);


export default router;