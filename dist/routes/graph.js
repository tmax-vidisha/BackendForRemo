"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postdata_1 = require("../controllers/postdata");
// const { getData } = require("../controllers/graph");
// const createToken = require('../controllers/token')
const express_1 = require("express");
const router = (0, express_1.Router)();
// const RemoToken = require('../controllers/token');
// const { getTokens } = require("../controllers/graph");
// router.route('/lists').get(getData);
// console.log(createToken,'uuuuu')
// router.get("/",async (req, res, next) => {
//     try {
//         const response = await axios.get(`${BASE_PATH}/${REMOSITEID}/lists`,{
//             headers: {
//                         'Authorization': `Bearer ${RemoToken}`,
//                         'Content-Type': 'application/json'
//                       }
//         });
//         console.log(response.data);
//         res.send(response.data);
//     }
//     catch (err) {
//         next(err)
//     }
//     })
// router.route('/').get(getTokens)
router.route('/data').post(postdata_1.getPostData);
router.route('/eventdata').post(postdata_1.postEventData);
router.route('/herodata').post(postdata_1.postHeroData);
router.route('/ceodata').post(postdata_1.postCeoData);
router.route('/newsdata').post(postdata_1.postNewsData);
router.route('/empdata').post(postdata_1.postEmpData);
router.route('/userquicklinkdata').post(postdata_1.postUserQuicklinkData);
exports.default = router;
