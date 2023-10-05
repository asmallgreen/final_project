import React from "react";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faChevronDown,
  faChevronRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
//fontawesome
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
// import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* 桌機版nav */}
      <div className="table-nav position-relative">
        <ul className="nav position-absolute">
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">關於良弓</Link>
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
            <Link href="/product" className="titleLi">弓道課程</Link>
          </li>
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">場地租借</Link>
          </li>
          <li className="list-unstyled">
            <Link href="/product" className="titleLi">聯絡我們</Link>
          </li>
        </ul>

        <ul className="nav-fk">
          <Form className="list-unstyled search-form">
            <Form.Control
              type="text"
              placeholder="請輸入商品名稱"
              className="search-product-name rounded-5 position-relative"
            />
            <FaSearch className="fa-magnifying-glass position-absolute " />
          </Form>
          <li className="list-unstyled">
            <Link href="/cart">
              {" "}
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
