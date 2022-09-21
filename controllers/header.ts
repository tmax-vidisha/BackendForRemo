import axios from 'axios'
import express,{Request,Response} from "express";
import asyncHandler from '../middleware/asyncHandler'
import moment from 'moment';

const prayerTime =  asyncHandler(async(req:Request, res:Response) => {
    try {
      var currentDate = moment();
      const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/'${currentDate}'?address=Dubai,UAE&method=8&tune=2,3,4,5,2,3,4,5,-3`, {
        headers: {
            
            'Content-Type': 'application/json'
          
          }
        
    })
    const data = await response.data
    console.log(data)
    res.status(200).json({
      success: true,
      response :data.data
  
   });
    }catch(e){
      console.log(e)
    }
  })

export {
    prayerTime
}