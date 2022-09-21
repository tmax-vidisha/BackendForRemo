import axios from 'axios'
import express,{Request,Response} from "express";
// const qs = require('qs');
import fetch from'node-fetch'
// var multipart = require('connect-multiparty');  
// import upload from 'express-fileupload';
// import {upload} from “express-fileupload”;
// import * as XLSX from 'xlsx';
import xlsx from 'node-xlsx';
import moment from 'moment';
import { Document, Packer, Paragraph, TextRun } from "docx";
import PptxGenJS from 'pptxgenjs';
import asyncHandler from '../../middleware/asyncHandler'
import { Console } from 'console';
// import docx from 'docx';
const check ="https://graph.microsoft.com/v1.0/me/drive/root/children?$filter=startswith(name,'Agr.docx')"
// const { Document, Packer, Paragraph, TextRun } = docx;
const app = express();
// app.use(upload());
// app.use(express.urlencoded({ extended: true }));
// var multipartMiddleware = multipart({ maxFieldsSize: (20 * 1024 * 1024) });
// app.use(multipartMiddleware);

const uploadItemInOneDrive = asyncHandler(async(req:Request, res:Response) => {

    // console.log(req.body)
    // const {token} = req.params
    
    console.log(req.headers.authorization,'tssccccttddddttttvvvvvtttttttyy')
    const  token = req.headers.authorization
    const {  name } = req.body
    console.log(name,'gfhtht')
   


    if(!token ){
   
    return res.status(404).json({
        success: false,
        error: "No Token found"
    });
  
    }else {
        console.log('ooo')
        const valid = await fetch(
  
            //   `https://graph.microsoft.com/v1.0/me/drive/root:/${file}.xlsx:/content`,
    
            //https://graph.microsoft.com/v1.0/me/drive/root/children
    
           // `https://graph.microsoft.com/v1.0/me/drive/items/{parent-id}:/${file}.xlsx:/content`,
    
              `https://graph.microsoft.com/v1.0/me/drive/root/children?$filter=startswith(name,'${name}')`,
    
              {
    
                method: 'GET',
    
                headers: {
                  'Authorization': `Bearer ${token} `,
                  'Content-Type': 'application/json'
                
                }
    
              })
        const output = await valid.json();
        console.log(output.value,'lll')
        //@ts-ignore
       if (output.value?.length !== 0){
        console.log('full')
        res.status(409).json({
              success: true,
               response:`${name} file already exists`
        
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
    var buffer = xlsx.build([{name: '', data: data}]);
    

    //docx file
    const doc = new Document({
      sections: [{
          properties: {},
          children: [
              new Paragraph({}),
          ],
      }],
  });

  const b64string = await Packer.toBase64String(doc);
  const rrrr = Buffer.from(b64string, 'base64')


  //pptx  file
  let pres = new PptxGenJS();
  //@ts-ignore
  // const pptData = await pres.write( 'base64')
  // Ex using: `const app = express();``
const eeee = await pres.stream()
//@ts-ignore
const www = Buffer.from(eeee, "binary")

//Uploading docx to onedrive
    if (name.includes('.docx') && output.value?.length == 0){
      try {
      const result = await fetch(
          `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,

          {

            method: 'PUT',

            headers: {

              Authorization: `Bearer ${token}`,

           

            'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            // 'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",

           

            },
           //@ts-ignore
            body:rrrr

          })

        //   console.log(name,"upload excel file");

      //  console.log(result)
       const data = await result.json()
       console.log(data)
       if(data !== 0){
        // console.log(`${name} file is created`)
        res.status(201).json({
          success: true,
           response:`${name} file is created`
    
       });

       }
      }catch{
        res.status(404).json({
          success: false,
           response:`file not created`
    
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
    if (name.includes('.pptx') && output.value?.length == 0){
      try {
      const result = await fetch(

        
          `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,

          {

            method: 'PUT',

            headers: {

              Authorization: `Bearer ${token}`,

            
             'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",

            

            },
           //@ts-ignore
            body:www

          })

        //   console.log(name,"upload excel file");

      //  console.log(result)
       const data = await result.json();
      console.log(data)
      if(data !== 0){
        console.log(`${name} file is created`)
        res.status(201).json({
          success: true,
           response:`${name}  is created` 
    
       });
      }
     }catch{
      res.status(404).json({
        success: false,
         response:`file not created`
  
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
    if (name.includes('.xlsx') && output.value?.length == 0){
      try {
      const result = await fetch(

      
          `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,

          {

            method: 'PUT',

            headers: {

              Authorization: `Bearer ${token}`,

             

             'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

           

            },
           //@ts-ignore
            body:buffer

          })

        //   console.log(name,"upload excel file");

      //  console.log(result)
       const data =await result.json()
       if(data !== 0 ){
        res.status(201).json({
          success: true,
           response:`${name}  is created` 
    
       });
       }
      }catch{
        res.status(404).json({
          success: false,
           response:`file not created`
    
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
  
})

const getAllOneDriveItemsRoot = asyncHandler(async(req:Request, res:Response) => {
 console.log(req.headers.authorization,'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')

  // const  token = req.headers.authorization
 console.log(req.body)
   const {token} = req.params
  // //  const {token} = req.body
   console.log(token,'llll')
  // console.log(req.body,'gregrthtrht')
  if(!token ){
 
  return res.status(404).json({
      success: false,
      error: "No Token found"
  });

  }else {
    
    const response = 
    // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(`https://graph.microsoft.com/v1.0/me/drive/root/children`, {
      headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json'
        
        }
      
  })
  console.log(response.data.value,"root" )
  res.status(200).json({
    success: true,
    response :response.data.value

 });

  }
  

})
const getOneDriveItemChildren = asyncHandler(async(req:Request, res:Response) => {

  // console.log(req.body)
  // const {token} = req.params
  
  console.log(req.headers.authorization,'tssccccttddddttttvvvvvtttttttyy')
  const  token = req.headers.authorization
  const {  ItemId,Name } = req.body
  console.log(ItemId,Name,'gfhtht')
 


  if(!token ){
 
  return res.status(404).json({
      success: false,
      error: "No Token found"
  });

  }else {
     console.log('trytrtjtjytaxczc')
     if(ItemId ) {
     const response = 
    // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${ItemId}/children`, {
      headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json'
        
        }
      
  })
  console.log(response.data.value,"ItemChildren" )
  res.status(200).json({
    success: true,
    response :response.data.value

 });
 }
 else{
    
  const response = 
  // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
    await axios.get(`https://graph.microsoft.com/v1.0/me/drive/root/children`, {
    headers: {
        'Authorization': `Bearer ${token} `,
        'Content-Type': 'application/json'
      
      }
    
   } )
   console.log(response.data.value,"ItemChildren" )
  res.status(200).json({
    success: true,
    response :response.data.value

 });

 }

 }

})


export {
    uploadItemInOneDrive,
    getAllOneDriveItemsRoot,
    getOneDriveItemChildren
   
}