import React from "react";
import { Col } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

export default function FavBtn({id, is_favorite, handleTriggerProductFav}) {
  return (
    <>
      <Col md="6" xs="12" className="fav-btn btn" id={id}
            onClick={()=>handleTriggerProductFav(id)}>
        <FaHeart className="me-2"/>
        {is_favorite?'取消收藏':'加入收藏'}
      </Col>
    </>
  );
}
