import React from "react";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import { Row, Col } from "react-bootstrap";

import ProductInfoAccordion from "@/components/accordion/product-info-accordion";
import ScrollsCircle from "@/components/scroll-btn/scrolls-circle";
import FavBtn from "@/components/category/fav-btn";
import CartBtn from "@/components/category/cart-btn";
import NormalCard from "@/components/product/normal-card";
import Description from "@/components/category/description";
import QuantityBtn from "@/components/category/quantity-btn";
import Material from "@/components/attributes/material";
import Length from "@/components/attributes/length";
import Diameter from "@/components/attributes/diameter";
function Category() {
  return (
    <>
      {/* 麵包屑 */}
      <div className="product-info-crum">
        <BreadCrumb />
      </div>
      {/* *********************** */}
      <Row>
        <Col xl="4" md="5" className="product-info-img offset-md-1 offset-xl-2">
          <div className="img">
            <img src=""></img>
          </div>
        </Col>
        <Col xl="4" md="5" className="product-info-select">
          <div className="product-info-des">
            <Description />
          </div>
          {/* 屬性按鈕 */}
          <div className="product-info-attr">
            <Material />
            <Length />
            <Diameter />
          </div>

          <div className="product-info-btns">
            {/* 數量按鈕 */}
            <QuantityBtn />
            {/* 購物車 收藏按鈕 */}
            <div className="product-info-btn">
              <FavBtn />
              <CartBtn />
            </div>
          </div>
        </Col>
      </Row>

      {/* *********************** */}

      {/* 商品資訊(手風琴) */}
      <ProductInfoAccordion />
      {/* </div> */}

      {/* 相關商品推薦 */}
      <div className="product-page-title">
        <p>相關商品推薦</p>
      </div>
      <Row className="normal-cards-area">
        <Col className="normal-cards">
          <Row className="rows">
            <NormalCard />
            <NormalCard />
            <NormalCard />
            <NormalCard />
            <NormalCard />
          </Row>
        </Col>
      </Row>

      {/* ----------------------- */}
    </>
  );
}
export default Category;
