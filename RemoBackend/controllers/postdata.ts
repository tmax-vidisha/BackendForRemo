import axios from 'axios'
import express,{Request,Response} from "express";
// const qs = require('qs');
import fetch from'node-fetch'
import asyncHandler from '../middleware/asyncHandler'
const Ceo_Message = "b8771df7-e108-41c0-ab73-5f84ac930d24"
const AnnouncementId = "1b883bd5-98ef-4a8c-8390-ee42ffa431f9"
const News_Id = "72988e1e-2ebf-48dc-96ce-2db3cbb7c3e3"
const EmpHighlights = "14f67e9e-4581-4a06-8c29-f775b8770fe4"
const NewQuickLinkUser = 'b8e303de-b928-4f6a-97dd-4523583fa25d'
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const REMO_SITE_ID = "tmxin.sharepoint.com,1649e6fd-df59-4f03-8e4b-4d765864f406,d2634703-c0cd-42f6-bfb5-c60555dbcb7d"
const Events_Id = "80d2331e-6970-4fe2-aa79-c6cae73bc150"
const HeroImage_Id = "7dfccbdf-0469-40e8-ab99-501d6314491f"
import azure from'azure-storage';
require('dotenv').config();

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


console.log(process.env.AZURE_STORAGE_CONNECTION_STRING,'hyjyjyjyjyjyjyj')
const createPostRequset =  async(url:any, token:any,title:any,desc:any) => {

                 
  
                //  function postItem() {
                //         let axiosConfig = {
                //           headers: {
                //             'Authorization': `Bearer ${token}`,
                //             'Content-Type': 'application/json'
                //           }
                //         };
                //         const Data = {
                //           fields:{
                //           Title: title,
                //           // Description:desc,
                //           // newsUrl:response.image
                //           }
                //         } 
                //         axios.post(url, Data, axiosConfig)
                //           .then((res) => {
                //             console.log(res,"Response");
                //              return res
                //           })
                //           .catch((err) => {
                //             console.log("AXIOS ERROR: ", err);
                //           })
    
                //       }
                //    postItem();
                    // 


                    const Data = {
                                fields:{
                                Title: title,
                                // Description:desc,
                                // newsUrl:response.image
                                }
                              } 
                    try {
                      const response = await fetch(url, {
                       method: 'POST',
                       headers: {
                        'Authorization': `Bearer ${token}`,
                         'Content-Type': 'application/json'
                         },
                         body:JSON.stringify(Data) 
                       });
                       const data = await response.json();
                    // enter you logic when the fetch is successful
                      //  console.log(data);
                      return data
                     } catch(error) {
                   // enter your logic for when there is an error (ex. error toast)
      
                        console.log(error)
                       } 
                  }          
    // const response = await axios.post(url, bodyData, axiosConfig);
    // return response.data;
   
// }

