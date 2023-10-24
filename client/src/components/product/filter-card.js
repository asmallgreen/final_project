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
  const { filterProduct, id, is_favorite, handleTriggerProductFav } = props;
  //取得卡片id
  const idData = filterProduct.id;


  return (
    <>
      <div className="card">
        <div className="img position-relative">
          <Link href={`/product/${idData}`} className="">
            <img src={filterProduct.img1} alt="" className=""></img>
            <div className=" tags d-flex">
              {/* {filterProduct.launched === 1 && <div className="tag1">NEW</div>}
              {filterProduct.hot === 1 && <div className="tag2">HOT</div>} */}
              {/* <div
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
              </div>*/}
            </div>
          </Link>

          {/* <div className="tag position-absolute">NEW</div> */}
          <button className="p-0 position-absolute"
            id={id}
            onClick={()=>handleTriggerProductFav(idData)}
            >
            <FontAwesomeIcon
              icon={is_favorite ?  farHeart : faHeart}
              className={is_favorite ? "fa-heart z-3" : "far-heart z-3"}
            />
          </button>
        </div>
        <div className="content">
          {/* <div className="d-flex">
            
          </div> */}

          <div className="product-name">
            {filterProduct.launched === 1 && <div className="tag1">NEW</div>}
            {filterProduct.hot === 1 && <div className="tag2">HOT</div>}
            {filterProduct.name}
          </div>

          <div className="price">
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
