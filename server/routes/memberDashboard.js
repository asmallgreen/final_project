import express from 'express'
const router = express.Router()
import 'dotenv/config.js'
import pool from '../config/db.js';

import moment from 'moment';

import { getMemberOrder,getProductOrder,getCourseOrder } from '../models/member-order.js'

//測試路由
router.get('/', function (req, res) {
    res.send('member home page!');
});

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
        //執行查詢
        const [rows] = await pool.query(sql, [memberId]);
    
        return res.json({
          message: 'search success',
          code: '200',
          memberCoupon: rows,
        });
      } catch (error) {
        console.error('獲取會員優惠券資料錯誤', error);
        return res.status(500).json({
          message: 'search error',
          code: '500',
        });
      }
});

//篩選出過期的UnValidcoupon
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
        const [rows] = await pool.query(sql, [memberId]);

        return res.json({
            message: "search success",
            code: "200",
            memberUnValidCoupon: rows
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
        const UnValidCouponResult = await pool.query(UnValidCouponSql, [memberId]);
        const UnValidCouponIds = UnValidCouponResult.map((row) => row.id);
        if (UnValidCouponIds.length > 0) {
            const deleteMemberCouponSql = `
                DELETE FROM member_coupon
                WHERE member_id = ? 
                AND coupon_id IN (?);
            `;
            await pool.query(deleteMemberCouponSql, [memberId, UnValidCouponIds]);
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

//尋找member已使用過的coupon
router.get('/FindUsedCoupon', async (req, res) => {
    const memberId = req.query.memberId;
    const UsedCouponSql = `
    SELECT 
    order_list.id AS order_id,
    order_list.member_id,
    order_list.coupon_id,
    order_list.subtotal,
    order_list.payment,
    coupon.name AS coupon_name,
    coupon.discount AS coupon_discount,
    coupon.type AS coupon_type,
    coupon.deadline AS coupon_deadline,
    coupon.valid AS coupon_valid
    FROM order_list
    JOIN coupon ON order_list.coupon_id = coupon.id
    WHERE order_list.member_id = ? AND order_list.coupon_id IS NOT NULL;
    `;
    const [rows] = await pool.query(UsedCouponSql, [memberId]);

    try {
        return res.json({
            message: "Find used coupons success",
            code: "200",
            UsedCoupons:rows
        });
    } catch (error) {
        console.error('搜尋已使用優惠券錯誤：', error);
        return res.status(500).json({
            message: "Find used coupons error",
            code: "500"
        });
    }    
});

router.get('/FindOrderCoupon', async (req, res) => {
    const memberId = req.query.memberId;
    const UsedCouponSql = `
    SELECT 
    order_list.order_id AS order_id,
    order_list.member_id,
    order_list.coupon_id,
    order_list.subtotal,
    order_list.payment,
    order_list.order_date,
    coupon.name AS coupon_name,
    coupon.discount AS coupon_discount,
    coupon.type AS coupon_type,
    coupon.deadline AS coupon_deadline,
    coupon.valid AS coupon_valid
    FROM order_list
    LEFT JOIN coupon ON order_list.coupon_id = coupon.id
    WHERE order_list.member_id = ? AND order_list.coupon_id <> 0;
`;
    const [rows] = await pool.query(UsedCouponSql, [memberId]);

    try {
        return res.json({
            message: "Find Order coupons success",
            code: "200",
            UsedCoupons:rows
        });
    } catch (error) {
        console.error('搜尋已使用優惠券錯誤：', error);
        return res.status(500).json({
            message: "Find Order coupons error",
            code: "500"
        });
    }    
});


router.get(`/FindMemberOrder`, async (req, res) => {
    const where = { member_id: req.query.memberId,status:'理貨中'};
    const ordersData = await getMemberOrder(where);

    //只取Date
    ordersData.forEach(order => {
        order.date = moment(order.order_date).format('YYYY-MM-DD');
    });

    try {
        return res.json({
            message: "Find member orders success",
            code: "200",
            ordersData
        });
    } catch (error) {
        console.error('DB搜尋會員訂單錯誤', error);
        return res.status(500).json({
            message: "Find member orders error",
            code: "500"
        });
    }    
});


router.get('/FindFinishedOrder', async (req, res) => {
    const where = { member_id: req.query.memberId,status:'已完成'};
    const finishedOrder = await getMemberOrder(where);

    //只取Date
    finishedOrder.forEach(order => {
        order.date = moment(order.order_date).format('YYYY-MM-DD');
    });

    try {
        return res.json({
            message: "Find member orders success",
            code: "200",
            finishedOrder
        });
    } catch (error) {
        console.error('DB搜尋會員訂單錯誤', error);
        return res.status(500).json({
            message: "Find member orders error",
            code: "500"
        });
    }    
});

router.get('/FindOrderDetail', async (req, res) => {
    const where = {order_id:req.query.orderId};
    const productOrderDetail = await getProductOrder(where);
    const courseOrderDetail = await getCourseOrder(where);

    try{
        return res.json({
            message: "Find order detail success",
            code: "200",
            productOrderDetail,
            courseOrderDetail
        });
    }catch (error){
        console.error('DB搜尋訂單詳情錯誤', error);
        return res.status(500).json({
            message: "Find order detail error",
            code: "500"
        });
    }

})


export default router