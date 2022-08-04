import express from "express";
// const { BlobServiceClient } = require('@azure/storage-blob');
import token  from './routes/token';
// const getPostData = require('./routes/graph');
import graph from './routes/graph';
// const getAllSites = require('./ro0utes/workspace')
import workspace from './routes/workspace'
// const RemoToken = require('./controllers/token')
// const graph = require('./routes/graph')
// var azure = require('azure-storage');
import logger from 'morgan';
// const axios = require('axios')
import cors from 'cors';
import  mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { json } from "body-parser";
const SERVER_PORT = process.env.PORT || 80 ;




// Create Express App and Routes
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(express.urlencoded({limit: '25mb', extended: true}));
// app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors());
app.use(logger('tiny'));
// function DataBase(){
//   try {
//     mongoose.connect( DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
//     console.log("connected"));    
//   }catch (error) { 
//     console.log("could not connect");    
//   }
// }
// DataBase();  
// const users =[{
//     name:"rgth",
//     age:45
// },
// {
//     name:"rgghtrh",
//     age:60
// },
// {
//     name:"yjuyj",
//     age:14
// }
// ]

const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=remoblobstorage;AccountKey=2dyNCBrGp/3St5coni+Xca3mFbQA67byG6qnp81UjypSK65msMG461kPruQ/Vr0EaZS0qk9y7dxewDnnb3kcxQ==;EndpointSuffix=core.windows.net";
const NewQuickLinkUser = 'b8e303de-b928-4f6a-97dd-4523583fa25d' //UserNewQuickLink
const GlobalQuickLink = "31822f7f-4709-4be7-b9ff-da41962a67d7" //ExternalQuickLink
const CID = "b8771df7-e108-41c0-ab73-5f84ac930d24"
const Annc = "1b883bd5-98ef-4a8c-8390-ee42ffa431f9"
const EMPH = "14f67e9e-4581-4a06-8c29-f775b8770fe4"
const NWS = "72988e1e-2ebf-48dc-96ce-2db3cbb7c3e3 "
const EVTS = "80d2331e-6970-4fe2-aa79-c6cae73bc150"
const HRO = "7dfccbdf-0469-40e8-ab99-501d6314491f"
const PHT = " 55cf720b-4646-49ed-bc64-c97ed72b75f0"
const NAVG = "a33a075f-afbd-477b-bacc-6eb609559fa4"

const REMOSITEID = "tmxin.sharepoint.com,1649e6fd-df59-4f03-8e4b-4d765864f406,d2634703-c0cd-42f6-bfb5-c60555dbcb7d"
const filterUserEmail = "https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,1649e6fd-df59-4f03-8e4b-4d765864f406,d2634703-c0cd-42f6-bfb5-c60555dbcb7d/lists('UserNewQuickLinks')/items?$expand=fields&$select=*&$filter=fields/UserEmail eq 'vidisha.a@tmax.in'"



const users = [{
  t: ""
}];
app.get('/user', (req:any, res:any) => {
  res.send(users);
});


// let tokens;
// app.post('/user/post', (req, res) => {
//   // const user = req.body
//   tokens = req.body

//   // users.push(token);
//   // console.log(tokens.token);

//   //   const response = axios.get('https://graph.microsoft.com/v1.0/me', {
//   //   headers: {
//   //   'Content-Type': 'application/json',
//   //   'Authorization': `Bearer ${tokens.token}`
//   //   }
//   // }
//   // )
//   // console.log(response);

//   // axios({
//   //   method: 'get',
//   //   url: 'https://graph.microsoft.com/v1.0/me',
//   //   headers: {
//   //     'Authorization': `Bearer ${tokens.token} `,   
//   //     'Content-Type': 'application/json'
//   //   },
//   // }).then(function (res) {
//   //   console.log(res.data)
//   // });
//   async function myInfo() {
//     const resp = await axios.get('https://graph.microsoft.com/v1.0/me', {
//       headers: {
//         'Authorization': `Bearer ${tokens.token} `,
//         'Content-Type': 'application/json'
//       }
//     });

//     const myData = JSON.stringify(resp.data)
//     //  console.log(resp)

//     app.get('/me', (req, res) => {
//       res.send(myData);
//     });


//   }
//   myInfo();


//   async function UnreadMailCount(){
//     const unReadMails = await axios.get("https://graph.microsoft.com/v1.0/me/mailFolders/Inbox/messages?$filter=isRead ne true&$count=true&$top=5000", {
//       headers: {
//         'Authorization': `Bearer ${tokens.token}`,
//         'Content-Type': 'application/json'
//       }
//     });
//     // console.log(unReadMails,'eeeeeeee')
//      const allMails = JSON.stringify(unReadMails.data)
//     app.get('/unreadmails', (req, res) => {
//       res.send(allMails);
//     });
//   }
//   UnreadMailCount();

//   function createUserQuickLink() {
//     let FieldData;
//     app.post('/list/listItem', (req, res) => {
//       FieldData = req.body;
//       console.log(FieldData, '999vC');
//       const listItem = {
//         fields: {
//           Title: FieldData.Title,
//           Url: FieldData.Url,
//           UserEmail: FieldData.UserEmail
//         }
//       }
//       console.log(listItem, '9Tcc')
//       function postItem() {
//         let axiosConfig = {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         };

//         axios.post(`${BASE_PATH}/${REMOSITEID}/lists/${NewQuickLinkUser}/items`, listItem, axiosConfig)
//           .then((res) => {
//             console.log("RESPONSE RECEIVED: ", res);
//           })
//           .catch((err) => {
//             console.log("AXIOS ERROR: ", err);
//           })

//       }
//       postItem();
//       res.status(201).send("User created")
//     })
//   }
//   createUserQuickLink();



//   async function getUserQuickLink() {
//     const allItems = await axios.get(`${BASE_PATH}/${REMOSITEID}/lists/${NewQuickLinkUser}/items?$expand=fields`, {
//       headers: {
//         'Authorization': `Bearer ${tokens.token}`,
//         'Content-Type': 'application/json'
//       }
//     });
//     // console.log(allItems.data,'888888')
//     const allQU = JSON.stringify(allItems.data);

//     app.get('/alluserquicklinks', (req, res) => {
//       res.send(allQU);
//     });

//   }
//   getUserQuickLink();


