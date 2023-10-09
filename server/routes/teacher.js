import express from "express";
import { getAllTeacher, getTeacherById } from "../models/teacher.js";
const router = express.Router();

// router.get("/", async (req, res) => {
//   // res.send('course');
//   // sql 公式函數
//   const allTeacher = await getAllTeacher();
//   // console.log(allCourse);
//   res.json({
//     message: "success to get all teacher",
//     code: "200",
//     allTeacher,
//   });
// });

router.get("/:tid", async (req, res, next) => {
  const teacher = await getTeacherById(req.params.tid);

  if (teacher) {
    return res.json({ ...teacher });
  } else {
    return res.json({});
  }
});

export default router;
