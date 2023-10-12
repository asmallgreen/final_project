import express from 'express'
const router = express.Router()

import 'dotenv/config.js'
import pool from '../config/db.js';
import { insertOne } from '../models/base.js';


//測試路由
router.get('/', function (req, res) {
    res.send('cart home page!');
});

router.get('/addCart', async (req, res) => {
    res.send('addCart');
});

router.post('/sendOrder', async (req, res) => {
    const orderList = req.body.orderList;
    const OrderListSql = `
    INSERT INTO order_list(member_id, coupon_id, subtotal, payment, receive_name, receive_phone, receive_add, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?);`
    try {
        const [rows] = await pool.execute(OrderListSql, [orderList.member_id, orderList.coupon_id, orderList.subtotal, orderList.payment, orderList.receive_name, orderList.receive_phone, orderList.receive_add, orderList.status]);
    
        return res.json({
          message: 'DB add order success',
          code: '200',
          insertData: rows,
        });
      } catch (error) {
        console.error('DB新增訂單錯誤', error);
        return res.status(500).json({
          message: 'add order error',
          code: '500',
        });
      }
});

export default router