import express from "express";
const router = express.Router();
import 'dotenv/config.js'
import { executeQuery } from '../routes/database.js';

import { addCart } from '../models/cart.js'

router.get('/', function (req, res) {
    res.send('cart page!');
});

router.get('/findAllCart', async (req, res)=> {
    const cartList = await addCart()
    return res.json({
        message:"search success",
        code:"200",
        cartList
    })
});



export default router