import express from "express";
const router = express.Router();
import 'dotenv/config.js'
import pool from '../config/db.js';

import { getCart, getOrder, getMember } from '../models/cart.js'

// const executeQuery = async (sql, params=[] ) => {
    
//     return new Promise((resolve, reject) => {
//         pool.query(sql, params, (error, results) => {
//             if (error) {
//                 reject(error);
                
//             } else {
//                 resolve(results);
              
//             }
//         });
        
//     });
// };

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
  

    const sql = ` 
    SELECT * FROM shopping_cart
   WHERE member_id = ?
    `
    try {
        const [rows] = await pool.query(sql, [memberId]);
        const cartList = rows
        for (let i = 0 ; i < cartList.length ; i++){
            let eachProd = cartList[i]
            let prodId = eachProd.product_id
            let cate = eachProd.category_id
              
  let tables = [];
  switch (cate) {
    case 1:
      tables = ["bow_strength", "bow_meterial", "bow_length"];
      break;
    case 2:
      tables = ["arrow_strength", "arrow_meterial", "arrow_shaft"];
      break;
    case 3:
      tables = ["color", "size"];
      break;
      default:
        
  }
  if(tables.length == 0 ){
    continue   
  }
  const sql2 = ` 
  SELECT * FROM ${tables.toString()}
  WHERE 1=1
  /*getWhereCause(tables) */
 
  `
//   let condi = []
//   for(let j =0;j<tables.length;j++){
//     condi.push(prodId)
//   }

  const [rows] = await pool.query(sql2,[prodId]);
  
  eachProd.cartDtl = rows
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

function getWhereCause(table,cate){
    let sql = ""
    if(cate !== 1){
    for(let i = 0 ; i < table.length ; i++){
        sql += " AND "+table[i] + ".product_id = ?"  
    }
}
    return sql


}

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