//   async function getGlobalQuickLink() {
//     const globalI = await axios.get(`${BASE_PATH}/${REMOSITEID}/lists/${GlobalQuickLink}/items?$expand=fields`, {
//       headers: {
//         'Authorization': `Bearer ${tokens.token}`,
//         'Content-Type': 'application/json'
//       }
//     });
//     // console.log(globalI.data.value,'tytu6u')
//     const Data = globalI.data.value;
//     // var aquaticCreatures =  Data.filter(function(Data) {
//     //   return Data.fields.Title == 'DPW PROMIS'
//     // });

//     // console.log(aquaticCreatures,'ooooo');
//     // var sss = Data.filter(aq =>  aq.fields.Title == 'DPW PROMIS')
//     // console.log(sss,'uii8i8')
//     let GId = Data.reduce((acc, book) => {
//       if (book.fields.Title === 'DPW PROMIS') {
//         acc.push(book.fields.id);
//       }

//       return acc;
//     }, []);

//     //  console.log(GId,'yyyyyy');
//     // let georgeOrwellBooks = Data.filter(book => book.fields.Title === 'DPW PROMIS')
//     // .map(book => book.fields.id);
//     //  console.log(georgeOrwellBooks,'yyyy')


//     const listG = {
//       //  GlobalQuickLinksId :  GId
//       fields: {
//         //  Title: "Qwerty1",
//         // GlobalQuickLinksId :  GId
//         'GlobalQuickLinksLookupId@odata.type': "Collection(Edm.Int32)",
//         GlobalQuickLinksLookupId: [1, 2]
//       }

//       // GlobalQuickLinksId: 1/s*{"results":["1","2"] }*/

//     }
//     // console.log(listG,'ttt')
//     //     function postItem(){
//     //       let axiosConfig = {
//     //        headers: {
//     //          'Authorization': `Bearer ${tokens.token}`,
//     //          'Content-Type': 'application/json'
//     //        }
//     //      };

//     //   axios.patch(`${BASE_PATH}/${REMOSITEID}/lists/${NewQuickLinkUser}/items/1`, listG, axiosConfig)
//     //  .then((res) => {
//     //    console.log("RESPONSE RECEIVED: ", res);
//     //    console.log(res.data)
//     //  })
//     //  .catch((err) => {
//     //    console.log("AXIOS ERROR: ", err);
//     //  })

//     // }
//     // postItem();

//   }
//   getGlobalQuickLink();

//   app.post('/list/globalid', (req, res) => {
//     // console.log( req.body.Value,'ui8o89o9o9p')
//     const GId = [req.body.Value]
//     console.log(GId, 'iiiiililil')
//     const listG = {
//       //  GlobalQuickLinksId :  GId
//       fields: {
//         //  Title: "Qwerty1",
//         // GlobalQuickLinksId :  GId
//         'GlobalQuickLinksLookupId@odata.type': "Collection(Edm.Int32)",
//         GlobalQuickLinksLookupId: GId
//       }

//       // GlobalQuickLinksId: 1/s*{"results":["1","2"] }*/

//     }
//     function postItem() {
//       let axiosConfig = {
//         headers: {
//           'Authorization': `Bearer ${tokens.token}`,
//           'Content-Type': 'application/json'
//         }
//       };

//       axios.patch(`${BASE_PATH}/${REMOSITEID}/lists/${NewQuickLinkUser}/items/1`, listG, axiosConfig)
//         .then((res) => {
//           console.log("RESPONSE RECEIVED: ", res);
//           console.log(res.data)
//         })
//         .catch((err) => {
//           console.log("AXIOS ERROR: ", err);
//         })

//     }
//     postItem();


//     res.status(201).send("User created")
//   })


//   async function IntraApp() {
//     const intra = await axios.get("https://graph.microsoft.com/v1.0/sites?$search=DPW Intranet Application", {
//       headers: {
//         'Authorization': `Bearer ${tokens.token}`,
//         'Content-Type': 'application/json'
//       }
//     });
//     const SiteId = intra.data.value[0].id
//     //  console.log(SiteId,'iiii')
//     // const intrapp = JSON.stringify(intra.data)
//     //  console.log(intrapp);


//     // app.get('/SiteId', (req, res) => {
//     //   res.send(intrapp);
//     // });
    


//     // let Site;
//     // app.post('/site/SiteId', (req, res) => {
//     //   Site = req.body
//     // console.log(Site.SiteId)
//     async function ListInfo() {
//       const list = await axios.get(`${BASE_PATH}/${SiteId}/lists`, {
//         headers: {
//           'Authorization': `Bearer ${tokens.token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       // console.log(list.data);
//       const listI = list.data.value;
//       var CeoId = "";
//       var HeroId = "";
//       var NewsId = "";
//       var EventId = "";
//       var AnnouncementId = "";
//       var EmployeeHighlightsId = "";
//       var QuickLinksId = "";
//       var GalleryId = "";
//       var NavigationId = "";
//       for (let i = 0; i < listI.length; i++) {
//         if (listI[i].name == "CEO Message") {
//           CeoId = listI[i].id;
//         }
//         if (listI[i].name == "HeroImages") {
//           HeroId = listI[i].id;
//         }
//         if (listI[i].name == "RemoNews") {
//           NewsId = listI[i].id;
//         }
//         if (listI[i].name == "Events") {
//           EventId = listI[i].id;
//         }
//         if (listI[i].name == "Announcements") {
//           AnnouncementId = listI[i].id;
//         }
//         if (listI[i].name == "EmpHighlights") {
//           EmployeeHighlightsId = listI[i].id;
//         }
//         if (listI[i].name == "External Quick Links") {
//           QuickLinksId = listI[i].id;
//         }
//         if (listI[i].name == "Photo Gallery") {
//           GalleryId = listI[i].id;
//         }
//         if (listI[i].name == "Navigation") {
//           NavigationId = listI[i].id;
//         }
//       }
//       // console.log(CeoId,'ceo');
//       // console.log(HeroId,'hero');
//       //  console.log(NewsId,'News');
//       // console.log(EventId,'event');
//       // console.log(HeroId,'hero');
//       // console.log(AnnouncementId,'Announc');
//       // console.log(EmployeeHighlightsId,'emp');
//       // console.log(GalleryId,'Gallery');
//       // console.log(QuickLinksId,'QL');
//       // console.log(NavigationId,'navi'); 
//       async function CEOMessageListId() {
//         const ceomsg = await axios.get(`${BASE_PATH}/${SiteId}/lists/${CeoId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(ceomsg.data.value[0].fields.blobName);
//         if (!AZURE_STORAGE_CONNECTION_STRING) {
//           throw Error("Azure Storage Connection string not found");
//         }
//         //  const blobServiceClient= await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
//         const containerName = ceomsg.data.value[0].fields.containerName
//         var blobName = ceomsg.data.value[0].fields.blobName;
//         // var blobName = "CEO.png"
//         // var filePath = "./Remo_Designs/CEO.png";

