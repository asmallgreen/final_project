import express from "express";
const router = express.Router();
import 'dotenv/config.js'
import { executeQuery } from '../routes/database.js';

import { getCart, getOrder ,getMember} from '../models/cart.js'

router.post('/', async (req, res) => {

    const memberList = await getMember()
    const cartList = await getCart()

    return res.json({
        message: "search success",
        code: "200",
        cartList: cartList,
        memberList: memberList

    })

    
});

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

router.post('/addCartCourse' , async (req, res) => {

    const course = req.body
    const sql = `INSERT INTO course_cart (course_id,  quantity , price) VALUES (?, ?, ?)`
    try {
        const result = await executeQuery(sql, [course.course_id,  course.quantity, course.price]);
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

router.post('/addCartProduct' , async (req, res) => {

    const product = req.body
    const sql = `INSERT INTO product_cart (Product_id,  quantity , price) VALUES (?, ?, ?)`
    try {
        const result = await executeQuery(sql, [product.product_id,  product.quantity, product.price]);
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