import axios from 'axios'
import express, { Request, Response } from "express";
import azure from 'azure-storage';
require('dotenv').config();
import fetch from 'node-fetch'
import asyncHandler from './../../middleware/asyncHandler'
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`
const Site_Id = 'tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43'
const heroBannerDriveId ="b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikNSXwtOP-0VTpmA2oOYWlnu"
const heroId ="0ec4e29a-d2ec-4835-a011-ea8a3fe33ed4"
const  AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=remoblobstorage;AccountKey=2dyNCBrGp/3St5coni+Xca3mFbQA67byG6qnp81UjypSK65msMG461kPruQ/Vr0EaZS0qk9y7dxewDnnb3kcxQ==;EndpointSuffix=core.windows.net"
function blobStorage(image: any, imageName: any) {
  //@ts-ignore
  var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
  var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if(matches !== null){
  var type = matches[1];
  //@ts-ignore
  var buffer = new Buffer.from(matches[2], 'base64');
  const containerName = 'candidate';
  const blobName = imageName
  //@ts-ignore
  blobService.createBlockBlobFromText(containerName, blobName, buffer, { contentType: type }, function (error, result, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(result)
    }
  });
  var startDate = new Date();
  startDate.setMinutes(startDate.getMinutes() - 300);
  var expiryDate = new Date(startDate);
  // expiryDate.setMinutes(startDate.getMinutes() + 300);
  expiryDate.setMonth(startDate.getMonth() + 12);
  var sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
      Start: startDate,
      Expiry: expiryDate
    }
  };
  console.log(sharedAccessPolicy, 'iiii')
  //@ts-ignore
  var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
  var response = {};
  //@ts-ignore
  response.image = blobService.getUrl(containerName, blobName, sasToken);
  //@ts-ignore
  console.log(response.image)

  //@ts-ignore
  return response.image
  }
}

const postheroBanner = asyncHandler(async(req:Request, res:Response) => {
    // console.log(req.headers.authorization,'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')
    // console.log(req.headers.authorization, 'tccccttddddttttvvvvvtttttttyy')
  const token = req.headers.authorization
  const {
    title,
    description,
    ExpiresOn,
    Time,
    WbU,
    isActive,
    EnableLikes,
    EnableCommands,
    SharedAsEmail,
    RecipientEmail,
    Attachment,
    // Attachmentname,
    isDraft
  } = req.body
   console.log( title,'hh')
  console.log(  description)
  console.log( ExpiresOn)
   console.log( Time)
   console.log( WbU)
   const exten = WbU.split('.').pop();
  
  console.log(  RecipientEmail)
  console.log(  Attachment)
    // console.log(Attachmentname)
    console.log(isActive)
    console.log(  EnableLikes)
    console.log(  EnableCommands)
    console.log(  SharedAsEmail)
    console.log(  isDraft)
    // const File = blobStorage(Attachment, Attachmentname)
    //  console.log(File, 'tththththth')
    if(!token ){
 
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
      
        }else {
           console.log('rttrhtrhj7j7kukssss')
          const Data = {
            fields: {
              Title: title,
              Description:description,
              Url:WbU,
              FileType:exten,
              isActive:isActive,
              EnableLikes:EnableLikes,
              EnableCommands:EnableCommands,
              ShareAsEmail:SharedAsEmail,
              ExpiresOn:ExpiresOn,
               Time:Time,
               RecipentEmail:RecipientEmail,
               Attachment:Attachment,
               isDraft:isDraft
      
             
            }
          }
          try {
            const response = await fetch(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/0ec4e29a-d2ec-4835-a011-ea8a3fe33ed4/items`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(Data)
            });
            const data = await response.json();
            // enter you logic when the fetch is successful
            console.log(data);
            // return data
          } catch (error) {
            // enter your logic for when there is an error (ex. error toast)
      
            console.log(error)
          }
          res.status(200).json({
            success: true,
             response:`Sucessfully Created` 
      
         });
        }
        
   
    
  
    
    
  
  })
  
  export {
    postheroBanner
  }