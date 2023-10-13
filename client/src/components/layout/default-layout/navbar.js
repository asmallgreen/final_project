import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Form } from "react-bootstrap";
//fontawesome
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// 登入後才會顯示登出按鈕
import { FiLogOut } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import axios from "axios";
import { useRouter } from "next/router";
import { result } from "lodash";
import { useProductContext } from "../../../hooks/use-product-context.js";

export default function Navbar() {
  const { authJWT, setAuthJWT } = useAuthJWT();
  const router = useRouter();
  // 首頁路由

  const homeRoute = "/";
  // 隱私頁面路由，登出時會，檢查後跳轉至首頁

  const protectedRoutes = [
    "/member",
    "/member/update-profile",
    "member/update-pwd",
    "/member/order-list",
    "/member/coupon",
    "/member/fav-product",
    "/cart",
  ];
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3005/member/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.message === "success") {
        setAuthJWT({
          isAuth: false,
          memberData: {
            id: 0,
            account: "",
            name: "",
            email: "",
            level: "",
            created_date: "",
          },
        });
        if (protectedRoutes.includes(router.pathname)) {
          router.push(homeRoute);
        }
      }
    } catch (error) {}
  };

  // *****************************
  const [keyword, setKeyword] = useState("");
  // const [results, setResults] = useState([]);
  const { updateResults } = useProductContext();
  // console.log(keyword);
  console.log(updateResults);
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/product/searchProduct?keyword=${keyword}`
      );
      // setResults(res.data);
      updateResults(res.data.searchProducts); // 假設 API 回傳的資料結構中有 searchProducts
    } catch (error) {
      console.error("Error:", error.msg);
    }
  };
  // *****************************
  return (
    <>
      {/* {results &&
        results.searchProducts &&
        results.searchProducts.length > 0 && (
          <div>
            {" "}
            <ul>
              {results.searchProducts.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        )} */}

      {/* 桌機版nav */}
      <div className="table-nav position-relative">
        <ul className="nav position-absolute">
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">關於良弓</Link>
          </li>
          <li className="list-unstyled product-page">
            <Link href="/product">商品介紹</Link>
            <div className="hover-type position-absolute">
              <Link href="/product/category/bow">
                <div className="box">
                  <img src="/layout/type1.png" />
                  <div className="text">
                    <span className="text-bottom">弓</span>
                  </div>
                </div>
              </Link>
              <Link href="/product/category/arrow">
                <div className="box">
                  <img src="/layout/type2.png" />
                  <div className="text">
                    <span className="text-bottom">箭</span>
                  </div>
                </div>
              </Link>
              <Link href="/product/category/suit">
                <div className="box">
                  <img src="/layout/type3.png" />
                  <div className="text">
                    <span className="text-bottom">道服</span>
                  </div>
                </div>
              </Link>
              <Link href="/product/category/other">
                <div className="box">
                  <img src="/layout/type4.png" />
                  <div className="text">
                    <span className="text-bottom">其他</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="hover-space position-absolute"></div>
          </li>
          <li className="list-unstyled">
            <Link href="/course" className="titleLi">
              弓道課程
            </Link>
          </li>
          <li className="list-unstyled">
            <Link href="/venue" className="titleLi">場地租借</Link>
          </li>
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">
              聯絡我們
            </Link>
          </li>
        </ul>

        <ul className="nav-fk">
          <Form className="list-unstyled search-form">
          <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="請輸入商品名稱"
                className="search-product-name"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <FaSearch
                className="fa-magnifying-glass position-absolute"
                onClick={handleSearch}
              />
            </div>
          </Form>
          <li className="list-unstyled">
            <Link href="/cart">
              <FaShoppingCart className="fa-cart-shopping" />
            </Link>
          </li>
          <li className="list-unstyled">
            <Link href="/member" className="text-decoreation-none">
              <FaUser className="fa-user" />
            </Link>
          </li>
          {authJWT.isAuth && (
            <li className="list-unstyled">
              <Button onClick={handleLogout}>
                <FiLogOut className="fi-logout" />
              </Button>
            </li>
          )}
        </ul>
      </div>
      {/* 在这里显示搜索结果 */}
      {/* <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div> */}
      {/* 手機版nav */}
      <div className="phone-nav">
        <ul className="nav">
          <li>
            <Link href="/">首頁</Link>
          </li>
          <li>
            <Link href="/product">商店</Link>
          </li>
          <li>
            <Link href="/course">課程</Link>
          </li>
          <li>
            <Link href="/venue">場地</Link>
          </li>
        </ul>
      </div>
    </>
  );
}