//         var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//         var startDate = new Date();
//         startDate.setMinutes(startDate.getMinutes() - 5);
//         var expiryDate = new Date(startDate);
//         expiryDate.setMinutes(startDate.getMinutes() + 60);

//         var sharedAccessPolicy = {
//           AccessPolicy: {
//             Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//             Start: startDate,
//             Expiry: expiryDate
//           }
//         };

//         var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);

//         var response = {};

//         response.image = blobService.getUrl(containerName, blobName, sasToken);

//         // console.log(response);
//         let merged = { ...ceomsg.data, ...response };
//         // console.log(merged)
//         const ceo = JSON.stringify(merged)
//         //  console.log(ceo)

//         app.get('/CeoMessage', (req, res) => {
//           res.send(JSON.parse(ceo));
//         });
//       }
//       CEOMessageListId();

//       async function Announcement() {
//         const acc = await axios.get(`${BASE_PATH}/${SiteId}/lists/${AnnouncementId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         // console.log(acc,'777777')
//         const AnnouncementData = JSON.stringify(acc.data);
//         app.get('/Announcement', (req, res) => {
//           res.send(AnnouncementData);
//         });

//       }
//       Announcement();
//       async function QuickLinks() {
//         const quick = await axios.get(`${BASE_PATH}/${SiteId}/lists/${QuickLinksId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         //  console.log(quick.data,'777777')
//         const QuickLinkData = JSON.stringify(quick.data);
//         app.get('/QuickLinks', (req, res) => {
//           res.send(QuickLinkData);
//         });
//       }
//       QuickLinks();
//       async function EmployeeHight() {
//         const emp = await axios.get(`${BASE_PATH}/${SiteId}/lists/${EmployeeHighlightsId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(emp.data.value[0].fields.blobName);
//         // console.log(emp.data.value[1].fields.blobName);
//         // console.log(emp.data.value[2].fields.blobName);
//         // console.log(emp.data,'rrrrr')
//         const EmployeeHighlightData = JSON.stringify(emp.data);
//         // console.log(EmployeeHighlightData,'88o9o9o9')

//         if (!AZURE_STORAGE_CONNECTION_STRING) {
//           throw Error("Azure Storage Connection string not found");
//         }
//         const containerName = emp.data.value[0].fields.containerName;
//         var blobName = emp.data.value[0].fields.blobName;
//         var blobName1 = emp.data.value[1].fields.blobName;
//         var blobName2 = emp.data.value[2].fields.blobName;

//         var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//         var startDate = new Date();
//         startDate.setMinutes(startDate.getMinutes() - 5);
//         var expiryDate = new Date(startDate);
//         expiryDate.setMinutes(startDate.getMinutes() + 60);

//         var sharedAccessPolicy = {
//           AccessPolicy: {
//             Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//             Start: startDate,
//             Expiry: expiryDate
//           }
//         };

//         var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
//         var sasToken1 = blobService.generateSharedAccessSignature(containerName, blobName1, sharedAccessPolicy);
//         var sasToken2 = blobService.generateSharedAccessSignature(containerName, blobName2, sharedAccessPolicy);

//         var responseemp = {};
//         var responseemp1 = {};
//         var responseemp2 = {};
//         responseemp.image = blobService.getUrl(containerName, blobName, sasToken);
//         responseemp1.image1 = blobService.getUrl(containerName, blobName1, sasToken1);
//         responseemp2.image2 = blobService.getUrl(containerName, blobName2, sasToken2);

//         // console.log(response,'uuuu')
//         const modifd = { ...responseemp, ...responseemp1, ...responseemp2 }
//         // console.log(modifd,'88888')
//         let allempdata = { ...modifd, ...emp.data }
//         // console.log(allempdata,'jjjj')
//         const EmpAllData = JSON.stringify(allempdata)
//         // console.log(EmpAllData,'uuuu')
//         app.get('/employeehighlight', (req, res) => {
//           res.send(EmpAllData);
//         });

//       }
//       EmployeeHight();
//       async function NewsDetails() {
//         // NewsId = listI[i].id;
//         const newsd = await axios.get(`${BASE_PATH}/${SiteId}/lists/${NewsId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(newsd.data.value[0].fields.containerName);
//         // console.log(newsd.data.value[0].fields.blobName);
//         // console.log(newsd.data.value[1].fields.blobName);
//         // console.log(newsd.data.value[2].fields.blobName);
//         // const NewsData = JSON.stringify(newsd.data);
//         // console.log(NewsData);
//         if (!AZURE_STORAGE_CONNECTION_STRING) {
//           throw Error("Azure Storage Connection string not found");
//         }
//         const containerName = newsd.data.value[0].fields.containerName
//         var blobName = newsd.data.value[0].fields.blobName;
//         var blobName1 = newsd.data.value[1].fields.blobName;
//         var blobName2 = newsd.data.value[2].fields.blobName;

//         var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//         var startDate = new Date();
//         startDate.setMinutes(startDate.getMinutes() - 5);
//         var expiryDate = new Date(startDate);
//         expiryDate.setMinutes(startDate.getMinutes() + 60);

//         var sharedAccessPolicy = {
//           AccessPolicy: {
//             Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//             Start: startDate,
//             Expiry: expiryDate
//           }
//         };

//         var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
//         var sasToken1 = blobService.generateSharedAccessSignature(containerName, blobName1, sharedAccessPolicy);
//         var sasToken2 = blobService.generateSharedAccessSignature(containerName, blobName2, sharedAccessPolicy);

