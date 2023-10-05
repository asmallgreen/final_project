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
export default function LaunchedCard(props) {
  const { filterNewProduct } = props;
  // console.log(filterNewProduct);
  return (
    <>
      <div className="card">
        <div className="img position-relative">
         <img src={filterNewProduct.img1}></img>
          <div className="tag position-absolute">NEW</div>
        </div>
        <div className="content">
          <div className="product-name">
            {filterNewProduct.name}
          </div>
          <div className="description">{filterNewProduct.summary}</div>
          <div className="price text-end">NT${filterNewProduct.price}</div>
        </div>
      </div>
    </>
  );
}
