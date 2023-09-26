import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFilter,
  faSort,
  faCartShopping,
  faHeart as farHeart,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
function Category() {
  return (
    <>
      {/* 麵包屑 */}
      <div className="bread-crumb d-flex align-items-center">
        <div className="crumb-item">
          <a href="" className="mx-4">
            首頁
          </a>
          &gt;
        </div>
        <div className="crumb-item">
          <a href="" className="mx-4">
            商店
          </a>
          &gt;
        </div>
        <div className="crumb-item">
          <a href="" className="mx-4">
            所有商品
          </a>
        </div>
      </div>

      {/* 產品select區 */}
      <div className="cart row d-flex">
        {/* 左邊區域 */}
        <div className="d-flex position-relative justify-content-center img-area col">
          {/* <img src="" /> */}
          <div className="img">暫時img</div>
          <div className="scrolls d-flex position-absolute bottom-0 m-3">
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
            <div className="circle mx-1"></div>
          </div>
        </div>
        {/* 右邊區域 */}
        <div className="detail col">
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
          <div className="btns d-flex flex-column justify-content-center">
            <div className="btn-group rounded-0 d-flex">
              <div className="btn plus">+</div>
              <div className="btn quantity ">0</div>
              <div className="btn sub">-</div>
            </div>
            <div className="btn-send d-flex justify-content-center justify-content-between my-2">
              <div className="fav btn">加入收藏</div>
              <div className="add btn">加入購物車</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Category;
