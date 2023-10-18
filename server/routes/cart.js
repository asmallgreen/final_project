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



router.post('/', async (req, res) => {
    const memberId = req.body.memberId


    //     const sql = ` 
    //     SELECT * FROM shopping_cart
    //    WHERE member_id = ?
    //     `
    const sql = ` 
    SELECT
    (CASE WHEN shopping_cart.product_id IS NULL THEN course.name ELSE product.name END) AS name, 
    (CASE WHEN shopping_cart.product_id IS NULL THEN course.images ELSE product.img1 END) AS image ,
    (CASE WHEN shopping_cart.product_id IS NULL THEN course.price ELSE product.price END)AS price ,
    
    course.start_date,
    course.hour,
    course.location,
    teacher.name AS teacher_name,
    
    shopping_cart.id,
    shopping_cart.product_id,
    shopping_cart.course_id,
    shopping_cart.quantity,
    shopping_cart.product_detail,
    product.category_id
    
    FROM shopping_cart 
    LEFT JOIN product  ON shopping_cart.product_id = product.id
    LEFT JOIN course ON shopping_cart.course_id = course.id
    LEFT JOIN teacher ON course.teacher_id = teacher.id
  

    WHERE shopping_cart.member_id = ?
    `
    try {

        const rows = await pool.query(sql, [memberId]);
        const cartList = rows[0]
        // [[],[]]
        //[{},{},{}...]
        for (let i = 0; i < cartList.length; i++) {
            let eachProd = cartList[i]
            let prodId = eachProd.product_id
            let cate = eachProd.category_id
            let cateList = []
            let tables = [];
            switch (cate) {
                case 1:
                    tables = ["product_bow_meterial", "product_bow_length", "product_bow_strength"];
                    break;
                case 2:
                    tables = ["product_arrow_meterial", "product_arrow_length", "product_arrow_shaft"];
                    break;
                case 3:
                    tables = ["product_suit_size", "product_suit_color"];
                    break;
                default:
            }

            if (tables.length == 0) {
                continue
            }
            let sql2 = `
            SELECT name AS cate_name FROM product_attribute WHERE category_id = ? 
            `

            const [rows] = await pool.query(sql2, [cate]);
            cateList = rows


            for (let j = 0; j < tables.length; j++) {
                let tableName = tables[j]
                let temStr = tableName.replace("product_", "")

                const sql3 = ` 
                SELECT ${temStr}_id AS id ,${temStr}.name
                FROM ${tableName}
                JOIN ${temStr} ON ${tableName}.${temStr}_id = ${temStr}.id
                WHERE 1=1
                AND product_id = ? 
                `
                

                const [rows] = await pool.query(sql3, [prodId]);
                cateList[j]["data"] = rows
            }
            eachProd["cateList"] = cateList
            cartList[i] = eachProd
        }


        return res.json({
            message: 'search success',
            code: '200',
            cartList
        });

    } catch (error) {
        console.error('獲取會員購物車資料錯誤', error);
        return res.status(500).json({
            message: 'search error',
            code: '500',
        });

    }

});


router.post('/deleteCourseCart', async (req, res) => {
    const memberId = req.body.memberId
    const courseId = req.body.courseId

});

router.post('/deleteProductCart', async (req, res) => {


})

router.post('/MemberCoupon', async (req, res) => {
    const memberId = req.body.memberId
    const sql =
        `SELECT * 
    FROM member_coupon
    JOIN coupon ON member_coupon.coupon_id = coupon.id 
    WHERE member_id = ?
    AND status = "可使用" 
    `

    try {
        const result = await pool.query(sql, [memberId]);

        return res.json({
            message: "search success",
            code: "200",
            memberCoupon: result[0]
        })
    } catch (error) {
        console.error('無法取得會員優惠券', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }

});


router.post('/NewOrder', async (req, res) => {
    let targetDtl= "";

    ()=>{
        if(product.detail==[]){
            let targetDtl = req.body.items.product_detail
        }else{
            let targetDtl = row.body
        }
    }

    const row = req.body
    const sql = `INSERT INTO order_list (member_id,order_id,payment,order_date,subtotal,receive_name,receive_phone,receive_add,coupon_id) VALUES (?,?,?,?,?,?,?,?,?)`

    const sql2 = `INSERT INTO order_detail (order_id,product_id,course_id,quantity,price,product_detail1,product_detail2,product_detail3,img,name) VALUES (?,?,?,?,?,?,?,?,?,?)`

    const items = req.body.items
    try {
        const result = await pool.query(sql, [row.member_id, row.order_id, row.payment, row.order_date, row.subtotal, row.receive_name, row.receive_phone, row.receive_add, row.coupon_id]);
        const newOrder = result

        
        


        for (let i = 0; i < items.length; i++) {

            items[i].course_id == null ? items[i].course_id = 0 : items[i].course_id = items[i].course_id
            items[i].product_id == null ? items[i].product_id = 0 : items[i].product_id = items[i].product_id

            let prodDtl1 = null
            let prodDtl2 = null
            let prodDtl3 = null

            if(items[i].product_detail!=null){
            const prodDtl = items[i].product_detail
            const parts = prodDtl.split(',')
            prodDtl1 = parts[0]
            prodDtl2 = parts[1]
            prodDtl3 = parts[2]
            }


            const result3 = await pool.query(sql2, [row.order_id, items[i].product_id, items[i].course_id, items[i].quantity, items[i].price , prodDtl1, prodDtl2, prodDtl3,items[i].image,items[i].name])

            const newOrderDtl = result3

        }

        const result2 = await executeQuery(`DELETE FROM shopping_cart WHERE member_id = ?`, [row.member_id]);
        const deleteCart = result2
        
        return res.json({
            message: "search success",
            code: "200",
            newOrder,


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
    const sql = `INSERT INTO shopping_cart (course_id , quantity , member_id) VALUES (? , ?, ?)`
    try {
        const result = await pool.query(sql, [course.course_id, course.quantity, course.member_id]);
        const newCourse = result
        console.log('加入購物車成功')
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
    const sql = `INSERT INTO shopping_cart (product_id,  quantity ,member_id,product_detail) VALUES (?, ?, ?, ?)`
    try {
        const result = await pool.query(sql, [product.product_id, product.quantity, product.member_id,product.product_detail]);
        const newProduct = result
        console.log('加入購物車成功')
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