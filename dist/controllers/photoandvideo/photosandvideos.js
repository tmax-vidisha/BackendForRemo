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
exports.getImages = exports.getAllItemsInFolderSharepointLibrary = exports.getAllFoldersSharepointLibrary = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const Site_Id = 'tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43';
const Drive_Id = 'b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw';
const rootAllFolders = "https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/root/children";
const filesindisde = "https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/items/01DH6IWZ5YTY45TZDOIZH23ZKDMUIR7KMV/children";
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
function Nested(arr, tokens) {
    return __awaiter(this, void 0, void 0, function* () {
        let dup = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name) {
                const response = 
                // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
                yield axios_1.default.get(`${BASE_PATH}/${Site_Id}/drives/${Drive_Id}/root:/${arr[i].name}?$expand=children&$top=1&$orderby=lastModifiedDateTime+desc`, {
                    headers: {
                        'Authorization': `Bearer ${tokens} `,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                // var data = await response.data.value
                dup.push(response.data);
            }
        }
        // return arr[0].name
        return dup;
    });
}
const getAllFoldersSharepointLibrary = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = 
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        yield axios_1.default.get(`${BASE_PATH}/${Site_Id}/drives/${Drive_Id}/root/children?$select=name`, {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        // const responseTop = 
        //   // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        //     await axios.get(`${BASE_PATH}/${Site_Id}/lists/${RemoNews_Id}/items?$expand=fields&$top=5`, {
        //     headers: {
        //         'Authorization': `Bearer ${token} `,
        //         'Content-Type': 'application/json'
        //       }
        // })
        // console.log(response.data.value,"meetingssssssssssssssssssssssss" )
        let names = response.data.value;
        //  console.log(names.name)
        const arraydata = yield Nested(names, token);
        console.log(arraydata);
        res.status(200).json({
            success: true,
            response: arraydata,
            //   response1:responseTop.data.value
        });
    }
}));
exports.getAllFoldersSharepointLibrary = getAllFoldersSharepointLibrary;
const getAllItemsInFolderSharepointLibrary = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    // console.log(req.body)
    // const {token} = req.params
    //  const {token} = req.body
    const { ItemId, Name } = req.body;
    console.log(Name, ItemId);
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
        yield axios_1.default.get(`${BASE_PATH}/${Site_Id}/drives/${Drive_Id}/items/${ItemId}/children`, {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        // const responseTop = 
        //   // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        //     await axios.get(`${BASE_PATH}/${Site_Id}/lists/${RemoNews_Id}/items?$expand=fields&$top=5`, {
        //     headers: {
        //         'Authorization': `Bearer ${token} `,
        //         'Content-Type': 'application/json'
        //       }
        // })
        console.log(response.data.value, "folderNames");
        res.status(200).json({
            success: true,
            response: response.data.value,
            //   response1:responseTop.data.value
        });
    }
}));
exports.getAllItemsInFolderSharepointLibrary = getAllItemsInFolderSharepointLibrary;
const getImages = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = 
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        yield axios_1.default.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/559a977b-9534-4202-b078-1a7dfe2e16b0/items?$expand=fields&$orderby=lastModifiedDateTime+desc`, {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        // const responseTop = 
        //   // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        //     await axios.get(`${BASE_PATH}/${Site_Id}/lists/${RemoNews_Id}/items?$expand=fields&$top=5`, {
        //     headers: {
        //         'Authorization': `Bearer ${token} `,
        //         'Content-Type': 'application/json'
        //       }
        // })
        console.log(response.data.value, "meetingssssssssssssssssssssssss");
        res.status(200).json({
            success: true,
            response: response.data.value,
            //   response1:responseTop.data.value
        });
    }
}));
exports.getImages = getImages;
