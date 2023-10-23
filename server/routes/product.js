import express from "express";
import { executeQuery } from "../models/base.js";
import "dotenv/config.js";
import {
  getAll,
  getFilter,
  getOne,
  getDisplay,
  getCate,
  searchProduct,
} from "../models/products.js";

const router = express.Router();

//***********產品頁************
router.get("/", async (req, res) => {
  const {
    limit = 20,
    page = 1,
    sort='',
    attr = "default",
    search = "",
  } = req.query;
  // console.log(limit, page, sort, attr, search);
  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * limitValue;
  // 排序改order
  let sortValue;
  switch (sort) {
    case "default":
      sortValue = '';
    case "hot":
      sortValue = { hot: "desc" };
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
  let attrValue;
  switch (attr) {
    case "default":
      attrValue = "";
      break;
    case "attr1":
      attrValue = "price<1000";
      break;
    case "attr2":
      attrValue = "price BETWEEN 1000 AND 2000";
      break;
    case "attr3":
      attrValue = "price BETWEEN 2000 AND 4000";
      break;
    case "attr4":
      attrValue = "price BETWEEN 4000 AND 6000";
      break;
    case "attr5":
      attrValue = "price>6000";
      break;
  }
  let searchValue;
  if (search) {
    searchValue = `name LIKE '%${search}%'`;
  }
  // console.log(searchValue);
  // console.log(search);
  // console.log(searchValue);
  // 定義where條件內容
  let where;
  // 使用條件判斷來擴充 SQL 查詢語句
  if (attrValue && searchValue) {
    where = `WHERE ${attrValue} AND ${searchValue}`;
  } else if (attrValue) {
    where = `WHERE ${attrValue}`;
  } else if (searchValue) {
    where = `WHERE ${searchValue}`;
  }

  // console.log(where);

  const alldata = await getAll();
  const filterdata = await getFilter(where, sortValue);
  const displaydata = await getDisplay(where, sortValue, limitValue, offset);
  const alldataLength = alldata.length;
  const filterdataLength = filterdata.length;
  const displaydataLength = displaydata.length;
  const pageLength =
    filterdataLength % limit === 0
      ? filterdataLength / limit
      : Math.ceil(filterdataLength / limit);

  res.json({
    message: "getAllProduct success",
    code: "200",
    alldata,
    displaydata,
    filterdata,
    alldataLength,
    filterdataLength,
    displaydataLength,
    pageLength,
    limitValue,
    pageValue,
  });
});

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const where = { id: id };
    const data = await getOne(where);
    const alldata = await getAll();
    const cate = data.category_id;

    let tables = [];
    switch (cate) {
      case 1:
        tables = ["bow_strength", "bow_meterial", "bow_length"];
        break;
      case 2:
        tables = ["arrow_length", "arrow_meterial", "arrow_shaft"];
        break;
      case 3:
        tables = ["suit_color", "suit_size"];
        break;
    }

    const sqls = tables.map((v) => {
      return `SELECT a.name FROM ${v} AS a`;
    });
    // console.log(sqls);
    // **************************************
    // ************OK的sql語法***********************
    // 屬性
    const sql2 = `SELECT name FROM product_attribute WHERE category_id = ${cate}`;
    const attrTitle = [];
    const { rows } = await executeQuery(sql2);
    const attr = rows.map((item) => (item && item.name) || "");
    attrTitle.push(attr);
    console.log(attrTitle);
    // 屬性內容
    const attrValue = [];
    for (const sql of sqls) {
      const { rows } = await executeQuery(sql);
      const names = rows.map((item) => (item && item.name) || "");
      attrValue.push(names);
    }

    // ************OK的sql資料***********************
    // const { rows } = await executeQuery(sql2);
    // const name = rows.map((item) => (item && item.name) || "");
    // ***********************************

    // **************************************

    return res.json({
      message: "getAllProduct success",
      code: "200",
      alldata,
      tables,
      attrTitle,
      attrValue,
      data,
    });
  } catch (error) {
    console.error("獲取會員優惠券資料錯誤", error);
    return res.status(500).json({
      message: "search error",
      code: "500",
    });
  }
});

router.get("/category/:cate", async (req, res) => {
  const { sort='', attr, limit = 20, page = 1, cate, search = "" } = req.query;
  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * limitValue;
  // 排序改order
  let sortValue;
  switch (sort) {
    case "default":
      sortValue = { id: "ASC" };
    case "hot":
      sortValue = { hot: "desc" };
      break;
    case "launched":
      sortValue = { launched: "desc" };
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

  let cateValue;
  switch (cate) {
    case "1":
      cateValue = "WHERE category_id = 1";
      break;
    case "2":
      cateValue = "WHERE category_id = 2";
      break;
    case "3":
      cateValue = "WHERE category_id = 3";
      break;
    case "4":
      cateValue = "WHERE category_id = 4";
      break;
  }
  let attrValue;
  switch (attr) {
    case "default":
      attrValue = "";
      break;
    case "attr1":
      attrValue = "price<1000";
      break;
    case "attr2":
      attrValue = "price BETWEEN 1000 AND 2000";
      break;
    case "attr3":
      attrValue = "price BETWEEN 2000 AND 4000";
      break;
    case "attr4":
      attrValue = "price BETWEEN 4000 AND 6000";
      break;
    case "attr5":
      attrValue = "price>6000";
      break;
  }
  let searchValue;
  if (search) {
    searchValue = `name LIKE '%${search}%'`;
  }
  // 定義where條件內容
  let where;
  // 使用條件判斷來擴充 SQL 查詢語句

  // if (cateValue) {
  //   where = `${cateValue}`;
  // }
  // if (attrValue) {
  //   where += ` AND ${attrValue}`;
  console.log(attrValue);
  console.log(searchValue);
  if (cateValue) {
    where = `${cateValue}`;
  }
  if (cateValue && attrValue && searchValue) {
    where += ` AND ${attrValue} AND ${searchValue}`;
  } else if (cateValue && searchValue) {
    where += ` AND ${searchValue}`;
  } else if (cateValue && attrValue) {
    where += ` AND ${attrValue}`;
  }
  console.log(where);

  console.log(where);
  const catedata = await getCate(cateValue);
  const filterdata = await getFilter(where, sortValue);
  // console.log(filterdata);
  const displaydata = await getDisplay(where, sortValue, limitValue, offset);

  const sql = `SELECT p.*
FROM product AS p
JOIN product_arrow_length AS pal ON p.id = pal.product_id
JOIN arrow_length AS al ON al.id = pal.arrow_length_id;
`;
  const { rows } = await executeQuery(sql);
  console.log(rows);
  //所有產品的數量改用catedata
  const alldataLength = catedata.length;
  const filterdataLength = filterdata.length;
  const displaydataLength = displaydata.length;
  const pageLength =
    filterdataLength % limit === 0
      ? filterdataLength / limit
      : Math.ceil(filterdataLength / limit);

  res.json({
    message: "getAllProduct success",
    code: "200",
    rows,
    catedata,
    // alldata,
    displaydata,
    filterdata,
    alldataLength,
    filterdataLength,
    displaydataLength,
    pageLength,
    limitValue,
    pageValue,
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
  //從資料庫中使用searchProduct函式(查詢產品名稱)f
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
