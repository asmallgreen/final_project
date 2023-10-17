import React, { useState } from "react";
import { FaX } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";
// import ModalSort from "./modal-sort";

export default function ModalAttr(props) {
  const [open, setOpen] = useState(true);
  const [arrtSelect, setArrtSelect] = useState(false);
  // const [modal, setModal] = useState();
  // const [sort, setSort] = useState(false);
  const [attrState, setAttrState] = useState("");
  const [attrSend, setAttrSend] = useState(attrState);
  props.attrChange(attrSend);
  // console.log(attrState);
  // console.log(attrSend);

  //篩選&排序切換
  // const handleModal = () => {
  //   setSort(true);
  //   setModal(sort ? 1 : <ModalSort />);
  //   setOpen(false);
  // };
  //用close-btn切換
  const handleClose = () => {
    setOpen((prevState) => !prevState);
  };
  // 選項按鈕切換
  const handleClear = () => {
    setArrtSelect(false);
  };
  const handleAttrToggle = (button) => {
    setArrtSelect((prevState) => {
      const newState = {
        attr1: false,
        attr2: false,
        attr3: false,
        attr4: false,
      };
      // 將特定的屬性設置為 true
      newState[button] = !prevState[button];
      setAttrState(button);
      return newState;
    });
  };
  const handleSend = () => {
    setAttrSend(attrState);
    setOpen(false);
  };
  return (
    <>
      <div className={open ? "product-modal" : "d-none"}>
        <div className="product-attr-modal">
          <div className="click-area">
            <div className="filter-btn title">篩選</div>
            {/* <div className="sort-btn title" onClick={handleModal}>
              排序
            </div> */}
            <div className="close-btn" onClick={handleClose}>
              <FaX />
            </div>
          </div>
          <div className="select-area">

          <div className="nav-fk">
              <Form className="list-unstyled search-form">
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="請輸入商品名稱"
                    className="search-product-name"
                  />
                  <FaSearch className="fa-magnifying-glass position-absolute" />
                </div>
              </Form>
            </div>
           


            <div className="select-attr-area ">
              <div className="attr-title">價格：</div>
              <div className="attr-buttons">
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr1")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr1 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">低於NT$4,000</span>
                </div>
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr2")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr2 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">NT4000-NT$6000</span>
                </div>
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr3")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr3 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">大於NT6,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fk-area">
            <div className="confirm-btn pick" onClick={handleSend}>
              查看個結果
            </div>
            <div className="clear-btn pick" onClick={handleClear}>
              清除選項
            </div>
          </div>
        </div>
      </div>
      <div className={open ? "product-sort-overlay" : "d-none"}></div>
      {/* {modal} */}
    </>
  );
}
