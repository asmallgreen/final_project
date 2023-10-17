import React from "react";
import { Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import Swal from "sweetalert2";

export default function AddCartProduct({cartQuantity , prodId,activeValues}) {
  

  const {authJWT, setAuthJWT} = useAuthJWT()
  
  
    const handleAddCartClick = () => {

        if(cartQuantity>0){
        axios.post('http://localhost:3005/cart/addCartProduct/',{product_id:prodId,quantity:cartQuantity,member_id:authJWT.memberData.id,product_detail:activeValues})
            .then(response => {
                console.log('加入購物車成功');
                Swal.fire({
                  icon: 'success',
                  title: '加入購物車成功',
                  showConfirmButton: false,
                  timer: 1500,
                  backdrop: `rgba(255, 255, 255, 0.55)`,
                  width: '35%',
                  padding: '0 0 3.25em',
                  customClass: {
                  }
                })
            })
            .catch(error => {
                console.log(error);
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: '加入購物車失敗 數量不能為零',
              showConfirmButton: false,
              timer: 1500,
              backdrop: `rgba(255, 255, 255, 0.55)`,
              width: '35%',
              padding: '0 0 3.25em',
              customClass: {
              }
            })
          }


    };
  return (
    <>
      <Col md="6" xs='12' className="cart-btn btn " onClick={handleAddCartClick}>
      <FaShoppingCart className="me-2"/>
        加入購物車
      </Col> 
    </>
  );
}
