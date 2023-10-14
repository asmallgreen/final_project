import React from 'react';
import axios from 'axios';
import { useAuthJWT } from '@/hooks/use-auth-jwt';

export default function AddCartCourse(){
    const {authJWT, setAuthJWT} = useAuthJWT()

    const handleClick = () => {
        axios.post('http://localhost:3005/cart/addCartCourse/',{course_id:1,quantity:1,member_id:authJWT.memberData.id})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
        <button className="btn btn-primary" onClick={handleClick}>
            加入購物車
        </button>
        </div>
    );


}
