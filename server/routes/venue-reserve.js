import express from 'express';
import { getAllVenueReserve } from '../models/venue-reserve.js'
const router = express.Router();
const executeQuery = async (sql, params=[] ) => {

    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

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

router.post('/venue_reserve', async (req, res) => {

    const venue_reserve = req.body
    const sql = `INSERT INTO venue_reserve (date_1, date_2 , date_3 , date_4 , date_5 , rental_duration , member_id , reserve_name , reserve_email , reserve_phone , price , created_at ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )`
    try {
        const result = await executeQuery(sql, [venue_reserve.date_1, venue_reserve.date_2, venue_reserve.date_3, venue_reserve.date_4, venue_reserve.date_5, venue_reserve.member_id, venue_reserve.rental_duration, venue_reserve.reserve_name, venue_reserve.reserve_email, venue_reserve.reserve_phone, venue_reserve.price, venue_reserve.created_at]);
        const newReserve = result
        return res.json({
            message: "search success",
            code: "200",
            newReserve
        });
    } catch (error) {
        console.error('新增預約錯誤', error);
        return res.status(500).json({
            message: "search error",
            code: "500"
        });
    }
}
);



export default router;