import express from "express";
import {
  getAllCourse,
  getCourseById,
  getCoursePageAsc,
  searchCourse
} from "../models/course.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const allCourse = await getAllCourse();
  const coursePageAsc = await getCoursePageAsc(limit);

  // console.log(allCourse);
  res.json({
    message: "success to get all course",
    code: "200",
    allCourse,
    coursePageAsc,
  });
});

// router.get("/course/:cid", async (req, res) => {
//   const allCourse = await getAllCourse();
//   // console.log(allCourse);
//   res.json({
//     message: "success to get all course",
//     code: "200",
//     allCourse,
//   });
// });

// 獲得單筆資料的路由
router.get("/:cid", async (req, res, next) => {
  const course = await getCourseById(req.params.cid);

  if (course) {
    return res.json({ ...course });
  } else {
    return res.json({});
  }
});

//
router.get("/search/:keyword", async (req, res) => { 
  const keyword = req.params.keyword;
  const where = { name: keyword };
  const search = await searchCourse(where);
  // console.log(search);
  res.json({
    message: "success to get search course",
    code: "200",
    search,
  });
});

export default router;
