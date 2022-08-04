"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getsubItemsId = exports.getsubItemsroot = exports.getDrivesofSubSites = exports.getAllSites = void 0;
const axios_1 = __importDefault(require("axios"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const REMO_SITE_ID = "tmxin.sharepoint.com,1649e6fd-df59-4f03-8e4b-4d765864f406,d2634703-c0cd-42f6-bfb5-c60555dbcb7d";
const createSubSites = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    });
    console.log(res.data);
    //  app.get('/files',(req,res)=>{
    //     res.send(JSON.stringify(res.data))
    //  })
    return res.data.value;
});
const createDrives = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    });
    console.log(res.data);
    //  app.get('/files',(req,res)=>{
    //     res.send(JSON.stringify(res.data))
    //  })
    return res.data.value;
});
const getAllSites = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    //  const {token,
    //     // subSiteId, subDriveId,itemId
    // } =  req.params
    console.log(token, 'hytjyjytjtyjtyjtyj');
    //  console.log(subSiteId,'hytjyjytjfhghrthtrhrthtyjtyjtyj')
    //  console.log(subDriveId,'hytjyjytjbgfbgfbfgbfhghrthtrhrthtyjtyjtyj')
    //  console.log(itemId,'tht67i7i78i8i8i8o8o8o8o8o8ddg')
    // const {token} = req.params
    // const {token} = req.body
    // console.log(token,'llll')
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        // const dataFiles = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(dataFiles,'dgdfgthtrhytjytjyt')
        // return res.status(200).json({
        //     success: true,
        //     data: dataFiles
        // });
        //  res.send(dataFiles)
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        // if(token && subSiteId && subDriveId && itemId){
        //     const DriveSubItems = await createDrives(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives/${subDriveId}/items/${itemId}/children`,token)
        //     console.log(DriveSubItems,'yhjyjyjyjyjyjyjyjyjyjyj')
        //     res.status(200).json({
        //         // success: true,
        //         DriveSubItems
        //        });
        // }
        // if( token && subSiteId && subDriveId  && !itemId ){
        //     const DriveItems = await createDrives(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives/${subDriveId}/root/children`,token)
        //     console.log(DriveItems,'7ugdhthfdvrrvrbrstht7u7u7u')
        //     res.status(200).json({
        //        // success: true,
        //        DriveItems
        //       });
        // }
        // if(token && !subSiteId && !subDriveId && !itemId) {
        //  const subSites = await createSubSites(`${BASE_PATH}/${REMO_SITE_ID}/sites`,token)
        //  console.log(subSites,'7u7u7u7u')
        res.status(200).json({
            success: true,
            response: yield createSubSites(`${BASE_PATH}/${REMO_SITE_ID}/sites`, token)
        });
        //  }
        // if(token && subSiteId && !subDriveId && !itemId){
        //     const Drives = await createSubSites(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives`,token)
        //     console.log(Drives,'7ugdhththt7u7u7u')
        //  res.status(200).json({
        //     // success: true,
        //     Drives
        //    });
        // }
    }
}));
exports.getAllSites = getAllSites;
const getDrivesofSubSites = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { 
    // token,
    subSiteId,
    //    subDriveId,itemId
     } = req.body;
    console.log(token, 'hytjyjytjtyjtyjtyj');
    //  console.log(subSiteId,'hytjyjytjfhghrthtrhrthtyjtyjtyj')
    //  console.log(subDriveId,'hytjyjytjbgfbgfbfgbfhghrthtrhrthtyjtyjtyj')
    //  console.log(itemId,'tht67i7i78i8i8i8o8o8o8o8o8ddg')
    // const {token} = req.params
    // const {token} = req.body
    // console.log(token,'llll')
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        // const dataFiles = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(dataFiles,'dgdfgthtrhytjytjyt')
        // return res.status(200).json({
        //     success: true,
        //     data: dataFiles
        // });
        //  res.send(dataFiles)
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        //    const Drives = await createSubSites(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives`,token)
        //    console.log(Drives,'7ugdhththt7u7u7u')
        res.status(200).json({
            // success: true,
            response: yield createSubSites(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives`, token)
        });
    }
}));
exports.getDrivesofSubSites = getDrivesofSubSites;
const getsubItemsroot = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, subSiteId, subDriveId,
    //    itemId
     } = req.body;
    console.log(token, 'hytjyjytjtyjtyjtyj');
    //  console.log(subSiteId,'hytjyjytjfhghrthtrhrthtyjtyjtyj')
    //  console.log(subDriveId,'hytjyjytjbgfbgfbfgbfhghrthtrhrthtyjtyjtyj')
    //  console.log(itemId,'tht67i7i78i8i8i8o8o8o8o8o8ddg')
    // const {token} = req.params
    // const {token} = req.body
    // console.log(token,'llll')
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        // const dataFiles = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(dataFiles,'dgdfgthtrhytjytjyt')
        // return res.status(200).json({
        //     success: true,
        //     data: dataFiles
        // });
        //  res.send(dataFiles)
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        // if( token && subSiteId && subDriveId  && !itemId ){
        //    const DriveItems = await createDrives(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives/${subDriveId}/root/children`,token)
        //    console.log(DriveItems,'7ugdhthfdvrrvrbrstht7u7u7u')
        res.status(200).json({
            success: true,
            response: yield createDrives(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives/${subDriveId}/root/children`, token)
        });
        // }
    }
}));
exports.getsubItemsroot = getsubItemsroot;
const getsubItemsId = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { 
    // token, 
    subSiteId, subDriveId, itemId } = req.body;
    console.log(token, 'hytjyjytjtyjtyjtyj');
    //  console.log(subSiteId,'hytjyjytjfhghrthtrhrthtyjtyjtyj')
    //  console.log(subDriveId,'hytjyjytjbgfbgfbfgbfhghrthtrhrthtyjtyjtyj')
    //  console.log(itemId,'tht67i7i78i8i8i8o8o8o8o8o8ddg')
    // const {token} = req.params
    // const {token} = req.body
    // console.log(token,'llll')
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        // const dataFiles = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(dataFiles,'dgdfgthtrhytjytjyt')
        // return res.status(200).json({
        //     success: true,
        //     data: dataFiles
        // });
        //  res.send(dataFiles)
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        // if(token && subSiteId && subDriveId && itemId){
        //    const DriveSubItems = await createDrives(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives/${subDriveId}/items/${itemId}/children`,token)
        //    console.log(DriveSubItems,'yhjyjyjyjyjyjyjyjyjyjyj')
        res.status(200).json({
            success: true,
            response: yield createDrives(`${BASE_PATH}/${REMO_SITE_ID}/sites/${subSiteId}/drives/${subDriveId}/items/${itemId}/children`, token)
        });
        // }
    }
}));
exports.getsubItemsId = getsubItemsId;
