import express from 'express'
const router = express.Router()
import 'dotenv/config.js'
import pool from '../config/db.js';


//測試路由
router.get('/', function (req, res) {
    res.send('cart home page!');
});

router.get('/addCart', async (req, res) => {
    res.send('addCart');
});

router.post('/sendOrder', async (req, res) => {
  const orderList = req.body.orderList;
  const productDetail = req.body.productDetail;
  const courseDetail = req.body.courseDetail;

  // console.log(productDetail)
  console.log(courseDetail)

  const OrderListSql = `
    INSERT INTO order_list(order_id, member_id, coupon_id, subtotal, payment, receive_name, receive_phone, receive_add, status) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  try {
    const [orderListRows] = await pool.execute(OrderListSql, [
      orderList.order_id,
      orderList.member_id,
      orderList.coupon_id,
      orderList.subtotal,
      orderList.payment,
      orderList.receive_name,
      orderList.receive_phone,
      orderList.receive_add,
      orderList.status,
    ]);

    // 檢查是否有產品
    if (productDetail && productDetail.length > 0) {
      const ProductDetailSql = `
        INSERT INTO order_product(order_id, product_id, product_name, detail_1, detail_2, detail_3, quantity, price) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

      // 迴圈INSERT
      for (const product of productDetail) {
        await pool.execute(ProductDetailSql, [
          orderList.order_id,
          product.product.id,
          product.product.name,
          product.product.detail_1,
          product.product.detail_2,
          product.product.detail_3,
          product.product.quantity,
          product.product.price,,
        ]);
      }
    }

    // 檢查是否有課程
    if (courseDetail && courseDetail.length > 0) {
      const CourseDetailSql = `
        INSERT INTO order_course(order_id, course_id, course_name, quantity, price) 
        VALUES (?, ?, ?, ?, ?);`;

      // 迴圈INSERT
      for (const course of courseDetail) {
        await pool.execute(CourseDetailSql, [
          orderList.order_id,
          course.course.id,
          course.course.name,
          course.course.quantity,
          course.course.price,
        ]);
      }
    }

    return res.json({
      message: 'DB add order success',
      code: '200',
      insertData: {
        orderList: orderListRows,
        productDetail: productDetail,
        courseDetail: courseDetail,
      },
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