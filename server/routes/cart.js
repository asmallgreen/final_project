import express from "express";
const router = express.Router();
import 'dotenv/config.js'
import { executeQuery } from '../routes/database.js';

import { getCart } from '../models/cart.js'

router.get('/', async (req, res) =>{
    const cartList = await getCart()
    return res.json({
        message:"search success",
        code:"200",
        cartList
    })
});

// router.get('/findAllCart', async (req, res)=> {
    
// });



export default router