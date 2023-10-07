import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import SalesCard from "@/components/product/sales-card";
import FilterProductCard from "@/components/product/filter-card";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import LunaPagination from "@/components/pagination/luna-pagination";
import FilterBtns from "@/components/product/filter-btns";
import RecommendedCard from "@/components/product/recommended-card";
import LaunchedCard from "@/components/product/launched-card";
import { useProductContext } from "../../hooks/use-product-context.js";
//AnimatedArrow
import AnimatedArrow from "../../components/product/animate-arrow.js";
import ConcentricCircles from "../../components/product/animate-concent-circle.js";
// 廣告
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, History } from "swiper/modules";

function Product() {



  const [allProduct, setAllProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

  //navbar搜尋產品
  const { results } = useProductContext();

  // const handleProduct = async (e) => {
  //   const res = await axios.get(
  //     "http://localhost:3005/product",
  //     {},
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(res.data);
  // };
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3005/product", []);
        // console.log(res.data);
        // console.log(res.data.products);
        setAllProduct(res.data.alldata);
        setNewProduct(res.data.launchedData);
        // console.log(allProduct);
        // console.log(newProduct);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    // console.log(allProduct);
    // console.log(newProduct);
  }, [allProduct, newProduct]);

  // const handleCate = async (e) => {
  //   const res = await axios.get(
  //     "http://localhost:3005/product",
  //     { cateData },
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(res.data);
  //   if (res.data.message === "getAllProduct success") {
  //     setAllProduct(res.data.product);
  //   }
  //   console.log(allProduct);
  // };

  return (
    <>
      {/* <div>
        <h2>Product List</h2>
        <ul>
          {results.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div> */}
      {/* {results &&
        results.searchProducts &&
        results.searchProducts.length > 0 && (
          <div>
            {" "}
            <ul>
              {results.searchProducts.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        )} */}
      {/* **************** */}
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper ad-swiper"
      >
        <SwiperSlide>
          <Row className="ads">
            <Col md="12" className="ad">
              <img src="/product/top1.jpg" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="12" className="ad">
              <img src="/product/top2.jpg" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="12" className="ad">
              <img src="/product/top3.jpg" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="12" className="ad">
              <img src="/product/top1.jpg" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="12" className="ad">
              <img src="/product/top2.jpg" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="12" className="ad">
              <img src="/product/top3.jpg" />
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>

      {/* ****************************** */}
      {/* 商品廣告 */}
      {/* <Row className="ads">
        <Col md="3" className="ad">
          <img src="/product/top1.jpg" />
        </Col>
        <Col md="6" className="ad main">
          <img src="/product/top2.jpg" />
        </Col>
        <Col md="3" className="ad">
          <img src="/product/top3.jpg" />
        </Col>
      </Row> */}
      <div className="phone-ad">
        <img src="/product/top1.jpg"></img>
      </div>
      {/* 新品上架 */}
      <div className="product-page-title">
        <p>新品上架</p>
      </div>
      <Row className="normal-cards-area">
        <Col className="normal-cards">
          <Row className="rows">
            {/* <div>
        {newProduct.map((data) => {
          return <div key={data.id}>{data.name}</div>;
        })}
      </div> */}
            {newProduct.map((data) => {
              return <LaunchedCard key={data.id} filterNewProduct={data} />;
            })}
            {/* <LaunchedCard/> */}
            {/* <NormalCard newProduct/>
            <NormalCard />
            <NormalCard />
            <NormalCard /> */}
          </Row>
        </Col>
      </Row>

      {/* 分類 */}
      <div className="category position-relative">
        <div className="type-title">｜ 產品分類 ｜</div>
        <div className="type">
          <Link href="/product/category/bow" className="item">
            <img src="/product/cate1.jpg"></img>
            <span className="text-decoration-none">良弓</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
          <Link href="/product/category/arrow" className="item">
            <img src="/product/cate2.jpg"></img>
            <span className="text-decoration-none">羽箭</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
          <Link href="/product/category/suit" className="item">
            <img src="/product/cate3.jpg"></img>
            <span className="text-decoration-none">道服</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
          <Link href="/product/category/other" className="item">
            <img src="/product/cate4.jpg"></img>
            <span className="text-decoration-none">其他</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
        </div>
      </div>
      {/* 手機板slogan */}
      <div className="phone-slogan">全店優惠滿$1,000 ，即可免運</div>
      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product">
            <div className="p-0">
              <p>所有商品</p>
            </div>
            <div className="p-0">
              <FilterBtns />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumb currentCate="所有商品" />
      </div>
      {/* 所有產品card */}
      <Row className="filter-cards-area">
        <Col md="auto" className="filter-cards">
          <Row className="rows">
            {allProduct.map((data) => {
              return <FilterProductCard key={data.id} filterProduct={data} />;
            })}
          </Row>
        </Col>
      </Row>

      {/* btn */}
      <LunaPagination />

      {/* 優惠專區 */}
      <div className="product-page-title">
        <p>優惠專區</p>
      </div>
      {/* ************** */}
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        pagination={true}
        history={{
          key: "slide",
        }}
        modules={[Navigation, Pagination, History]}
        className="mySwiper sale-product-swiper pt-5"
      >
        <SwiperSlide data-history="1">
          <Row className="sales">
            <Col md="12" xs="8" className="">
              <Row className="sales-row">
                <Col md="auto" xs="6" className="card p-0 m-2">
                  <SalesCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide data-history="Slide 2">
          <Row className="sales">
            <Col md="12" xs="8" className="">
              <Row className="sales-row">
                <Col md="auto" xs="6" className="card p-0 m-2">
                  <SalesCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide data-history="3">
          <Row className="sales">
            <Col md="12" xs="8" className="">
              <Row className="sales-row">
                <Col md="auto" xs="6" className="card p-0 m-2">
                  <SalesCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide data-history="Slide 4">
          <Row className="sales">
            <Col md="12" xs="8" className="">
              <Row className="sales-row">
                <Col md="auto" xs="6" className="card p-0 m-2">
                  <SalesCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide data-history="5">
          <Row className="sales">
            <Col md="12" xs="8" className="">
              <Row className="sales-row">
                <Col md="auto" xs="6" className="card p-0 m-2">
                  <SalesCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide data-history="Slide 6"></SwiperSlide>
        {/* <SwiperSlide data-history="7"></SwiperSlide>
        <SwiperSlide data-history="Slide 8"></SwiperSlide>
        <SwiperSlide data-history="9"></SwiperSlide> */}
      </Swiper>

      {/* ************** */}

      {/* <Row className="sales">
        <Col md="12" xs="8" className="">
          <Row className="sales-row">
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
          </Row>
        </Col>
      </Row> */}
      {/* 手機板 優惠專區 */}
      <div className="phone-sales">
        <div className="cards">
          <div className="img">
            <img src=""></img>
          </div>
          <div className="content">
            <div className="tag tag1">HOT</div>
            <div className="tag tag2">SALES</div>
            <div className="product-name">特選黑羽雞翅汝拉箭</div>
            <div className="price">$3000</div>
          </div>
        </div>
      </div>
      {/* inter */}
      <div className="inter-block text-center">真誠面對傳統，超越傳統。</div>

      {/* 相關商品推薦 */}
      <div className="product-page-title">
        <p>相關商品推薦</p>
      </div>
      <Row className="normal-cards-area">
        <Col className="normal-cards">
          <Row className="rows">
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
          </Row>
        </Col>
      </Row>
      <div className="product-under-space"></div>

      {/* *************TEST**************** */}
      <p></p>
    </>
  );
}
export default Product;
