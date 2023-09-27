import React from "react";
import BreadCrumb from "@/components/bread-crumb/bread-crumb";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFilter,
  faSort,
  faCartShopping,
  faHeart as farHeart,
  faArrowLeft,
  faArrowRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
function Category() {
  return (
    <>
      <div className="container">
        {/* 麵包屑 */}
        <BreadCrumb/>
        {/* 產品select區 */}
        <div className="cart row d-flex position-relative">
          {/* 左邊區域 */}
          <div className="d-flex position-relative img-area px-4 col-6">
            {/* <img src="" /> */}
            <div className="img">暫時img</div>
            <div className="scrolls d-flex position-absolute m-3">
              <div className="circle mx-1"></div>
              <div className="circle mx-1"></div>
              <div className="circle mx-1"></div>
              <div className="circle mx-1"></div>
              <div className="circle mx-1"></div>
            </div>
          </div>
          {/* 右邊區域 */}
          <div className="detail col-6 px-5 pb-3 flex-column d-flex justify-content-between ">
            {/* <div className="title">選購</div> */}
            <div className="product-info d-flex flex-column justify-content-center align-items-center">
              <div className="product-name my-2"> 特選黑羽雞翅 汝拉箭6枚</div>
              <div className="price my-2">$8000</div>
              <div className="intro my-2">採用廣受歡迎的伊斯頓硬鋁箭桿</div>
            </div>
            <div className="attributes">
              <div className="attr d-flex">
                <div className="attr-name">材質</div>
                <div className="attr-items d-flex ">
                  <div className="item">竹</div>
                  <div className="item">碳</div>
                  <div className="item">木</div>
                  <div className="item">鋁</div>
                </div>
              </div>
              <div className="attr d-flex">
                <div className="attr-name">軸心</div>
                <div className="attr-items d-flex">
                  <div className="item">1913</div>
                  <div className="item">2014</div>
                  <div className="item">7620</div>
                  <div className="item">8023</div>
                </div>
              </div>
              <div className="attr d-flex">
                {" "}
                <div className="attr-name">箭頭長度</div>
                <div className="attr-items">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle mx-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {5}
                  </button>
                </div>
              </div>
            </div>

            {/* buttons */}
            <div className="btns d-flex flex-column justify-content-center ">
              <div className="btn-group rounded-0">
                <div className="btn plus col-2">+</div>
                <div className="btn quantity col-6">0</div>
                <div className="btn sub col-2">-</div>
              </div>
              <div className="btn-send d-flex justify-content-center row">
                <div className="fav btn col-5">加入收藏</div>
                <div className="add btn col-5  offset-2">加入購物車</div>
              </div>
            </div>
          </div>
        </div>
        {/* 商品資訊(手風琴) */}
        <div className="title d-flex justify-content-between">
          <span>商品說明</span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="fa-solid fa-angle-right me-2 fa-xl"
          />
        </div>
        <div className="content"></div>
        <div className="title d-flex justify-content-between">
          <span>注意事項</span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="fa-solid fa-angle-right me-2 fa-xl"
          />
        </div>
        <div className="content">
          <strong>購物須知</strong>
          <ol>
            <li>
              星線底部可能會有划痕，這是由於軸的製造工藝而不可避免的，並非划痕。請注意，性能沒有問題。
            </li>
            <li>若對商品有疑問，請洽 免費客服專線 03-4253057。 </li>
          </ol>

          <strong>送貨時間為何？</strong>
          <ol>
            <li>
              線上購買 - 標準運送：每日 16:00
              前完成訂購，商品將於一個工作天起可宅配至您指定地點。每日 16:00
              後完成訂購，商品將於兩個工作天起可宅配至您指定地點。週日不配送，如遇週日則將延後至週一配送。
            </li>
            <li>
              原則上本島地區商品會於 2
              個工作天內送達，離島地區配送區域:台東縣綠島鄉蘭嶼鄉、澎湖縣、金門縣、連江縣、屏東縣琉球鄉。收貨地址如為離島地區，配送時間約
              3 - 7 天。
            </li>
            <li>
              實際到達時間、配送相關服務視配送地點及天候狀況而定。
              恕無法使用快速到貨，貨到付款服務亦因配送地區將有所限制，詳情請洽
              免費客服專線 03-4253057。
            </li>
            <li>
              若收貨人資訊不完整、收貨人無法收貨、遇颱風地震等天災、公共工程、或系統設備維護等情況，出貨時間將視實際狀況順延。
            </li>
          </ol>
        </div>
        <div className="title d-flex justify-content-between">
          <span>付款方式</span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="fa-solid fa-angle-right me-2 fa-xl"
          />
        </div>
        <div className="content">
          <ol>
            <li>
              信用卡 – Visa、MasterCard 或 JCB 信用卡，不包含美國運通信用卡。
            </li>
            <li>貨到付款</li>
          </ol>
        </div>
      </div>
    </>
  );
}
export default Category;
