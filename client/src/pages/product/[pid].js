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

function Pid() {
  const router = useRouter();

  const queryParams = router.query;
  const { pid } = queryParams;
  const id = parseInt(pid, 10);
  const [allProduct, setAllProduct] = useState([]);
  const [product, setProduct] = useState({});
  // ************************隨機商品***************************************
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  // 複製一份原始陣列，避免修改原始資料
  const shuffledProducts = shuffleArray([...allProduct]);
  // 從隨機排序後的陣列中取得前 10 個元素
  const randomProducts = shuffledProducts.slice(0, 10);

  // const hotProduct = allProduct.filter((product) => product.hot === 1);
  // ***************************************************************

  const [tables, setTables] = useState();
  const [attrValue, setAttrValue] = useState();
  const [attrTitle, setAttrTitle] = useState();
  const [cate, setCate] = useState();
  const getButtonStyle = (tableName) => {
    switch (tableName) {
      case "bow_strength":
        return "bow-strength-style ";
      case "bow_meterial":
        return "bow-material-style";
      case "bow_length":
        return "bow-length-style";
      default:
        return ""; // 默认样式，可以是空字符串或其他默认样式
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !product.length) {
      (async () => {
        try {
          const res = await axios.get(`http://localhost:3005/product/${id}`, {
            params: { pid: id },
          });
          //從後端接收:pid商品資料
          setAllProduct(res.data.alldata);
          setProduct(res.data.data);
          setTables(res.data.tables);
          setAttrValue(res.data.attrValue);
          setAttrTitle(res.data.attrTitle);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [pid]);
  useEffect(() => {
    // console.log(allProduct);
  }, [allProduct]);
  useEffect(() => {
    // console.log(cate);
  }, [cate]);
  useEffect(() => {
    // console.log(product);
    switch (product.category_id) {
      case 1:
        setCate("良弓");
        break;
      case 2:
        setCate("羽箭");
        break;
      case 3:
        setCate("道服");
        break;
      case 4:
        setCate("其他");
        break;
    }
    // console.log(cate);
  }, [product]);
  useEffect(() => {
    // console.log(tables);
  }, []);
  useEffect(() => {
    // console.log(attrTitle);
  }, [attrTitle]);
  useEffect(() => {
    // console.log(attrValue);
  }, [attrValue]);
  return (
    <>
      {/* 麵包屑 */}
      <div className="product-info-crum">
        <BreadCrumb currentPage={cate} />
      </div>
      {/* *********************** */}
      <Row>
        <Col xl="5" md="5" className="product-info-img offset-md-1 offset-xl-2">
          <div className="img">
            <img src={product.img1} alt=""></img>
          </div>
        </Col>
        <Col xl="4" md="5" className="product-info-select">
          <div className="product-info-des">
            <Description pidData={product} />
          </div>
          {/* 屬性按鈕 */}
          <div className="d-flex">
            <div className="">
              {attrTitle &&
                attrTitle.flat().map((v, index) => (
                  <div className="attr-title-style" key={index}>
                    {v}
                  </div>
                ))}
            </div>

            <div className="">
              {attrValue &&
                Array.isArray(attrValue) &&
                attrValue.map((tableData, tableIndex) => (
                  <div className="d-flex" key={tableIndex}>
                    {tableData.map((v, index) => (
                      <div
                        className={`btn attr-value-style ${getButtonStyle(
                          tables[tableIndex]
                        )}`}
                        key={index}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>

          <div className="product-info-attr">
            {/* <Material /> */}
            {/* <Length /> */}
            {/* <Diameter /> */}
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
      <ProductInfoAccordion pidData={product} />
      {/* </div> */}
      <div className="inter-img">
        {/* <img src="/product/top2.jpg" alt=""></img> */}
      </div>
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
        {randomProducts.map((data) => {
          return (
            <SwiperSlide>
              <RecommendedCard key={data.id} filterRecommendProduct={data} />
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>
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
        </SwiperSlide> */}
      </Swiper>

      {/* ----------------------- */}
    </>
  );
}

export default Pid;