const createPostRequsetEvent =  async(url:any, token:any,title:any,desc:any,startdate:any,endDate:any) => {
  // console.log(url,'6u6iu67iuiuiti')
  // console.log(startdate,'6u6iu67iuiuiti')
  // // console.log(eventdate,'rgtreyrewyreyweywsF')
  // console.log(endDate,'tey54u6565ieutudrusya')
  // console.log(title,'gregrthtrht')
          const Data = {
                  fields:{
                    Title: title,
                    EventDate: startdate,
                    EndDate: endDate,
                    Description:desc,
                  }
                } 
      try {
        const response = await fetch(url, {
         method: 'POST',
         headers: {
          'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
           },
           body:JSON.stringify(Data) 
         });
         const data = await response.json();
      // enter you logic when the fetch is successful
        //  console.log(data);
        return data
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)

          console.log(error)
         } 
    }  

    const createPostRequsetHero =  async(url:any, token:any,title:any,pic:any,name:any) => {
      // console.log(url,'6u6iu67iuiuiti')
      // console.log(name,'6u6iu67iuiuiti')
      // console.log(eventdate,'rgtreyrewyreyweywsF')
      // console.log(pic,'tey54u6565ieutudrusya')
      // console.log(title,'gregrthtrht')
      //@ts-ignore
      var blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
                   var matches = pic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                   var type = matches[1];
                   //@ts-ignore
                   var buffer = new Buffer.from(matches[2], 'base64');
                   const containerName = 'candidate';
                   const blobName = name
                   //@ts-ignore
                   blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
                      if (error) {
                          console.log(error);
                       }else{
                      console.log(result)
                     }
                   });
                   var startDate = new Date();
                  startDate.setMinutes(startDate.getMinutes() - 5);
                  var expiryDate = new Date(startDate);
                  expiryDate.setMinutes(startDate.getMinutes() + 60);
      
                  var sharedAccessPolicy = {
                     AccessPolicy: {
                     Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
                     Start: startDate,
                     Expiry: expiryDate
                  }
                };
                console.log(sharedAccessPolicy,'iiii')
                //@ts-ignore
                var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
                var response = {};
                //@ts-ignore
                response.image = blobService.getUrl(containerName,blobName,sasToken);
                //@ts-ignore
                console.log(response.image)


              const Data = {
                      fields:{
                        Title: title,
                        //@ts-ignore
                        heroUrl:response.image
                      }
                    } 
          try {
            const response = await fetch(url, {
             method: 'POST',
             headers: {
              'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
               },
               body:JSON.stringify(Data) 
             });
             const data = await response.json();
          // enter you logic when the fetch is successful
            //  console.log(data);
            return data
           } catch(error) {
         // enter your logic for when there is an error (ex. error toast)
    
              console.log(error)
             } 
        }  
        const createPostRequsetCeo =  async(url:any, token:any,title:any,desc:any,username:any,position:any,pic:any,name:any) => {
          // console.log(url,'6u6iu67iuiuiti')
          // console.log(name,'6u6iu67iuiuiti')
          // console.log(desc,'rgtreyrewyreyweywsF')
          // console.log(pic,'tey54u6565ieutudrusya')
          // console.log(title,'gregrthtrht')
          // console.log(username,'tey54u6565ieutudrusya')
          // console.log(position,'gregrthtrht')
          //@ts-ignore
          var blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
                       var matches = pic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                       var type = matches[1];
                       //@ts-ignore
                       var buffer = new Buffer.from(matches[2], 'base64');
                       const containerName = 'candidate';
                       const blobName = name
                       //@ts-ignore
                       blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
                          if (error) {
                              console.log(error);
                           }else{
                          console.log(result)
                         }
                       });
                       var startDate = new Date();
                      startDate.setMinutes(startDate.getMinutes() - 5);
                      var expiryDate = new Date(startDate);
                      expiryDate.setMinutes(startDate.getMinutes() + 60);
          
                      var sharedAccessPolicy = {
                         AccessPolicy: {
                         Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
                         Start: startDate,
                         Expiry: expiryDate
                      }
                    };
                    console.log(sharedAccessPolicy,'iiii')
                    //@ts-ignore
                    var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
                    var response = {};
                    //@ts-ignore
                    response.image = blobService.getUrl(containerName,blobName,sasToken);
                    //@ts-ignore
                    console.log(response.image)
    
    
                  const Data = {
                          fields:{
                            Title:title,
                            Description:desc,
                            UserName:username,
                            Position: position,
                            //@ts-ignore
                            profileUrl:response.image,
                                                
                          }
                        } 
              try {
                const response = await fetch(url, {
                 method: 'POST',
                 headers: {
                  'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json'
                   },
                   body:JSON.stringify(Data) 
                 });
                 const data = await response.json();
              // enter you logic when the fetch is successful
                //  console.log(data);
                return data
               } catch(error) {
             // enter your logic for when there is an error (ex. error toast)
        
                  console.log(error)
                 } 
            }
            const createPostRequsetNews =  async(url:any, token:any,title:any,desc:any,pic:any,name:any) => {
              // console.log(url,'6u6iu67iuiuiti')
              // console.log(name,'6u6iu67iuiuiti')
              // console.log(desc,'rgtreyrewyreyweywsF')
              // console.log(pic,'tey54u6565ieutudrusya')
              // console.log(title,'gregrthtrht')
              // console.log(username,'tey54u6565ieutudrusya')
              // console.log(position,'gregrthtrht')
              //@ts-ignore
              var blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
                           var matches = pic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                           var type = matches[1];
                           //@ts-ignore
                           var buffer = new Buffer.from(matches[2], 'base64');
                           const containerName = 'candidate';
                           const blobName = name
                           //@ts-ignore
                           blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
                              if (error) {
                                  console.log(error);
                               }else{
                              console.log(result)
                             }
                           });
                           var startDate = new Date();
                          startDate.setMinutes(startDate.getMinutes() - 5);
                          var expiryDate = new Date(startDate);
                          expiryDate.setMinutes(startDate.getMinutes() + 60);
              
                          var sharedAccessPolicy = {
                             AccessPolicy: {
                             Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
                             Start: startDate,
                             Expiry: expiryDate
                          }
                        };
                        console.log(sharedAccessPolicy,'iiii')
                        //@ts-ignore
                        var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
                        var response = {};
                        //@ts-ignore
                        response.image = blobService.getUrl(containerName,blobName,sasToken);
                        //@ts-ignore
                        console.log(response.image)
        
        
                      const Data = {
                              fields:{
                                Title:title,
                                Description:desc,
                                //@ts-ignore
                                newsUrl:response.image
                                                    
                              }
                            } 
                  try {
                    const response = await fetch(url, {
                     method: 'POST',
                     headers: {
                      'Authorization': `Bearer ${token}`,
                       'Content-Type': 'application/json'
                       },
                       body:JSON.stringify(Data) 
                     });
                     const data = await response.json();
                  // enter you logic when the fetch is successful
                    //  console.log(data);
                    return data
                   } catch(error) {
                 // enter your logic for when there is an error (ex. error toast)
            
                      console.log(error)
                     } 
                }

                const createPostRequsetEmp =  async(url:any, token:any,title:any,name:any,dept:any,pic:any,picname:any) => {
                  // console.log(url,'6u6iu67iuiuiti')
                  // console.log(token,'thtyjytjyjyjyj')
                  // console.log(name,'6u6iu67iuiuiti')
                  // console.log(picname,'rgtreyrewyreyweywsF')
                  // console.log(pic,'tey54u6565ieutudrusya')
                  // console.log(title,'gregrthtrht')
                  // console.log(dept,'tey54u6565ieutudrusya')
                  // console.log(position,'gregrthtrht')
                  //@ts-ignore
                  var blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
                               var matches = pic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                               var type = matches[1];
                               //@ts-ignore
                               var buffer = new Buffer.from(matches[2], 'base64');
                               const containerName = 'candidate';
                               const blobName = picname
                               //@ts-ignore
                               blobService.createBlockBlobFromText(containerName,blobName, buffer, {contentType:type}, function(error, result, response) {
                                  if (error) {
                                      console.log(error);
                                   }else{
                                  console.log(result)
                                 }
                               });
                               var startDate = new Date();
                              startDate.setMinutes(startDate.getMinutes() - 5);
                              var expiryDate = new Date(startDate);
                              expiryDate.setMinutes(startDate.getMinutes() + 60);
                  
                              var sharedAccessPolicy = {
                                 AccessPolicy: {
                                 Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
                                 Start: startDate,
                                 Expiry: expiryDate
                              }
                            };
                            console.log(sharedAccessPolicy,'iiii')
                            //@ts-ignore
                            var sasToken = blobService.generateSharedAccessSignature(containerName, blobName,sharedAccessPolicy);
                            var response = {};
                            //@ts-ignore
                            response.image = blobService.getUrl(containerName,blobName,sasToken);
                            //@ts-ignore
                            console.log(response.image)
            
            
                          const Data = {
                                  fields:{
                                    Title: title,
                                    EmployeeTitle:name,
                                    Dept:dept,
                                    //@ts-ignore
                                    empUrl:response.image
                                                        
                                  }
                                } 
                      try {
                        const response = await fetch(url, {
                         method: 'POST',
                         headers: {
                          'Authorization': `Bearer ${token}`,
                           'Content-Type': 'application/json'
                           },
                           body:JSON.stringify(Data) 
                         });
                         const data = await response.json();
                      // enter you logic when the fetch is successful
                        //  console.log(data);
                        return data
                       } catch(error) {
                     // enter your logic for when there is an error (ex. error toast)
                
                          console.log(error)
                         } 
                    }
                    
                    const createPostRequsetUserQuickLink =  async(url:any, token:any,user:any,globalId:any) => {
                       console.log(url,'6u6iu67iuiuiti')
                      // console.log(token,'thtyjytjyjyjyj')
                      console.log(user,'6u6iu67iuiuiti')
                      console.log(globalId,'rgtreyrewyreyweywsF')
                      // console.log(pic,'tey54u6565ieutudrusya')
                      // console.log(title,'gregrthtrht')
                      // console.log(dept,'tey54u6565ieutudrusya')
                      // console.log(position,'gregrthtrht')
                   
                
                              const Data = {
                                      fields:{
                                        Title: user.Title,
                                        Url:user.Url,
                                        UserEmail:user.UserEmail,
                                       'GlobalQuickLinksLookupId@odata.type': "Collection(Edm.Int32)",
                                       GlobalQuickLinksLookupId: [globalId]
                                        // GlobalQuickLinksLookupId: globalId                
                                      }
                                    } 
                          try {
                            const response = await fetch(url, {
                             method: 'POST',
                             headers: {
                              'Authorization': `Bearer ${token}`,
                               'Content-Type': 'application/json'
                               },
                               body:JSON.stringify(Data) 
                             });
                             const data = await response.json();
                          // enter you logic when the fetch is successful
                            //  console.log(data);
                            return data
                           } catch(error) {
                         // enter your logic for when there is an error (ex. error toast)
                    
                              console.log(error)
                             } 
                        }

      const global   =   (url:any,token:any,GId:any) =>{
        // const listG = {
        //         //  GlobalQuickLinksId :  GId
        //         fields: {
        //           //  Title: "Qwerty1",
        //           // GlobalQuickLinksId :  GId
        //           'GlobalQuickLinksLookupId@odata.type': "Collection(Edm.Int32)",
        //           GlobalQuickLinksLookupId: GId
        //         }
          
        //         // GlobalQuickLinksId: 1/s*{"results":["1","2"] }*/
          
        //       }
        //       try {
        //         const response = await fetch(url, {
        //          method: 'PATCH',
        //          headers: {
        //           'Authorization': `Bearer ${token}`,
        //            'Content-Type': 'application/json'
        //            },
        //            body:JSON.stringify(listG) 
        //          });
        //          const data = await response.json();
        //       // enter you logic when the fetch is successful
        //         //  console.log(data);
        //         return data
        //        } catch(error) {
        //      // enter your logic for when there is an error (ex. error toast)
        
        //           console.log(error)
        //          } 

        const listG = {
                //  GlobalQuickLinksId :  GId
                fields: {
                   Title: "Qwerty1grgrt",
                  // GlobalQuickLinksId :  GId
                  // 'GlobalQuickLinksLookupId@odata.type': "Collection(Edm.Int32)",
                   GlobalQuickLinksLookupId: GId
                }
          
                // GlobalQuickLinksId: 1/s*{"results":["1","2"] }*/
          
              }
              // function postItem() {
                let axiosConfig = {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                };
          
                axios.patch(url, listG, axiosConfig)
                  .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    console.log(res.data)
                  })
                  .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                  })
          
              // }
              // postItem();
              
      }

