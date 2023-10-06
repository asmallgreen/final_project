import express from 'express';
import { getAllCourse } from '../models/course.js'
const router = express.Router();

router.get('/', async(req, res) => {
    // res.send('course');
    // sql 公式函數
    const allCourse = await getAllCourse();
    console.log(allCourse);
    res.json({
        message:'success to get all course',
        code:'200',
        allCourse,
    })
})

export default router;