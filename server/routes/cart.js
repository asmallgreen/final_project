import express from 'express'
const router = express.Router()

import 'dotenv/config.js'
import pool from '../config/db.js';


//測試路由
router.get('/', function (req, res) {
    res.send('cart home page!');
});

router.post('/addProduct', async (req, res) => {
    res.send('addProduct');
}
);

export default router