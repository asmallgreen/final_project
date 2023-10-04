import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import NormalCard from "../../components/product/normal-card";
import SalesCard from "@/components/product/sales-card";
import FilterProductCard from "@/components/product/filter-product-card";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";
import LunaPagination from "@/components/pagination/luna-pagination";
import ScrollsCircle from "@/components/scroll-btn/scrolls-circle";
import FilterBtns from "@/components/product/filter-btns";


function Product() {
  // const [productList ,setproductList] = useState(null);
  // const [cateData, setCateData] = useState(null);
  const [allProduct, setAllProduct] = useState([]);

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
        console.log(allProduct)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(allProduct);
  }, [allProduct]);

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
  return (
    <>

      {/* 商品廣告 */}
      <Row className="ads">
        <Col md="3" className="ad">
          <img src="/images/product/top1.jpg" />
        </Col>
        <Col md="6" className="ad main">
          <img src="/images/product/top2.jpg" />
        </Col>
        <Col md="3" className="ad">
          <img src="/images/product/top3.jpg" />
        </Col>
      </Row>
      <div className="phone-ad">
        <img src=""></img>
      </div>
      {/* 新品上架 */}
      <div className="product-page-title">
        <p>新品上架</p>
      </div>
      <Row className="normal-cards-area">
        <Col className="normal-cards">
          <Row className="rows">
            <NormalCard title={123} />
            <NormalCard />
            <NormalCard />
            <NormalCard />
          </Row>
        </Col>
      </Row>

      {/* 分類 */}
      <div className="category position-relative">
        <div className="type-title">｜ 產品分類 ｜</div>
        <div className="type">
          <div className="item">
            <img src=""></img>
            <Link href="/product/bow">弓</Link>
          </div>
          <div className="item">
            <img src=""></img>
            <Link href="/product/arrow">箭</Link>
          </div>
          <div className="item">
            <img src=""></img>
            <Link href="/product/suit">道服</Link>
          </div>
          <div className="item">
            <img src=""></img>
            <Link href="/product/other">其他</Link>
          </div>
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
{/* 
      <div>
        {allProduct.map((product) => {
          return <div key={product.id}>{product.name}</div>;
        })}
      </div> */}


      <Row className="filter-cards-area">
        <Col md="auto" className="filter-cards">
          <Row className="rows">
            {allProduct.map((productData) => {
              return (
                <FilterProductCard  key={productData.id} filterProduct={productData}/>
              )
            })}

            {/* <FilterProductCard />
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
            <NormalCard />
            <NormalCard />
            <NormalCard />
            <NormalCard />
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
