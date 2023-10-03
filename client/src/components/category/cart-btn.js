import React from "react";
import { Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

export default function CartBtn() {
  return (
    <>
      <Col md="6" xs='12' className="cart-btn btn ">
      <FaShoppingCart className="me-2"/>
        加入購物車
      </Col>
    </>
  );
}
