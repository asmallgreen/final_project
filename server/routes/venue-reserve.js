import express from 'express';
import { getAllVenueReserve } from '../models/venue-reserve.js'
const router = express.Router();

router.get('/', async(req, res) => {
    // res.send('course');
    // sql 公式函數
    const allVenueReserve = await getAllVenueReserve();
    console.log(allVenueReserve);
    res.json({
        message:'success to get all course',
        code:'200',
        allVenueReserve,
    })
})

router.get('/', async(req, res) => {
    // res.send('course');
    // sql 公式函數
    const saveDb = await saveVenueReserve();
    console.log(saveDb);
    console.log(req.array);
    res.json({
        message:'success to get all course',
        code:'200',
        allVenueReserve,
    })
})



export default router;