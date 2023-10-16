import express from "express";
import { getAllRatingCourse, getRatingCourseById, getRatingCourseByCourseId } from "../models/rating-couse.js";
import { executeQuery } from "../models/base.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const allRatingCourse = await getAllRatingCourse();

    res.json({
        message: "success to get all rating-course",
        code: "200",
        allRatingCourse,
    });
});

router.get("/:id", async (req, res) => {
    const courseId = req.params.id
    const ratingCourse = await getRatingCourseByCourseId(courseId)

    if (ratingCourse.length > 0) {
        return res.json( ratingCourse )
    }
    else {
        return res.json({})
    }
})

router.get('/member/:id', async (req, res) => {
    const courseId = req.params.id
    const sql = `SELECT * FROM member WHERE id IN (SELECT member_id FROM rating_course WHERE course_id = ${courseId})`
    const { rows } = await executeQuery(sql)

    res.json({ rows })
})

// 

export default router;