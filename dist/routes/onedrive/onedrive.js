"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onedrive_1 = require("../../controllers/onedrive/onedrive");
// import multer from 'multer'
const router = (0, express_1.Router)();
;
// const upload = multer({ dest: "../../uploads" });
//@ts-ignore
router.route('/uploadItem').post(onedrive_1.uploadItemInOneDrive);
router.route('/getAllRootItems/:token').get(onedrive_1.getAllOneDriveItemsRoot);
router.route('/getItemChildren').post(onedrive_1.getOneDriveItemChildren);
router.route('/deleteOneDriveItem').post(onedrive_1.deleteOneDriveItem);
router.route('/copylinkOneDriveItem').post(onedrive_1.copylinkDriveItem);
router.route('/getSharedItems/:token').get(onedrive_1.getAllOneDriveSharedItems);
router.route('/getRecentFiles/:token').get(onedrive_1.getAllOneDriveRecentFiles);
router.route('/getRecentFiles/downloadurl').post(onedrive_1.getAllOneDriveItemDownloadUrl);
exports.default = router;
