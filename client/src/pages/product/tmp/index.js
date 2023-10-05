import React from "react";

export default function FilterModal() {
  return (
    <>
      <div className="product-filter-modal">
        <div className="click-area">
          <div className="filter-btn">篩選</div>
          <div className="sort-btn">排序</div>
          <div className="close-btn">X</div>
        </div>
        <div className="select-area">
          <div className="select-attr-btns ">
            <div className="attr-title">材質：</div>
            <div className="attr-btn">
              <input class="attr-check" type="radio" name="AA"></input>
              <span class="attr-text">竹</span>
            </div>
            <div className="attr-btns">
              <div className="attr-btn btn">竹</div>
              <div className="attr-btn btn">碳</div>
              <div className="attr-btn btn">木</div>
              <div className="attr-btn btn">鋁</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