const getPostData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {accessToken} = req.headers.authorization
   console.log(req.headers.authorization,'tttttttvvvvvtttttttyy')
   const  token = req.headers.authorization
//  var d = JSON.parse(req.headers.authorization)
//  console.log(d,'juuju')
  // const {token} = req.params
  const {
    // token,
    title,desc,
        // eventtitle,eventdesc, 
        //  eventdate,enddate,herotitle, heropic,
        //  picname,ceotitle,ceodesc,ceousername,
        //  ceoposition,ceopic,ceopicname,
        //  newstitle,newsdesc,newspic,newspicname,
        //  employyetitle, empname,empdept,emppic,emppicname,
        //  userquicklink,globalquicklink
        } = req.body
  // console.log(token,'llll')
  console.log(title,'ytjytjytjty')
  console.log(desc,'thgtrhj67k87k87k87k87')
  // console.log(userquicklink,'thgtrhj67k87k87k87k87')
  //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
    // if(token && title ){
    const Announcement = await createPostRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${AnnouncementId}/items`, token,title,desc )
    console.log(Announcement,'hyj8k87kvxvzx87k87')
    res.status(200).json({
      // success: true,
      Announcement
   
    });
  // }
  // if(token && eventtitle && eventdesc && enddate ){
  //    const Event = await createPostRequsetEvent(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items`, token,eventtitle,eventdesc,eventdate,enddate )
  //    console.log(Event,'hyjgrgrehtrhtrh8k87kvxvzx87k87')
  //    res.status(200).json({
  //     // success: true,
  //     Event
 
  //    });


  // }
  //  if(token && herotitle && heropic  && picname ){
  //    const Hero = await createPostRequsetHero(`${BASE_PATH}/${REMO_SITE_ID}/lists/${HeroImage_Id}/items`, token,herotitle,heropic,picname )
  //    console.log(Hero,'h7kvxvzx87k87')
  //    res.status(200).json({
  //     // success: true,
  //    Hero
 
  //    });
  
  // }
  // if( token && ceotitle && ceodesc && ceousername && ceoposition && ceopic && ceopicname){
  //    const Ceo = await createPostRequsetCeo(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Ceo_Message}/items`, token,ceotitle,ceodesc,ceousername,ceoposition,ceopic,ceopicname )
  //    console.log(Ceo,'h7kvxvzx8dgfgfdghth7k87')
  //    res.status(200).json({
  //    // success: true,
  //    Ceo
 
  //   });


  // }
  // if(token && newstitle && newsdesc && newspic && newspicname){
  //    const News =  await createPostRequsetNews(`${BASE_PATH}/${REMO_SITE_ID}/lists/${News_Id}/items`, token,newstitle,newsdesc,newspic,newspicname)
  //    console.log(News,'tjyjytjytjytjytjytjyj')
  //    res.status(200).json({
  //     // success: true,
  //     News
 
  //    });
  // //    req.body = dataFiles
  // //    res.send(req.body)
  // //    sendData(dataFiles)
  // // res.status(200).json({
  // //   // success: true,
  // //   Announcement
 
  // // });
  // }
  // if(token && employyetitle && empname && empdept && emppic && emppicname){
  //    const Employee = await createPostRequsetEmp(`${BASE_PATH}/${REMO_SITE_ID}/lists/${EmpHighlights}/items`, token,employyetitle,empname,empdept,emppic,emppicname)
  //    console.log(Employee,'tththtrhtrhyjyjyj')
  //    res.status(200).json({
  //      // success: true,
  //     Employee

  //     });
  // }
  // if( token && userquicklink && globalquicklink){
  // const UserQuickLink = await createPostRequsetUserQuickLink(`${BASE_PATH}/${REMO_SITE_ID}/lists/${NewQuickLinkUser}/items`, token,userquicklink,globalquicklink)
  // console.log(UserQuickLink,'ttryjyju7k76k76k')
  // res.status(200).json({
  //   // success: true,
  //   UserQuickLink

  //  });

  // }
  // if( token  && globalquicklink ){
  // const Global =  global(`${BASE_PATH}/${REMO_SITE_ID}/lists/${NewQuickLinkUser}/items/1`,token,globalquicklink)
  //  console.log(Global,'ththtfbfbthyjujkukillolololhtr')
  //  res.status(200).json({
  //   // success: true,
  //   Global

  //  });

  
  // }
 }

})


