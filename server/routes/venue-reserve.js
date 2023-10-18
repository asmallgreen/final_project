import express from 'express';
import { getAllVenueReserve } from '../models/venue-reserve.js';
import 'dotenv/config.js';
import pool from '../config/db.js';

const router = express.Router();


const executeQuery = async (sql, params = []) => {
    try {
        const results = await pool.query(sql, params);
        return results;
    } catch (error) {
        console.error('數據庫查詢錯誤：', error);
        throw error; // 重新拋出錯誤以便在路由處理程序中捕獲。
    }
};

router.get('/', async(req, res) => {
    // res.send('course');
    // sql 公式函數
    const allVenueReserve = await getAllVenueReserve();
    console.log(allVenueReserve);
    res.json({
        message:'success to get all course',
        code:'200',
        allVenueReserve,
    })
})

router.post('/', async (req, res) => {

    const venue_reserve = req.body

    console.log(req.body);

    // return res.json({
    //     message: "success now",
    //     code: "200"
    // });

    const sql = "INSERT INTO venue_reserve (date_1, date_2, date_3, date_4, date_5, member_id, rental_duration, reserve_name, reserve_email, reserve_phone, price, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try {
        const result = await executeQuery(sql, [req.body.date_1, req.body.date_2, req.body.date_3, req.body.date_4, req.body.date_5, req.body.member_id, req.body.rental_duration, req.body.reserve_name, req.body.reserve_email, req.body.reserve_phone, req.body.price, req.body.created_at]);

        const newReserve = result
        return res.json({
            message: "search success",
            code: "200",
            newReserve
        });
    } catch (error) {
        console.error('db新增預約錯誤', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }
}
);

export default router;