import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Form, Row, Col } from "react-bootstrap";

export default function ModalAttr(props) {
  const [open, setOpen] = useState(true);
  const [arrtSelect, setArrtSelect] = useState(false);
  const [searchName, setSearchName] = useState();
  const [attrState, setAttrState] = useState("");
  const [attrSend, setAttrSend] = useState(attrState);
  const [searchSend, setSearchSend] = useState(searchName);

  props.attrChange(attrSend);
  props.searchName(searchSend);

  //用close-btn切換
  const handleNameValue = (e) => {
    setSearchName(e.target.value);
  };
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
    setSearchSend(searchName);
    props.attrChange(attrState); // 使用 props.attrChange 來更新父級組件狀態
    props.searchName(searchName); // 使用 props.searchName 來更新父級組件狀態
    setOpen(false);
    // setOpen(false);
  };
  useEffect(() => {
    if (attrSend !== undefined && searchSend !== undefined) {
      props.attrChange(attrSend);
      props.searchName(searchSend);
      setOpen(false);
    }
  }, [attrSend, searchSend, props]);

  useEffect(() => {
    // console.log(searchName);
  }, [searchName]);
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
            {/* 篩選button */}
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
                  <span className="attr-text">低於NT$1,000</span>
                </div>
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr2")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr2 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">NT1000-NT$2000</span>
                </div>
              </div>
              <div className="attr-buttons">
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr3")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr3 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">NT2000-NT$4000</span>
                </div>
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr4")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr4 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">NT4000-NT$6000</span>
                </div>
                <div
                  className="attr-button"
                  onClick={() => handleAttrToggle("attr5")}
                >
                  <div
                    onChange={handleAttrToggle}
                    className={arrtSelect.attr5 ? "attr-checked" : "attr-check"}
                  ></div>
                  <span className="attr-text">高於NT$6000</span>
                </div>
              </div>
            </div>
            {/* 搜尋商品名稱 */}
            <div className="search-attr">
              <div className="attr-title">關鍵字搜尋：</div>
              <Form className="list-unstyled search-form">
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="請輸入商品名稱"
                    className="search-product-name"
                    onChange={handleNameValue}
                  />
                  <FaSearch className="fa-magnifying-glass position-absolute" />
                </div>
              </Form>
            </div>
          </div>
          <div className="fk-area">
            <div className="confirm-btn pick" onClick={handleSend}>
              查看結果
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
