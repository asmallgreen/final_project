import React, { useState, useEffect} from 'react'

export default function Length() {
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
        <div className="attr-title">軸心：</div>
        <div className="attr-btns-length">
          <div className={select.attr1 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr1")}>1913</div>
          <div className={select.attr2 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr2")}>2014</div>
          <div className={select.attr3 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr3")}>7620</div>
          <div className={select.attr4 ? "attr-btn-active btn" : "attr-btn btn"}
            onClick={() => handleAttrToggle("attr4")}>8023</div>
        </div>
      </div>
    </>
  );
}
