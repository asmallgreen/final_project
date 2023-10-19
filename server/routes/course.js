import express from "express";
import { executeQuery } from "../models/base.js"
import {
  getAllCourse,
  getCourseById,
  getCoursePageAsc,
  getOne,
  getFilter,
  getDisplay,
  getCate,
  searchCourse,
  updateCourse,
} from "../models/course.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { limit = 5, page = 1, sort, attr } = req.query;
  const limitValue = parseInt(limit);
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * limitValue;

  let sortValue;
  switch (sort) {
    case "default":
      sortValue = { id: "ASC" };
      break;
    case "hot":
      sortValue = { hot: "ASC" };
      break;
    case "launched":
      sortValue = { launched: "ASC" };
      break;
    case "priceAsc":
      sortValue = { price: "DESC" };
      break;
    case "priceDesc":
      sortValue = { price: "ASC" };
      break;
    case "nameAZ":
      sortValue = { name: "DESC" };
      break;
  }

  let attrValue;
  switch (attr) {
    case "default":
      attrValue = "";
      break;
    case "attr1":
      attrValue = { price: 500 };
      break;
    case "attr2":
      attrValue = { price: 2 };
      break;
    case "attr3":
      attrValue = { price: 3 };
      break;
    case "attr4":
      attrValue = { price: 4 };
      break;
  }
  const allCourse = await getAllCourse();
  const coursePageAsc = await getCoursePageAsc(limit);

  const filterdata = await getFilter(attrValue, sortValue);
  const displaydata = await getDisplay(
    attrValue,
    sortValue,
    limitValue,
    offset
  );

  const alldataLength = allCourse.length;
  const filterdataLength = filterdata.length;
  const displaydataLength = displaydata.length;
  const pageLength =
    filterdataLength % limit === 0
      ? filterdataLength / limit
      : Math.ceil(filterdataLength / limit);

  res.json({
    message: "success to get all course",
    code: "200",
    allCourse,
    coursePageAsc,
    filterdata,
    displaydata,
    alldataLength,
    filterdataLength,
    displaydataLength,
    pageLength,
    limitValue,
    pageValue,
  });
});

// 獲得單筆資料的路由
router.get("/:cid", async (req, res, next) => {
  const course = await getCourseById(req.params.cid);

  if (course) {
    return res.json({ ...course });
  } else {
    return res.json({});
  }
});

router.get("/searchCourse", async (req, res) => {
  const { keyword } = req.query;
  const searchKeyword = {
    name: `%${keyword}%`,
  };
  const searchResult = await searchCourse(searchKeyword);
  return res.json(searchResult);
});

router.put("/ratingPush/", async (req, res) => {
  // console.log(req.body);
  try {
    // const { cid } = req.params;
    const { rating, cid } = req.body;
    const sql = `UPDATE course SET rating = ${rating} WHERE id = ${cid}`;
    // if(cid)
    const result = await executeQuery(sql)
    const newRating = {
      rating,
    };
    
    if (result) {
      return res.json({
        message: "評分更新成功",
        code: "200",
        newRating,
      });
    } else {
      return res.json({
        message: "評分更新失敗",
        code: "400",
      });
    }
  } catch {
    console.log("錯誤");
  }
});


// TODO: 處理課程篩選的邏輯

export default router;
