import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
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

function Product() {
  // 判斷目前網址狀態
  // const [currentUrl, setCurrentUrl] = useState();
  // filter category的所有產品
  const [cateProduct, setCateProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

  // 透過path改變ui狀態
  const [category, setCategory] = useState("所有商品");
  const router = useRouter();

  useEffect(() => {
    // 取得當前網頁的網址
    const currentUrl = router.asPath;
    // setCurrentUrl(currentUrl);
    console.log(currentUrl);
    let newCate = category;
    // let newCate
    switch (currentUrl) {
      case "/product/bow":
        newCate = "所有「弓」商品";
        break;
      case "/product/arrow":
        newCate = "所有「箭」商品";
        break;
      case "/product/suit":
        newCate = "所有「道服」商品";
        break;
      case "/product/other":
        newCate = "所有「其他」商品";
        break;
      default:
        newCate = "所有商品";
        break;
    }
    setCategory(newCate);
  }, [router.asPath, category]);

  useEffect(() => {
    (async () => {
      try {
        const currentUrl = router.asPath;
        console.log(currentUrl);
        const res = await axios.get(`http://localhost:3005${currentUrl}`, []);
        console.log(res.data);
        // console.log(res.data.products);
        setCateProduct(res.data.catedata);
        setNewProduct(res.data.launchedData);
        console.log(cateProduct);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router.asPath]);

  useEffect(() => {
    console.log(newProduct);
    console.log(cateProduct);
  }, [cateProduct, newProduct]);

  return (
    <>
      {/* test */}

      <div>
        {/* <p>當前網頁的網址是：{currentUrl}</p> */}
        {/* <p>當前的newCate：{newCate}</p> */}
        {/* <p>當前的setCategory：{category}</p> */}
      </div>

      {/* //////////////////////////////////// */}
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
            {newProduct.map((data) => {
              return <LaunchedCard key={data.id} filterNewProduct={data} />;
            })}
          </Row>
        </Col>
      </Row>

      {/* 分類 */}
      <div className="category position-relative">
        <div className="type-title">｜ 產品分類 ｜</div>
        <div className="type">
          <Link href="/product/bow" className="item">
            <img src="/product/cate1.jpg"></img>
            <span>弓</span>
          </Link>
          <Link href="/product/arrow" className="item">
            <img src="/product/cate2.jpg"></img>
            <span>箭</span>
          </Link>
          <Link href="/product/suit" className="item">
            <img src="/product/cate3.jpg"></img>
            <span>道服</span>
          </Link>
          <Link href="/product/other" className="item">
            <img src="/product/cate4.jpg"></img>
            <span>其他</span>
          </Link>
        </div>
      </div>
      {/* 手機板slogan */}
      <div className="phone-slogan">全店優惠滿$1,000 ，即可免運</div>
      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product">
            <div className="p-0">
              <p>{category}</p>
            </div>
            <div className="p-0">
              <FilterBtns />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumb currentCate={category} />
      </div>
      {/* 所有產品card */}
      <Row className="filter-cards-area">
        <Col md="auto" className="filter-cards">
          <Row className="rows">
            {cateProduct.map((productData) => {
              return (
                <FilterProductCard
                  key={productData.id}
                  filterProduct={productData}
                />
              );
            })}
            {/* <FilterProductCard />
            <FilterProductCard />
            <FilterProductCard />
            <FilterProductCard />
            <FilterProductCard />
            <FilterProductCard /> */}
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
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
          </Row>
        </Col>
      </Row>
      <div className="product-under-space"></div>

      {/* *************TEST**************** */}
    </>
  );
}
export default Product;
