import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

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
                <img src="/type1.png" />
                <div className="text">弓</div>
              </div>
              <div className="box">
                <img src="/type1.png" />
                <div className="text">箭</div>
              </div>
              <div className="box">
                <img src="/type1.png" />
                <div className="text">道服</div>
              </div>
              <div className="box">
                <img src="/type1.png" />
                <div className="text">其他</div>
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

        <ul className="nav-fk d-flex position-absolute top-0 end-0 align-items-center">
          <li className=" align-items-center list-unstyled d-flex  ">
            <input
              className="form-control ms-3 rounded-5 position-relative"
              type="text"
              placeholder="請輸入商品名稱"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="fa-magnifying-glass position-absolute"
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
    </>
  );
}
