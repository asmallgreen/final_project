import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
//fontawesome
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);



  const handleSearch = () => {
    // 在点击 FaSearch 图标时，只更新 searchValue 的值
    // 搜索请求会在 useEffect 中触发
    setSearchValue(searchValue);
    console.log(searchValue)
    console.log(searchResults);
  };
  useEffect(() => {
    //检查 searchValue 经过修剪后的值是否不等于空字符串。
    if (searchValue.trim() !== "") {
      // 向后端API发送请求
      fetch(`http://localhost:3005/prodcut/getProductName?name=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          // 处理从后端获取的数据并将结果存储在searchResults状态中
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("搜索失败", error);
        });
    }
  }, [searchValue]);
  return (
    <>
      {/* 桌機版nav */}
      <div className="table-nav position-relative">
        <ul className="nav position-absolute">
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">
              關於良弓
            </Link>
          </li>
          <li className="list-unstyled product-page">
            <Link href="/product">商品介紹</Link>
            <div className="hover-type position-absolute">
              <Link href="/product/bow">
                <div className="box">
                  <img src="/layout/type1.png" />
                  <div className="text">
                    <span className="text-bottom">弓</span>
                  </div>
                </div>
              </Link>
              <Link href="/product/arrow">
                <div className="box">
                  <img src="/layout/type2.png" />
                  <div className="text">
                    <span className="text-bottom">箭</span>
                  </div>
                </div>
              </Link>
              <Link href="/product/suit">
                <div className="box">
                  <img src="/layout/type3.png" />
                  <div className="text">
                    <span className="text-bottom">道服</span>
                  </div>
                </div>
              </Link>
              <Link href="/product/other">
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
            <Link href="/product" className="titleLi">
              弓道課程
            </Link>
          </li>
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">
              場地租借
            </Link>
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
                className="search-product-name rounded-5"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
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
        </ul>
      </div>
      {/* 在这里显示搜索结果 */}
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
      {/* 手機版nav */}
      <div className="phone-nav">
        <ul className="nav">
          <li>
            <Link href="/">首頁</Link>
          </li>
          <li>
            <Link href="/">商店</Link>
          </li>
          <li>
            <Link href="/">課程</Link>
          </li>
          <li>
            <Link href="/">場地</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
