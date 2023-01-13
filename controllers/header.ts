import axios from 'axios'
import express, { Request, Response } from "express";
import asyncHandler from '../middleware/asyncHandler'
import moment from 'moment';
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const REMO_SITE_ID = "tmxin.sharepoint.com,1649e6fd-df59-4f03-8e4b-4d765864f406,d2634703-c0cd-42f6-bfb5-c60555dbcb7d"
const Country = "349451e0-0650-4b93-ba94-600714abcdf0"




const prayerTime = asyncHandler(async (req: Request, res: Response) => {
  try {
    var currentDate = moment(new Date()).format("DD-MM-YYYY");
    let CurrentTime:any = moment(new Date()).format("HH:mm");
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/'${currentDate}'?address=Dubai,UAE&method=8&tune=2,3,4,5,2,3,4,5,-3`, {
      headers: {

        'Content-Type': 'application/json'

      }

    })
    const data = await response.data
    // console.log(data.data.timings)
  
    
    res.status(200).json({
      success: true,
      response: data.data.timings

    });
  } catch (e) {
    console.log(e)
  }
})

const getCurrency = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')

  // const  token = req.headers.authorization
  // console.log(req.body)
  const { token } = req.params
  //  const {token} = req.body
  console.log(token, 'llll')
  // console.log(req.body,'gregrthtrht')
  if (!token) {

    return res.status(404).json({
      success: false,
      error: "No Token found"
    });

  } else {

    const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Country}/items?$expand=fields`, {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json'

        }

      })
    console.log(response.data.value, "meetingssssssssssssssssssssssss")
    res.status(200).json({
      success: true,
      response: response.data.value

    });

  }


})

const getAmount = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')

  const token = req.headers.authorization
  // console.log(req.body)
  // const {token} = req.params
  //  const {token} = req.body
  console.log(token, 'llll')
  // console.log(req.body,'gregrthtrht')
  const { Contrycode } = req.body
  console.log(Contrycode,'rrrr77i7i')
  try {
    var currentDate = moment();
    const response = await axios.get(`https://api.exchangerate.host/convert?from=AED&to=${Contrycode}&amount=1`, {
      headers: {

        'Content-Type': 'application/json'

      }

    })
    const data = await response.data
    console.log(data)
    res.status(200).json({
      success: true,
      response: data

    });
  } catch (e) {
    console.log(e)
  }

})

const getUnReadEmails = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')

  // const  token = req.headers.authorization
  // console.log(req.body)
  const { token } = req.params
  //  const {token} = req.body
  console.log(token, 'llll')
  // console.log(req.body,'gregrthtrht')
  if (!token) {

    return res.status(404).json({
      success: false,
      error: "No Token found"
    });

  } else {

    const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(`https://graph.microsoft.com/v1.0/me/mailFolders/Inbox?$select=unreadItemCount`, {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json'

        }

      })
    console.log(response.data, "UncountEmails")
    res.status(200).json({
      success: true,
      response: response.data

    });

  }


})


const getWeather = asyncHandler(async (req: Request, res: Response) => {
  try {
   
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=4745d1a343b849d58a7104337211904&q=Dubai&aqi=no`, {
      headers: {

        'Content-Type': 'application/json'

      }

    })
    const data = await response.data
    console.log(data)
    res.status(200).json({
      success: true,
      response: data

    });
  } catch (e) {
    console.log(e)
  }
})
const getMeetingsUnCount = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')

  // const  token = req.headers.authorization
  // console.log(req.body)
  const { token } = req.params
  //  const {token} = req.body
  console.log(token, 'llll')
  // console.log(req.body,'gregrthtrht')
  if (!token) {

    return res.status(404).json({
      success: false,
      error: "No Token found"
    });

  } else {
    var td = moment().format('YYYY-MM-DD');
    var enddate = moment(td).add(30, "days").format("YYYY-MM-DD");
    const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get('https://graph.microsoft.com/v1.0/me/calendarview?startdatetime='+td+'&enddatetime='+enddate+'&$orderBy=end/dateTime', {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json'

        }

      })
    console.log(response.data, "UnCountMeetings")
    res.status(200).json({
      success: true,
      response: response.data.value

    });

  }


})

const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy')

  // const  token = req.headers.authorization
  // console.log(req.body)
  const { token } = req.params
  //  const {token} = req.body
  console.log(token, 'llll')
  // console.log(req.body,'gregrthtrht')
  if (!token) {

    return res.status(404).json({
      success: false,
      error: "No Token found"
    });

  } else {

    const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(`https://graph.microsoft.com/oidc/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json'

        }

      })
    console.log(response.data, "UncountEmails")
    res.status(200).json({
      success: true,
      response: response.data

    });

  }


})

export {
  prayerTime,
  getCurrency,
  getAmount,
  getUnReadEmails,
  getWeather,
  getMeetingsUnCount,
  getUserInfo
}