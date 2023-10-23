import React from "react";
import Link from "next/link";
//fontawesome
import { FaLocationDot, FaCopyright } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <>
      {/* 電腦footer */}
      <div className="footer">
        <div className="logo">
          <img className="logo-img" src="/layout/logo-img.svg" />
          <img className="logo-text" src="/layout/logo-text.svg" />
        </div>
        <div className="footer-buttons">
          <div className="button rounded-0">
            <div className="btn rounded-0">寫信給良弓</div>
            <div className="btn rounded-0">聯絡客服</div>
          </div>
          <ul className="list-unstyled">
            <li>營業時間：10:00-19:00</li>
            <li>連絡電話： 03-4253057</li>
            <li>
              <FaLocationDot className="me-2 fa-solid fa-location-dot" />
              桃園市中壢區新生路二段421號
            </li>
            <li>
              <FaCopyright className="me-2 fa-regular fa-copyright" />
              2023良弓制販所
            </li>
          </ul>
        </div>
      </div>
      {/* 手機bottom */}
      <div className="bottom-btn">
        <Link href='/' className="btn home d-flex justify-content-center">
          <div>
            <img className="logo-img2" src="/layout/logo2-img-green.svg" />
            <img className="logo-img " src="/layout/logo-img.svg" />
          </div>
          <div>首頁</div>
        </Link>
        <Link href='/cart' className="btn position-relative">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="fa-solid fa-2xl fa-cart-shopping"
          ></FontAwesomeIcon>
          {/* <span className="notify position-absolute top-0 rounded-circle">
            5
          </span> */}
          購物車
        </Link>

        <Link href='/member/fav-product' className="btn fav position-relative">
          <FontAwesomeIcon
            icon={faHeart}
            className="fa-solid fa-2xl fa-heart"
          ></FontAwesomeIcon>
          {/* <span className="notify position-absolute top-0 rounded-circle">
            3
          </span> */}
          收藏
        </Link>
        <Link href='/member/order-list' className="btn search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="fa-solid fa-2xl fa-magnifying-glass"
          ></FontAwesomeIcon>
          訂單
        </Link>
        <Link href='/member' className="btn member">
          <FontAwesomeIcon
            icon={faUser}
            className="fa-solid fa-2xl fa-user"
          ></FontAwesomeIcon>
          會員
        </Link>
      </div>
    </>
  );
}
