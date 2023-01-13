import axios from 'axios'
import express, { Request, Response } from "express";
import azure from 'azure-storage';
require('dotenv').config();
import fetch from 'node-fetch'
import asyncHandler from './../../middleware/asyncHandler'
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

const postEmployee = asyncHandler(async (req: Request, res: Response) => {

    // console.log(req.body)
    // const {token} = req.params
    console.log(req.headers.authorization, 'tccccttddddttttvvvvvtttttttyy')
    const token = req.headers.authorization
    const {
        title,
        name,
        description,
        designation,
        isActive,
        dob,
        doj,
        EnableLikes,
        EnableCommands,
        SharedAsEmail,
        // RecipientEmail,
        image,
        imageName,
        isDraft
      } = req.body
    console.log(isActive, 'isActive')
    
     const Image = blobStorage(image, imageName)
    // const File = blobStorage1(Attachment, Attachmentname)
    console.log(Image, 'rtretrt')
    console.log(isActive)
    console.log(  EnableLikes)
    console.log(  EnableCommands)
    console.log(  SharedAsEmail)
    console.log(dob,'dob')
    console.log(doj,'doj')
    console.log(isDraft,'doj')
    //  console.log(File, 'tththththth')
    // //    console.log( title,imageName,isActive,EnableLikes,'ytjytjytjty')
    // console.log(description,'thgtrhj67k87k87k87k87')
        //  console.log(image,'thgtrhj67k87k87k87k87')
    //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
    // console.log(empname,'tey54u6565ieutudrusya')
    // console.log(empdept,'gregrthtrht')
    // console.log(emppicname,'gregrthtrht')
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
  
    } else {
        console.log('lllllllllllllllllllllllll')
      const Data = {
        fields: {
            Title:title,
            Name: name,
            Dept: designation,
            EmpImg: Image,
        //   Title: title,
          Description:description,
          DOB:dob,
          DOJ:doj,
          EnableLikes:EnableLikes,
          EnableCommands:EnableCommands,
          ShareAsEmail:SharedAsEmail,
         
          isActive:isActive,
          isDraft:isDraft
        //   Designation:designation,
         
  
  
          //@ts-ignore
          // heroUrl: response.image
        }
      }
      try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/2b3bb6db-7ba9-43e9-92b4-0216b80ef2fe/items`, {
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
  
  //     const response = 
  //     // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
  //       await axios.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/4d933ed8-bce3-4429-9af6-8e509eb6d2dc/items?$expand=fields`, {
  //       headers: {
  //           'Authorization': `Bearer ${token} `,
  //           'Content-Type': 'application/json'
          
  //         }
        
  //   })
  //   console.log(response.data.value,"meetingssssssssssssssssssssssss" )
  //   res.status(200).json({
  //     success: true,
  //     response :response.data.value
  
  //  });
  
    }
  
  })

  export {
    postEmployee
  }