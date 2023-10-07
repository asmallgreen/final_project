import express from "express";
const router = express.Router();
import 'dotenv/config.js'
import { executeQuery } from '../routes/database.js';

import { getCart } from '../models/cart.js'

router.post('/', async (req, res) =>{
    

     const cartList = await getCart()
     console.log(cartList)
    return res.json({
        message:"search success",
        code:"200",
        cartList:cartList
    })
});

// router.get('/findAllCart', async (req, res)=> {
    
// });



export default router