const postEventData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization,'tttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {
    // token,
    eventtitle,eventdesc,eventdate,enddate} = req.body
  // console.log(token,'llll')
  console.log(eventtitle,'ytjytjytjty')
  console.log(eventdesc,'thgtrhj67k87k87k87k87')
  console.log(eventdate,'thgtrhj67k87k87k87k87')
   console.log(enddate,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
    
  // if(token && eventtitle && eventdesc && enddate ){
     const Event = await createPostRequsetEvent(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items`, token,eventtitle,eventdesc,eventdate,enddate )
     console.log(Event,'hyjgrgrehtrhtrh8k87kvxvzx87k87')
     res.status(200).json({
      // success: true,
      Event
 
     });


  // }
 
 }

})

const postHeroData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization,'tccccttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {
    // token,
          herotitle, heropic, picname
          // ceotitle,ceodesc,ceousername,
        //  ceoposition,ceopic,ceopicname,
        //  newstitle,newsdesc,newspic,newspicname,
        //  employyetitle, empname,empdept,emppic,emppicname,
        //  userquicklink,globalquicklink
        } = req.body
  console.log(token,'llll')
  console.log(herotitle,'ytjytjytjty')
  console.log(picname,'thgtrhj67k87k87k87k87')
  // console.log(userquicklink,'thgtrhj67k87k87k87k87')
  //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
   
  
  //  if(token && herotitle && heropic  && picname ){
     const Hero = await createPostRequsetHero(`${BASE_PATH}/${REMO_SITE_ID}/lists/${HeroImage_Id}/items`, token,herotitle,heropic,picname )
     console.log(Hero,'h7kvxvzx87k87')
     res.status(200).json({
      // success: true,
     Hero
 
     });
  
  // }
  
  
 }

})

const postCeoData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization,'tssccccttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {
    // token,
       ceotitle,ceodesc,ceousername, ceoposition,ceopic,ceopicname,
       
        } = req.body
  console.log(token,'llll')
  // console.log(title,'ytjytjytjty')
  // console.log(desc,'thgtrhj67k87k87k87k87')
  // console.log(userquicklink,'thgtrhj67k87k87k87k87')
  //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
   
 
  
  // if( token && ceotitle && ceodesc && ceousername && ceoposition && ceopic && ceopicname){
     const Ceo = await createPostRequsetCeo(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Ceo_Message}/items`, token,ceotitle,ceodesc,ceousername,ceoposition,ceopic,ceopicname )
     console.log(Ceo,'h7kvxvzx8dgfgfdghth7k87')
     res.status(200).json({
     // success: true,
     Ceo
 
    });


  // }
  
 
  
 
 }

})

