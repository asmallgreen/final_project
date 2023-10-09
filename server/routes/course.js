import express from "express";
import { getAllCourse, getCourseById } from "../models/course.js";
const router = express.Router();

// router.get("/", async (req, res) => {
//   // res.send('course');
//   // sql 公式函數
//   const allCourse = await getAllCourse();
//   // console.log(allCourse);
//   res.json({
//     message: "success to get all course",
//     code: "200",
//     allCourse,
//   });
// });

// router.get("/course/:cid", async (req, res) => {
//   const allCourse = await getAllCourse();
//   // console.log(allCourse);
//   res.json({
//     message: "success to get all course",
//     code: "200",
//     allCourse,
//   });
// });

// 獲得單筆資料
router.get("/:cid", async (req, res, next) => {
    const course = await getCourseById(req.params.cid)
  
    if (course) {
      return res.json({ ...course })
    } else {
      return res.json({})
    }
  })

export default router;
