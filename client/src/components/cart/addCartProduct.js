import React from 'react';
import axios from 'axios';

export default function AddCartProduct ()  {


    const handleClick = () => {
        axios.post('http://localhost:3005/cart/addCartProduct/',{product_id:2,quantity:2,price:2000})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <button className="btn btn-primary" onClick={handleClick}>
            加入購物車
        </button>
    );
};

 
