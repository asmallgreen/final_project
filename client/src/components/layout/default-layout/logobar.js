import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faChevronDown,
  faChevronRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
//fontawesome
export default function Logobar() {
  return (
    <>
      <div className="logo-bar d-flex justify-content-center align-items-center">
        <Link href="/">
          <img className="logo-img" src="/layout/logo-img.svg" />
          <img className="logo-text" src="/layout/logo-text.svg" />
        </Link>

      </div>
        <FontAwesomeIcon
        icon={faBars}
        className="fa-bars position-absolute btn"
      />
      
      {/* 手機版ham 登入版*/}
      <div className="ham-login position-absolute top-0 end-0">
        <div className="opacity-50"></div>
        <div className="btns p-0">
          <div className="info d-flex align-items-center justify-content-between">
            <div className="img">
              <div className="img-edit opacity-50"></div>
            </div>
            <div className="text">Hi, 慕朵</div>
            <div className="edit align-items-center d-flex justify-content-center rounded-2">
              修改會員資料
            </div>
          </div>
          <div className="type d-flex justify-content-between">
            會員專區
            <FontAwesomeIcon
              icon={faChevronDown}
              className="fa-solid fa-chevron-down"
            />
          </div>
          <div className="fk">會員資料設定</div>
          <div className="fk">修改密碼</div>
          <div className="fk">訂單記錄</div>
          <div className="fk">我的收藏</div>
          <div className="fk">我的優惠券</div>
          <div className="type d-flex justify-content-between">
            商品分類
            <FontAwesomeIcon
              icon={faChevronDown}
              className="fa-solid fa-chevron-down"
            />
          </div>
          <div className="fk">弓</div>
          <div className="fk">箭</div>
          <div className="fk">道服</div>
          <div className="fk">其他</div>
          <div className="type d-flex justify-content-between">
            課程分類
            <FontAwesomeIcon
              icon={faChevronDown}
              className="fa-solid fa-chevron-down"
            />
          </div>
          <div className="fk">初探</div>
          <div className="fk">進階</div>
          <div className="fk">專業</div>
          <div className="type">場地租借</div>
          <div className="type d-flex justify-content-between">
            功能選單
            <FontAwesomeIcon
              icon={faChevronDown}
              className="fa-solid fa-chevron-down"
            />
          </div>
          <div className="fk">熱銷商品</div>
          <div className="fk">瀏覽紀錄</div>
          <div className="fk d-flex justify-content-between align-content-center">
            購物車
            <div className="sesstion text-center">10</div>
          </div>
          <div className="fk">優惠總覽</div>
          <div className="type">關於良弓制販所</div>
          <div className="type d-flex justify-content-between">
            聯絡我們
            <FontAwesomeIcon
              icon={faChevronDown}
              className="fa-solid fa-chevron-down"
            />
          </div>
          <div className="fk">寫信給良弓</div>
          <div className="fk">聯絡線上客服</div>
          <div className="logout">登出</div>
        </div>
      </div>
      {/* 手機版ham 登出版 */}
      {/* <div className="ham-logout position-absolute">
        <div className="opacity-50"></div>
        <div className="btn p-0">
          <div className="type d-flex justify-content-between">
            商品分類
            <FontAwesomeIcon
              icon={faChevronRight}
              className="fa-solid fa-chevron-right"
            />
          </div>
          <div className="fk">弓</div>
          <div className="fk">箭</div>
          <div className="fk">道服</div>
          <div className="fk">其他</div>
          <div className="type d-flex justify-content-between">
            課程分類
            <FontAwesomeIcon
              icon={faChevronRight}
              className="fa-solid fa-chevron-right"
            />
          </div>
          <div className="type">場地租借</div>
          <div className="type d-flex justify-content-between">
            功能選單
            <FontAwesomeIcon
              icon={faChevronRight}
              className="fa-solid fa-chevron-right"
            />
          </div>
          <div className="type">關於良弓制販所</div>
          <div className="type d-flex justify-content-between">
            聯絡我們
            <FontAwesomeIcon
              icon={faChevronRight}
              className="fa-solid fa-chevron-right"
            />
          </div>
          <div className="login">註冊 / 登入</div>
        </div>
      </div> */}
    </>
  );
}