//         var response = {};
//         var response1 = {};
//         var response2 = {};
//         response.image = blobService.getUrl(containerName, blobName, sasToken);
//         response1.image1 = blobService.getUrl(containerName, blobName1, sasToken1);
//         response2.image2 = blobService.getUrl(containerName, blobName2, sasToken2);
//         // console.log(response);
//         // console.log(response1);
//         // console.log(response2);

//         const m = { ...response, ...response1, ...response2 }
//         //  console.log(m,'77777')
//         let alldata = { ...m, ...newsd.data }
//         // console.log(alldata,'yyyyyy')
//         const NewsAllData = JSON.stringify(alldata)
//         // console.log(NewsAllData,'999999')
//         app.get('/News', (req, res) => {
//           res.send(NewsAllData);
//         });
//       }
//       NewsDetails();
//       async function EventDetails() {
//         const eventd = await axios.get(`${BASE_PATH}/${SiteId}/lists/${EventId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(eventd.data,'i8i8o9o');
//         const EventsData = JSON.stringify(eventd.data);
//         // console.log(EventsData,'99999')
//         app.get('/Events', (req, res) => {
//           res.send(EventsData);
//         });
//       }
//       EventDetails();

//       async function HeroImageDetails() {
//         const hero = await axios.get(`${BASE_PATH}/${SiteId}/lists/${HeroId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(hero.data.value[0].fields.containerName);
//         // console.log(hero.data.value[0].fields.blobName);
//         // console.log(hero.data.value[1].fields.blobName);
//         // console.log(hero.data.value[2].fields.blobName);
//         // const HeroImageData = JSON.stringify(hero.data);
//         //  console.log(HeroImageData,'99999')

//         if (!AZURE_STORAGE_CONNECTION_STRING) {
//           throw Error("Azure Storage Connection string not found");
//         }
//         const containerName = hero.data.value[0].fields.containerName
//         var blobName = hero.data.value[0].fields.blobName;
//         var blobName1 = hero.data.value[1].fields.blobName;
//         var blobName2 = hero.data.value[2].fields.blobName;

//         var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//         var startDate = new Date();
//         startDate.setMinutes(startDate.getMinutes() - 5);
//         var expiryDate = new Date(startDate);
//         expiryDate.setMinutes(startDate.getMinutes() + 60);

//         var sharedAccessPolicy = {
//           AccessPolicy: {
//             Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//             Start: startDate,
//             Expiry: expiryDate
//           }
//         };

//         var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
//         var sasToken1 = blobService.generateSharedAccessSignature(containerName, blobName1, sharedAccessPolicy);
//         var sasToken2 = blobService.generateSharedAccessSignature(containerName, blobName2, sharedAccessPolicy);

//         var responseimp = {};
//         var responseimp1 = {};
//         var responseimp2 = {};
//         responseimp.image = blobService.getUrl(containerName, blobName, sasToken);
//         responseimp1.image1 = blobService.getUrl(containerName, blobName1, sasToken1);
//         responseimp2.image2 = blobService.getUrl(containerName, blobName2, sasToken2);
//         // console.log(responseimp)
//         const her = { ...responseimp, ...responseimp1, ...responseimp2 }
//         let herdata = { ...her, ...hero.data }
//         const HeroAllData = JSON.stringify(herdata)
//         // console.log(HeroAllData,'hhhh')
//         app.get('/HeroImage', (req, res) => {
//           res.send(HeroAllData);
//         });
//       }
//       HeroImageDetails();

//       async function PhotoDetails() {
//         const photoG = await axios.get(`${BASE_PATH}/${SiteId}/lists/${GalleryId}/items?$expand=fields&$orderby=lastModifiedDateTime desc`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(photoG.data,'7u7i7i7i')
//         const PhotoGalleryData = JSON.stringify(photoG.data);
//         // console.log(PhotoGalleryData,'99999')
//         app.get('/PhotoGallery', (req, res) => {
//           res.send(PhotoGalleryData);
//         });
//       }
//       PhotoDetails();
//       async function NavigationDetails() {
//         const navi = await axios.get(`${BASE_PATH}/${SiteId}/lists/${NavigationId}/items?$expand=fields`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         // console.log(navi.data,'7u7i7i7i')
//         const NavigationData = JSON.stringify(navi.data);
//         // console.log(NavigationData,'99999')
//         app.get('/Navigation', (req, res) => {
//           res.send(NavigationData);
//         });
//       }
//        NavigationDetails();

//       // function newCeoMessage() {
//       //   let FieldData;
//       //   app.post('/list/listItemCeo', (req, res) => {
//       //     FieldData = req.body;
//       //    console.log(FieldData, '999vC');
//       //     const listItem = {
//       //       fields: {
//       //         // Title: FieldData.Title,
//       //         // Url: FieldData.Url,
//       //         // UserEmail: FieldData.UserEmail
//       //         Title:"CeoMessage",
//       //         UserName:"uuuuuuooo",
//       //         Description:"ggggg",
//       //         Position:"uuuuuu"
//       //       }
//       //     }
//       //     console.log(listItem, '9Tcc')
//       //     // function postItem() {
//       //     //   let axiosConfig = {
//       //     //     headers: {
//       //     //       'Authorization': `Bearer ${tokens.token}`,
//       //     //       'Content-Type': 'application/json'
//       //     //     }
//       //     //   };

//       //     //   axios.post(`${BASE_PATH}/${SiteId}/lists/${CeoId}/items`, listItem, axiosConfig)
//       //     //     .then((res) => {
//       //     //       console.log("RESPONSE RECEIVED: ", res);
//       //     //     })
//       //     //     .catch((err) => {
//       //     //       console.log("AXIOS ERROR: ", err);
//       //     //     })

//       //     // }
//       //     // postItem();
//       //     res.status(201).send("User created")
//       //   })
//       // }
//       // newCeoMessage();

