import express from 'express';
import { getAllVenue,getOnce } from '../models/venue.js'
const router = express.Router();

router.get('/', async(req, res) => {
    // res.send('course');
    // sql 公式函數
    const allVenue = await getAllVenue();
    console.log(allVenue);
    res.json({
        message:'success to get all course',
        code:'200',
        allVenue,
    })
})

router.get('/:id', async(req, res) => {
    // res.send('course');
    // sql 公式函數
    // const allVenue = await getAllVenue();
    console.log(req.params);
    const once = await getOnce(req.params.id);
    console.log(once);
    res.json({
        message:'success to get all course',
        code:'200',
        once,
    })
})



export default router;