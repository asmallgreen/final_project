import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useAuthJWT } from "@/hooks/use-auth-jwt";

export default function Index() {
  const { authJWT } = useAuthJWT();
  const [couponList, setCouponList] = useState([]); //優惠券列表
  const { memberCoupon } = useAuthJWT();
  // console.log(memberCoupon)

  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledTwo, setIsDisabledTwo] = useState(false);

  const handleClickOne = () => {
    setIsDisabled(true);
  };

  const handleClickTwo = () => {
    setIsDisabledTwo(true);
  };

  const sendAddCoupon = (addCoupon) => {
    if (authJWT.memberData.id === undefined) return alert("請先登入會員");
    axios
      .post(`http://localhost:3005/memberDashboard/addMemberCoupon`, addCoupon)
      .then((response) => {
        console.log("前端新增優惠券成功:", response.data);
      })
      .catch((error) => {
        console.error("前端新增優惠券錯誤:", error);
      });
  };
  const handleSendCoupon = (couponId) => {
    const addCoupon = {
      member_id: authJWT.memberData.id,
      coupon_id: couponId,
    };
    sendAddCoupon(addCoupon);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3005/memberDashboard/findLimitCoupon`)
      .then((response) => {
        console.log(response.data.couponList);
        setCouponList(response.data.couponList);
      })
      .catch((error) => {
        console.error("前端請求優惠券列表錯誤:", error);
      });
  }, []);

  return (
    <>
      <div className="couponBg">
        <div className="ruleMain">
          <div className="ruleTitle mb-5">會員累積消費說明</div>
          <div className="ruleImg mb-5" />
          <div className="ruleTitle mb-5">限時促銷</div>
          <div className="flashRule d-sm-block d-none">
            {couponList.map((coupon, index) => (
              <div className="couponFlashSales border-bottom" key={index}>
                <div className="">
                  <div className="fs-5">{coupon.name}</div>
                  <div className="fs-5">
                    {coupon.type === 2
                      ? `現折${coupon.discount}元`
                      : `商品 ${coupon.discount} 折券`}
                  </div>
                </div>
                {memberCoupon.some(
                  (memberCoupon) => memberCoupon.id === coupon.id
                ) ? (
                  <button className="btn clickTake" disabled>
                    已領取
                  </button>
                ) : (
                  <button
                    className="btn clickTake"
                    onClick={() => {
                      handleSendCoupon(coupon.id);
                      alert(`已領取優惠券 ${coupon.name}`);
                    }}
                  >
                    點擊領取
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flashRule d-sm-none">
            {couponList.map((coupon, index) => (
              <div className="flashRule border-bottom" key={index}>
                <div className="couponFlashSales">
                  <div className="fs-5">{coupon.name}</div>
                  <div className="fs-5">
                    {coupon.type === 2
                      ? `現折${coupon.discount}元`
                      : `商品 ${coupon.discount} 折券`}
                  </div>
                </div>
                <div className="couponFlashSales">
                  {memberCoupon.some(
                  (memberCoupon) => memberCoupon.id === coupon.id
                ) ? (
                  <button className="btn clickTake" disabled>
                    已領取
                  </button>
                ) : (
                  <button
                    className="btn clickTake"
                    onClick={() => {
                      handleSendCoupon(coupon.id);
                      alert(`已領取優惠券 ${coupon.name}`);
                    }}
                  >
                    點擊領取
                  </button>
                )}
                </div>
                
              </div>
            ))}
          </div>
          {/* <div className="flashRule mb-1">
            <div className="couponFlashSales fs-4 d-lg-flex d-none">
              <span>中秋節全館商品&nbsp;8折</span>
              <Button
                className="clickTake"
                onClick={handleClickOne}
                disabled={isDisabled}
              >
                點擊領取
              </Button>
            </div>
            <div className="couponLine d-lg-flex d-none" />
            <div className="couponFlashSales fs-4 d-lg-flex d-none">
              <span>雙十節全館商品&nbsp;滿千折百</span>
              <Button
                className="clickTake"
                onClick={handleClickTwo}
                disabled={isDisabledTwo}
              >
                點擊領取
              </Button>
            </div>
            <div className="couponFlashSales fs-4 d-sm-none d-flex">
              <span>中秋節全館商品&nbsp;8折</span>
            </div>
            <div className="couponLine d-sm-none d-flex" />
            <div className="couponFlashSales fs-4 d-sm-none d-flex">
              <Button
                className="clickTake"
                onClick={handleClickOne}
                disabled={isDisabled}
              >
                點擊領取
              </Button>
            </div>
          </div> */}
          {/* ------------phone------------ */}
          {/* <div className="flashRule">
            <div className="couponFlashSales fs-4 d-sm-none d-flex">
              <span>雙十節全館商品&nbsp;滿千折百</span>
            </div>
            <div className="couponLine d-sm-none d-flex" />
            <div className="couponFlashSales fs-4 d-sm-none d-flex">
              <Button
                className="clickTake"
                onClick={handleClickTwo}
                disabled={isDisabledTwo}
              >
                點擊領取
              </Button>
            </div>
          </div> */}
          <div className="rulePoint">*優惠券僅可使用一次&nbsp;且限用於商品</div>
        </div>
      </div>
    </>
  );
}