const postNewsData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization,'tssccccttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {
    // token,
        //  title,desc,
        // eventtitle,eventdesc, 
        //  eventdate,enddate,herotitle, heropic,
        //  picname,ceotitle,ceodesc,ceousername,
        //  ceoposition,ceopic,ceopicname,
         newstitle,newsdesc,newspic,newspicname,
        //  employyetitle, empname,empdept,emppic,emppicname,
        //  userquicklink,globalquicklink
        } = req.body
  // console.log(token,'llll')
  // console.log(title,'ytjytjytjty')
  // console.log(desc,'thgtrhj67k87k87k87k87')
  // console.log(userquicklink,'thgtrhj67k87k87k87k87')
  //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
    
  // if(token && newstitle && newsdesc && newspic && newspicname){
     const News =  await createPostRequsetNews(`${BASE_PATH}/${REMO_SITE_ID}/lists/${News_Id}/items`, token,newstitle,newsdesc,newspic,newspicname)
     console.log(News,'tjyjytjytjytjytjytjyj')
     res.status(200).json({
      // success: true,
      News
 
     });
  
  
  
 }

})

const postEmpData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization,'tssccccttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {
    // token,
       
        employyetitle, empname,empdept,emppic,emppicname,
        //  userquicklink,globalquicklink
        } = req.body
  // console.log(token,'llll')
  // console.log(title,'ytjytjytjty')
  // console.log(desc,'thgtrhj67k87k87k87k87')
  // console.log(userquicklink,'thgtrhj67k87k87k87k87')
  //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
   
 
 
 
  // if(token && employyetitle && empname && empdept && emppic && emppicname){
     const Employee = await createPostRequsetEmp(`${BASE_PATH}/${REMO_SITE_ID}/lists/${EmpHighlights}/items`, token,employyetitle,empname,empdept,emppic,emppicname)
     console.log(Employee,'tththtrhtrhyjyjyj')
     res.status(200).json({
       // success: true,
      Employee

      });
  // }
 
 
 }

})

