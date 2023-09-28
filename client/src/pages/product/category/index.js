import React from "react";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import { Row, Col } from "react-bootstrap";

import ProductCard from "@/components/product/product-card";
import ProductInfoAccordion from "@/components/accordion/product-info-accordion";
import ScrollsCircle from "@/components/scroll-btn/scrolls-circle";
import Attributes from "@/components/product/attributes";
import FavBtn from "@/components/product/fav-btn";
import CartBtn from "@/components/product/cart-btn";
import QuantityBtn from "@/components/product/quantity-btn";
function Category() {
  return (
    <>
      <div className="container p-0">
        {/* 麵包屑 */}
        <BreadCrumb />
        {/* 產品select區 */}
        <div className="cart row d-flex position-relative">
          {/* 左邊區域 */}
          <div className="d-flex position-relative img-area px-4 col-6">
            {/* <img src="" /> */}
            <div className="img">暫時img</div>
            <ScrollsCircle className="scrolls" />
          </div>
          {/* 右邊區域 */}
          <div className="detail col-6 flex-column d-flex justify-content-between ">
            {/* <div className="title">選購</div> */}
            <div className="product-info d-flex flex-column justify-content-center align-items-center">
              <div className="product-name my-2"> 特選黑羽雞翅 汝拉箭6枚</div>
              <div className="price my-2">$8000</div>
              <div className="intro my-2">採用廣受歡迎的伊斯頓硬鋁箭桿</div>
            </div>
            {/* select屬性 */}
            <div className="attributes d-flex flex-column justify-content-center">
              <Attributes />
              <Attributes />
              <Attributes />
            </div>

            {/* buttons */}
            <QuantityBtn className="mx-2" />
            <Row>
              <FavBtn />
              <CartBtn />
            </Row>
          </div>
        </div>
        {/* 商品資訊(手風琴) */}
        <ProductInfoAccordion />
      </div>

      {/* 相關商品推薦 */}
      <div className="product-page-title">
        <p>相關商品推薦</p>
      </div>
      <Row className="justify-content-md-center py-5">
        <Col md="auto" xs="2" className="cards d-flex offset-auto">
          <Row className="rows">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default Category;
