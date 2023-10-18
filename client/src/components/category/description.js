import React from "react";

export default function Description(props) {
  // props 父傳子
  // 在父元件創建屬性在子元件上(ex:pidData={要傳入的值})
  const { pidData } = props;
  return (
    <>
      <div className="product-information">
        <div className="product-name">{pidData.name}</div>
        {/* <div className=" description">{pidData.summary}</div> */}
        <div className="price">NT${pidData.price}</div>
      </div>
    </>
  );
}
