import express from "express";
import { getLimit, getAllProduct, searchProduct } from "../models/products.js";

const router = express.Router();

// let limitValue;

// 每頁顯示幾筆
// router.use(express.json());
// router.post("/", async (req, res) => {
//    limitValue = req.body.limit;
  
//   res.json({
//     msg: "success",
//     code: 200,
//     limitdata
//   });
//   console.log(limitValue);
//   console.log(limitdata);
// });

//***********產品頁************
router.get("/", async (req, res) => {
  const alldata = await getAllProduct();
  const launchdata = await alldata.filter((data) => data.launched === 1);
  const limitdata = await getLimit();
  const filterdata = await getLimit()
  

  // const filteredData = alldata.filter((data) => {
  //   //----------------價格
  //   const filterprice = data.price > 6000;
  //   //----------------姓名
  //   const filtername = data.name.includes("弓");
  //   //----------------時間
  //   const currentTime = new Date();
  //   const createdat = new Date(data.created_at);
  //   const timeDifference = currentTime.getTime() - createdat.getTime();
  //   const daysDifference = timeDifference / (1000 * 3600 * 24);
  //   const filtercreatedat = daysDifference < 15;
  //   return filterprice && filtername && filtercreatedat;
  // });
  console.log(launchdata);
  res.json({
    message: "getAllProduct success",
    code: "200",
    alldata,
    launchdata,
    limitdata,
    filterdata,
  });
});
router.get("/:pid", async (req, res) => {
  const alldata = await getAllProduct();
  res.json({
    message: "getAllProduct success",
    code: "200",
    alldata,
  });
});
// 创建一个API端点来获取产品ID
router.get("/getProductId", (req, res) => {
  const alldata = getAllProduct();
  console.log(alldata);
  const productId = req.query.id;
  console.log(productId);
  const product = productsData.find((item) => item.id === parseInt(productId));

  if (product) {
    res.json({ productId: product.id });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
  res.json({
    alldata,
    productId,
  });
});

// ***********test***********
router.get("/productInfo", async (req, res) => {
  // const productId = alldata.filter(data=>data.id)
  const aa = req.query;
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
