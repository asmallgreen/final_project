import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../components/product/product-card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFilter,
  faSort,
  faCartShopping,
  faHeart as farHeart,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import SalesCard from "@/components/product/sales-card";
import FilterProductCard from "@/components/product/filter-product-card";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import LunaPagination from "@/components/pagination/luna-pagination";
function Product() {
  return (
    <>
      {/* 商品廣告 */}
      <div class="ads d-flex row position-relative">
        <div class="ad col">
          <img src="/images/product/top1.jpg" />
        </div>
        <div class="main ad col-6">
          <img src="/images/product/top2.jpg" />
          <div className="scrolls d-flex position-absolute bottom-0  m-3">
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
          </div>
        </div>
        <div class="ad col">
          <img src="/images/product/top3.jpg" />
        </div>
      </div>

      {/* 新品上架 */}
      <div className="title">
        <p>新品上架</p>
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

      {/* 分類 */}
      <div className="category position-relative">
        <div className="type-title d-flex justify-content-center ">
          ｜ 產品分類 ｜
        </div>
        <div className="type d-flex position-absolute justify-content-center ">
          <div className="item">
            <a href="">弓</a>
          </div>
          <div className="item">
            <a href="">箭</a>
          </div>
          <div className="item">
            <a href="">道服</a>
          </div>
          <div className="item">
            <a href="">其他</a>
          </div>
        </div>
      </div>

      {/* 所有產品 */}
      <div className="title">
        <p>所有產品</p>
      </div>
      <div className="filter-product-list">
        {/* 排序篩選 */}
        <div className="fk d-flex justify-content-between align-items-center">
          {/* 麵包屑 */}
          <BreadCrumb />
          {/* btn-group */}
          <div className="wrap d-flex align-items-center px-2">
            {/* 排序篩選 */}
            <div
              className="btn-group me-3"
              role="group"
              aria-label="Basic outlined example"
            >
              <button type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="fa-solid fa-filter me-2"
                />
                篩選商品 ({5})
              </button>
              <button type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon
                  icon={faSort}
                  className="fa-solid fa-sort me-2"
                />
                排序
              </button>
            </div>
            {/* 每頁幾筆 */}
            <div className="per-page px-3 align-items-center d-flex">
              每頁顯示
              <button
                type="button"
                className="btn btn-primary dropdown-toggle mx-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {5}
              </button>
              筆
            </div>
          </div>
        </div>
        {/* 所有產品card */}
        <Row className="justify-content-md-center py-5">
          <Col md="auto" xs="2" className="cards d-flex offset-auto">
            <Row className="rows">
              <FilterProductCard />
              <FilterProductCard />
              <FilterProductCard />
              <FilterProductCard />
              <FilterProductCard />
              <FilterProductCard />
            </Row>
          </Col>
        </Row>

        {/* btn */}
        <LunaPagination/>
      </div>

      {/* 優惠專區 */}
      <div className="title">
        <p>優惠專區</p>
      </div>

      <Row className="sales my-5 d-flex justify-content-center">
        <Col md="12" xs="8" className="">
          <Row className="d-flex justify-content-center">
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* inter */}
      <div className="inter-block text-center">真誠面對傳統，超越傳統。</div>

      {/* 相關商品推薦 */}
      <div className="title">
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

      {/* *************TEST**************** */}

    </>
  );
}
export default Product;
