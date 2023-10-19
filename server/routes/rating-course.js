import express from "express";
import { getAllRatingCourse, getRatingCourseById, getRatingCourseByCourseId, addRatingCourse } from "../models/rating-couse.js";
import authenticate from "../middlewares/jwt.js";
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
        return res.json([])
    }
})

router.get('/member/:id', async (req, res) => {
    const courseId = req.params.id
    const memberId = `SELECT member_id FROM rating_course WHERE course_id = ${courseId}`
    const sql = `SELECT * FROM member WHERE id IN (SELECT member_id FROM rating_course WHERE course_id = ${courseId})`

    if(memberId) {
        const { rows } = await executeQuery(sql)
        console.log(rows)
        res.json({ rows }) 
    }else{
        res.json([])
    }

    // const { rows } = await executeQuery(sql2)
    // console.logr(rows)
    // res.json({ rows })
})

router.post('/add', async (req, res) => {
    console.log(req.body);

    try{
        // const member = req.member
        // const member_id = member.id
        const { order_id, member_id, course_id, score, comment } = req.body
        const result = await addRatingCourse(order_id, member_id, course_id, score, comment)
        const newComment ={
            order_id,
            member_id,
            course_id,
            score,
            comment
        }

        if(result) {
            return res.json({
                message: "success to add rating-course",
                code: "200",
                newComment
            })
        }else{
            return res.json({
                message: "fail to add rating-course",
                code: "400",
            })
        }
    }catch{
        console.log("error")
    }
})

// 

export default router;