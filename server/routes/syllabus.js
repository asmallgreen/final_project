import express from "express";
import { getSyllabusByCourseId } from "../models/syllabus.js";
const router = express.Router();

// router.get("/", async (req, res) => {
//   // res.send('course');
//   // sql 公式函數
//   const allSyllabus = await getAllSyllabus();
//   // console.log(allCourse);
//   res.json({
//     message: "success to get all course",
//     code: "200",
//     allSyllabus,
//   });
// });

router.get("/:sid", async (req, res, next) => {
    const courseId = req.params.sid
    const syllabus = await getSyllabusByCourseId(courseId)
  
    if (syllabus.length > 0) {
      return res.json( syllabus )
    } else {
      return res.json({})
    }
  })

export default router;