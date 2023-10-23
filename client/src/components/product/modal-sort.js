import React, { useState } from "react";
import { FaX, FaFilter } from "react-icons/fa6";
// import ModalAttr from "./modal-attr";
//props增加屬姓回傳filter-btn
export default function ModalSort(props) {
  
  const [open, setOpen] = useState(true);
  // const [modal, setModal] = useState();
  // const [attr, setAttr] = useState(false);
  //點選排序選項的狀態值(回傳到filter-btns)
  const [sortState, setSortState] = useState("default");
  const [sortSend, setSortSend] = useState(sortState);
  props.sortChange(sortSend);
  //傳回filter-btns動作
  // console.log(sortState);
  // console.log(sortSend);

  // const handleModal = () => {
  //   setAttr(true);
  //   setModal(attr ? 1 : <ModalAttr />);
  //   setOpen(false);
    // 回傳sortState給props
    // props.sortChange(sortState);
  // };
  //用close-btn切換
  const handleClose = () => {
    setOpen((prevState) => !prevState);
  };
  // 選項切換
  const [sortSelect, setSortSelect] = useState({
    hot: true,
    launched: false,
    priceAsc: false,
    priceDesc: false,
    nameAZ: false,
  });
  const handleSortToggle = (button) => {
    setSortSelect((prevState) => {
      const newState = {
        hot: false,
        launched: false,
        priceAsc: false,
        priceDesc: false,
        nameAZ: false,
      };
      // 將特定的屬性設置為 true
      newState[button] = !prevState[button];
      //button值更新sortState
      setSortState(button);
      return newState;
    });
    // console.log(sortState);
  };
  const handleSend = () => {
    //套用後才更新值sort並送出
    setSortSend(sortState);
    setOpen(false);
  };

  return (
    <>
      <div className={open ? "product-modal" : "d-none"}>
        <div className="product-sort-modal">
          <div className="click-area">
            {/* <div className="filter-btn title" onClick={handleModal}>
              篩選
            </div> */}
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
            <div className="set-btn" onClick={handleSend}>
              套用
            </div>
          </div>
        </div>
      </div>
      <div className={open ? "product-sort-overlay" : "d-none"}></div>
      {/* {modal} */}
    </>
  );
}
