import {Router} from "express";
import { prayerTime,getCurrency,getAmount,getUnReadEmails,getWeather,getMeetingsUnCount,getUserInfo } from "../controllers/header";
const router = Router();

router.route('/prayerTime').get(prayerTime)
router.route('/countryCodes/:token').get(getCurrency)
router.route('/unreadmails/:token').get(getUnReadEmails)
router.route('/uncountmeetings/:token').get(getMeetingsUnCount)
router.route('/userinfo/:token').get(getUserInfo)
router.route('/countrycurrency').post(getAmount)
router.route('/weatherData').get(getWeather)
export default router;