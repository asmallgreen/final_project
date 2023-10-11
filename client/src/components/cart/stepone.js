import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";

import { useProductCart } from "@/hooks/use-product-cart";
import { useCourseCart } from "@/hooks/use-course-cart";
import { useAuthJWT } from "@/hooks/use-auth-jwt";

import ProductList from "@/components/cart/product-list.js";
import CourseList from "@/components/cart/course-list.js";

export default function StepOne({ setstepType }) {
  const sendData = () => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(2);
  };

  //商品購物車hooks
  const {
    productCart,
    products,
    addProduct,
    removeProduct,
    updateProduct,
    clearProductCart,
    isInProductCart,
    plusOneProduct,
    minusOneProduct,
  } = useProductCart();
  //課程購物車hooks
  const {
    courseCart,
    courses,
    addCourse,
    removeCourse,
    updateCourse,
    clearCourseCart,
    isInCourseCart,
  } = useCourseCart();

  //MemberCoupon資料
  const { memberCoupon } = useAuthJWT();
  // console.log(memberCoupon);

  // 修正 Next hydration 錯誤
  // 一定要在最後面
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  // fix end
  return (
    <Container>
      {/* 以下為測試按鈕 */}
      <div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addProduct({
              id: "1",
              name: "商品1",
              detail_1: "紅色",
              detail_2: "火雞毛",
              detail_3: "30公分",
              quantity: 1,
              price: 200,
            });
          }}
        >
          add product (id=1, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addProduct({
              id: "22",
              name: "商品22",
              detail_1: "金屬",
              detail_2: "300吋",
              detail_3: "1945",
              quantity: 1,
              price: 5000,
            });
          }}
        >
          add product (id=22, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addCourse({
              id: "1",
              name: "課程1",
              quantity: 1,
              price: 81000,
              // quantity不可省略，要計算total
            });
          }}
        >
          add course (id=1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addCourse({
              id: "55",
              name: "課程55",
              quantity: 1,
              price: 55,
              // quantity不可省略，要計算total
            });
          }}
        >
          add course (id=55)
        </button>
      </div>
      <div className="listTitle">
        <Col xs={1}>
          <input type="checkbox" className="expand pcDNone" />
        </Col>
        <Col xs={10}>商品</Col>
        <Col xs={1}>
          <span className="expand phoneDNone">+</span>
        </Col>
      </div>
      {/* <div className="productList d-none d-lg-flex">
        <Col xs={4}>
          <span className="phoneDNone">商品名稱</span>
        </Col>
        <Col xs={2}>
          <span className="phoneDNone">規格</span>
        </Col>
        <Col xs={2}>
          <span className="phoneDNone">單價</span>
        </Col>
        <Col xs={2}>
          <span className="phoneDNone">數量</span>
        </Col>
        <Col xs={1}>
          <span className="phoneDNone">小計</span>
        </Col>
      </div> */}
      <ProductList />
      <div className="productList">
        <div>
          <button
            className="deleteBtn"
            onClick={() => {
              clearProductCart();
            }}
          >
            刪除
          </button>
          <div className="couponSection">
            <select>
              <option value="">選擇優惠券</option>
              {memberCoupon.length > 0 ? (
                memberCoupon.map((coupon, index) => (
                  <option key={index} value={coupon.id}>
                    {coupon.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  沒有可用優惠券
                </option>
              )}
            </select>
            <span>
              共 {productCart.totalItems} 項 , 商品小計 {productCart.cartTotal}{" "}
              元
            </span>
          </div>
        </div>
      </div>
      <div className="listTitle">
        <Col xs={1}>
          <input type="checkbox" className="expand pcDNone" />
        </Col>
        <Col xs={10}>課程</Col>
        <Col xs={1}>
          <span className="expand phoneDNone">+</span>
        </Col>
      </div>
      <div className="productList d-none d-lg-flex">
        <Col xs={1}>
          <input type="checkbox" className="phoneDNone" />
        </Col>
        <Col xs={4}>
          <span className="phoneDNone">商品名稱</span>
        </Col>
        <Col xs={4}>
          <span className="phoneDNone">課程內容</span>
        </Col>
        <Col xs={3}>
          <span className="phoneDNone">小計</span>
        </Col>
      </div>
      <CourseList />
      <div className="productList">
        <Col>
          <button
            className="deleteBtn"
            onClick={() => {
              clearCourseCart();
            }}
          >
            刪除
          </button>
          <div>{`共  項 , 課程小計 元`}</div>
        </Col>
      </div>
      <div className="totalSection">
        <div className="total">
          <div>
            總金額(共 項)
            <span>$</span>
          </div>
          <div className="discount">{`優惠券折抵$ `}</div>
          <span className="">
            <span>確認訂單金額</span>
            <button
              className="nextStepBtn"
              onClick={() => {
                sendData();
              }}
            >
              下一步
            </button>
          </span>
        </div>
      </div>
    </Container>
  );
}
