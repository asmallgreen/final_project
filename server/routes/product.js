import express from "express";
import { getAllProduct, getCate, getProductPrice } from "../models/products.js";
const router = express.Router();
const app = express();
// 中間件：檢查是否是 cateid
// router.param("cateid", (req, res, next, value) => {
//   if (["category1", "category2", "category3", "category4"].includes(value)) {
//     // 是 cateid，將其存儲在 req 中
//     req.cateid = value;
//     next();
//   } else {
//     // 不是有效的 cateid
//     res.status(404).send("無效的分類");
//   }
// });

// 路由處理程序：處理 cateid
// router.get("/:cateid", async (req, res) => {
//   const cateid = req.cateid;
//   // 判斷 cateid 的值來決定要呈現的內容
//   if (cateid === "bow") {
//     console.log(req.body);
//     const { cateData } = req.body;
//     // 返回分類1的商品列表
//     res.send("顯示分類1的商品列表");
//   } else if (cateid === "category2") {
//     // 返回分類2的商品列表
//     res.send("顯示分類2的商品列表");
//   } else if (cateid === "category3") {
//     // 返回分類3的商品列表
//     res.send("顯示分類3的商品列表");
//   } else if (cateid === "category4") {
//     // 返回分類4的商品列表
//     res.send("顯示分類4的商品列表");
//   } else if (parseInt(cateid)) {
//     // 如果 cateid 是數字，假設它是產品ID，然後處理產品頁面
//     res.send(`顯示產品ID為 ${cateid} 的產品詳細資訊`);
//   } else {
//     // 其他情況，可能是無效的 cateid
//     res.send("無效的分類或產品ID");
//   }
//   res.send(`顯示分類 ${cateid} 的商品列表`);
// });

// 路由處理程序：處理 pid
// router.get("/:pid", (req, res) => {
//   const pid = req.params.pid;
//   res.send(`顯示產品ID為 ${pid} 的產品詳細資訊`);
// });

// 篩選(分類、價格、上架日期、商品名稱)
router.get("/:cate", async (req, res) => {
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
  const launchedData = catedata.filter(data=>data.launched === 1);
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

// 所有商品頁
router.get("/", async (req, res) => {
  // const pid = req.params.pid;
  // 定義資料庫表格名稱

  const alldata = await getAllProduct();
  // const pricedata = await getProductPrice("WHERE price>8000");
  const filteredData = alldata.filter((data) => {
    //----------------價格
    const filterprice = data.price > 6000;
    //----------------姓名
    const filtername = data.name.includes("弓");
    //----------------時間
    const currentTime = new Date();
    const createdat = new Date(data.created_at);
    const timeDifference = currentTime.getTime() - createdat.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const filtercreatedat = daysDifference < 15;
    // console.log("daysDifference:", daysDifference);
    // console.log("filtercreatedat",filtercreatedat);
    // console.log("Created at:", filterdata.created_at);
    // console.log("Time difference:", timeDifference);
    return filterprice && filtername && filtercreatedat;
  });
  const launchedData = alldata.filter(data=>data.launched === 1);
  // console.log(launchedData)
  res.json({
    message: "getAllProduct success",
    code: "200",
    alldata,
    // filteredData,
    launchedData,
  });
});

// 创建一个API端点来获取产品ID
router.get('/api/getProductId', (req, res) => {
  const productId = req.query.id;
  const product = productsData.find(item => item.id === parseInt(productId));
  
  if (product) {
    res.json({ productId: product.id });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

router.get('/getProductName', (req, res)=>{
  const alldata =  getAllProduct();
  const productName = req.query.name
  const products = alldata.filter(data => data.name.includes(productName))
  res.json({products})
})

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


export default router;
