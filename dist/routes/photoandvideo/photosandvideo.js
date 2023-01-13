"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photosandvideos_1 = require("../../controllers/photoandvideo/photosandvideos");
const router = (0, express_1.Router)();
router.route('/getAllPictureFolders/:token').get(photosandvideos_1.getAllFoldersSharepointLibrary);
router.route('/getAllFolderPictureItems').post(photosandvideos_1.getAllItemsInFolderSharepointLibrary);
router.route('/getImages/:token').get(photosandvideos_1.getImages);
exports.default = router;
