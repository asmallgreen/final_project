import express from "express";
import {
  getAllCourse,
  getCourseById,
  getCoursePageAsc,
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

export default router;
