// 產品頁=>新品上架/相關商品卡片樣式
// 使用方法:
// import { Row, Col } from "react-bootstrap";

//  <Row className="justify-content-md-center py-5">
//  <Col md="auto" xs="2" className="cards d-flex offset-auto">
//   <Row className="rows">
//     <ProductCard />
//     <ProductCard />
//     <ProductCard />
//     <ProductCard />
//     <ProductCard />
//     <ProductCard />
//   </Row>
// </Col>
// </Row>


import React from "react";
export default function NormalCard() {
  return (
    <>
      <div className="card">
        <div className="img position-relative">
          <img src="" />
          <div className="tag position-absolute">NEW</div>
        </div>
        <div className="content">
          <div className="product-name">
            特選黑羽雞翅汝拉箭
          </div>
          <div className="description">汝拉箭6枚1913年 (5)</div>
          <div className="price text-end">$1500</div>
        </div>
      </div>
    </>
  );
}
