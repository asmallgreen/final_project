import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useProductCart } from "@/hooks/use-product-cart";
import { useCourseCart } from "@/hooks/use-course-cart";
import { useOrder } from "@/hooks/use-order";

export default function StepTwo({ setstepType, setNetTotal }) {
  const { productCart, products } = useProductCart();
  const { courseCart, courses } = useCourseCart();
  const { orderInfo, setOrderInfo } = useOrder();
  const [selectedOption, setSelectedOption] = useState("");

  // console.log(setNetTotal);
  useEffect(() => {
    if (orderInfo.payment) {
      setSelectedOption(orderInfo.payment);
    }
  }, [orderInfo.payment]);

  const handleOptionChange = (event) => {
    // console.log(event.target.value);
    setSelectedOption(event.target.value);
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      payment: event.target.value,
    }));
  };

  const nextPage = () => {
    if (!orderInfo.payment) {
      alert("請選擇付款方式");
    } else {
      setstepType(3);
    }
  };
  const prevPage = () => {
    setstepType(1);
  };

  return (
    <div>
      <div className="stepTypeTitle phoneDNone">
        <h2>付款及配送方式</h2>
      </div>
      <div className="radioSection">
        <label className="customCheckbox">
          <input
            type="checkbox"
            name="choice"
            value="信用卡"
            checked={selectedOption === "信用卡"}
            onChange={handleOptionChange}
          />
          <span>{` 宅配 信用卡/金融卡付款（購買課程限此付款方式）`}</span>
        </label>
        <label className="customCheckbox">
          <input
            type="checkbox"
            name="choice"
            value="宅配貨到付款"
            checked={selectedOption === "宅配貨到付款"}
            onChange={handleOptionChange}
          />
          <span>{` 宅配 貨到付款（限台灣本島）`}</span>
        </label>
      </div>

      <div className="orderTitle">
        <Col xs={1}>
          <span>+</span>
        </Col>
        <Col xs={10} className="fs-4">
          訂單明細
        </Col>
        <Col xs={1}>
          <span>+</span>
        </Col>
      </div>
      <div>
        <div className="order">
          <div className="fs-5">
            共 {productCart.totalItems} 件商品&nbsp;$ {productCart.cartTotal}
          </div>
          <div className="fs-5">
            共 {courseCart.totalItems} 堂課程&nbsp;$ {courseCart.cartTotal}
          </div>
          <div className="fs-5">
            優惠券折抵&nbsp;$ {orderInfo.discount}
          </div>
          <br />
        </div>
        <div className="line"></div>
        <div className="orderTotal fs-5">
          金額總計&nbsp;
          <span>
          {productCart.cartTotal + courseCart.cartTotal - orderInfo.discount}
          </span>
        </div>
      </div>
      <div className="stepBtnGroup">
        <button
          className="nextStepBtn fs-5 opacity-50 d-lg-block d-none"
          onClick={() => {
            prevPage();
          }}
        >
          返回購物車
        </button>

        <button
          className="nextStepBtn fs-5 opacity-50 d-sm-none d-block"
          onClick={() => {
            nextPage();
          }}
        >
          下一步
        </button>

        <button
          className="nextStepBtn fs-5 d-sm-block d-none"
          onClick={() => {
            nextPage();
          }}
        >
          填寫訂單資料
        </button>

        <button
          className="nextStepBtn fs-5 d-sm-none d-block"
          onClick={() => {
            prevPage();
          }}
        >
          上一步
        </button>
      </div>
    </div>
  );
}
