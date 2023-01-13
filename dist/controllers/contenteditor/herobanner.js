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
exports.postheroBanner = void 0;
const azure_storage_1 = __importDefault(require("azure-storage"));
require('dotenv').config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const asyncHandler_1 = __importDefault(require("./../../middleware/asyncHandler"));
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const Site_Id = 'tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43';
const heroBannerDriveId = "b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikNSXwtOP-0VTpmA2oOYWlnu";
const heroId = "0ec4e29a-d2ec-4835-a011-ea8a3fe33ed4";
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=remoblobstorage;AccountKey=2dyNCBrGp/3St5coni+Xca3mFbQA67byG6qnp81UjypSK65msMG461kPruQ/Vr0EaZS0qk9y7dxewDnnb3kcxQ==;EndpointSuffix=core.windows.net";
function blobStorage(image, imageName) {
    //@ts-ignore
    var blobService = azure_storage_1.default.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches !== null) {
        var type = matches[1];
        //@ts-ignore
        var buffer = new Buffer.from(matches[2], 'base64');
        const containerName = 'candidate';
        const blobName = imageName;
        //@ts-ignore
        blobService.createBlockBlobFromText(containerName, blobName, buffer, { contentType: type }, function (error, result, response) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
        var startDate = new Date();
        startDate.setMinutes(startDate.getMinutes() - 300);
        var expiryDate = new Date(startDate);
        // expiryDate.setMinutes(startDate.getMinutes() + 300);
        expiryDate.setMonth(startDate.getMonth() + 12);
        var sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: [azure_storage_1.default.BlobUtilities.SharedAccessPermissions.READ],
                Start: startDate,
                Expiry: expiryDate
            }
        };
        console.log(sharedAccessPolicy, 'iiii');
        //@ts-ignore
        var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
        var response = {};
        //@ts-ignore
        response.image = blobService.getUrl(containerName, blobName, sasToken);
        //@ts-ignore
        console.log(response.image);
        //@ts-ignore
        return response.image;
    }
}
const postheroBanner = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.headers.authorization,'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')
    // console.log(req.headers.authorization, 'tccccttddddttttvvvvvtttttttyy')
    const token = req.headers.authorization;
    const { title, description, ExpiresOn, Time, WbU, isActive, EnableLikes, EnableCommands, SharedAsEmail, RecipientEmail, Attachment, 
    // Attachmentname,
    isDraft } = req.body;
    console.log(title, 'hh');
    console.log(description);
    console.log(ExpiresOn);
    console.log(Time);
    console.log(WbU);
    const exten = WbU.split('.').pop();
    console.log(RecipientEmail);
    console.log(Attachment);
    // console.log(Attachmentname)
    console.log(isActive);
    console.log(EnableLikes);
    console.log(EnableCommands);
    console.log(SharedAsEmail);
    console.log(isDraft);
    // const File = blobStorage(Attachment, Attachmentname)
    //  console.log(File, 'tththththth')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        console.log('rttrhtrhj7j7kukssss');
        const Data = {
            fields: {
                Title: title,
                Description: description,
                Url: WbU,
                FileType: exten,
                isActive: isActive,
                EnableLikes: EnableLikes,
                EnableCommands: EnableCommands,
                ShareAsEmail: SharedAsEmail,
                ExpiresOn: ExpiresOn,
                Time: Time,
                RecipentEmail: RecipientEmail,
                Attachment: Attachment,
                isDraft: isDraft
            }
        };
        try {
            const response = yield (0, node_fetch_1.default)(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/0ec4e29a-d2ec-4835-a011-ea8a3fe33ed4/items`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            });
            const data = yield response.json();
            // enter you logic when the fetch is successful
            console.log(data);
            // return data
        }
        catch (error) {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error);
        }
        res.status(200).json({
            success: true,
            response: `Sucessfully Created`
        });
    }
}));
exports.postheroBanner = postheroBanner;
