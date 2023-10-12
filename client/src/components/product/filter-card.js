// 產品頁=>所有商品(包含篩選過)卡片樣式
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faHeart as farHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function FilterProductCard(props) {
  const { filterProduct, id, is_favorite, handleTriggerProductFav} = props;

  const handleAddCart = () => {
    // 发送GET请求到后端，获取filterProduct.id
    fetch(`/api/getProductId?id=${filterProduct.id}`)
      .then(res => res.json())
      .then(data => {
        const productId = data.productId;
        // 在这里使用productId进行其他操作
        console.log(productId);
      })
      .catch(error => {
        console.error("Error fetching product ID:", error);
      });
  }
  
  // console.log(filterProduct);

  // 會員收藏商品


  return (
    <>
      <div className="card">
        <div className="img position-relative">
          <img src={filterProduct.img1}></img>
          <div className="tag position-absolute">NEW</div>
          <button className="p-0 position-absolute"
            id={id}
            onClick={()=>handleTriggerProductFav(id)}
            >
            <FontAwesomeIcon
              icon={is_favorite ?  farHeart : faHeart}
              className={is_favorite ? "fa-heart z-3" : "far-heart z-3"}
            />
            
          </button>
        </div>
        <div className="content">
          <div className="product-name">{filterProduct.name}</div>

          <div className="price d-flex justify-content-between my-1">
            NT$ {filterProduct.price}
            <button className="">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="fa-solid fa-cart-shopping"
                onClick={handleAddCart}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
