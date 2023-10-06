import express from 'express';
import { getAllVenue } from '../models/venue.js'
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



export default router;