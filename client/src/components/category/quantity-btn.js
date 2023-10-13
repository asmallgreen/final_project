import React, { useState, useEffect } from "react";

export default function QuantityBtn() {
  const [quantity, setQuantity] = useState(0);
  
  const handleAdd = () => {
    quantity < 99 ? setQuantity(quantity + 1) : setQuantity(99);
  };
  const handleDec = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(0);
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
