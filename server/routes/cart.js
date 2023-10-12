import express from "express";
const router = express.Router();
import 'dotenv/config.js'
import pool from '../config/db.js';

import { getCart, getOrder, getMember } from '../models/cart.js'

const executeQuery = async (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// 老師版本
// router.post('/',  async (req, res) =>{
//     const cartList = await getCart()
//     return res.json({
//         message:"search success",
//         code:"200",
//         cartList
//     })
// });




// router.post('/', async (req, res) => {
//     const memberId = req.body.memberId

//     const sql = ` 
//     SELECT * FROM shopping_cart
//     WHERE member_id = ?
//     `
//     try {
//         const result = await executeQuery(sql , [memberId]);
//         const cartList = result
//         return res.json({
//             message: 'search success',
//             code: '200',
//             cartList
//         });

//     } catch (error) {
//         console.error('獲取會員購物車資料錯誤', error);
//         return res.status(500).json({
//             message: 'search error',
//             code: '500',
//         });

//     }

// });

router.post('/NewOrder', async (req, res) => {

    // const orderList = await getOrder()

    const payment = req.body.payment
    const sql = `INSERT INTO order_list (payment) VALUES (?)`
    try {
        const result = await executeQuery(sql, [payment]);
        const newOrder = result
        return res.json({
            message: "search success",
            code: "200",
            newOrder
        });
    } catch (error) {
        console.error('新增訂單錯誤', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }


});

router.post('/addCartCourse', async (req, res) => {

    const course = req.body
    const sql = `INSERT INTO shopping_cart (course_id) VALUES (?)`
    try {
        const result = await executeQuery(sql, [course.course_id]);
        const newCourse = result
        return res.json({
            message: "search success",
            code: "200",
            newCourse
        });
    } catch (error) {
        console.error('新增課程錯誤', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }
}
);

router.post('/addCartProduct', async (req, res) => {

    const product = req.body
    const sql = `INSERT INTO shopping_cart (Product_id,  quantity ) VALUES (?, ?)`
    try {
        const result = await executeQuery(sql, [product.product_id, product.quantity]);
        const newProduct = result
        return res.json({
            message: "search success",
            code: "200",
            newProduct
        });
    } catch (error) {
        console.error('新增課程錯誤', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }
}
);




export default router