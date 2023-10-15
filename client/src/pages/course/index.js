import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import CourseListItemCard from "@/components/course-list/CourseListItemCard";
import BreadCrumbCourse from "@/components/bread-crumb/bread-crumb-course";
import LunaPagination from "@/components/pagination/luna-pagination";
import FilterBtns from "@/components/course-list/filter-btns";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, History, Autoplay } from "swiper/modules";

function CourseList() {
  const [attr, setAttr] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();
  //
  const [allCourse, setAllCourse] = useState([]);
  const newCourse = allCourse.filter((product) => product.launched === 1);
  const [filterCourse, setFilterCourse] = useState([]);
  const [displayCourse, setDisplayCourse] = useState([]); //OK
  const [alldataLength, setAlldataLength] = useState();
  const [filterdataLength, setFilterdataLength] = useState();
  const [displaydataLength, setDisplaydataLength] = useState();
  const [pageLength, setPageLength] = useState();

  //
  const updateLimit = (newLimit) => {
    setLimit(newLimit);
  };
  const updatePage = (newPage) => {
    if (newPage !== undefined) {
      setPage(newPage);
    } else {
      setPage(1);
    }
  };
  const updateSort = (newSort) => {
    setSort(newSort);
    setPage(1);
  };
  const updateAttr = (newAttr) => {
    setAttr(newAttr);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get("http://localhost:3005/course", {
          params: { limit, page, sort, attr },
        });
        // console.log(res.data);
        setAllCourse(res.data.allCourse);
        setFilterCourse(res.data.filterCourse);
        setDisplayCourse(res.data.displaydata);
        setAlldataLength(res.data.alldataLength);
        setFilterdataLength(res.data.filterdataLength);
        setDisplaydataLength(res.data.displaydataLength);
        setPageLength(res.data.pageLength);
      }catch{
        console.log("error");
      }
    };

    if(typeof window !== "undefined"){
      fetchData();
    }
  }, [limit, page, sort, attr]);
  useEffect(() => {
    console.log(allCourse);
  }, [allCourse]);
  useEffect(() => {
    console.log(filterCourse);
  }, [filterCourse]);
  // useEffect(() => {
  //   console.log(displayCourse);
  // }, [displayCourse]);
  useEffect(() => {
    console.log(alldataLength);
  }, [alldataLength]);
  useEffect(() => {
    console.log(filterdataLength);
  }, [filterdataLength]);
  useEffect(() => {
    console.log(displaydataLength);
  }, [displaydataLength]);
  useEffect(() => {
    console.log(pageLength);
  }, [pageLength]);
  useEffect(() => {
    console.log(page);
  }, [page]);
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
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper launched-product-swiper"
      >
      </Swiper>
     

      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product">
            <div className="p-0">
              <p>所有課程</p>
            </div>
            <div className="p-0">
            <FilterBtns
                limit={limit}
                setLimit={updateLimit}
                setSort={updateSort}
                setAttr={updateAttr}
                filterdataLength={filterdataLength}
                //要dataLength幹嘛?抓篩選旁邊的篩選筆數ui
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumbCourse currentPage="所有課程" />
      </div>
      {/* 所有產品card */}
      <div className="course-list container">
        <Container>
          {displayCourse.map((data) => {
            return <CourseListItemCard key={data.id} CourseData={data} />;
          })}
        </Container>
      </div>
      {/* <FilterProductCard/> */}
      {/* btn */}
      <LunaPagination
        dataLength={filterdataLength}
        pageLength={pageLength}
        setPage={updatePage}
        page={page}
        limit={limit}
      />
    </>
  );
}
export default CourseList;
