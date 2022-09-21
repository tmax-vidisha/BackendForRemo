import {Router} from "express";
import { prayerTime } from "../controllers/header";
const router = Router();

router.route('/prayerTime').get(prayerTime)

export default router;