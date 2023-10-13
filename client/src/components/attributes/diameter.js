import React, { useState, useEffect} from 'react'

export default function Diameter() {
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
            <div className="attr-title">長度：</div>
            <select class="form-select attr-select">
              <option selected>--請選擇--</option>
              <option value="1">85釐米</option>
              <option value="2">95釐米</option>
              <option value="3">105釐米</option>
              <option value="3">115釐米</option>
            </select>
          </div>

    </>
  )
}
