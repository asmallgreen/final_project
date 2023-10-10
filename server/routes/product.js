import express from "express";
import {
  getAll,
  getNew,
  getFilter,
  getOne,
  searchProduct,
} from "../models/products.js";

const router = express.Router();

//***********產品頁************
router.get("/", async (req, res) => {
  const { limit, page, sort } = req.query;
  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * limitValue;
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

  const alldata = await getAll();
  const newdata = await getNew();
  const filterdata = await getFilter(sortValue, limitValue, offset);

  res.json({
    message: "getAllProduct success",
    code: "200",
    filterdata,
    alldata,
    newdata,
  });
});
router.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  // console.log('req.query:', req.query);
  console.log(id);
// const where = {id:2}
const where = {id:id}
  // const alldata = await getAll();
  const data = await getOne(where)
  // const filterdata = await getFilter(sortValue, limitValue, offset);

  res.json({
    message: "getAllProduct success",
    code: "200",
    // filterdata,
    // alldata,
    data,
   
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
