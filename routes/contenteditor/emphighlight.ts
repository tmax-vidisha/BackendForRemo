import {Router} from "express";
import {postEmployee } from "../../controllers/contenteditor/emphighlight";

const router = Router();



router.route('/employee/uploadItem').post(postEmployee);
// router.route('/announcementlatest/:token').get(getLatestAnnouncement);


export default router;