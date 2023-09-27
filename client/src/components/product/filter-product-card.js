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

export default function FilterProductCard() {
  return (
    <>
      <div className="card">
        <div className="img position-relative">
          <img src=""></img>
          <button className="p-0 position-absolute">
            <FontAwesomeIcon icon={faHeart} className="fa-heart" />
            <FontAwesomeIcon icon={farHeart} className="far-heart" />
          </button>
        </div>
        <div className="content d-flex flex-column justify-content-center px-3">
          <div className="prodcut-name my-1">特選黑羽雞翅汝拉箭</div>
          <div className="price d-flex justify-content-between my-1">
            NT$ 8000
            <button className="">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="fa-solid fa-cart-shopping"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
