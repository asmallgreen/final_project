import React from "react";
import { Col } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

export default function FavBtn() {
  return (
    <>
      <Col md="6" xs="12" className="fav-btn btn">
        <FaHeart className="me-2"/>
        加入收藏
      </Col>
    </>
  );
}
