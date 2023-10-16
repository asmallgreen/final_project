import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import SweetAlert2 from "react-sweetalert2";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import { useProductCart } from "@/hooks/use-product-cart";
import { useCourseCart } from "@/hooks/use-course-cart";
import { useOrder } from "@/hooks/use-order";
import axios from "axios";

export default function StepThree({ setstepType }) {
  //hooks
  const { authJWT } = useAuthJWT();
  const { productCart, products } = useProductCart();
  const { courseCart, courses } = useCourseCart();
  const { orderInfo, setOrderInfo } = useOrder();

  //彈出視窗
  const [swalProps, setSwalProps] = useState({});

  function handleClick() {
    setSwalProps({
      show: true,
      text: "訂購已完成 感謝您的訂購",
      imageUrl: "Ciro/modalImg.png",
      customClass: {
        confirmButton: "custom-confirm-button-class",
      },
      confirmButtonText: "關閉",
    });
  }
  function didSwalClose() {
    setSwalProps({
      show: false,
    });
  }
  const sendData = (n) => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(n);
  };

  //send order to backend
  function sendOrder(orderData) {
    axios
      .post("http://localhost:3005/cart/sendOrder", orderData)
      .then((response) => {
        console.log("訂單送入後端成功", response.data);
      })
      .catch((error) => {
        console.error("訂單送入後端錯誤", error);
      });
  }
  function handleSendOrder() {
    const orderid = generateOrderId();
    const orderList = {
      order_id: orderid,
      member_id: authJWT.memberData.id,
      coupon_id: orderInfo.coupon_id,
      subtotal: productCart.cartTotal + courseCart.cartTotal - orderInfo.discount,
      payment: orderInfo.payment,
      receive_name: orderInfo.receiverName,
      receive_phone: orderInfo.receiverPhone,
      receive_add: orderInfo.receiverAddress,
      status: "理貨中",
    };
    const productDetail = productCart.items.map((product, index) => {
      return {
        order_id: orderid,
        product: product,
      };
    });
    const courseDetail = courseCart.items.map((course, index) => {
      return {
        order_id: orderid,
        course: course,
      };
    });
    const orderData = {
      orderList,
      productDetail,
      courseDetail,
    };
    sendOrder(orderData);
  }

  function generateOrderId() {
    const timestamp = new Date().getTime();
    const randomDigits = Math.floor(Math.random() * 1000);

    // 將日期和隨機數字組合成流水編號
    const orderId = `${timestamp}-${randomDigits}`;
    return orderId;
  }

  return (
    <div>
      <div className="stepTypeTitle phoneDNone">
        <h2>確認訂單明細</h2>
      </div>
      <div className="stepThreeMain">
        <div>
          <p className="ordererTitle">付款資訊</p>
          <Form className="orderInfo">
            <div className="payTypeInput m-2">
              <Form.Control
                type="text"
                placeholder="付款方式"
                value={orderInfo.payment}
                disabled
              />
            </div>
            {/* <div className='m-2'>
              <Form.Control type='text' placeholder='地址' 
              value={orderInfo.receiverAddress}
              disabled/>
            </div> */}
          </Form>
        </div>
        <div className="mb-5">
          <p className="ordererTitle">收件人資訊</p>
          <Form className="orderInfo">
            <div className="cartMemberInfo">
              <Form.Control
                type="text"
                placeholder="姓名*"
                value={orderInfo.receiverName}
                disabled
              />
              <Form.Control
                type="text"
                placeholder="手機*"
                value={orderInfo.receiverPhone}
                disabled
              />
            </div>
            <div className="m-2">
              <Form.Control
                type="text"
                placeholder="配送地址"
                value={orderInfo.receiverAddress}
                disabled
              />
            </div>
          </Form>
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
            <div className="fs-5">優惠券折抵&nbsp;$ {orderInfo.discount}</div>
            <br />
          </div>
          <div className="line"></div>
          <div className="orderTotal fs-5">
            金額總計&nbsp;
            <span>
              {productCart.cartTotal +
                courseCart.cartTotal -
                orderInfo.discount}
            </span>
          </div>
        </div>
        <div className="stepBtnGroup">
          <button
            className="nextStepBtn fs-5 opacity-50 d-lg-block d-none"
            onClick={() => {
              sendData(3);
            }}
          >
            返回訂單資料
          </button>

          <button
            className="nextStepBtn fs-5 opacity-50 d-sm-none d-block"
            onClick={() => {
              sendData(3);
            }}
          >
            上一步
          </button>

          <button
            className="nextStepBtn fs-5 d-sm-block d-none"
            onClick={()=>{handleClick();handleSendOrder()}}
          >
            確認送出
          </button>

          <button
            className="nextStepBtn fs-5 d-sm-none d-block"
            onClick={()=>{handleClick();handleSendOrder()}}
          >
            確認送出
          </button>
          <SweetAlert2 {...swalProps} didClose={didSwalClose} />
        </div>
      </div>
    </div>
  );
}
