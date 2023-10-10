import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import { Row, Col } from "react-bootstrap";

import ProductInfoAccordion from "@/components/accordion/product-info-accordion";
import FavBtn from "@/components/category/fav-btn";
import CartBtn from "@/components/category/cart-btn";
import Description from "@/components/category/description";
import QuantityBtn from "@/components/category/quantity-btn";
import Material from "@/components/attributes/material";
import Length from "@/components/attributes/length";
import Diameter from "@/components/attributes/diameter";
import RecommendedCard from "@/components/product/recommended-card";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, History, Autoplay } from "swiper/modules";

function Category() {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  console.log(product);
  console.log(product);
  // 获取当前页面的完整 URL
  // const currentUrl = router.asPath;
  // 获取当前页面的路径部分
  // const currentPath = router.pathname;
  // 获取查询参数
  const queryParams = router.query;
  console.log(queryParams);
  // 使用解构赋值获取 pid 属性的值
  const { pid } = queryParams;
  // 将 pid 转换为数字
  const id = parseInt(pid, 10);
  console.log(id);

  useEffect(() => {
    // setpId(router.query);
    // console.log(pid);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        try {
          const res = await axios.get(`http://localhost:3005/product/${id}`, {
            params: { pid: id },
          });
          console.log(id);
          //從後端接收:pid商品資料
          setProduct(res.data.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

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
            <img src={product.img1}></img>
          </div>
        </Col>
        <Col xl="4" md="5" className="product-info-select">
          <div className="product-info-des">
            <Description pidData={product}/>
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
      <ProductInfoAccordion pidData={product}/>
      {/* </div> */}

      {/* 相關商品推薦 */}
      <div className="product-page-title">
        <p>相關商品推薦</p>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper recommend-product-swiper"
      >
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
        <SwiperSlide>
          <RecommendedCard />
        </SwiperSlide>
      </Swiper>

      {/* ----------------------- */}
    </>
  );
}
export default Category;