//       async function getDriveInformation() {
//         const resp = await axios.get(`${BASE_PATH}/${SiteId}/drives`, {
//           headers: {
//             'Authorization': `Bearer ${tokens.token} `,
//             'Content-Type': 'application/json'
//           }
//         });
//         const Data = resp.data.value
//         // console.log(Data,'kkkkvvvvk')
//         var DocId = "";
//         var AssetId = "";
//         for (let i = 0; i < Data.length; i++) {
//           if (Data[i].name == "Documents") {
//             DocId = Data[i].id;
//           }
//           if (Data[i].name == "DPWorldAssetLib") {
//             AssetId = Data[i].id;
//           }
//         }
//         // app.post('/data',(req,res)=>{
//         //   console.log(req.body)
//         //   res.status(201).send("User created")
//         // })
//         function newCeoMessage() {
//           let FieldData
//           app.post('/newceo', (req, res) => {
//             FieldData = req.body
//             //  console.log(FieldData, 'iioioioi')
//             // console.log(Data, 'iioioioi')
//             //  console.log(FieldData.fields.ProfilePhoto,'iiiiii');
//             var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//             var matches = FieldData.fields.ProfilePhoto.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//             var type = matches[1];
//             var buffer = new Buffer.from(matches[2], 'base64');
//             const containerName = 'candidate';
//             const blobName = FieldData.fields.Name
//             blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
//                if (error) {
//                    console.log(error);
//                 }else{
//                console.log(result)
//               }
//             });
//             var startDate = new Date();
//             startDate.setMinutes(startDate.getMinutes() - 5);
//             var expiryDate = new Date(startDate);
//             expiryDate.setMinutes(startDate.getMinutes() + 60);

//             var sharedAccessPolicy = {
//                AccessPolicy: {
//                Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//                Start: startDate,
//                Expiry: expiryDate
//             }
//           };
//           var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
//           var response = {};
//           response.image = blobService.getUrl(containerName,blobName,sasToken);
//           console.log(response.image)
//           function postItem() {
//                     let axiosConfig = {
//                       headers: {
//                         'Authorization': `Bearer ${tokens.token}`,
//                         'Content-Type': 'application/json',

//                       }
//                     };
//                     const e ={
//                       Description:response.image,
//                       Url:response.image
//                     }
//                     const Data = {
//                       fields:{
                        
//                       Title: FieldData.fields.Title,
//                       Description:FieldData.fields.Description,
//                       UserName:FieldData.fields.UserName,
//                       Position: FieldData.fields.Position,
//                       // ProfilePhoto:response.image
//                       // ImageURL : {Url: response.image, Description: 'This is the description'}
//                        profileUrl:response.image,
//                       // ImageURL:{Url:response.image}
//                       }
//                     } 
//                     axios.post(`${BASE_PATH}/${SiteId}/lists/${CeoId}/items`, Data, axiosConfig)
//                       .then((res) => {
//                         console.log("RESPONSE RECEIVED: ", res);
//                       })
//                       .catch((err) => {
//                         console.log("AXIOS ERROR: ", err);
//                       })

//                   }
//                   postItem();
//             // function putItem() {
//             //   // let axiosConfig = {
//             //   //   headers: {
//             //   //     'Authorization': `Bearer ${tokens.token}`,
//             //   //     'Content-Type': 'image/jpeg'
//             //   //   }
//             //   // };

//             //   // axios.put(`${BASE_PATH}/${SiteId}/drives/${AssetId}/items/root:/${FieldData.fields.Name}:/content`, FieldData.fields.ProfilePhoto, axiosConfig)
//             //   //   .then((res) => {
//             //   //     console.log("RESPONSE RECEIVED: ", res);
//             //   //     if (res != null) {
//             //   //       var json = {
//             //   //         fileName: res.data.name,
//             //   //         serverRelativeUrl: res.data.webUrl,
//             //   //       };
//             //   //     }
//             //   //     // console.log(json,'llll')
//             //   //     function postItem() {
//             //   //       let axiosConfig = {
//             //   //         headers: {
//             //   //           'Authorization': `Bearer ${tokens.token}`,
//             //   //           'Content-Type': 'application/json'
//             //   //         }
//             //   //       };
//             //   //       const Data = {
//             //   //         fields:{
//             //   //         Title: FieldData.fields.Title,
//             //   //         Description:FieldData.fields.Description,
//             //   //         UserName:FieldData.fields.UserName,
//             //   //         Position: FieldData.fields.Position,
//             //   //         ProfilePhoto:JSON.stringify(json)
//             //   //         }
//             //   //       } 
//             //   //       axios.post(`${BASE_PATH}/${SiteId}/lists/${CeoId}/items`, Data, axiosConfig)
//             //   //         .then((res) => {
//             //   //           console.log("RESPONSE RECEIVED: ", res);
//             //   //         })
//             //   //         .catch((err) => {
//             //   //           console.log("AXIOS ERROR: ", err);
//             //   //         })

//             //   //     }
//             //   //     postItem();

//             //   //   })
//             //   // .catch((err) => {
//             //   //   console.log("AXIOS ERROR: ", err);
//             //   // })

//             // }
//             // putItem();

//             //  app.get('/image',(req,res)=>{
//             //    res.send(FieldData)
//             //  })
//             //   function postItem() {
//             //   let axiosConfig = {
//             //     headers: {
//             //       'Authorization': `Bearer ${tokens.token}`,
//             //       'Content-Type': 'application/json'
//             //     }
//             //   };

//             //   axios.post(`${BASE_PATH}/${SiteId}/lists/${CeoId}/items`, FieldData, axiosConfig)
//             //     .then((res) => {
//             //       console.log("RESPONSE RECEIVED: ", res);
//             //     })
//             //     .catch((err) => {
//             //       console.log("AXIOS ERROR: ", err);
//             //     })

//             // }
//             // postItem();
//             res.status(201).send("User created")
//           })
//         }
//         newCeoMessage()
       
//         function HeroInput(){
//            let HeroField
//            app.post('/heroinput',(req,res)=>{
//              HeroField = req.body;
//             //  console.log(HeroField,'yyyyyyyy')
//              var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//              var matches = HeroField.fields.HeroPic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//              var type = matches[1];
//              var buffer = new Buffer.from(matches[2], 'base64');
//              const containerName = 'candidate';
//              const blobName = HeroField.fields.Name
//              blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
//                 if (error) {
//                     console.log(error);
//                  }else{
//                 console.log(result)
//                }
//              });
//              var startDate = new Date();
//             startDate.setMinutes(startDate.getMinutes() - 5);
//             var expiryDate = new Date(startDate);
//             expiryDate.setMinutes(startDate.getMinutes() + 60);

