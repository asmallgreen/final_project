import express from "express";
import { getAllProduct, getCate } from "../models/products.js";
const router = express.Router();
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

//:cate頁
router.get("/:cate", async (req, res) => {
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
  // 判斷cateid 取得後端資料庫的資料
  const catedata = await getCate({ category_id: cateid });
  console.log(`cateid:${cateid}`);
  // 定義資料庫表格名稱
  // console.log(catedata);
  // console.log(cate);
  res.json({
    message: "產品分類 success",
    code: "200",
    cate: cateid,
    catedata,
  });
});

// 商品頁
router.get("/", async (req, res) => {
  // const pid = req.params.pid;
  // 定義資料庫表格名稱
  const alldata = await getAllProduct();
  console.log(`alldata:${alldata}`);
  res.json({
    message: "getAllProduct success",
    code: "200",
    alldata,
  });
});

// router.get('/:cateid', (req, res)=>{
//     const cateid=req.params.cateid
//     if(cateid==="category1"){
//         res.send('這是cate頁')
//     }

// })
export default router;
