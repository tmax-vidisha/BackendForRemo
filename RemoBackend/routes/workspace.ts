import express from "express";
import {Router} from "express";

const router = Router()
import {getAllSites,getDrivesofSubSites,getsubItemsroot,getsubItemsId} from '../controllers/workspace'

router.route('/subSites/:token').get(getAllSites)
router.route('/subSites/drives').post(getDrivesofSubSites)
router.route('/subSites/drives/root').post(getsubItemsroot)
router.route('/subSites/drives/items/id').post(getsubItemsId)
export default router;