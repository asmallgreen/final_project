import React from "react";
export default function RecommendedCard() {
  // const { filterNewProduct } = props;
  // console.log(filterNewProduct);
  return (
    <>
      <div className="recommend-cards-area">
        <div className="recommend-cards">
          <div className="rows">
            <div className="card">
              <div className="img position-relative">
                <img src=""></img>
                <div className="tag position-absolute">NEW</div>
              </div>
              <div className="content">
                <div className="product-name">
                  121321213
                </div>
                <div className="description">123</div>
                <div className="price text-end">$NT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
