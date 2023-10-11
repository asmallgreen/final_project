import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
//AnimatedArrow
import AnimatedArrow from "@/components/product/animate-arrow.js";
import ConcentricCircles from "@/components/product/animate-concent-circle.js";
// 廣告
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, History, Autoplay } from "swiper/modules";

function Cate(props) {
  // const router = useRouter();
  // const [category, setCategory] = useState("所有商品");

  // // useEffect(() => {
  // //   // 取得當前網頁的網址
  // //   // const cateState = router.asPath;
  // //   const cateState = router.query;

  // //   // setCurrentUrl(currentUrl);
  // //   console.log(cateState);
  // //   let newCate = category;
  // //   console.log(newCate);
  // //   // let newCate
  // //   switch (cateState) {
  // //     case "/product/category/1":
  // //       newCate = "所有「弓」商品";
  // //       break;
  // //     case "/product/category/2":
  // //       newCate = "所有「箭」商品";
  // //       break;
  // //     case "/product/category/3":
  // //       newCate = "所有「道服」商品";
  // //       break;
  // //     case "/product/category/4":
  // //       newCate = "所有「其他」商品";
  // //       break;
  // //     default:
  // //       newCate = "所有商品";
  // //       break;
  // //   }
  // //   setCategory(newCate);
  // // }, [router.asPath, category]);

  // // const [offset, setOffset] = useState(0);
  // // const [sort, setSort] = useState("");
  // // const [page, setPage] = useState(1);
  // // const [limit, setLimit] = useState(5);
  // // const [dataLength, setDataLength] = useState();
  // // const [pageLength, setPageLength] = useState();
  // const [allProduct, setAllProduct] = useState([]);
  // const [product, setProduct] = useState([]);
  // const [newProduct, setNewProduct] = useState([]);

  // console.log(`排序:${sort}`);
  // console.log(`目前點選頁數:${page}`);
  // console.log(`目前顯示頁數:${limit}`);
  // console.log(`目前顯示產品:${product}`);
  // console.log(`產品共${dataLength}筆`);
  // console.log(`分頁長度:${pageLength}`);
  // console.log(allProduct);
  // console.log(dataLength);
  // console.log(pageLength);

  // const updateLimit = (newLimit) => {
  //   setLimit(newLimit);
  // };
  // const updatePage = (newPage) => {
  //   console.log(newPage);
  //   if (newPage !== undefined) {
  //     setPage(newPage);
  //   } else {
  //     setPage(1);
  //   }
  // };
  // const updateSort = (newSort) => {
  //   console.log(newSort);
  //   setSort(newSort);
  // };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     (async () => {
  //       try {
  //         // setDataLength(Object.entries(allProduct).length);
  //         // setPageLength(Math.ceil(dataLength / limit));
  //         const res = await axios.get("http://localhost:3005/product/category/${cate}", {
  //           params: { },
  //         });
  //         // console.log(sort);
  //         setAllProduct(res.data.alldata);
  //         setProduct(res.data.filterdata);
  //         setNewProduct(res.data.newdata);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }
  // }, []);

  const router = useRouter();
  const [allProduct, setAllProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  // 取得目前路由
  const routerQuery = router.query;
  console.log(routerQuery);
  console.log(allProduct);
  console.log(newProduct);
  // 將路由資訊轉型成整數
  const { cate } = routerQuery;
  const cateState = parseInt(cate, 10);
  console.log(cateState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        try {
          const res = await axios.get(
            `http://localhost:3005/product/category/${cate}`,
            {
              //           params: { },
            }
          );
          setAllProduct(res.data.alldata);
          setNewProduct(res.data.newdata);
          // setProduct(res.data.filterdata);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <>
      {/* **************** */}
      {/* 廣告 */}
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
      {/* 新品上架 */}
      <div className="product-page-title">
        <p>新品上架</p>
      </div>
      {/* <Router> */}
      <Swiper
        spaceBetween={0}
        slidesPerView={5}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper launched-product-swiper"
      >
        {newProduct.map((data) => {
          return (
            <SwiperSlide>
              <LaunchedCard key={data.id} filterNewProduct={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* </Router> */}

      {/* 分類 */}
      <div className="category position-relative">
        <div className="type-title">｜ 產品分類 ｜</div>
        <div className="type">
          <Link href="/product/category/1" className="item">
            <img src="/product/cate1.jpg" alt="img"></img>
            <span className="text-decoration-none">良弓</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
          <Link href="/product/category/2" className="item">
            <img src="/product/cate2.jpg" alt="img"></img>
            <span className="text-decoration-none">羽箭</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
          <Link href="/product/category/3" className="item">
            <img src="/product/cate3.jpg" alt="img"></img>
            <span className="text-decoration-none">道服</span>
            <div className="animate-content-circle position-absolute">
              <ConcentricCircles />
            </div>
            <div className="animate-arrow">
              <AnimatedArrow />
            </div>
          </Link>
          <Link href="/product/category/4" className="item">
            <img src="/product/cate4.jpg" alt="img"></img>
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
      {/*/////////////// filterBtn待處理 ///////////////*/}
      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product">
            <div className="p-0">
              <p>所有商品</p>
            </div>
            <div className="p-0">
              {/* <FilterBtns
                limit={limit}
                setLimit={updateLimit}
                setSort={updateSort}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumb currentCate="所有商品" />
      </div>
      {/* 所有產品card */}
      {/* <Row className="filter-cards-area">
        <Col md="auto" className="filter-cards">
          <Row className="rows">
            {product.map((data) => {
              return <FilterProductCard key={data.id} filterProduct={data} />;
            })}
          </Row>
        </Col>
      </Row> */}
      {/* btn */}
      {/* <LunaPagination
        dataLength={dataLength}
        pageLength={pageLength}
        setPage={updatePage}
        page={page}
        limit={limit}
      /> */}
      {/* setPage={updatePage} */}
      {/* 優惠專區 */}
      <div className="product-page-title">
        <p>優惠專區</p>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination, History]}
        className="mySwiper sale-product-swiper pt-5"
      >
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
        <SwiperSlide>
          <SalesCard />
        </SwiperSlide>
      </Swiper>
      {/* 手機板 優惠專區 */}
      <div className="phone-sales">
        <div className="cards">
          <div className="img">
            <img src="" alt="img"></img>
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
      <div className="product-under-space"></div>

      {/* *************TEST**************** */}
    </>
  );
}
export default Cate;
