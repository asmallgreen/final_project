import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";

import { useAuthJWT } from "@/hooks/use-auth-jwt";
import { useProductCart } from "@/hooks/use-product-cart";
import { useCourseCart } from "@/hooks/use-course-cart";
import { useOrder } from "@/hooks/use-order"

import ProductList from "@/components/cart/product-list.js";
import CourseList from "@/components/cart/course-list.js";

export default function StepOne({ setstepType}) {
  const sendData = () => {
    if (productCart.totalItems === 0) {
      alert("没有商品~先去看看吧");
    } else {
      setstepType(2);
    }
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
  //order hooks
  const { orderInfo, setOrderInfo } = useOrder()


  //MemberCoupon資料
  const { memberCoupon } = useAuthJWT();
  // console.log(memberCoupon);
  //[
  // {id: 13, name: '職工節優惠', discount: 150, type: 2, deadline: '2023-07-01 00:00:00'}
  // {id: 11, name: '特別慶祝', discount: 300, type: 2, deadline: '2023-10-15 00:00:00'}
  // ]

  //設定coupon功能
  const [couponOptions, setCouponOptions] = useState(memberCoupon);
  const [selectedCouponId, setSelectedCouponId] = useState();
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    //memberCoupon 準備好才進行
    if (memberCoupon.length > 0) {
      setCouponOptions(memberCoupon);
    }
  }, [memberCoupon]);

  useEffect(() => {
    if (!selectedCouponId || couponOptions.length === 0) {
      setNetTotal(productCart.cartTotal);
      return;
    }
    
    const coupon = couponOptions.find((v) => v.id === selectedCouponId);
    //console.log(coupon);
  
    // type=1:打折  type=2:減價
    const newNetTotal =
      coupon.type === 1
        ? Math.round(productCart.cartTotal * (coupon.discount / 10))
        : productCart.cartTotal - coupon.discount;
  
    setNetTotal(newNetTotal);
  
   
    setOrderInfo({
      ...orderInfo,
      coupon_id: selectedCouponId
    });
  
  }, [productCart.cartTotal, selectedCouponId]);

  useEffect(() => {
    // Update orderInfo when netTotal changes
    setOrderInfo({
      ...orderInfo,
      productTotal:productCart.cartTotal,
      courseTotal:courseCart.cartTotal,
      discount:productCart.cartTotal - netTotal,
    });
  }, [productCart.cartTotal,courseCart.cartTotal, netTotal]);

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
            <select
              value={selectedCouponId}
              onChange={(e) => {
                setSelectedCouponId(Number(e.target.value));
              }}
            >
              <option value="">選擇優惠券</option>
              {memberCoupon.length > 0 ? (
                memberCoupon.map((coupon, index) => (
                  <option key={index} value={coupon.id}>
                    {coupon.name}
                    {coupon.type === 1 ? `  ${coupon.discount}折` : ""}
                    {coupon.type === 2 ? `  現抵${coupon.discount}元` : ""}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  沒有可用優惠券
                </option>
              )}
            </select>
            <span>
              共 {productCart.totalItems} 項 , 商品小計 {netTotal}元
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
          <div>
            共 {courseCart.totalItems} 項 , 課程小計 {courseCart.cartTotal} 元
          </div>
        </Col>
      </div>
      <div className="totalSection">
        <div className="total">
          <div>
            (共 {courseCart.totalItems + productCart.totalItems} 項) 總金額
            <span>$ {courseCart.cartTotal + netTotal}</span>
          </div>
          <div className="discount">
            優惠券折抵 $ {productCart.cartTotal - netTotal}
          </div>
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
