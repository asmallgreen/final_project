import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faChevronDown,
  faChevronRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
//fontawesome
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* 桌機版nav */}
      <div className="table-nav position-relative d-flex align-items-center">
        <ul className="nav position-absolute top-0 d-flex justify-content-center align-items-center">
          <li className="list-unstyled">
            <a href="/product">關於良弓</a>
          </li>
          <li className="list-unstyled product-page">
            <a href="/product">商品介紹</a>

            <div className="hover-type d-flex justify-content-center position-absolute align-items-center">
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">弓</span>
                </div>
              </div>
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">箭</span>
                </div>
              </div>
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">道服</span>
                </div>
              </div>
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">其他</span>
                </div>
              </div>
            </div>
            <div className="hover-space position-absolute"></div>
          </li>
          <li className="list-unstyled">
            <a href="/product">弓道課程</a>
          </li>
          <li className="list-unstyled">
            <a href="/product">場地租借</a>
          </li>
          <li className="list-unstyled">
            <a href="/product">聯絡我們</a>
          </li>
        </ul>

        <ul className="nav-fk  top-0 end-0 align-items-center">
          <li className=" align-items-center list-unstyled d-flex  ">
            <input
              className="form-control ms-3 rounded-5 position-relative bg-light"
              type="text"
              placeholder="請輸入商品名稱"
            />
            <FaSearch className="fa-magnifying-glass position-absolute" />
          </li>
          <li className="list-unstyled">
            <FaShoppingCart className="fa-cart-shopping" />
          </li>
          <li className="list-unstyled">
            <Link href='/member' className="text-decoreation-none"><FaUser className="fa-user" /></Link>
          </li>
        </ul>
      </div>

      {/* 手機版nav */}
      <div className="phone-nav d-flex">
        <ul className="nav d-flex justify-content-center align-items-center">
          <li>
            <a href="/">首頁</a>
          </li>
          <li>
            <a href="/">商店</a>
          </li>
          <li>
            <a href="/">課程</a>
          </li>
          <li>
            <a href="/">場地</a>
          </li>
        </ul>
        
      </div>



    </>
  );
}
