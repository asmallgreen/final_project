import React from "react";

export default function ProductCard() {
  return (
    <>
      <div className="card col-2">
        <div className="img">
          <img src="" />
        </div>
        <div className="content d-flex flex-column justify-content-between">
          <div className="product-name d-flex justify-content-center">
            <div className="tag px-2 me-1">NEW</div>特選黑羽雞翅汝拉箭
          </div>
          <div className="description">汝拉箭6枚1913年 (5)</div>
          <div className="price text-end">$1500</div>
        </div>
      </div>
    </>
  );
}