//             var sharedAccessPolicy = {
//                AccessPolicy: {
//                Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//                Start: startDate,
//                Expiry: expiryDate
//             }
//           };
//           console.log(sharedAccessPolicy,'iiii')
//           var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
//           var response = {};
//           response.image = blobService.getUrl(containerName,blobName,sasToken);
//           console.log(response.image)
//           function postItem() {
//                     let axiosConfig = {
//                       headers: {
//                         'Authorization': `Bearer ${tokens.token}`,
//                         'Content-Type': 'application/json'
//                       }
//                     };
//                     const Data = {
//                       fields:{
//                       Title: HeroField.fields.Title,
//                       heroUrl:response.image
//                       }
//                     } 
//                     axios.post(`${BASE_PATH}/${SiteId}/lists/${HeroId}/items`, Data, axiosConfig)
//                       .then((res) => {
//                         console.log("RESPONSE RECEIVED: ", res);
//                       })
//                       .catch((err) => {
//                         console.log("AXIOS ERROR: ", err);
//                       })

//                   }
//                   postItem();
//             //  function putItem() {
//             //   let axiosConfig = {
//             //     headers: {
//             //       'Authorization': `Bearer ${tokens.token}`,
//             //       'Content-Type': 'image/jpeg'
//             //     }
//             //   };

//             //   axios.put(`${BASE_PATH}/${SiteId}/drives/${AssetId}/items/root:/${HeroField.fields.Name}:/content`, HeroField.fields.HeroPic, axiosConfig)
//             //     .then((res) => {
//             //       console.log("RESPONSE RECEIVED: ", res);
//             //       if (res != null) {
//             //         var json = {
//             //           fileName: res.data.name,
//             //           serverRelativeUrl: res.data.webUrl,
//             //         };
//             //       }
//             //       // console.log(json,'llll')
//             //       function postItem() {
//             //         let axiosConfig = {
//             //           headers: {
//             //             'Authorization': `Bearer ${tokens.token}`,
//             //             'Content-Type': 'application/json'
//             //           }
//             //         };
//             //         const Data = {
//             //           fields:{
//             //           Title: HeroField.fields.Title,
//             //           HeroPic:JSON.stringify(json)
//             //           }
//             //         } 
//             //         axios.post(`${BASE_PATH}/${SiteId}/lists/${HeroId}/items`, Data, axiosConfig)
//             //           .then((res) => {
//             //             console.log("RESPONSE RECEIVED: ", res);
//             //           })
//             //           .catch((err) => {
//             //             console.log("AXIOS ERROR: ", err);
//             //           })

//             //       }
//             //       postItem();

//             //     })
//             //   // .catch((err) => {
//             //   //   console.log("AXIOS ERROR: ", err);
//             //   // })

//             // }
//             // putItem();
//             res.status(201).send("User created")
//            })
//         }
//         HeroInput();
//         function EmpInput(){
//           let EmpField;
//           app.post('/employeeInput',(req,res)=>{
//             EmpField = req.body
//             //  console.log(EmpField,'kkkkkkkk')
//              var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//              var matches = EmpField.fields.EmpImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//              var type = matches[1];
//              var buffer = new Buffer.from(matches[2], 'base64');
//              const containerName = 'candidate';
//              const blobName = EmpField.fields.PhotoName
//              blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
//                 if (error) {
//                     console.log(error);
//                  }else{
//                 console.log(result)
//                }
//              });
//              var startDate = new Date();
//              startDate.setMinutes(startDate.getMinutes() - 5);
//              var expiryDate = new Date(startDate);
//              expiryDate.setMinutes(startDate.getMinutes() + 60);
 
//              var sharedAccessPolicy = {
//                 AccessPolicy: {
//                 Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//                 Start: startDate,
//                 Expiry: expiryDate
//              }
//            };
//            var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
//            var response = {};
//            response.image = blobService.getUrl(containerName,blobName,sasToken);
//           //  console.log(response.image)
//            function postItem() {
//                     let axiosConfig = {
//                       headers: {
//                         'Authorization': `Bearer ${tokens.token}`,
//                         'Content-Type': 'application/json'
//                       }
//                     };
//                     const Data = {
//                       fields:{
//                       Title: EmpField.fields.Title,
//                       EmployeeTitle:EmpField.fields.EmployeeTitle,
//                       Dept:EmpField.fields.Dept,
//                       empUrl:response.image
//                       }
//                     } 
//                     axios.post(`${BASE_PATH}/${SiteId}/lists/${EmployeeHighlightsId}/items`, Data, axiosConfig)
//                       .then((res) => {
//                         console.log("RESPONSE RECEIVED: ", res);
//                       })
//                       .catch((err) => {
//                         console.log("AXIOS ERROR: ", err);
//                       })

//                   }
//                   postItem();
//             // function putItem() {
//             //   let axiosConfig = {
//             //     headers: {
//             //       'Authorization': `Bearer ${tokens.token}`,
//             //       'Content-Type': 'image/jpeg'
//             //     }
//             //   };

//             //   axios.put(`${BASE_PATH}/${SiteId}/drives/${AssetId}/items/root:/${EmpField.fields.PhotoName}:/content`, EmpField.fields.EmpImage, axiosConfig)
//             //     .then((res) => {
//             //       console.log("RESPONSE RECEIVED: ", res);
//             //       if (res != null) {
//             //         var json = {
//             //           fileName: res.data.name,
//             //           serverRelativeUrl: res.data.webUrl,
//             //         };
//             //       }
//             //       // console.log(json,'llll')
//             //       function postItem() {
//             //         let axiosConfig = {
//             //           headers: {
//             //             'Authorization': `Bearer ${tokens.token}`,
//             //             'Content-Type': 'application/json'
//             //           }
//             //         };
//             //         const Data = {
//             //           fields:{
//             //           Title: EmpField.fields.Title,
//             //           EmployeeTitle:EmpField.fields.EmployeeTitle,
//             //           Dept:EmpField.fields.Dept,
//             //           EmpImage:JSON.stringify(json)
//             //           }
//             //         } 
//             //         axios.post(`${BASE_PATH}/${SiteId}/lists/${EmployeeHighlightsId}/items`, Data, axiosConfig)
//             //           .then((res) => {
//             //             console.log("RESPONSE RECEIVED: ", res);
//             //           })
//             //           .catch((err) => {
//             //             console.log("AXIOS ERROR: ", err);
//             //           })

