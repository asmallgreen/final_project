import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import { Row, Col } from "react-bootstrap";

import ProductInfoAccordion from "@/components/accordion/product-info-accordion";
import FavBtn from "@/components/category/fav-btn";
import CartBtn from "@/components/category/cart-btn";
import { FaShoppingCart } from "react-icons/fa";
import Description from "@/components/category/description";
import QuantityBtn from "@/components/category/quantity-btn";
// import Material from "@/components/attributes/material";
// import Length from "@/components/attributes/length";
// import Diameter from "@/components/attributes/diameter";
import RecommendedCard from "@/components/product/recommended-card";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, History, Autoplay } from "swiper/modules";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import { useProductCart } from "@/hooks/use-product-cart";
import Swal from "sweetalert2";
import { add } from "lodash";

function Pid() {
  const router = useRouter();
  const queryParams = router.query;
  const { pid } = queryParams;
  const id = parseInt(pid, 10);
  const [product, setProduct] = useState({});
  const [tables, setTables] = useState([]);
  const [attrValue, setAttrValue] = useState([]);
  const [attrTitle, setAttrTitle] = useState([]);
  const [activeAttrs, setActiveAttrs] = useState(Array(attrValue.length).fill(-1));
  const [newQuantity, setNewQuantity] = useState(1);
  const { productCart, products, addProduct, plusOneProduct, minusOneProduct } =
    useProductCart();

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

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);
  // useEffect(() => {
  //   console.log(tables);
  // }, []);
  // useEffect(() => {
  //   console.log(attrTitle);
  // }, [attrTitle]);
  // useEffect(() => {
  //   console.log(attrValue);
  // }, [attrValue]);

  // 會員收藏商品
  const { authJWT, favoriteProducts, setFavoriteProducts } = useAuthJWT();
  const memberId = authJWT.memberData.id;
  // 拿出會員收藏的所有商品id
  // console.log(favoriteProducts);
  // const [products, setProducts] = useState([])
  // 判斷是否該商品id有在收藏資料表，有代表已收藏
  function isProductFavorited(productId) {
    return favoriteProducts.includes(productId);
  }

  const handleTriggerProductFav = async (id) => {
    // 在陣列中->移出，不在陣列中加入
    // console.log(id);
    // 未登入時，會出現請先登入的內容
    if (!authJWT.isAuth) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: "35%",
        padding: "0 0 3.25em",
        customClass: {},
      });
    }
    if (favoriteProducts.includes(id)) {
      // 如果在陣列中，執行移除收藏
      try {
        const res = await axios.delete(`http://localhost:3005/member/${id}`, {
          data: { memberId },
          withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
        });
        console.log(res.data);
        if (res.data.message === "已取消收藏") {
          await Swal.fire({
            icon: "success",
            title: "商品已取消收藏",
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(255, 255, 255, 0.55)`,
            width: "35%",
            padding: "0 0 3.25em",
            customClass: {},
          });
        }
      } catch (error) {
        console.log(error);
      }
      setFavoriteProducts(favoriteProducts.filter((v) => v !== id));
    } else {
      // 如果不在陣列中，執行加入收藏
      try {
        const res = await axios.put(
          `http://localhost:3005/member/${id}`,
          { memberId },
          {
            withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
          }
        );
        console.log(res.data);

        if (res.data.message === "商品收藏成功") {
          await Swal.fire({
            icon: "success",
            title: "商品收藏成功",
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(255, 255, 255, 0.55)`,
            width: "35%",
            padding: "0 0 3.25em",
            customClass: {},
          });
        }
      } catch (error) {
        console.log(error);
      }
      setFavoriteProducts([...favoriteProducts, id]);
    }
  };

  //購物車區塊選擇
  // console.log(product);
  // console.log(activeAttrs);
  const handleButtonClick = (tableIndex, valueIndex) => {
    const updatedActiveAttrs = [...activeAttrs];
    updatedActiveAttrs[tableIndex] = valueIndex;
    setActiveAttrs(updatedActiveAttrs);

    //console.log規格出來
    // const activeValues = updatedActiveAttrs.map((value, index) => {
    //   if (value === -1) {
    //     return "未選擇";
    //   } else {
    //     const valueTable = attrValue[index];
    //     const activeValue = valueTable[value];
    //     return activeValue;
    //   }
    // });

    // console.log(activeValues);
  };
  //數量Btn
  const handleQuantityChange = (newQuantity) => {
    console.log("回傳父層的數量=", newQuantity);
  };

 

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
            <img src={product.img1} alt={product.title}></img>
          </div>
        </Col>
        <Col xl="5" md="5" className="product-info-select">
          <div className="product-info-des">
            <Description pidData={product} />
          </div>
          {/* 屬性按鈕 */}
          <div className="d-flex">
            <div className="">
              {attrTitle &&
                attrTitle.flat().map((v, index) => (
                  <div
                    className={`attr-title-style ${
                      activeAttrs[index] !== -1 ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(index, -1)}
                    key={index}
                  >
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
                        )} ${
                          activeAttrs[tableIndex] === index ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick(tableIndex, index)}
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
            <QuantityBtn
            quantity={newQuantity}
             onQuantityChange={handleQuantityChange}
            />
            {/* 購物車 收藏按鈕 */}
            <div className="product-info-btn">
              <FavBtn
                is_favorite={isProductFavorited(id)}
                id={id}
                handleTriggerProductFav={handleTriggerProductFav}
              />
              {/* <CartBtn
                onClick={() => {
                  addProduct({
                  });
                }}
              /> */}
              <Col md="6" xs="12">
                <button
                  className="cart-btn btn"
                  onClick={() => {
                    const activeAttrValues = activeAttrs.map((value, index) => {
                      if (value === -1) {
                        return "未選擇";
                      } else {
                        const valueTable = attrValue[index];
                        const activeValue = valueTable[value];
                        return activeValue;
                      }
                    });
                    addProduct({
                      id: product.id,
                      name: product.name,
                      detail_1: activeAttrValues[0],
                      detail_2: activeAttrValues[1],
                      detail_3: activeAttrValues[2],
                      quantity: newQuantity,
                      price: product.price,
                    });
                  }}
                >
                  <FaShoppingCart className="me-2" />
                  加入購物車
                </button>
              </Col>
            </div>
          </div>
        </Col>
      </Row>

      {/* *********************** */}

      {/* 商品資訊(手風琴) */}
      <ProductInfoAccordion pidData={product} />
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

export default Pid;
