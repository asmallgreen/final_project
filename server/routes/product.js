import express from "express";
import { executeQuery } from "../models/base.js";
import 'dotenv/config.js'
import pool from '../config/db.js';
import {
  // executeQuery,
  getAll,
  getNew,
  getFilter,
  getOne,
  searchProduct,
} from "../models/products.js";


const router = express.Router();



//***********產品頁************
router.get("/", async (req, res) => {
  const { limit, page, sort, attr } = req.query;
  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * limitValue;
  // 排序改order
  let sortValue;
  switch (sort) {
    case "default":
      sortValue = { id: "ASC" };
    case "hot":
      sortValue = { hot: "asc" };
      break;
    case "launched":
      sortValue = { launched: "asc" };
      break;
    case "priceAsc":
      sortValue = { price: "desc" };
      break;
    case "priceDesc":
      sortValue = { price: "asc" };
      break;
    case "nameAZ":
      sortValue = { name: "desc" };
      break;
  }
  // 篩選改where
  // let arrValue={category_id:1}
  let attrValue;
  switch (attr) {
    case "default":
      attrValue = "";
      break;
    case "attr1":
      attrValue = { category_id: 1 };
      break;
    case "attr2":
      attrValue = { category_id: 2 };
      break;
    case "attr3":
      attrValue = { category_id: 3 };
      break;
    case "attr4":
      attrValue = { category_id: 4 };
      break;
  }
  console.log(attrValue);
  // const where = {id:1}
  const alldata = await getAll();
  const newdata = await getNew();
  const filterdata = await getFilter(attrValue, sortValue, limitValue, offset);

  // const filterdata = await getFilter(where, sortValue, 5, 0);

  res.json({
    // arrow_length,
    message: "getAllProduct success",
    code: "200",
    filterdata,
    alldata,
    newdata,
  });
});

// ***********測試**************
router.get("/test", async (req, res) => {
  // /////////////////////////////////

  try {
    const cate = 2
    const sql = `SELECT a.product_id
    FROM product_arrow_length AS a
    WHERE a.arrow_length_id = 1
    ORDER BY a.product_id ASC`;
    const sql2 = `SELECT a.name
    FROM product_attribute AS a
    WHERE a.category_id = 1
    ORDER BY a.name ASC`;
    //執行查詢
    const [row1] = await pool.query(sql);
    // const product = row1.map((v)=>{v.product_id})
    // console.log(product);
    // const [row2] = await pool.query(sql2);

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
    }
    // console.log(tables);
    let sqls;
    sqls = tables.map((v) => {
      return `SELECT a.name FROM ${v} AS a`;
    });
    console.log(sqls);
    const queryPromises = sqls.map((sql) =>  pool.query(sql));
    
    // const attr = row2.map((v) => v);
    // console.log(row1);
    // const [row2] = await pool.query(sql2);
    return res.json({
      message: 'search success',
      code: '200',
      row1,
      queryPromises,
      // rows,
      // attr
    });
  } catch (error) {
    console.error('獲取會員優惠券資料錯誤', error);
    return res.status(500).json({
      message: 'search error',
      code: '500',
    });
  }




  // 從arrow_length資料表中找到arrow_length_id=1(EX:碳箭)的所有product_id值，並回傳成陣列
 
  // 從product_attr資料表抓到category_id=1(ex:弓)的所有nmae值，並回傳成陣列

  // const { rows } = await executeQuery(sql);
  let { rows } = await executeQuery(sql2);
  // { rows } = await executeQuery(sql1);
  // 將結果中的product_id取出變為一個純資料的陣列
  // const arrow_length = rows.map((v) => v.product_id);
  // console.log(arrow_length);
  const attr_name = rows.map((v) => v.name);

  // /////////////關聯資料表////////////////////
  res.json({ attr_name });
  // res.json({ alldata });
});



