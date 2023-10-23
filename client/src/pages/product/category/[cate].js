import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { all } from "axios";
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
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import Swal from "sweetalert2";

function Cate(props) {
  const router = useRouter();
  const { cate } = router.query;
  const [search, setSearch] = useState("");
  const [attr, setAttr] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();
  // ************************************
  const [allProduct, setAllProduct] = useState([]);
  const newProduct = allProduct.filter((product) => product.launched === 1);
  const saleProduct = allProduct.filter((product) => product.sale === 1);
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

  const [filterProduct, setFilterProduct] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [alldataLength, setAlldataLength] = useState();
  const [filterdataLength, setFilterdataLength] = useState();
  const [displaydataLength, setDisplaydataLength] = useState();
  const [pageLength, setPageLength] = useState();
  // ***********************************************
  let currentPage;
  switch (cate) {
    case "1":
      currentPage = "良弓";
      break;
    case "2":
      currentPage = "羽箭";
      break;
    case "3":
      currentPage = "道服";
      break;
    case "4":
      currentPage = "其他";
      break;
  }
  // console.log(currentPage);
  const updateLimit = (newLimit) => {
    setLimit(newLimit);
    // console.log(limit);
  };
  const handleSearchName = (name) => {
    setSearch(name);
    // console.log(name);
    // console.log(search);
  };
  const updatePage = (newPage) => {
    if (newPage !== undefined) {
      setPage(newPage);
      // console.log(page);
    } else {
      setPage(1);
    }
  };
  const updateSort = (newSort) => {
    setSort(newSort);
    setPage(1);
    // console.log(sort);
  };
  const updateAttr = (newAttr) => {
    setAttr(newAttr);
    setPage(1);
    // console.log(newAttr);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/product/category/${cate}`,
          {
            params: { sort, attr, limit, page, cate, search },
          }
        );
        setAllProduct(res.data.catedata);
        setFilterProduct(res.data.filterdata);
        setDisplayProduct(res.data.displaydata);
        setAlldataLength(res.data.alldataLength);
        setFilterdataLength(res.data.filterdataLength);
        setDisplaydataLength(res.data.displaydataLength);
        setPageLength(res.data.pageLength);
      } catch (error) {
        console.log(error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [limit, page, sort, attr, cate, search]);
  useEffect(() => {
    // console.log(cate);
    // setCategory(cate);
  }, [cate]);
  // useEffect(() => {
  //   console.log(category);
  //   // setCategory(cate)
  // }, [category]);

  // ****************************
  const [slidesPerView, setSlidesPerView] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      // 在這裡設置你的視窗寬度閾值
      const windowWidth4 = 1140;
      const windowWidth3 = 768;
      const windowWidth2 = 500;
      const windowWidth1 = 393;

      // 根據視窗寬度動態設定 slidesPerView
      if (window.innerWidth <= windowWidth1) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= windowWidth2) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= windowWidth3) {
        setSlidesPerView(3);
      } else if (window.innerWidth <= windowWidth4) {
        setSlidesPerView(6);
      } else {
        setSlidesPerView(7);
      }
    };

    // 初始加載時設定一次
    handleResize();

    // 添加視窗大小變化監聽器
    window.addEventListener("resize", handleResize);

    // 清理事件監聽器以避免內存洩漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 空的依賴數組表示僅在第一次渲染時運行

  const [slidesPerView2, setSlidesPerView2] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      // 在這裡設置你的視窗寬度閾值
      const windowWidth4 = 1140;
      const windowWidth3 = 768;
      const windowWidth2 = 500;
      const windowWidth1 = 393;

      // 根據視窗寬度動態設定 slidesPerView
      if (window.innerWidth <= windowWidth1) {
        setSlidesPerView2(1);
      } else if (window.innerWidth <= windowWidth2) {
        setSlidesPerView2(1);
      } else if (window.innerWidth <= windowWidth3) {
        setSlidesPerView2(1);
      } else if (window.innerWidth <= windowWidth4) {
        setSlidesPerView2(2);
      } else {
        setSlidesPerView2(4);
      }
    };

    // 初始加載時設定一次
    handleResize();

    // 添加視窗大小變化監聽器
    window.addEventListener("resize", handleResize);

    // 清理事件監聽器以避免內存洩漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 空的依賴數組表示僅在第一次渲染時運行

  // ****************************

  useEffect(() => {}, [search]);
  useEffect(() => {
    // console.log(currentPage);
  }, [currentPage]);
  useEffect(() => {
    // console.log(allProduct);
  }, [allProduct]);
  useEffect(() => {
    // console.log(filterProduct);
  }, [filterProduct]);
  useEffect(() => {
    // console.log(displayProduct);
  }, [displayProduct]);
  useEffect(() => {
    // console.log(alldataLength);
  }, [alldataLength]);
  useEffect(() => {
    // console.log(filterdataLength);
  }, [filterdataLength]);
  useEffect(() => {
    // console.log(displaydataLength);
  }, [displaydataLength]);
  useEffect(() => {
    // console.log(pageLength);
  }, [pageLength]);
  useEffect(() => {
    // console.log(page);
  }, [page]);

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
        // console.log(res.data);
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
        // console.log(res.data);

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
      {/* **************** */}
      {/* 廣告 */}

      <Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={3}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        initialSlide={1}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper ad-swiper"
      >
      {/* <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top1.jpg" alt="img" />
        <img src="/product/top2.jpg" alt="img" />
        <img src="/product/top3.jpg" alt="img" />
        </div>
      </div>
      </Link>
      </SwiperSlide> */}
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top2.jpg" alt="img" />
        </div>
        </div>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top3.jpg" alt="img" />
        </div>
        </div>   
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top1.jpg" alt="img" />
        </div>
        </div>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
         <div className="ads">
        <div className="ad">
        <img src="/product/top2.jpg" alt="img" />
        </div>
        </div>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top3.jpg" alt="img" />
        </div>
        </div>  
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top4.jpg" alt="img" />
        </div>
        </div>  
      </Link>
      </SwiperSlide>
      </Swiper>
      <div className="phone-ad">
        <img src="/product/top1.jpg" alt="img"></img>
      </div>
      {/* 新品上架 */}
      <div className="product-page-title">
        <p>新品上架</p>
      </div>
      <Swiper
        spaceBetween={0}
        slidesPerView={slidesPerView}
        navigation={true}
        // pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper launched-product-swiper"
      >
        {newProduct.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              <LaunchedCard  filterNewProduct={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
   
     

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
              <p>{currentPage} 所有商品</p>
            </div>
            <div className="p-0">
              <FilterBtns
                limit={limit}
                setLimit={updateLimit}
                setSort={updateSort}
                setAttr={updateAttr}
                searchName={handleSearchName}
                filterdataLength={filterdataLength}
                //要dataLength幹嘛?抓篩選旁邊的篩選筆數ui
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumb currentCate="所有商品" currentPage={currentPage} />
      </div>
      {/* 所有產品card */}
      <Row className="filter-cards-area">
        <Col md="auto" className="filter-cards">
          <Row className="rows">
            {displayProduct.map((data) => {
              return <FilterProductCard key={data.id} filterProduct={data} is_favorite={isProductFavorited(data.id)} handleTriggerProductFav={handleTriggerProductFav}/>;
            })}
          </Row>
        </Col>
      </Row>
      {/* btn */}
      <LunaPagination
        dataLength={filterdataLength}
        pageLength={pageLength}
        setPage={updatePage}
        page={page}
        limit={limit}
      />

      {/* 優惠專區 */}
      <div className="product-page-title">
        <p>優惠專區</p>
      </div>
      <Swiper
        spaceBetween={5}
        slidesPerView={slidesPerView2}
        navigation={true}
        // pagination={true}
        modules={[Navigation, Pagination, History]}
        className="mySwiper sale-product-swiper"
      >
        {saleProduct.map((data) => {
          return (
            <SwiperSlide key={data.id}  >
              <SalesCard filterSaleProduct={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* 手機板 優惠專區 */}
      {/* <div className="phone-sales">
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
      </div> */}
      {/* inter */}
      <div className="inter-block text-center">真誠面對傳統，超越傳統。</div>
      {/* 相關商品推薦 */}
      <div className="product-page-title">
        <p>相關商品推薦</p>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper recommend-product-swiper"
      >
        {randomProducts.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              <RecommendedCard filterRecommendProduct={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="product-under-space"></div>

      {/* *************TEST**************** */}
    </>
  );
}
export default Cate;
