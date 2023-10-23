import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import Swal from "sweetalert2";

export default function Index() {
  const { authJWT } = useAuthJWT();
  const [couponList, setCouponList] = useState([]);
  const { memberCoupon } = useAuthJWT();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/memberDashboard/findLimitCoupon`)
      .then((response) => {
        // console.log(response.data.couponList);
        setCouponList(response.data.couponList);
      })
      .catch((error) => {
        console.error("前端請求優惠券列表錯誤:", error);
      });
  }, []);

  const handleSendCoupon = (couponId) => {
    if (authJWT.memberData.id === undefined) return alert("請先登入會員");

    const updatedCouponList = [...couponList];
    const updatedCoupon = updatedCouponList.find((coupon) => coupon.id === couponId);

    if (updatedCoupon) {
      updatedCoupon.isDisabled = true;
      updatedCoupon.text = "已領取"
    }

    // 更新優惠券列表
    setCouponList(updatedCouponList);

    const addCoupon = {
      member_id: authJWT.memberData.id,
      coupon_id: couponId,
    };

    axios
      .post(`http://localhost:3005/memberDashboard/addMemberCoupon`, addCoupon)
      .then((response) => {
        // console.log("前端新增優惠券成功:", response.data);
      })
      .catch((error) => {
        console.error("前端新增優惠券錯誤:", error);
      });
  };

  return (
    <>
      <div className="couponBg">
        <div className="ruleMain pb-4">
          <div className="ruleTitle mb-5">會員累積消費說明</div>
          <div className="ruleImg mb-5" />
          <div className="ruleTitle mb-5">限時促銷</div>
          <div className="flashRule d-sm-block d-none">
            {couponList.map((coupon, index) => (
              <div className="couponFlashSales border-bottom d-flex" key={index}>
                <div className="">
                  <div className="fs-5">{coupon.name}</div>
                  <div className="fs-5">
                    {coupon.type === 2
                      ? `現折${coupon.discount}元`
                      : `商品 ${coupon.discount} 折券`}
                  </div>
                </div>
                {memberCoupon.some((memberCoupon) => memberCoupon.id === coupon.id) ? (
                  <button className="btn clickTake" disabled>
                    已領取
                  </button>
                ) : (
                  <button
                    disabled={coupon.isDisabled || false}
                    className="btn clickTake"
                    onClick={() => {
                      handleSendCoupon(coupon.id);
                      Swal.fire({
                        icon: 'success',
                        title: '領取優惠券成功',
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: `rgba(255, 255, 255, 0.55)`,
                        width: '35%',
                        padding: '0 0 3.25em',
                        customClass: {
                        }
                      })
                    }}
                  >
                    {coupon.text || "點擊領取"}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flashRule d-sm-none">
            {couponList.map((coupon, index) => (
              <div className="couponFlashSales border-bottom" key={index}>
                <div className="text-center pb-3">
                  <div className="fs-5">{coupon.name}</div>
                  <div className="fs-5">
                    {coupon.type === 2
                      ? `現折${coupon.discount}元`
                      : `商品 ${coupon.discount} 折券`}
                  </div>
                </div>
                {memberCoupon.some((memberCoupon) => memberCoupon.id === coupon.id) ? (
                  <button className="btn clickTake align-items-center" disabled>
                    已領取
                  </button>
                ) : (
                  <button
                    disabled={coupon.isDisabled || false}
                    className="btn clickTake"
                    onClick={() => {
                      handleSendCoupon(coupon.id);
                      Swal.fire({
                        icon: 'success',
                        title: '領取優惠券成功',
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: `rgba(255, 255, 255, 0.55)`,
                        width: '35%',
                        padding: '0 0 3.25em',
                        customClass: {
                        }
                      })
                    }}
                  >
                    {coupon.text || "點擊領取"}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="rulePoint">*優惠券僅可使用一次&nbsp;且限用於商品</div>
        </div>
      </div>
    </>
  );
}