const postUserQuicklinkData = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization,'tssccccttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {
    // token,
          // title,desc,
        // eventtitle,eventdesc, 
        //  eventdate,enddate,herotitle, heropic,
        //  picname,ceotitle,ceodesc,ceousername,
        //  ceoposition,ceopic,ceopicname,
        //  newstitle,newsdesc,newspic,newspicname,
        //  employyetitle, empname,empdept,emppic,emppicname,
         userquicklink,globalquicklink
        } = req.body
  // console.log(token,'llll')
  // console.log(title,'ytjytjytjty')
  // console.log(desc,'thgtrhj67k87k87k87k87')
  // console.log(userquicklink,'thgtrhj67k87k87k87k87')
  //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
  // console.log(empname,'tey54u6565ieutudrusya')
  // console.log(empdept,'gregrthtrht')
  // console.log(emppicname,'gregrthtrht')
  if(!token ){
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

  }else {
   
 
  
  
  
  // if( token && userquicklink && globalquicklink){
  const UserQuickLink = await createPostRequsetUserQuickLink(`${BASE_PATH}/${REMO_SITE_ID}/lists/${NewQuickLinkUser}/items`, token,userquicklink,globalquicklink)
  console.log(UserQuickLink,'ttryjyju7k76k76k')
  res.status(200).json({
    // success: true,
    UserQuickLink

   });

  // }
  // if( token  && globalquicklink ){
  // const Global =  global(`${BASE_PATH}/${REMO_SITE_ID}/lists/${NewQuickLinkUser}/items/1`,token,globalquicklink)
  //  console.log(Global,'ththtfbfbthyjujkukillolololhtr')
  //  res.status(200).json({
  //   // success: true,
  //   Global

  //  });

  
  // }
 }

})

export {
    // getData,
    // queryGraphApi
  //  getTokens,
  getPostData,
  postEventData,
  postHeroData,
  postCeoData,
  postNewsData,
  postEmpData,
  postUserQuicklinkData
}