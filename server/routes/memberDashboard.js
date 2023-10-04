import express from 'express'
const router = express.Router()
import 'dotenv/config.js'
import { executeQuery } from '../routes/database.js';

import { getCouponList } from '../models/coupon-list.js';

router.get('/', function (req, res) {
    res.send('member home page!');
});

// router.get('/coupon-list', async (req, res) => {
//     const CouponList = await getCouponList()
//     return res.json({
//         message:"search success",
//         code:"200",
//         CouponList
//     })
// });
router.get('/find-member-coupon', async (req, res) => {
    const memberId = req.query.memberId
    const sql = `SELECT coupon.id, coupon.name, coupon.discount, coupon.type, coupon.deadline
    FROM member_coupon
    INNER JOIN coupon ON member_coupon.coupon_id = coupon.id
    WHERE member_coupon.member_id = ?;`
    try {
        const result = await executeQuery(sql, [memberId]);
        const memberCoupon = result
        return res.json({
            message: "search success",
            code: "200",
            memberCoupon
        });
    } catch (error) {
        console.error('獲取會員優惠券資料錯誤', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }
});
export default router