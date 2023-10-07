import React, { useState } from "react";
import { FaX, FaFilter } from "react-icons/fa6";
import ModalAttr from "./modal-attr";

export default function ModalSort() {
  const [modal, setModal] = useState();
  const [attr, setAttr] = useState(false);
  const handleModal = () => {
    setAttr(true);
    setModal(attr ? 1 : <ModalAttr />);
    setOpen(false);
  };

  //用close-btn切換
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen((prevState) => !prevState);
  };

  // 選項切換
  const [sortSelect, setSortSelect] = useState({
    hot: false,
    newArrival: false,
    priceAsc: false,
    priceDesc: false,
    nameAsc: false,
  });
  const handleSortToggle = (button) => {
    setSortSelect((prevState) => {
      const newState = {
        hot: false,
        newArrival: false,
        priceAsc: false,
        priceDesc: false,
        nameAZ: false,
      };

      // 將特定的屬性設置為 true
      newState[button] = !prevState[button];

      return newState;
    });
  };
  return (
    <>
      <div className={open ? "product-modal" : "d-none"}>
        <div className="product-sort-modal">
          <div className="click-area">
            <div className="filter-btn title" onClick={handleModal}>
              篩選
            </div>
            <div className="sort-btn title">排序</div>
            <div className="close-btn" onClick={handleClose}>
              <FaX />
            </div>
          </div>
          <div className="select-area">
            <div className="sort-title">
              <FaFilter />
              <div className="title-text">所有商品</div>
            </div>
            <div className="sort-buttons">
              <div
                className={
                  sortSelect.hot ? "sort-button-active" : "sort-button"
                }
                onClick={() => handleSortToggle("hot")}
              >
                熱銷商品優先
              </div>
              <div
                className={
                  sortSelect.newArrival ? "sort-button-active" : "sort-button"
                }
                onClick={() => handleSortToggle("newArrival")}
              >
                最新上架日期優先
              </div>
              <div
                className={
                  sortSelect.priceDesc ? "sort-button-active" : "sort-button"
                }
                onClick={() => handleSortToggle("priceDesc")}
              >
                價格低至高優先
              </div>
              <div
                className={
                  sortSelect.priceAsc ? "sort-button-active" : "sort-button"
                }
                onClick={() => handleSortToggle("priceAsc")}
              >
                價格高至低優先
              </div>
              <div
                className={
                  sortSelect.nameAZ ? "sort-button-active" : "sort-button"
                }
                onClick={() => handleSortToggle("nameAZ")}
              >
                商品名稱A-Z優先
              </div>
            </div>
          </div>
          <div className="fk-area">
            <div className="set-btn">套用</div>
          </div>
        </div>
      </div>
      <div className={open?'product-sort-overlay':'d-none'}></div>
      {modal}
    </>
  );
}
