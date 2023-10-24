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
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import Swal from "sweetalert2";
import { set, values } from "lodash";
// 購物車按鈕們
import AddCartProduct from "@/components/cart/addCartProduct";
import CountCom from "@/components/cart/countCom";
// 購物車按鈕們

function Pid() {
  // 購物車專用
  const [cartQuantity, setCartQuantity] = useState(1);
  const [n, setN] = useState(3);
  const [activeValues, setActiveValues] = useState("");

  const handleClick = (e, tableIndex, index) => {
    const targetBtn = document.querySelectorAll(
      `.dtlBtnGroup .${tables[tableIndex].replace("_", "-")}-style `
    );
    // 移除所有按鈕的 active 類別
    targetBtn.forEach((btn) => {
      btn.classList.remove("dtlActive");
    });

    // 為目標按鈕添加 active 類別
    e.target.classList.add("dtlActive");
    const activeElements = document.querySelectorAll(".dtlActive");
    const limitLength = document.querySelectorAll(".dtlBtnGroup");
    const Values = Array.from(activeElements).map((el) => el.value);
    // console.log("調換前"+Values)
    // const temp = Values[0];
    //  Values[0] =  Values[1];
    //  Values[1] = temp;
    // // setActiveValues(Values);
    // console.log("調換後"+Values)

    console.log("value長度 ", Values.length);

    if (Values.length < limitLength.length) {
      setActiveValues("");
    } else {
      const str = Values.map((obj) => obj).join(",");
      setActiveValues(str);
      console.log("activeValues" + activeValues);
    }
  };

  // 購物車專用

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

  // 購物車有改
  const getButtonStyle = (tableName) => {
    switch (tableName) {
      case "bow_strength":
        return "bow-strength-style ";
      case "bow_meterial":
        return "bow-meterial-style";
      case "bow_length":
        return "bow-length-style";

      case "arrow_length":
        return "arrow-length-style ";
      case "arrow_meterial":
        return "arrow-meterial-style";
      case "arrow_shaft":
        return "arrow-shaft-style";

      case "suit_color":
        return "suit-color-style ";
      case "suit_size":
        return "suit-size-style";

      default:
        return ""; // 默认样式，可以是空字符串或其他默认样式
    }
  };
  // 購物車有改


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

  // 會員收藏商品
  const { authJWT,favoriteProducts, setFavoriteProducts } = useAuthJWT()
  const memberId = authJWT.memberData.id
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
  if (!authJWT.isAuth){
    Swal.fire({
      icon: 'warning',
      title: '請先登入',
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      // width: '35%',
      padding: '0 0 3.25em',
      customClass: {
        width:'shadow-sm'
      }
  })
  return
}
    if (favoriteProducts.includes(id)) {
// 如果在陣列中，執行移除收藏
      try{
        const res = await axios.delete(`http://localhost:3005/member/${id}`,
        {
          data:{memberId},
          withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
        })
        console.log(res.data);
        if(res.data.message === '已取消收藏'){
          await Swal.fire({
            icon: 'success',
            title: '商品已取消收藏',
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(255, 255, 255, 0.55)`,
            // width: '35%',
            padding: '0 0 3.25em',
            customClass: {
              width:'shadow-sm'
            }
          })
        }
      }catch(error){
        console.log(error);
      }
      setFavoriteProducts(favoriteProducts.filter((v) => v !== id))
    } else {
// 如果不在陣列中，執行加入收藏
      try{
        const res = await axios.put(`http://localhost:3005/member/${id}`,
        {memberId},
        {
          withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
        })
        console.log(res.data);

        if(res.data.message === '商品收藏成功'){
          await Swal.fire({
            icon: 'success',
            title: '商品收藏成功',
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(255, 255, 255, 0.55)`,
            // width: '35%',
            padding: '0 0 3.25em',
            customClass: {
              width:'shadow-sm'
            }
          })
        }
      }catch(error){
        console.log(error);
      }
      setFavoriteProducts([...favoriteProducts, id])
    }
  }


  return (
    <>
      {/* 麵包屑 */}
      <div className="product-info-crum">
        <BreadCrumb currentPage={cate} />
      </div>
      {/* *********************** */}
      <Row>
        <Col xl="5" md="5" className="product-info-img offset-md-1 offset-xl-1">
          <div className="img">
            <img src={product.img1} alt=""></img>
          </div>
        </Col>
        <Col xl="4" md="5" className="product-info-select">
          <div className="product-info-des">
            <Description pidData={product} />
          </div>
          {/* 屬性按鈕 */}
          <div className="attribute-area">
            <div className="attribute-title">
              {attrTitle &&
                attrTitle.flat().map((v, index) => (
                  <div className="attr-title-style" key={index}>
                    {v}
                  </div>
                ))}
            </div>

            {/* 購物車有改 */}
            <div className="dtlBtnSection">
              {attrValue &&
                Array.isArray(attrValue) &&
                attrValue.map((tableData, tableIndex) => (
                  <div
                    className="d-flex dtlBtnGroup"
                    key={tableIndex}
                    id={tableIndex}
                  >
                    {tableData.map((v, index) => (
                      <button
                        className={`btn attr-value-style 
                        ${getButtonStyle(tables[tableIndex])}`}
                        key={`${tableIndex}-${index}`}
                        onClick={(e) => {
                          handleClick(e, tableIndex, index);
                        }}
                        value={v}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                ))}
            </div>
            {/* 購物車有改 */}
          </div>

          <div className="product-info-attr">
            {/* <Material /> */}
            {/* <Length /> */}
            {/* <Diameter /> */}
          </div>

          <div className="product-info-btns">
            {/* 數量按鈕 */}
            <QuantityBtn setCartQuantity={setCartQuantity} />
            {/* 購物車 收藏按鈕 */}
            <div className="product-info-btn">
              <FavBtn
                is_favorite={isProductFavorited(id)}
                id={id}
                handleTriggerProductFav={handleTriggerProductFav}
              />
              <CartBtn
                cartQuantity={cartQuantity}
                prodId={id}
                activeValues={activeValues}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* *********************** */}

      {/* 商品資訊(手風琴) */}
      <ProductInfoAccordion pidData={product} />
      {/* </div> */}
      <div className="inter-img">
        <img src="/product/inter.jpg" alt=""></img>
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
        {randomProducts.map((data, index) => (
          <SwiperSlide key={index}>
            <RecommendedCard key={data.id} filterRecommendProduct={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ----------------------- */}
    </>
  );
}

export default Pid;
