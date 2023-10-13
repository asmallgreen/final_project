import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import FilterProductCard from "@/components/product/filter-card";
import CourseListItemCard from "@/components/course-list/CourseListItemCard";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import LunaPagination from "@/components/pagination/luna-pagination";
import FilterBtns from "@/components/product/filter-btns";
import LaunchedCard from "@/components/product/launched-card";
import { Container } from "react-bootstrap";
//AnimatedArrow
// 廣告
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, History, Autoplay } from "swiper/modules";

function CourseList() {
  const [limit, setLimit] = useState(5);
  const [allCourse, setAllCourse] = useState([]);

  // console.log(`目前顯示頁數:${limit}`);
  // console.log(`所有產品:${allProduct}`);
  // console.log(`新上架產品:${newProduct}`);
  const updateLimit = (newLimit) => {
    setLimit(newLimit);
  };
  // console.log(filterProduct);
  //抓所有課程
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        try {
          // const newLimitData = { limit:limit}
          const res = await axios.get("http://localhost:3005/course", {
            params: { limit },
          });
          //   console.log(res.data)
          setAllCourse(res.data.coursePageAsc);

          //   // 所有商品總筆數
          //   const dataLength = Object.entries(allProduct).length;
          //   console.log(`資料共${dataLength}筆`);
          //   const dataLimit = 3; // 每頁的資料限制
          //   let pageLength;
          //   const page = Math.ceil(dataLength / dataLimit);
          //   // 如果資料總數小於等於每頁資料限制，只需一頁
          //   pageLength = dataLength <= dataLimit ? 1 : page;
          //   console.log(`總頁數: ${pageLength}`);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [router.pathname, limit]);

  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper ad-swiper"
      >
        <SwiperSlide>
          <Row className="ads">
            <Col md="3" className="ad">
              <img src="/product/top1.jpg" alt="img" />
            </Col>
            <Col md="6" className="ad main">
              <img src="/product/top2.jpg" alt="img" />
            </Col>
            <Col md="3" className="ad">
              <img src="/product/top3.jpg" alt="img" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="3" className="ad">
              <img src="/product/top1.jpg" alt="top1.jpg" />
            </Col>
            <Col md="6" className="ad main">
              <img src="/product/top2.jpg" alt="img" />
            </Col>
            <Col md="3" className="ad">
              <img src="/product/top3.jpg" alt="img" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="3" className="ad">
              <img src="/product/top1.jpg" alt="img" />
            </Col>
            <Col md="6" className="ad main">
              <img src="/product/top2.jpg" alt="img" />
            </Col>
            <Col md="3" className="ad">
              <img src="/product/top3.jpg" alt="img" />
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          <Row className="ads">
            <Col md="3" className="ad">
              <img src="/product/top1.jpg" alt="img" />
            </Col>
            <Col md="6" className="ad main">
              <img src="/product/top2.jpg" alt="img" />
            </Col>
            <Col md="3" className="ad">
              <img src="/product/top3.jpg" alt="img" />
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
      <div className="phone-ad">
        <img src="/product/top1.jpg" alt="img"></img>
      </div>
      {/* <Router> */}
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper launched-product-swiper"
      >
        {/* {newProduct.map((data) => {
          return (
            <SwiperSlide>
              <LaunchedCard key={data.id} filterNewProduct={data} />
            </SwiperSlide>
          );
        })} */}
      </Swiper>
      {/* </Router> */}

      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product">
            <div className="p-0">
              <p>所有課程</p>
            </div>
            <div className="p-0">
              <FilterBtns limit={limit} setLimit={updateLimit} />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumb currentCate="所有課程" />
      </div>
      {/* 所有產品card */}
      <div className="course-list container">
        <Container>
          {allCourse.map((data) => {
            {/* console.log(data); */}
            return <CourseListItemCard key={data.id} CourseData={data} />;
          })}
        </Container>
      </div>
      {/* <FilterProductCard/> */}
      {/* btn */}
      {/* <LunaPagination /> */}
    </>
  );
}
export default CourseList;
