import React from "react";
import { Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useProductCart } from "@/hooks/use-product-cart";

export default function CartBtn({ product }) {
  // const { addProduct } = useProductCart();

  // const handleAddToCart = () => {
  //   addProduct({
  //     id: 123,
  //     name: "456",
  //     detail_1: "RR",
  //     detail_2: "CC",
  //     detail_3: "GG",
  //     quantity: 1, 
  //     price: 9487946,
  //   });
  // };

  return (
    <>
      <Col md="6" xs='12' className="cart-btn btn" >
        <FaShoppingCart className="me-2" />
        加入購物車
      </Col>
    </>
  );
}