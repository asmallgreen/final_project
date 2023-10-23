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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faChevronDown,
  faChevronRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
//fontawesome
export default function Logobar() {
  const [ham, setHam] = useState(false);
  const [accordion1, setAccordion1] = useState(true);
  const [accordion2, setAccordion2] = useState(true);
  const [accordion3, setAccordion3] = useState(true);
  const [accordion4, setAccordion4] = useState(true);
  const [accordion5, setAccordion5] = useState(true);

  // console.log(ham);
  const handleHam = () => {
    setHam((prevState) => !prevState);
  };
  const handleAccordion1 = () => {
    setAccordion1((prevState) => !prevState);
    // console.log(accordion);
  };
  const handleAccordion2 = () => {
    setAccordion2((prevState) => !prevState);
    // console.log(accordion);
  };
  const handleAccordion3 = () => {
    setAccordion3((prevState) => !prevState);
    // console.log(accordion);
  };
  const handleAccordion4 = () => {
    setAccordion4((prevState) => !prevState);
    // console.log(accordion);
  };
  const handleAccordion5 = () => {
    setAccordion5((prevState) => !prevState);
    // console.log(accordion);
  };

  // const { authJWT } = useAuthJWT();
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
        router.push(process.env.BASE_URL || '/')
      }
      setHam((prevState) => !prevState);
    } catch (error) {}
  };
  return (
    <>
      <div className="logo-bar">
        <Link href="/">
          <img className="logo-img" src="/layout/logo-img.svg" />
          <img className="logo-text" src="/layout/logo-text.svg" />
        </Link>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="fa-bars btn"
        onClick={handleHam}
      />

      {/* 手機版ham 登入版*/}
      <div className={ham ? "ham-login" : "d-none"}>
        <div className="opac" onClick={handleHam}></div>
        <div className="btns p-0">
          <div className="info">
          {authJWT.isAuth ? (
              <>
                <Link href='/member/update-profile' className="img">
                  <img src={authJWT.memberData.member_img === 'avatar01.jpg'?'/Duo/avatar01.jpg':`http://localhost:3005/${authJWT.memberData.member_img}`} alt="" className="img-edit "></img>
                </Link>
              </>
            ) : (
              ""
            )}

            {authJWT.isAuth ? (
              <>
                <div className="text">Hi, {authJWT.memberData.name}</div>
              </>
            ) : (
              <>
                <div className="text">Hi, 訪客</div>
              </>
            )}
            {authJWT.isAuth ? (
              <>
                <Link
                  href="/member/update-profile"
                  className="edit align-items-center d-flex justify-content-center rounded-2"
                >
                  修改會員資料
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/member/register"
                  className="edit align-items-center d-flex justify-content-center rounded-2"
                  onClick={handleHam}
                >
                  註冊會員資料
                </Link>
              </>
            )}
          </div>
          {authJWT.isAuth ? (
            <>
              <div className="type d-flex justify-content-between">
                會員專區
                <FontAwesomeIcon
                  icon={accordion1 ? faChevronDown : faChevronRight}
                  onClick={handleAccordion1}
                />
              </div>
              <Link href="/member" className={accordion1 ? "fk" : "d-none"}>
                會員資料設定
              </Link>
              <Link
                href="/member/update-pwd"
                className={accordion1 ? "fk" : "d-none"}
              >
                修改密碼
              </Link>
              <Link
                href="/member/order-list"
                className={accordion1 ? "fk" : "d-none"}
              >
                訂單記錄
              </Link>
              <Link
                href="/member/fav-product"
                className={accordion1 ? "fk" : "d-none"}
              >
                我的收藏
              </Link>
              <Link
                href="/member/coupon"
                className={accordion1 ? "fk" : "d-none"}
              >
                我的優惠券
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* <Link href='/member/register' className={accordion1?'fk':'d-none'}>註冊</Link>
          <Link href='/member/login' className={accordion1?'fk':'d-none'}>登入</Link> */}
          <div className="type d-flex justify-content-between">
            商品分類
            <FontAwesomeIcon
              icon={accordion2 ? faChevronDown : faChevronRight}
              onClick={handleAccordion2}
            />
          </div>
          <Link
            href="/product/category/1"
            className={accordion2 ? "fk " : "d-none"}
            onClick={handleHam}
          >
            弓
          </Link>
          <Link
            href="/product/category/2"
            className={accordion2 ? "fk" : "d-none"}
            onClick={handleHam}
          >
            箭
          </Link>
          <Link
            href="/product/category/3"
            className={accordion2 ? "fk" : "d-none"}
            onClick={handleHam}
          >
            道服
          </Link>
          <Link
            href="/product/category/4"
            className={accordion2 ? "fk" : "d-none"}
            onClick={handleHam}
          >
            其他
          </Link>
          <div className="type d-flex justify-content-between">
            課程分類
            <FontAwesomeIcon
              icon={accordion3 ? faChevronDown : faChevronRight}
              onClick={handleAccordion3}
            />
          </div>
          <Link
            href="/course/1"
            className={accordion3 ? "fk" : "d-none"}
            onClick={handleHam}
          >
            初探
          </Link>
          <Link
            href="/course/2"
            className={accordion3 ? "fk" : "d-none"}
            onClick={handleHam}
          >
            進階
          </Link>
          <Link
            href="/course/3"
            className={accordion3 ? "fk" : "d-none"}
            onClick={handleHam}
          >
            專業
          </Link>
          <Link href="/venue" className="type d-block">
            場地租借
          </Link>
          <div className="type d-flex justify-content-between">
            功能選單
            <FontAwesomeIcon
              icon={accordion4 ? faChevronDown : faChevronRight}
              onClick={handleAccordion4}
            />
          </div>
          {/* <Link href='' className={accordion4?'fk':'d-none'}>熱銷商品</Link>
          <Link href='' className={accordion4?'fk':'d-none'}>瀏覽紀錄</Link> */}
          {authJWT.isAuth ? (
            <>
              {" "}
              <Link
                href="/cart"
                className={
                  accordion4
                    ? "fk d-flex justify-content-between align-content-center"
                    : "d-none"
                }
              >
                購物車
                {/* <div className="sesstion text-center">10</div> */}
              </Link>
            </>
          ) : (
            <></>
          )}

          <Link href="/member/coupon" className={accordion4 ? "fk" : "d-none"}>
            優惠總覽
          </Link>
          <Link href="" className="type d-block">
            關於良弓制販所
          </Link>
          {/* <div className="type d-flex justify-content-between">
            聯絡我們
            <FontAwesomeIcon
              icon={accordion5 ? faChevronDown : faChevronRight}
              onClick={handleAccordion5}
            />
          </div>
          <Link href="" className={accordion5 ? "fk" : "d-none"}>
            寫信給良弓
          </Link>
          <Link href="" className={accordion5 ? "fk" : "d-none"}>
            聯絡線上客服
          </Link> */}
          {authJWT.isAuth ? (
            <>
              <div href="/member/logout" className="logout" onClick={handleLogout}>
                登出
              </div>
            </>
          ) : (
            <>
              <Link href="/member/login" className="logout" onClick={handleHam}>
                登入
              </Link>
            </>
          )}
          {/* <div className="logout">登出</div> */}
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
