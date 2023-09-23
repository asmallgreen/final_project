import Nav from "react-bootstrap/Nav";
// import { library } from '@fortawesome/fontawesome-svg-core';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faShoppingCart,
  faUser,
  faSearch,
  faLocationDot,
  faCopyright,
  faMagnifyingGlass,
  faHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function PublicNav() {
  return (
    <>
      {/* 桌機版logo */}
      <div className="logo-bar d-flex justify-content-center align-items-center">
        {/* <img src={process.env.PUBLIC_URL + "/logo_text.png"} alt="Logo Text" /> */}
        <img src="/logo_text.png" />
        LOGO
        <img />
        TEXT
        {/* <img src="./logo_1.png"/> */}
        {/* <img src="../../../public/logo_text.png"></img> */}
      </div>
      {/* 桌機版nav */}
      <div className="table-nav position-relative d-flex align-items-center mx-3">
        <ul className="nav position-absolute top-0 d-flex justify-content-center align-items-center">
          <li className="list-unstyled">
            <a href="/">關於良弓</a>
          </li>
          <li className="list-unstyled">
            <a href="/">商品介紹</a>
          </li>
          <li className="list-unstyled">
            <a href="/">弓道課程</a>
          </li>
          <li className="list-unstyled">
            <a href="/">場地租借</a>
          </li>
          <li className="list-unstyled">
            <a href="/">聯絡我們</a>
          </li>
        </ul>
        <ul className="nav-fk d-flex position-absolute top-0 end-0 align-items-center">
          <li className=" align-items-center list-unstyled d-flex">
            <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass" />
            <input
              className="form-control ms-3"
              type="text"
              placeholder="請輸入商品名稱"
            />
          </li>
          <li className="list-unstyled">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="fa-cart-shopping"
            />
          </li>
          <li className="list-unstyled">
            <FontAwesomeIcon icon={faUser} className="fa-user" />
          </li>
        </ul>
      </div>
      {/* 手機版logo */}
      {/* 手機版nav */}
      <div className="phone-nav d-flex mx-3">
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

      {/* 手機版 button */}
      <div className="bottom-btn d-flex justify-content-around">
        <div className="btn home d-flex flex-column">
          <FontAwesomeIcon icon={faHouse} className="fa-solid fa-2xl fa-house"></FontAwesomeIcon>
          {/* <img className="logo" src="./images/logo1.png" alt="123" /> */}
          首頁
        </div>
        <div className="btn cart position-relative">
          <FontAwesomeIcon icon={faShoppingCart} className="fa-solid fa-2xl fa-cart-shopping"></FontAwesomeIcon>
          <span className="notify position-absolute top-0 rounded-circle">5</span>
          購物車
        </div>

        <div className="btn fav position-relative">
          <FontAwesomeIcon icon={faHeart} className="fa-solid fa-2xl fa-heart"></FontAwesomeIcon>
          <span className="notify position-absolute top-0 rounded-circle">3</span>
          收藏
        </div>
        <div className="btn search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-solid fa-2xl fa-magnifying-glass"></FontAwesomeIcon>
          搜尋
        </div>
        <div className="btn member">
          <FontAwesomeIcon icon={faUser} className="fa-solid fa-2xl fa-user"></FontAwesomeIcon>會員
        </div>
      </div>

      {/* footer */}
      <div className="footer d-flex">
        <div className="logo d-flex flex-column justify-content-center align-items-center">
          <img src="" />
          LOGO
          <img src="" />
          text
        </div>
        <div className="d-flex">
          <div className="button d-flex flex-column rounded-0">
            <div className="btn rounded-0">信給良弓</div>
            <div className="btn rounded-0">聯絡客服</div>
          </div>
          <ul className="list-unstyled d-flex flex-column justify-content-between">
            <li>營業時間：10:00-19:00</li>
            <li>連絡電話： 03-4253057</li>
            <li>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="me-2 fa-solid fa-location-dot"
              />
              桃園市中壢區新生路二段421號
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCopyright}
                className="me-2 fa-regular fa-copyright"
              />
              2023良弓制販所
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PublicNav;
