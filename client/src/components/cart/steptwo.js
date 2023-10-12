import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useOrder } from "@/hooks/use-order";

export default function StepTwo({ setstepType }) {
  const [selectedOption, setSelectedOption] = useState("");

  const { orderInfo, setOrderInfo } = useOrder();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
    setOrderInfo((prevOrderInfo) => ({
      ...prevOrderInfo,
      payment: event.target.value,
    }));
  };

  const sendData = (n) => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(n);
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
            {`共 件商品`}&nbsp;{`$`}
          </div>
          <div className="fs-5">
            {`共 堂課程`}&nbsp;{`$`}
          </div>
          <br />
          <div className="fs-5">
            {`優惠券折抵`}&nbsp;{`-$`}
          </div>
        </div>
        <div className="line"></div>
        <div className="orderTotal fs-5">
          {`金額總計 `}&nbsp;
          <span>
            {`$ `}
            {` `}
          </span>
        </div>
      </div>
      <div className="stepBtnGroup">
        <button
          className="nextStepBtn fs-5 opacity-50 d-lg-block d-none"
          onClick={() => {
            sendData(1);
          }}
        >
          返回購物車{" "}
        </button>

        <button
          className="nextStepBtn fs-5 opacity-50 d-sm-none d-block"
          onClick={() => {
            sendData(1);
          }}
        >
          上一步{" "}
        </button>

        <button
          className="nextStepBtn fs-5 d-sm-block d-none"
          onClick={() => {
            sendData(3);
          }}
        >
          填寫訂單資料
        </button>

        <button
          className="nextStepBtn fs-5 d-sm-none d-block"
          onClick={() => {
            sendData(3);
          }}
        >
          下一步
        </button>
      </div>
    </div>
  );
}
