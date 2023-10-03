import express from 'express'
const router = express.Router()

import 'dotenv/config.js'

import {
    getAllCoupon
} from "../models/member-coupon.js"



router.get('/', function (req, res) {
    res.send('member home page!');
});

router.get('/coupon', async (req, res) => {
    const CouponList = await getAllCoupon()
    return res.json({
        message:"search success",
        code:"200",
        CouponList
    })
});
// router.get('/order-list', function (req, res) {
//     res.send('member order-list page!');
// });
export default router