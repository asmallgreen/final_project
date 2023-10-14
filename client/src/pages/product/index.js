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

import { Navigation, Pagination, History, Autoplay } from "swiper/modules";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import Swal from "sweetalert2";

function Product() {
  // const [offset, setOffset] = useState(0);
  const [attr, setAttr] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [dataLength, setDataLength] = useState();
  const [pageLength, setPageLength] = useState();
  const [allProduct, setAllProduct] = useState([]);
  // const product = allProduct;
  const newProduct = allProduct.filter((product) => product.launched === 1);
  const [filterProduct, setFilterProduct] = useState([]);
  // const [newProduct, setNewProduct] = useState([]);
  // console.log(`篩選:${attr}`);
  // console.log(`排序:${sort}`);

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
    // console.log(newSort);
    setSort(newSort);
  };
  const updateAttr = (newAttr) => {
    // console.log(newAttr);
    setAttr(newAttr);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3005/product", {
          params: { limit, page, sort, attr },
        });
        console.log(limit,page,sort,attr);
        setAllProduct(res.data.alldata);
        setDataLength(Object.entries(res.data.alldata).length);
        setPageLength(Math.ceil((Object.entries(res.data.alldata).length) / limit));
        setFilterProduct(res.data.filterdata);
        // setNewProduct(res.data.newdata);
      } catch (error) {
        console.log(error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  useEffect(() => {
    // console.log(allProduct);
  }, [allProduct]);

  useEffect(() => {
    setPageLength(Math.ceil(dataLength / limit));
    // console.log(limit);
  }, [limit]);

  useEffect(() => {
    // console.log(dataLength);
  }, [dataLength]);

  useEffect(() => {
    // console.log(pageLength,limit);
  }, [pageLength,limit]);

  useEffect(() => {
    // console.log(page);
  }, [page]);
  useEffect(() => {}, []);
  useEffect(() => {}, []);

  // dataLength, pageLength, limit, page, sort, attr

  // const router = useRouter();

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
      width: '35%',
      padding: '0 0 3.25em',
      customClass: {
      }
  })
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
            width: '35%',
            padding: '0 0 3.25em',
            customClass: {
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
            width: '35%',
            padding: '0 0 3.25em',
            customClass: {
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
      {/* **************** */}

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
      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product">
            <div className="p-0">
              <p>所有商品</p>
            </div>
            <div className="p-0">
              <FilterBtns
                limit={limit}
                setLimit={updateLimit}
                setSort={updateSort}
                setAttr={updateAttr}
                dataLength={dataLength}
              />
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
            {filterProduct.map((data) => {
              return <FilterProductCard key={data.id} filterProduct={data} is_favorite={isProductFavorited(data.id)} handleTriggerProductFav={handleTriggerProductFav}/>;
            })}
          </Row>
        </Col>
      </Row>
      {/* btn */}
      <LunaPagination
        dataLength={dataLength}
        pageLength={pageLength}
        setPage={updatePage}
        page={page}
        limit={limit}
      />
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
      <p></p>
    </>
  );
}
export default Product;