//             //       }
//             //       postItem();

//             //     })
//             //   // .catch((err) => {
//             //   //   console.log("AXIOS ERROR: ", err);
//             //   // })

//             // }
//             // putItem();
//             res.status(201).send("User created")
//           })

//         }
//         EmpInput();
//         function NewsInput(){
//           let NewsField;
//           app.post('/newsInput',(req,res)=>{
//              NewsField= req.body
//             console.log(NewsField,'rtttt')
//             var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//             var matches = NewsField.fields.NewsImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//             var type = matches[1];
//             var buffer = new Buffer.from(matches[2], 'base64');
//             const containerName = 'candidate';
//             const blobName = NewsField.fields.Name
//             blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
//                if (error) {
//                    console.log(error);
//                 }else{
//                console.log(result)
//               }
//             });
//             var startDate = new Date();
//              startDate.setMinutes(startDate.getMinutes() - 5);
//              var expiryDate = new Date(startDate);
//              expiryDate.setMinutes(startDate.getMinutes() + 60);
 
//              var sharedAccessPolicy = {
//                 AccessPolicy: {
//                 Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//                 Start: startDate,
//                 Expiry: expiryDate
//              }
//            };
//            var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
//            var response = {};
//            response.image = blobService.getUrl(containerName,blobName,sasToken);
//           //  console.log(response.image)
//           function postItem() {
//                     let axiosConfig = {
//                       headers: {
//                         'Authorization': `Bearer ${tokens.token}`,
//                         'Content-Type': 'application/json'
//                       }
//                     };
//                     const Data = {
//                       fields:{
//                       Title: NewsField.fields.Title,
//                       Description:NewsField.fields.Description,
//                       newsUrl:response.image
//                       }
//                     } 
//                     axios.post(`${BASE_PATH}/${SiteId}/lists/${NewsId}/items`, Data, axiosConfig)
//                       .then((res) => {
//                         console.log("RESPONSE RECEIVED: ", res);
//                       })
//                       .catch((err) => {
//                         console.log("AXIOS ERROR: ", err);
//                       })

//                   }
//                   postItem();
//             //  function putItem() {
//             //   let axiosConfig = {
//             //     headers: {
//             //       'Authorization': `Bearer ${tokens.token}`,
//             //       'Content-Type': 'image/jpeg'
//             //     }
//             //   };

//             //   axios.put(`${BASE_PATH}/${SiteId}/drives/${AssetId}/items/root:/${NewsField.fields.Name}:/content`, NewsField.fields.NewsImage, axiosConfig)
//             //     .then((res) => {
//             //       console.log("RESPONSE RECEIVED: ", res);
//             //       if (res != null) {
//             //         var json = {
//             //           fileName: res.data.name,
//             //           serverRelativeUrl: res.data.webUrl,
//             //         };
//             //       }
//             //       // console.log(json,'llll')
//             //       function postItem() {
//             //         let axiosConfig = {
//             //           headers: {
//             //             'Authorization': `Bearer ${tokens.token}`,
//             //             'Content-Type': 'application/json'
//             //           }
//             //         };
//             //         const Data = {
//             //           fields:{
//             //           Title: NewsField.fields.Title,
//             //           Description:NewsField.fields.Description,
//             //           NewsImage:JSON.stringify(json)
//             //           }
//             //         } 
//             //         axios.post(`${BASE_PATH}/${SiteId}/lists/${NewsId}/items`, Data, axiosConfig)
//             //           .then((res) => {
//             //             console.log("RESPONSE RECEIVED: ", res);
//             //           })
//             //           .catch((err) => {
//             //             console.log("AXIOS ERROR: ", err);
//             //           })

//             //       }
//             //       postItem();

//             //     })
//             //   // .catch((err) => {
//             //   //   console.log("AXIOS ERROR: ", err);
//             //   // })

//             // }
//             // putItem();
//             res.status(201).send("User created")
//           })
//         }
//         NewsInput();
//       }
//       getDriveInformation();

//       function AnnoncementInput(){
//         let AnnoucementField;
//          app.post('/announcementinput',(req,res)=>{
//           AnnoucementField = req.body;
//           console.log(AnnoucementField,'lllll')
//             function postItem() {
//               let axiosConfig = {
//                 headers: {
//                   'Authorization': `Bearer ${tokens.token}`,
//                   'Content-Type': 'application/json'
//                 }
//               };

//               axios.post(`${BASE_PATH}/${SiteId}/lists/${AnnouncementId}/items`, AnnoucementField, axiosConfig)
//                 .then((res) => {
//                   console.log("RESPONSE RECEIVED: ", res);
//                 })
//                 .catch((err) => {
//                   console.log("AXIOS ERROR: ", err);
//                 })

//             }
//             postItem();
//           res.status(201).send("User created") 
//          })
//       }
//       AnnoncementInput();

//       function EventInput(){
//            let EventInput;
//           app.post('/eventinput',(req,res)=>{
//              EventInput = req.body
//              console.log(EventInput,'yuyiu')
//              function postItem() {
//               let axiosConfig = {
//                 headers: {
//                   'Authorization': `Bearer ${tokens.token}`,
//                   'Content-Type': 'application/json'
//                 }
//               };

//               axios.post(`${BASE_PATH}/${SiteId}/lists/${EventId}/items`, EventInput, axiosConfig)
//                 .then((res) => {
//                   console.log("RESPONSE RECEIVED: ", res);
//                 })
//                 .catch((err) => {
//                   console.log("AXIOS ERROR: ", err);
//                 })

//             }
//             postItem();
//             //  res.status(201).send("User created")
//           })
//       }
//       EventInput();
//     }


//     ListInfo();


//   }
//   IntraApp();
//   async function RecentFiles() {
//     const resp = await axios.get('https://graph.microsoft.com/v1.0/me/drive/recent?$top=5&$orderby=lastModifiedDateTime desc', {
//       headers: {
//         'Authorization': `Bearer ${tokens.token} `,
//         'Content-Type': 'application/json'
//       }
//     });
//     // console.log(resp.data)
//     const RecentFilesData = JSON.stringify(resp.data);
//     // console.log(RecentFilesData);
//     app.get('/RecentFiles', (req, res) => {
//       res.send(RecentFilesData);
//     });
//   }
//   RecentFiles();
   
