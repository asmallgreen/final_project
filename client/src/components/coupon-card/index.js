import React from "react";

export default function CouponCard({type}) {
  const couponLeftClass = type === 1 ? 'coupon-left-green' : 'coupon-left-red';
  return (
    <>
      <div className="coupon-card">
        <div className={` ${couponLeftClass} d-flex`}>
          <div className="text-center d-flex align-items-center">
            <div>
              <p>消費滿$1000</p>
              <p>折價</p>
              NT$<span className="display-6">900</span>
            </div>
          </div>
        </div>
        <div className="coupon-right">
          <h5 className="fw-bold">中秋射月亮</h5>
          <p>適用於商品分類 " 弓箭 " </p>
          <div className="text-center time">
            <p>優惠期限</p>
            <p>
              {`2023-09-01`}~{`2023-09-31`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
