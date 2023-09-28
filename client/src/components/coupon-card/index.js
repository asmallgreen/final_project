import React from "react";

export default function CouponCard({ id,name, type, discount, deadline }) {
  const couponLeftClass = type === 1 ? 'coupon-left-green' : 'coupon-left-red';
  let couponTypeText = '';
  let discountText = '';

  if (type === 1) {
    couponTypeText = '全館';
    discountText = `${discount}折`;
  } else if (type === 2) {
    couponTypeText = '折價';
    discountText = `$${discount}`
  }
  return (
    <div className="coupon-card">
      <div className={` ${couponLeftClass}`}>
        <div className="text-center py-3">
          <div>
            <p className="coupon-type">{couponTypeText}</p>
            <div className="display-6 fw-bold">{discountText}</div>
          </div>
        </div>
      </div>
      <div className="coupon-right">
        <h5 className="fw-bold">{name}</h5>
        <div className="text-center time">
          <p>優惠期限</p>
          <p>
            至 {deadline}
          </p>
        </div>
      </div>
    </div>
  );
}
