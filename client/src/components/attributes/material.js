import React, { useState, useEffect } from "react";


export default function Material() {
  const [select, setSelect] = useState(false);
  console.log(select);
  const handleAttrToggle = (button) => {
    setSelect((prevState) => {
      const newState = {
        attr1: false,
        attr2: false,
        attr3: false,
        attr4: false,
      };
      // 將特定的屬性設置為 true
      newState[button] = !prevState[button];
      return newState;
      // console.log(newState);
    });
  };
  return (
    <>
      <div className="atrribute">
        <div className="attr-title">材質：</div>
        <div className="attr-btns-material">
          <div
            className={select.attr1 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr1")}
          >
            竹
          </div>
          <div
            className={select.attr2 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr2")}
          >
            碳
          </div>
          <div
            className={select.attr3 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr3")}
          >
            木
          </div>
          <div
            className={select.attr4 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr4")}
          >
            鋁
          </div>
        </div>
      </div>
    </>
  );
}
