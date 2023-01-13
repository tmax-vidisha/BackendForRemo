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
exports.getEventsMeetings = exports.createRequset = exports.getHeroData = exports.getEmpData = exports.getNewsData = exports.getCeoMsgData = exports.getNavigationData = exports.getAnnouncementData = exports.getRecentFilesData = exports.getQuicklinkData = exports.getEventData = exports.createToken = exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
// const StatusCodes = require ("http-status-codes");
// const { BlobServiceClient } = require('@azure/storage-blob');
const azure_storage_1 = __importDefault(require("azure-storage"));
const moment_1 = __importDefault(require("moment"));
require('dotenv').config();
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=remoblobstorage;AccountKey=2dyNCBrGp/3St5coni+Xca3mFbQA67byG6qnp81UjypSK65msMG461kPruQ/Vr0EaZS0qk9y7dxewDnnb3kcxQ==;EndpointSuffix=core.windows.net";
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const REMO_SITE_ID = "tmxin.sharepoint.com,1649e6fd-df59-4f03-8e4b-4d765864f406,d2634703-c0cd-42f6-bfb5-c60555dbcb7d";
const AnnouncementId = "1b883bd5-98ef-4a8c-8390-ee42ffa431f9";
const External_Quick_Links = "31822f7f-4709-4be7-b9ff-da41962a67d7";
const Events_Id = "80d2331e-6970-4fe2-aa79-c6cae73bc150";
const Navigation_Id = "a33a075f-afbd-477b-bacc-6eb609559fa4";
const Ceo_Message = "b8771df7-e108-41c0-ab73-5f84ac930d24";
const News_Id = "72988e1e-2ebf-48dc-96ce-2db3cbb7c3e3";
const EmpHighlights = "14f67e9e-4581-4a06-8c29-f775b8770fe4";
const HeroImage_Id = "7dfccbdf-0469-40e8-ab99-501d6314491f";
const Photo_Gallery = "55cf720b-4646-49ed-bc64-c97ed72b75f0";
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const app = (0, express_1.default)();
// const getTokens = require('./graph')
const getToken = (req, res) => {
    res.send('all items');
};
exports.getToken = getToken;
//  let variableToExport;
// function RemoToken(token){
// //  console.log(token,'aaaaaaaaaaaaaaaa')
// // variableToExport = token
// // return variableToExport;
// return token
// }
console.log(AZURE_STORAGE_CONNECTION_STRING, 'gthgtg');
// async function ffd(){
//     // const resp = await axios.get('https://graph.microsoft.com/v1.0/me/drive/recent?$top=5&$orderby=lastModifiedDateTime desc', {
//     //         headers: {
//     //           'Authorization': `Bearer ${RemoToken.variableToExport} `,
//     //           'Content-Type': 'application/json'
//     //         }
//     //       });
//     //       console.log(resp,'trtrgtg')
//     // console.log(variableToExport,'yhyhjytjy')
//     var y = RemoToken();
//     console.log(y);
//   }
//   ffd();
function Recent(data) {
    //    console.log(data,'gfdgfgfhgfh')
    //    res.send(files)
    const dfsdfdf = data;
    const Datsa = (req, res) => {
        res.send('dfdgrdttrhtr');
    };
}
const createRequset = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.createRequset = createRequset;
const ceomsg = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    });
    // console.log(res.data,'yhj7jj78i989o9l')
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }
    //  const blobServiceClient= await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
    const containerName = res.data.value[0].fields.containerName;
    var blobName = res.data.value[0].fields.blobName;
    // var blobName = "CEO.png"
    // var filePath = "./Remo_Designs/CEO.png";
    var blobService = azure_storage_1.default.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);
    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: [azure_storage_1.default.BlobUtilities.SharedAccessPermissions.READ],
            Start: startDate,
            Expiry: expiryDate
        }
    };
    // @ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    var response = {};
    // @ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    // console.log(response);
    let merged = Object.assign(Object.assign({}, res.data), response);
    return merged;
});
const requestgraph = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    });
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }
    const containerName = res.data.value[0].fields.containerName;
    var blobName = res.data.value[0].fields.blobName;
    var blobName1 = res.data.value[1].fields.blobName;
    var blobName2 = res.data.value[2].fields.blobName;
    var blobService = azure_storage_1.default.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 365);
    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: [azure_storage_1.default.BlobUtilities.SharedAccessPermissions.READ],
            Start: startDate,
            Expiry: expiryDate
        }
    };
    console.log(sharedAccessPolicy, 'lllltt');
    // @ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    // @ts-ignore
    var sasToken1 = blobService.generateSharedAccessSignature(containerName, blobName1, sharedAccessPolicy);
    // @ts-ignore
    var sasToken2 = blobService.generateSharedAccessSignature(containerName, blobName2, sharedAccessPolicy);
    var response = {};
    var response1 = {};
    var response2 = {};
    // @ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    // @ts-ignore
    response1.image1 = blobService.getUrl(containerName, blobName1, sasToken1);
    // @ts-ignore
    response2.image2 = blobService.getUrl(containerName, blobName2, sasToken2);
    // console.log(response);
    // console.log(response1);
    // console.log(response2);
    //  console.log(res.data.value[0].fields.newsUrl,'yyyy')
    //@ts-ignore
    res.data.value[0].fields.newsUrl = response.image;
    //@ts-ignore
    res.data.value[1].fields.newsUrl = response1.image1;
    //@ts-ignore
    res.data.value[2].fields.newsUrl = response2.image2;
    console.log(res.data.value[2].fields, 'yyyy');
    const m = Object.assign(Object.assign(Object.assign({}, response), response1), response2);
    //  console.log(m,'77777')
    let alldata = Object.assign(Object.assign({}, m), res.data);
    // console.log(res.data)
    //  app.get('/files',(req,res)=>{
    //     res.send(JSON.stringify(res.data))
    //  })
    // return res.data.value
    return alldata;
});
const requestgraphemp = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    });
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }
    const containerName = res.data.value[0].fields.containerName;
    var blobName = res.data.value[0].fields.blobName;
    var blobName1 = res.data.value[1].fields.blobName;
    var blobName2 = res.data.value[2].fields.blobName;
    var blobService = azure_storage_1.default.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 365);
    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: [azure_storage_1.default.BlobUtilities.SharedAccessPermissions.READ],
            Start: startDate,
            Expiry: expiryDate
        }
    };
    console.log(sharedAccessPolicy, 'lllltt');
    // @ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    // @ts-ignore
    var sasToken1 = blobService.generateSharedAccessSignature(containerName, blobName1, sharedAccessPolicy);
    // @ts-ignore
    var sasToken2 = blobService.generateSharedAccessSignature(containerName, blobName2, sharedAccessPolicy);
    var response = {};
    var response1 = {};
    var response2 = {};
    // @ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    // @ts-ignore
    response1.image1 = blobService.getUrl(containerName, blobName1, sasToken1);
    // @ts-ignore
    response2.image2 = blobService.getUrl(containerName, blobName2, sasToken2);
    // console.log(response);
    // console.log(response1);
    // console.log(response2);
    //  console.log(res.data.value[0].fields.newsUrl,'yyyy')
    //@ts-ignore
    res.data.value[0].fields.empUrl = response.image;
    //@ts-ignore
    res.data.value[1].fields.empUrl = response1.image1;
    //@ts-ignore
    res.data.value[2].fields.empUrl = response2.image2;
    console.log(res.data.value[2], 'yyyy');
    const m = Object.assign(Object.assign(Object.assign({}, response), response1), response2);
    //  console.log(m,'77777')
    let alldata = Object.assign(Object.assign({}, m), res.data);
    // console.log(res.data)
    //  app.get('/files',(req,res)=>{
    //     res.send(JSON.stringify(res.data))
    //  })
    // return res.data.value
    return alldata;
});
const requestgraphhero = (url, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    });
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }
    const containerName = res.data.value[0].fields.containerName;
    var blobName = res.data.value[0].fields.blobName;
    var blobName1 = res.data.value[1].fields.blobName;
    var blobName2 = res.data.value[2].fields.blobName;
    var blobService = azure_storage_1.default.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 365);
    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: [azure_storage_1.default.BlobUtilities.SharedAccessPermissions.READ],
            Start: startDate,
            Expiry: expiryDate
        }
    };
    console.log(sharedAccessPolicy, 'lllltt');
    // @ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    // @ts-ignore
    var sasToken1 = blobService.generateSharedAccessSignature(containerName, blobName1, sharedAccessPolicy);
    // @ts-ignore
    var sasToken2 = blobService.generateSharedAccessSignature(containerName, blobName2, sharedAccessPolicy);
    var response = {};
    var response1 = {};
    var response2 = {};
    // @ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    // @ts-ignore
    response1.image1 = blobService.getUrl(containerName, blobName1, sasToken1);
    // @ts-ignore
    response2.image2 = blobService.getUrl(containerName, blobName2, sasToken2);
    // console.log(response);
    // console.log(response1);
    // console.log(response2);
    //  console.log(res.data.value[0].fields.newsUrl,'yyyy')
    //@ts-ignore
    res.data.value[0].fields.heroUrl = response.image;
    //@ts-ignore
    res.data.value[1].fields.heroUrl = response1.image1;
    //@ts-ignore
    res.data.value[2].fields.heroUrl = response2.image2;
    console.log(res.data.value[2], 'yyyy');
    const m = Object.assign(Object.assign(Object.assign({}, response), response1), response2);
    //  console.log(m,'77777')
    let alldata = Object.assign(Object.assign({}, m), res.data);
    // console.log(res.data)
    //  app.get('/files',(req,res)=>{
    //     res.send(JSON.stringify(res.data))
    //  })
    // return res.data.value
    return alldata;
});
// const sendData = (data,req,res) =>{
//     res.send(data);
// }
const createToken = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    const { token } = req.body;
    if (!token) {
        return res.status(404).json({
            success: false,
            error: 'No token found'
        });
    }
    // res.status(StatusCodes.OK).json({
    //     success: true,
    //     data: RecentFiles,Announcement
    // });
}));
exports.createToken = createToken;
// console.log(AccessToken,'llllll'
const getEventData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tsfff');
    //  const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llssdsdssdsdsdsdsll');
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
        //   const Event = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(Event,'dgdfgthtrhytjytjyt')
        //    const  QuickLinks = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${External_Quick_Links}/items?$expand=fields`, token )
        // //    console.log(QuickLinks,'dgdfgthtrhytjcvxvdfbfdytjyt')
        //    const RecentFiles = await createRequset('https://graph.microsoft.com/v1.0/me/drive/recent?$top=5&$orderby=lastModifiedDateTime desc',token)
        // //    console.log(RecentFiles,'ththyh')
        //    const Announcements = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${AnnouncementId}/items?$expand=fields`,token)
        // //    console.log(Announcements,'y777k8k8k8k')
        //    const Navigation = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Navigation_Id}/items?$expand=fields`,token)
        // //    console.log(Navigation,'y777k8k8k8k')
        //    const CeoMsg = await ceomsg(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Ceo_Message}/items?$expand=fields`,token)
        // //    console.log(CeoMsg,'t56y65u76i76i87i87')
        //    const News = await requestgraph(`${BASE_PATH}/${REMO_SITE_ID}/lists/${News_Id}/items?$expand=fields`,token)
        // //    console.log(News,'egreg565j76k87k87kll8lk')
        //    const Employee = await requestgraph(`${BASE_PATH}/${REMO_SITE_ID}/lists/${EmpHighlights}/items?$expand=fields`,token)
        // //    console.log(Employee,'grt65uj76uj76j8kj87k8k98k')
        //    const Hero = await requestgraph(`${BASE_PATH}/${REMO_SITE_ID}/lists/${HeroImage_Id}/items?$expand=fields`,token)
        //    console.log(Hero,'6u776j7kjk8k')
        //   const Gallery = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Photo_Gallery}/items?$expand=fields`,token)
        //   console.log(Gallery,'thytjkklliliuluiliu')
        //    req.body = dataFiles
        //    res.send(req.body)
        //    sendData(dataFiles)
        res.status(200).json({
            success: true,
            response: yield createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token)
            // Event,
            // QuickLinks,
            // RecentFiles,
            // Announcements,
            // Navigation,
            // CeoMsg,
            // News,
            // Employee,
            // Hero,
            // Gallery
        });
    }
}));
exports.getEventData = getEventData;
const getQuicklinkData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    //  const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${External_Quick_Links}/items?$expand=fields`, token)
        });
    }
}));
exports.getQuicklinkData = getQuicklinkData;
const getRecentFilesData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield createRequset('https://graph.microsoft.com/v1.0/me/drive/recent?$top=5&$orderby=lastModifiedDateTime desc', token)
        });
    }
}));
exports.getRecentFilesData = getRecentFilesData;
const getAnnouncementData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.headers,'lllllllllll')
    // console.log(req.body)
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${AnnouncementId}/items?$expand=fields`, token)
        });
    }
}));
exports.getAnnouncementData = getAnnouncementData;
const getNavigationData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Navigation_Id}/items?$expand=fields`, token)
        });
    }
}));
exports.getNavigationData = getNavigationData;
const getCeoMsgData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield ceomsg(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Ceo_Message}/items?$expand=fields`, token)
        });
    }
}));
exports.getCeoMsgData = getCeoMsgData;
const getNewsData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield requestgraph(`${BASE_PATH}/${REMO_SITE_ID}/lists/${News_Id}/items?$expand=fields`, token)
        });
    }
}));
exports.getNewsData = getNewsData;
const getEmpData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield requestgraphemp(`${BASE_PATH}/${REMO_SITE_ID}/lists/${EmpHighlights}/items?$expand=fields`, token)
        });
    }
}));
exports.getEmpData = getEmpData;
const getHeroData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            response: yield requestgraphhero(`${BASE_PATH}/${REMO_SITE_ID}/lists/${HeroImage_Id}/items?$expand=fields`, token)
        });
    }
}));
exports.getHeroData = getHeroData;
const getEventsMeetings = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    // console.log(req.body)
    const { token } = req.params;
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        var td = (0, moment_1.default)().subtract(2, 'days').format('YYYY-MM-DD');
        var enddate = (0, moment_1.default)().add(1, 'days').format("YYYY-MM-DD");
        const response = 
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        yield axios_1.default.get(`https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${td}T21:00:00.000Z&endDateTime=${enddate}T21:00:00.000Z&$orderBy=start/dateTime&$top=5`, {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.value, "meetingssssssssssssssssssssssss");
        res.status(200).json({
            success: true,
            response: response.data.value
        });
    }
}));
exports.getEventsMeetings = getEventsMeetings;