//   async function subSites(){
//     const resp = await axios.get(`${BASE_PATH}/${REMOSITEID}/sites`, {
//       headers: {
//         'Authorization': `Bearer ${tokens.token} `,
//         'Content-Type': 'application/json'
//       }
//     });
//     const allsubSites = JSON.stringify(resp.data);
//     // console.log(allsubSites);
//     app.get('/allSubSites', (req, res) => {
//       res.send(allsubSites);
//     });

//   }
//   subSites();
//   function sendSite() {
//     let subSiteId;
//     app.post('/subsite', (req, res) => {
//       subSiteId = req.body;
//       console.log(subSiteId.sitesId, '999vC');
//       async function getDriveOfSites(){
        
//             const resp = await axios.get(`${BASE_PATH}/${REMOSITEID}/sites/${subSiteId.sitesId}/drives`, {
//               headers: {
//                 'Authorization': `Bearer ${tokens.token} `,
//                 'Content-Type': 'application/json'
//               }
//             });
//             // console.log(resp.data)
//          const drives = JSON.stringify(resp.data);
//          app.get('/getDrivesofSites', (req, res) => {
//           res.send(drives);
//         });

//         app.post('/drive',(req,res)=>{
//           let drive = req.body;
//           console.log(drive,'ikikik')

//           // async function getDriveInformation1() {
//           //   const resp = await axios.get(`${BASE_PATH}/${REMOSITEID}/drives`, {
//           //     headers: {
//           //       'Authorization': `Bearer ${tokens.token} `,
//           //       'Content-Type': 'application/json'
//           //     }
//           //   });
//           //   const Data = resp.data.value
//           //   // console.log(Data,'kkkkvvvvk')
//           //   var DocId = "";
//           //   var AssetId = "";
//           //   for (let i = 0; i < Data.length; i++) {
//           //     if (Data[i].name == "Documents") {
//           //       DocId = Data[i].id;
//           //     }
//           //     if (Data[i].name == "DPWorldAssetLib") {
//           //       AssetId = Data[i].id;
//           //     }
//           //   }
//           //   if(DocId){
//           //     async function getFolder(){
            
//           //     const resp = await axios.get(`${BASE_PATH}/${REMOSITEID}/sites/${subSiteId.sitesId}/drives/${drive.driveId}/root/children`, {
//           //       headers: {
//           //         'Authorization': `Bearer ${tokens.token} `,
//           //         'Content-Type': 'application/json'
//           //       }
//           //     });
//           //     // console.log(resp.data,'lklkklllllllllou')
//           //   //   const { value = [] } = resp.data
//           //   //   //  console.log(value,'uuukj')
//           //   //    if (value === undefined || value.length == 0) {
//           //   //     // array empty or does not exist
//           //   //     console.log('uuukj')
//           //   // }else{
//           //   //   console.log(value)
              
            
//           //   // }
//           //     const dataFolder = JSON.stringify(resp.data)
//           //     // console.log(dataFolder,'yuyuy')
//           //     app.get('/getFolder', (req, res) => {
//           //       res.send(dataFolder);
//           //     });
            
//           // } 
//           // getFolder()
//           //   }
//           // }
//           // getDriveInformation1();
//           async function getFolder(){
//             if(drive.driveId){
//               const resp = await axios.get(`${BASE_PATH}/${REMOSITEID}/sites/${subSiteId.sitesId}/drives/${drive.driveId}/root/children`, {
//                 headers: {
//                   'Authorization': `Bearer ${tokens.token} `,
//                   'Content-Type': 'application/json'
//                 }
//               });
//             //  console.log(resp.data,'lklkklllllllllou')

//               const dataFolder = JSON.stringify(resp.data)
              
//               app.get('/getFolder', (req, res) => {
//                 res.send(dataFolder);
//               });
//             } 
//           } 
//           getFolder();

//           app.post('/ItemId',(req,res)=>{
//             Item = req.body;
//             console.log(Item)
//             async function FolderItems (){
//               if(!Item.id){
//                 const respu = await axios.get(`${BASE_PATH}/${REMOSITEID}/sites/${subSiteId.sitesId}/drives/${drive.driveId}/root/children`, {
//                   headers: {
//                     'Authorization': `Bearer ${tokens.token} `,
//                     'Content-Type': 'application/json'
//                   }
//                 });
//                console.log(respu.data,'ll')
//                var dataFolder1 = JSON.stringify(respu.data)
//                 // return dataFolder;
//                 app.get('/getsubFolder', (req, res) => {
//                   res.send(dataFolder1);
//                 });
                
//               }else{
//                 const respvv = await axios.get(`${BASE_PATH}/${REMOSITEID}/sites/${subSiteId.sitesId}/drives/${drive.driveId}/items/${Item.id}/children`, {
//                   headers: {
//                     'Authorization': `Bearer ${tokens.token} `,
//                     'Content-Type': 'application/json'
//                   }
//                 });
//                console.log(respvv.data,'llty')
//                 var dataFolder1 = JSON.stringify(respvv.data)
               
//                 app.get('/getsubFolder', (req, res) => {
//                   res.send(dataFolder1);
//                 });
//               }
              
//             }
//             FolderItems();
//             res.status(201).send("User created")
//           })

//           // res.status(201).send("User created")
//         })
    
        
//       }
//       getDriveOfSites();
//       // res.status(201).send("User created")
//     })
//   }
//   sendSite();
  





//   // .catch((error) => console.log(error.response));
//   //   method: 'get',
//   //   url: 'https://graph.microsoft.com/v1.0/me',
//   //   headers: { 
//   //    'Authorization': `Bearer ${tokens.token} `,   
//   //     'Content-Type': 'application/json'
//   //   },

//   // };
//   // let V;
//   // axios(config)
//   // .then(function (response) {
//   //   const res = (JSON.stringify(response.data));

//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });

//   // const qwet = 'thythyyh'
//   // app.get('/me',(req,res)=>{
//   //   res.send(qwet);
//   // });
//   //  res.status(201).send("User created")




// })

console.log("Remo")

app.use('/api/v1/token',token)
app.use(`/api/v1/lists`,graph)
app.use(`/api/v1/sites`,workspace)

app.listen(80, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))
