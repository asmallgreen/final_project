import express from 'express'
const router = express.Router()
import 'dotenv/config.js'
import { executeQuery } from '../routes/database.js';

// import { getCouponList } from '../models/coupon-list.js';

router.get('/', function (req, res) {
    res.send('member home page!');
});

//取得所有coupon
// router.get('/coupon-list', async (req, res) => {
//     const CouponList = await getCouponList()
//     return res.json({
//         message:"search success",
//         code:"200",
//         CouponList
//     })
// });

//讀取指定member的coupon資料
//table: member_coupon, coupon
router.get('/findMemberCoupon', async (req, res) => {
    const memberId = req.query.memberId
    const sql = `SELECT coupon.id, coupon.name, coupon.discount, coupon.type, coupon.deadline
    FROM member_coupon
    INNER JOIN coupon ON member_coupon.coupon_id = coupon.id
    WHERE member_coupon.member_id = ? 
    AND member_coupon.status = "可使用";`
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

//篩選出過期的coupon
router.get('/findUnValidCoupon', async (req, res) => {
    const memberId = req.query.memberId;
    const sql = `
    SELECT coupon.id, coupon.name, coupon.discount, coupon.type, coupon.deadline
    FROM member_coupon
    INNER JOIN coupon ON member_coupon.coupon_id = coupon.id
    WHERE member_coupon.member_id = ? 
    AND DATE(coupon.deadline) < CURDATE();`
    // CURDATE()是MySQL的日期函數，表示當前日期

    try {
        const result = await executeQuery(sql, [memberId]);
        const memberCoupon = result;

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

//刪除過期的coupon
router.get('/DeleteUnvalidCoupon', async (req, res) => {
    const memberId = req.query.memberId;
    const UnValidCouponSql = `
    SELECT coupon.id, coupon.name, coupon.discount, coupon.type, coupon.deadline
    FROM member_coupon
    INNER JOIN coupon ON member_coupon.coupon_id = coupon.id
    WHERE member_coupon.member_id = ? 
    AND DATE(coupon.deadline) < CURDATE();
    `;

    try {
        const UnValidCouponResult = await executeQuery(UnValidCouponSql, [memberId]);
        const UnValidCouponIds = UnValidCouponResult.map((row) => row.id);
        if (UnValidCouponIds.length > 0) {
            const deleteMemberCouponSql = `
                DELETE FROM member_coupon
                WHERE member_id = ? 
                AND coupon_id IN (?);
            `;
            await executeQuery(deleteMemberCouponSql, [memberId, UnValidCouponIds]);
        }

        return res.json({
            message: "Delete unvalid coupons success",
            code: "200",
            UnValidCouponIds
        });
    } catch (error) {
        console.error('刪除無效優惠券失敗：', error);
        return res.status(500).json({
            message: "Delete unvalid coupons error",
            code: "500"
        });
    }
});

export default router