router.get("/:pid", async (req, res) => {
  // const { cate } = req.params.cateid;
  const id = req.params.pid;
  // const cate = req.params.cateid;
  // console.log( req.params.cateid);
  console.log(req.params.pid);

  const where = { id: id };
  const data = await getOne(where);
  const cate = data.category_id;
  console.log(cate);
  
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
  }
  console.log(tables);
  let sqls;
  sqls = tables.map((v) => {
    return `SELECT a.name FROM ${v} AS a`;
  });
  console.log(sqls);
// const sql = sqls.map((v)=>{v})
// console.log(sql);

  // switch (cate) {
  //   case "1":
  //     table = "bow_strength";
  //     break;
  //   case "2":
  //     table = "bow_strength";
  //     break;
  //   case "4":
  //     table = "bow_strength";
  //     break;
  //   case "4":
  //     table = "bow_strength";
  //     break;
  // }

  // console.log(typeof(id));

  // **************************************
  //   const sql = `SELECT a.name FROM product_attribute AS a WHERE a.category_id = '${cate}'
  // ORDER BY a.name ASC`;


  // const sql =` SELECT p.*, IF(fp.id, 'true', 'false') AS is_favorite
  //     FROM product AS p
  //     LEFT JOIN fav_product AS fp ON fp.product_id = p.id
  //     AND fp.member_id = ${mid}
  //     ORDER BY p.id ASC`

  // 從product_attr資料表抓到category_id=1(ex:弓)的所有nmae值，並回傳成陣列
  // ************OK的sql語法***********************
  const sql2 = `SELECT a.name FROM product_attribute AS a WHERE a.category_id = '${cate}'
ORDER BY a.name ASC`;
// const sql3 = 'SELECT * FROM `arrow_length`';
  // ***********************************
  const  {rows}  = await executeQuery(sql2);
  // const  {rows}  = await executeQuery(sql3);
  // const { test } = await executeQuery(sql2);
  // const { rows } = await executeQuery(sql2);
  const attr = rows.map((v) => v.name);
  console.log(attr);
  
  // const test2 = test.map((v) => v.name);
  // console.log(test2);
  // const category_id =  category_id:category_id
  // **************************************
  res.json({
    message: "getAllProduct success",
    code: "200",
    data,
    attr,
  });
});


router.get("/category/:cate", async (req, res) => {
  // const { limit, page, sort } = req.query;
  // const limitValue = parseInt(limit);
  // const pageValue = parseInt(page);
  // const offset = (pageValue - 1) * limitValue;
  // let sortValue;
  // switch (sort) {
  //   case "default":
  //     sortValue = { id: "ASC" };
  //   case "hot":
  //     sortValue = { hot: "asc" };
  //     break;
  //   case "launched":
  //     sortValue = { launched: "asc" };
  //     break;
  //   case "priceAsc":
  //     sortValue = { price: "desc" };
  //     break;
  //   case "priceDesc":
  //     sortValue = { price: "asc" };
  //     break;
  //   case "nameAZ":
  //     sortValue = { name: "desc" };
  //     break;
  // }

  const alldata = await getAll();
  const newdata = await getNew();
  // const filterdata = await getFilter(sortValue, limitValue, offset);

  res.json({
    msg: "產品分類頁 success",
    code: 200,
    alldata,
    newdata,
  });
});
// ***********test***********
router.get("/productInfo", async (req, res) => {
  // const productId = alldata.filter(data=>data.id)
  // const aa = req.query;
  const alldata = await getAllProduct();
  // console.log(aa);
  res.json({
    msg: "產品ID success",
    code: 200,
    alldata,
  });
});
// **********************

router.get("/searchProduct", async (req, res) => {
  const { keyword } = req.query;
  // console.log(keyword);
  const searchKeyword = {
    name: `%${keyword}%`,
  };
  //從資料庫中使用searchProduct函式(查詢產品名稱)
  const searchProducts = await searchProduct(searchKeyword);
  console.log(searchProducts);
  return res.json({ searchProducts });
});

// 篩選(分類、價格、上架日期、商品名稱)
router.get("/category/:cate", async (req, res) => {
  // 透過路由判斷cateid 取得後端資料庫category_id(ex:1,2,3,4)的資料
  const cate = req.params.cate;
  let cateid;
  switch (cate) {
    case "bow":
      cateid = 1;
      break;
    case "arrow":
      cateid = 2;
      break;
    case "suit":
      cateid = 3;
      break;
    case "other":
      cateid = 4;
      break;
  }

  const catedata = await getCate({ category_id: cateid });
  // console.log(`cateid:${cateid}`);
  const launchedData = catedata.filter((data) => data.launched === 1);
  // console.log(launchedData)
  // 定義資料庫表格名稱
  res.json({
    message: "產品分類 success",
    code: "200",
    cate: cateid,
    catedata,
    launchedData,
  });
});

export default router;
