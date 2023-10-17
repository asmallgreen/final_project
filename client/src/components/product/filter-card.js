// 產品頁=>所有商品(包含篩選過)卡片樣式
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faHeart as farHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function FilterProductCard(props) {
  // const [filterProduct, setFilterProduct]= useState;
  const { filterProduct } = props;
  // console.log(filterProduct);
  //取得卡片id
  const idData = filterProduct.id;

  // 切換愛心的實心和空心狀態
  const [isSolidHeart, setIsSolidHeart] = useState(true);
  // Toggle切換
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsSolidHeart((prevState) => !prevState);
  };

  return (
    <>
      <div className="card">
        <div className="img position-relative">
          <Link href={`/product/${idData}`} className="">
            <img src={filterProduct.img1} alt="" className=""></img>
            <div className=" tags d-flex">
              <div
                className={
                  filterProduct.launched === 1
                    ? "tag1 position-absolute"
                    : "d-none"
                }
              >
                NEW
              </div>
              <div
                className={
                  filterProduct.hot === 1 ? "tag2 position-absolute" : "d-none"
                }
              >
                HOT
              </div>
            </div>
          </Link>

          {/* <div className="tag position-absolute">NEW</div> */}
          <button className="p-0 position-absolute">
            <FontAwesomeIcon
              icon={isSolidHeart ? faHeart : farHeart}
              className={isSolidHeart ? "fa-heart" : "far-heart"}
              onClick={handleToggle}
            />
          </button>
        </div>
        <div className="content">
          <div className="product-name">{filterProduct.name}</div>

          <div className="price d-flex justify-content-between my-1">
            NT$ {filterProduct.price}
            <button className="">
              {/* <FontAwesomeIcon
                icon={faCartShopping}
                className="fa-solid fa-cart-shopping"
              /> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
