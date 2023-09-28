import React from "react";
import { Row, Col } from "react-bootstrap";

export default function QuantityBtn() {
  return (
    <>
      <Row className="quantity-btn">
        <Col md="3" className="btn symbol">
          +
        </Col>
        <Col md="6" className="btn quantity">
          0
        </Col>
        <Col md="3" className="btn symbol">
          -
        </Col>
      </Row>


    </>
  );
}
