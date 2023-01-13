import express from "express";
import {Router} from "express";
import { getAllFoldersSharepointLibrary,getAllItemsInFolderSharepointLibrary,getImages } from "../../controllers/photoandvideo/photosandvideos";
const router = Router();

router.route('/getAllPictureFolders/:token').get(getAllFoldersSharepointLibrary);
router.route('/getAllFolderPictureItems').post(getAllItemsInFolderSharepointLibrary);
router.route('/getImages/:token').get(getImages);
export default router;