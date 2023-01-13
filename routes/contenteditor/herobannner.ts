import {Router} from "express";
import {postheroBanner } from "../../controllers/contenteditor/herobanner";

const router = Router();



router.route('/heroBanner/uploadItem').post(postheroBanner);
// router.route('/announcementlatest/:token').get(getLatestAnnouncement);


export default router;