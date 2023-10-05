import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('course');
    // sql 公式函數
    const allCourse = getAllProducts();
    console.log(allCourse);
    res.json({
        message:'success to get all course',
        code:'200',
        allCourse,
    })
})

export default router;