import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";

import { useAuthJWT } from "@/hooks/use-auth-jwt";
import { useProductCart } from "@/hooks/use-product-cart";
import { useCourseCart } from "@/hooks/use-course-cart";
import { useOrder } from "@/hooks/use-order";

import ProductList from "@/components/cart/product-list.js";
import CourseList from "@/components/cart/course-list.js";

export default function StepOne({ setstepType }) {
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
  const { orderInfo, setOrderInfo } = useOrder();

  //MemberCoupon資料
  const { memberCoupon } = useAuthJWT();

  //設定coupon功能
  const [couponOptions, setCouponOptions] = useState(memberCoupon);
  const [selectedCouponId, setSelectedCouponId] = useState();
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    //撈取會員coupon
    if (memberCoupon.length > 0) {
      setCouponOptions(memberCoupon);
    }
  }, [memberCoupon]);
  
  useEffect(() => {
    if (!selectedCouponId || couponOptions.length === 0) {
      setNetTotal(productCart.cartTotal);
  
      // 重置coupon_id
      setSelectedCouponId(null);
      setOrderInfo({
        ...orderInfo,
        coupon_id: 0,
        discount: 0,
      });
    } else {
      const coupon = couponOptions.find((v) => v.id === selectedCouponId);
  
      //計算購物車
      if (coupon) {
        const newNetTotal =
          coupon.type === 1
            ? Math.round(productCart.cartTotal * (coupon.discount / 10))
            : productCart.cartTotal - coupon.discount;
  
        setNetTotal(newNetTotal);
      //傳入orderInfo hook  
        setOrderInfo({
          ...orderInfo,
          coupon_id: selectedCouponId,
          discount: productCart.cartTotal - newNetTotal,
        });
      }
    }
  }, [selectedCouponId, couponOptions, productCart.cartTotal]);
  
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
