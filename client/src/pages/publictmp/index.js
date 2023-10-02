// import Nav from "react-bootstrap/Nav";
// // import { library } from '@fortawesome/fontawesome-svg-core';
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// //fontawesome
// import {
//   faShoppingCart,
//   faUser,
//   faSearch,
//   faLocationDot,
//   faCopyright,
//   faMagnifyingGlass,
//   faHeart,
//   faHouse,
//   faChevronDown,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";

// function PublicNav() {
//   return (
//     <>
    
//       {/* 手機版logo */}
//       <div className="phone-logo-bar d-flex justify-content-center align-items-center">
//         <img className="logo-img" src="/logo-img.svg" />
//         <img className="logo-text" src="/logo-text.svg" />
//       </div>
//       {/* 手機版nav */}
//       <div className="phone-nav d-flex">
//         <ul className="nav d-flex justify-content-center align-items-center">
//           <li>
//             <a href="/">首頁</a>
//           </li>
//           <li>
//             <a href="/">商店</a>
//           </li>
//           <li>
//             <a href="/">課程</a>
//           </li>
//           <li>
//             <a href="/">場地</a>
//           </li>
//         </ul>
//       </div>

//       {/* 手機版ham 登入版*/}
//       <div className="ham-login d-flex">
//         <div className="opacity-50"></div>
//         <div className="btns p-0">
//           <div className="info d-flex align-items-center justify-content-between">
//             <div className="img">
//               <div className="img-edit opacity-50"></div>
//             </div>
//             <div className="text">Hi, 慕朵</div>
//             <div className="edit align-items-center d-flex justify-content-center rounded-2">
//               修改會員資料
//             </div>
//           </div>
//           <div className="type d-flex justify-content-between">
//             會員專區
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               className="fa-solid fa-chevron-down"
//             />
//           </div>
//           <div className="fk">會員資料設定</div>
//           <div className="fk">修改密碼</div>
//           <div className="fk">訂單記錄</div>
//           <div className="fk">我的收藏</div>
//           <div className="fk">我的優惠券</div>
//           <div className="type d-flex justify-content-between">
//             商品分類
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               className="fa-solid fa-chevron-down"
//             />
//           </div>
//           <div className="fk">弓</div>
//           <div className="fk">箭</div>
//           <div className="fk">道服</div>
//           <div className="fk">其他</div>
//           <div className="type d-flex justify-content-between">
//             課程分類
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               className="fa-solid fa-chevron-down"
//             />
//           </div>
//           <div className="fk">初探</div>
//           <div className="fk">進階</div>
//           <div className="fk">專業</div>
//           <div className="type">場地租借</div>
//           <div className="type d-flex justify-content-between">
//             功能選單
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               className="fa-solid fa-chevron-down"
//             />
//           </div>
//           <div className="fk">熱銷商品</div>
//           <div className="fk">瀏覽紀錄</div>
//           <div className="fk d-flex justify-content-between align-content-center">
//             購物車
//             <div className="sesstion text-center">10</div>
//           </div>
//           <div className="fk">優惠總覽</div>
//           <div className="type">關於良弓制販所</div>
//           <div className="type d-flex justify-content-between">
//             聯絡我們
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               className="fa-solid fa-chevron-down"
//             />
//           </div>
//           <div className="fk">寫信給良弓</div>
//           <div className="fk">聯絡線上客服</div>
//           <div className="logout">登出</div>
//         </div>
//       </div>
//       {/* 手機版ham 登出版 */}
//       <div className="ham-logout d-flex">
//         <div className="opacity-50"></div>
//         <div className="btn p-0">
//           <div className="type d-flex justify-content-between">
//             商品分類
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="fa-solid fa-chevron-right"
//             />
//           </div>
//           <div className="fk">弓</div>
//           <div className="fk">箭</div>
//           <div className="fk">道服</div>
//           <div className="fk">其他</div>
//           <div className="type d-flex justify-content-between">
//             課程分類
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="fa-solid fa-chevron-right"
//             />
//           </div>
//           <div className="type">場地租借</div>
//           <div className="type d-flex justify-content-between">
//             功能選單
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="fa-solid fa-chevron-right"
//             />
//           </div>
//           <div className="type">關於良弓制販所</div>
//           <div className="type d-flex justify-content-between">
//             聯絡我們
//             <FontAwesomeIcon
//               icon={faChevronRight}
//               className="fa-solid fa-chevron-right"
//             />
//           </div>
//           <div className="login">註冊 / 登入</div>
//         </div>
//       </div>

//       {/* 手機版 button */}
//       <div className="bottom-btn d-flex justify-content-around">
//         <div className="btn home d-flex flex-column">
//           <img className="logo-img2 text-center" src="/logo-img2.svg" />
//           <img className="logo-img text-center" src="/logo-img.svg" />
//           首頁
//         </div>
//         <div className="btn cart position-relative">
//           <FontAwesomeIcon
//             icon={faShoppingCart}
//             className="fa-solid fa-2xl fa-cart-shopping"
//           ></FontAwesomeIcon>
//           <span className="notify position-absolute top-0 rounded-circle">
//             5
//           </span>
//           購物車
//         </div>

//         <div className="btn fav position-relative">
//           <FontAwesomeIcon
//             icon={faHeart}
//             className="fa-solid fa-2xl fa-heart"
//           ></FontAwesomeIcon>
//           <span className="notify position-absolute top-0 rounded-circle">
//             3
//           </span>
//           收藏
//         </div>
//         <div className="btn search">
//           <FontAwesomeIcon
//             icon={faMagnifyingGlass}
//             className="fa-solid fa-2xl fa-magnifying-glass"
//           ></FontAwesomeIcon>
//           搜尋
//         </div>
//         <div className="btn member">
//           <FontAwesomeIcon
//             icon={faUser}
//             className="fa-solid fa-2xl fa-user"
//           ></FontAwesomeIcon>
//           會員
//         </div>
//       </div>

//       {/* footer */}
//       {/* <div className="footer d-flex">
//         <div className="logo d-flex flex-column justify-content-center align-items-center">
//           <img className="logo-img" src="/logo-img.svg" />
//           <img className="logo-text" src="/logo-text.svg" />
//         </div>
//         <div className="d-flex">
//           <div className="button d-flex flex-column rounded-0">
//             <div className="btn rounded-0">信給良弓</div>
//             <div className="btn rounded-0">聯絡客服</div>
//           </div>
//           <ul className="list-unstyled d-flex flex-column justify-content-between">
//             <li>營業時間：10:00-19:00</li>
//             <li>連絡電話： 03-4253057</li>
//             <li>
//               <FontAwesomeIcon
//                 icon={faLocationDot}
//                 className="me-2 fa-solid fa-location-dot"
//               />
//               桃園市中壢區新生路二段421號
//             </li>
//             <li>
//               <FontAwesomeIcon
//                 icon={faCopyright}
//                 className="me-2 fa-regular fa-copyright"
//               />
//               2023良弓制販所
//             </li>
//           </ul>
//         </div>
//       </div> */}
//     </>
//   );
// }

// export default PublicNav;
