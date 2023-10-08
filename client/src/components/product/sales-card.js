// 產品頁=>優惠專區(橫式)卡片樣式
import React from "react";
export default function SalesCard() {
  
  return (
    <>
        <div className="sales" >
          <div className="sales-row">
            <div className="card p-0 m-2">
              <div className="d-flex">
                <div className="img">
                  <img src=""></img>
                </div>
                <div className="content d-flex flex-column justify-content-between">
                  <div className="tags d-flex">
                    <div className="tag1 text-center me-2">NEW</div>
                    <div className="tag2 text-center">HOT</div>
                  </div>
                  <div className="product-name">特選黑羽雞翅汝拉箭6枚</div>
                  <div className="price">$3000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
