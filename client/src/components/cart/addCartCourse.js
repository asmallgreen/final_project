import React from "react";
import { Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import Swal from "sweetalert2";

export default function CartBtn() {
  const {authJWT, setAuthJWT} = useAuthJWT()

    const handleClick = () => {
        axios.post('http://localhost:3005/cart/addCartCourse/',{course_id:1,quantity:1,member_id:authJWT.memberData.id})
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
    };
  return (
    <>
      <Col md="6" xs='12' className="cart-btn btn " onClick={handleClick}>
      <FaShoppingCart className="me-2"/>
        加入購物車
      </Col>
    </>
  );
}
