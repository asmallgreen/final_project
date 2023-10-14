import React, { useState, useEffect } from "react";

export default function QuantityBtn({ onQuantityChange }) {
  const [quantity, setQuantity] = useState(0);
  
  const handleAdd = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity < 99 ? prevQuantity + 1 : 99;
      onQuantityChange(newQuantity); 
      return newQuantity;
    });
    // console.log("Quantity increased:", quantity+1);
  };
  const handleDec = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      onQuantityChange(newQuantity); // 在减少时调用回调函数
      return newQuantity;
    });
    // console.log("Quantity decreased:", quantity-1);
  };
 
  return (
    <>
      <div className="product-info-button">
        <div className="quantity-btn btn-group btn">
          <div className="symbol" onClick={handleDec}>
            -
          </div>
          <div className="quantity">{quantity}</div>
          <div className="symbol" onClick={handleAdd}>
            +
          </div>
        </div>
      </div>
    </>
  );
}
