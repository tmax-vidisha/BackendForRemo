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
exports.getOneDriveItemChildren = exports.getAllOneDriveItemsRoot = exports.uploadItemInOneDrive = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
// const qs = require('qs');
const node_fetch_1 = __importDefault(require("node-fetch"));
// var multipart = require('connect-multiparty');  
// import upload from 'express-fileupload';
// import {upload} from “express-fileupload”;
// import * as XLSX from 'xlsx';
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const docx_1 = require("docx");
const pptxgenjs_1 = __importDefault(require("pptxgenjs"));
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
// import docx from 'docx';
const check = "https://graph.microsoft.com/v1.0/me/drive/root/children?$filter=startswith(name,'Agr.docx')";
// const { Document, Packer, Paragraph, TextRun } = docx;
const app = (0, express_1.default)();
// app.use(upload());
// app.use(express.urlencoded({ extended: true }));
// var multipartMiddleware = multipart({ maxFieldsSize: (20 * 1024 * 1024) });
// app.use(multipartMiddleware);
const uploadItemInOneDrive = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    // const {token} = req.params
    var _a, _b, _c, _d;
    console.log(req.headers.authorization, 'tssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { name } = req.body;
    console.log(name, 'gfhtht');
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        console.log('ooo');
        const valid = yield (0, node_fetch_1.default)(
        //   `https://graph.microsoft.com/v1.0/me/drive/root:/${file}.xlsx:/content`,
        //https://graph.microsoft.com/v1.0/me/drive/root/children
        // `https://graph.microsoft.com/v1.0/me/drive/items/{parent-id}:/${file}.xlsx:/content`,
        `https://graph.microsoft.com/v1.0/me/drive/root/children?$filter=startswith(name,'${name}')`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        const output = yield valid.json();
        console.log(output.value, 'lll');
        //@ts-ignore
        if (((_a = output.value) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
            console.log('full');
            res.status(409).json({
                success: true,
                response: `${name} file already exists`
            });
        }
        //  //create folder 
        //  if(!name.includes(`.xlsx`) || !name.includes(`.pptx`) || !name.includes(`.docx`) && output.value?.length == 0){
        //   const Data ={
        //     "name":name,
        //     "folder": {}
        //   }
        //    try {
        //     const response = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
        //       method: 'POST',
        //       headers: {
        //        'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify(Data) 
        //       });
        //       const data = await response.json();
        //       console.log(data)
        //       if(data !== 0){
        //         // console.log(`${name} file is created`)
        //         res.status(201).json({
        //           success: true,
        //            response:`${name} folder is created`
        //        });
        //       }
        //    }catch{
        //     res.status(404).json({
        //       success: false,
        //        response:`folder not created`
        //    });
        //    }
        //  }
        //xlsx file
        const data = [
            [" ", " "],
        ];
        //@ts-ignore
        var buffer = node_xlsx_1.default.build([{ name: '', data: data }]);
        //docx file
        const doc = new docx_1.Document({
            sections: [{
                    properties: {},
                    children: [
                        new docx_1.Paragraph({}),
                    ],
                }],
        });
        const b64string = yield docx_1.Packer.toBase64String(doc);
        const rrrr = Buffer.from(b64string, 'base64');
        //pptx  file
        let pres = new pptxgenjs_1.default();
        //@ts-ignore
        // const pptData = await pres.write( 'base64')
        // Ex using: `const app = express();``
        const eeee = yield pres.stream();
        //@ts-ignore
        const www = Buffer.from(eeee, "binary");
        //Uploading docx to onedrive
        if (name.includes('.docx') && ((_b = output.value) === null || _b === void 0 ? void 0 : _b.length) == 0) {
            try {
                const result = yield (0, node_fetch_1.default)(`https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // 'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    },
                    //@ts-ignore
                    body: rrrr
                });
                //   console.log(name,"upload excel file");
                //  console.log(result)
                const data = yield result.json();
                console.log(data);
                if (data !== 0) {
                    // console.log(`${name} file is created`)
                    res.status(201).json({
                        success: true,
                        response: `${name} file is created`
                    });
                }
            }
            catch (_e) {
                res.status(404).json({
                    success: false,
                    response: `file not created`
                });
            }
            // return result
        }
        //   else  if(!name.includes('.docx')) {
        //     // console.log('Enter proper name')
        //  return   res.status(400).json({
        //       response:'Enter proper name'
        //    });
        //   }
        //uploading pptx to oneDrive
        if (name.includes('.pptx') && ((_c = output.value) === null || _c === void 0 ? void 0 : _c.length) == 0) {
            try {
                const result = yield (0, node_fetch_1.default)(`https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    },
                    //@ts-ignore
                    body: www
                });
                //   console.log(name,"upload excel file");
                //  console.log(result)
                const data = yield result.json();
                console.log(data);
                if (data !== 0) {
                    console.log(`${name} file is created`);
                    res.status(201).json({
                        success: true,
                        response: `${name}  is created`
                    });
                }
            }
            catch (_f) {
                res.status(404).json({
                    success: false,
                    response: `file not created`
                });
            }
            // return result
        }
        // else if(!name.includes('.pptx')){
        //   // console.log('Enter proper name')
        //   res.status(404).json({
        //     success: false,
        //      response:'Enter proper name'
        //  });
        // }
        //uploading xlsx file to one drive   
        if (name.includes('.xlsx') && ((_d = output.value) === null || _d === void 0 ? void 0 : _d.length) == 0) {
            try {
                const result = yield (0, node_fetch_1.default)(`https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    },
                    //@ts-ignore
                    body: buffer
                });
                //   console.log(name,"upload excel file");
                //  console.log(result)
                const data = yield result.json();
                if (data !== 0) {
                    res.status(201).json({
                        success: true,
                        response: `${name}  is created`
                    });
                }
            }
            catch (_g) {
                res.status(404).json({
                    success: false,
                    response: `file not created`
                });
            }
            // return result
        }
        //  const result = await fetch(
        //     //   `https://graph.microsoft.com/v1.0/me/drive/root:/${file}.xlsx:/content`,
        //     //https://graph.microsoft.com/v1.0/me/drive/root/children
        //    // `https://graph.microsoft.com/v1.0/me/drive/items/{parent-id}:/${file}.xlsx:/content`,
        //       `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,
        //       {
        //         method: 'PUT',
        //         headers: {
        //           Authorization: `Bearer ${token}`,
        //          //'Content-Type': 'application/json'
        //         //  'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //         'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        //         // 'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        //         //  'Content-Type': 'application/vnd.ms-excel'
        //           //'Content-Type': 'application/vnd.ms-excel.sheet.macroEnabled.12'
        //         //   'Content-Type': 'text/plain'
        //     //    ' Content-Type':"application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8"
        //         },
        //        //@ts-ignore
        //         body:rrrr
        //       })
        //     //   console.log(name,"upload excel file");
        //   console.log(result)
        // res.status(200).json({
        //     success: true,
        //      response:answer
        //  });
    }
}));
exports.uploadItemInOneDrive = uploadItemInOneDrive;
const getAllOneDriveItemsRoot = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    // const  token = req.headers.authorization
    console.log(req.body);
    const { token } = req.params;
    // //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        const response = 
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        yield axios_1.default.get(`https://graph.microsoft.com/v1.0/me/drive/root/children`, {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data.value, "root");
        res.status(200).json({
            success: true,
            response: response.data.value
        });
    }
}));
exports.getAllOneDriveItemsRoot = getAllOneDriveItemsRoot;
const getOneDriveItemChildren = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    // const {token} = req.params
    console.log(req.headers.authorization, 'tssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { ItemId, Name } = req.body;
    console.log(ItemId, Name, 'gfhtht');
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        console.log('trytrtjtjytaxczc');
        if (ItemId) {
            const response = 
            // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
            yield axios_1.default.get(`https://graph.microsoft.com/v1.0/me/drive/items/${ItemId}/children`, {
                headers: {
                    'Authorization': `Bearer ${token} `,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.value, "ItemChildren");
            res.status(200).json({
                success: true,
                response: response.data.value
            });
        }
        else {
            const response = 
            // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
            yield axios_1.default.get(`https://graph.microsoft.com/v1.0/me/drive/root/children`, {
                headers: {
                    'Authorization': `Bearer ${token} `,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.value, "ItemChildren");
            res.status(200).json({
                success: true,
                response: response.data.value
            });
        }
    }
}));
exports.getOneDriveItemChildren = getOneDriveItemChildren;
