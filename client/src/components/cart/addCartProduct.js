import React from 'react';
import axios from 'axios';
import { useAuthJWT } from '@/hooks/use-auth-jwt';

export default function AddCartProduct ()  {
    const {authJWT, setAuthJWT} = useAuthJWT()

    const handleClick = () => {
        axios.post('http://localhost:3005/cart/addCartProduct/',{product_id:2,quantity:2,member_id:authJWT.memberData.id})
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

 
