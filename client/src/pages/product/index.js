import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import SalesCard from "@/components/product/sales-card";
import FilterProductCard from "@/components/product/filter-card";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import LunaPagination from "@/components/pagination/luna-pagination";
import ScrollsCircle from "@/components/scroll-btn/scrolls-circle";
import FilterBtns from "@/components/product/filter-btns";
import RecommendedCard from "@/components/product/recommended-card";
import LaunchedCard from "@/components/product/launched-card";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import Swal from "sweetalert2";

function Product() {
  // const [productList ,setproductList] = useState(null);
  // const [cateData, setCateData] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

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

  // const triggerFav = (allProduct, id) => {
  //   return allProduct.map((v, i) => {
  //     if (v.id === id) return { ...v, is_favorite: !v.is_favorite }
  //     return { ...v }
  //   })
  // }

  const handleTriggerProductFav = async (id) => {
    // 在陣列中->移出，不在陣列中加入
    // console.log(id);
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

  // 未登入時，會出現請先登入的內容
  // if (!authJWT.isAuth)
  //   return (
  //     <>
  //       <p>需要先登入</p>
  //       <Link href="/member/login">登入</Link>
  //     </>
  //   )
  return (
    <>
      {/* 商品廣告 */}
      <Row className="ads">
        <Col md="3" className="ad">
          <img src="/product/top1.jpg" />
        </Col>
        <Col md="6" className="ad main">
          <img src="/product/top2.jpg" />
        </Col>
        <Col md="3" className="ad">
          <img src="/product/top3.jpg" />
        </Col>
      </Row>
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
          <Link href="/product/bow" className="item">
            <img src="/product/cate1.jpg"></img>
            <span className="text-decoration-none">弓</span>
          </Link>
          <Link href="/product/arrow" className="item">
            <img src="/product/cate2.jpg"></img>
            <span className="text-decoration-none">箭</span>
          </Link>
          <Link href="/product/suit" className="item">
            <img src="/product/cate3.jpg"></img>
            <span className="text-decoration-none">道服</span>
          </Link>
          <Link href="/product/other" className="item">
            <img src="/product/cate4.jpg"></img>
            <span className="text-decoration-none">其他</span>
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
              return <FilterProductCard key={data.id} id={data.id} filterProduct={data} is_favorite={isProductFavorited(data.id)} handleTriggerProductFav={handleTriggerProductFav}/>;
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
      <Row className="sales">
        <Col md="12" xs="8" className="">
          <Row className="sales-row">
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
            <Col md="auto" xs="6" className="card p-0 m-2">
              <SalesCard />
            </Col>
          </Row>
        </Col>
      </Row>
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
           <RecommendedCard/>
           <RecommendedCard/>
           <RecommendedCard/>
           <RecommendedCard/>
           <RecommendedCard/>
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
