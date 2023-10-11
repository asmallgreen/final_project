import React, { useState, useEffect, useContext } from "react";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import axios from "axios";
import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import SideBar from "@/components/member/side-bar";
import Pagination from "@/components/pagination";
import CouponCard from "@/components/coupon-card";
import Link from "next/link";

export default function MemberCoupon() {
  // //驗證member id
  const { authJWT } = useAuthJWT();
  const memberId = authJWT.memberData.id;

  const [allCouponData, setAllCouponData] = useState([]);
  const [showValidCoupon, setShowValidCoupon] = useState(false);

  const [UsedCoupon, setUsedCoupon] = useState([]);

  // 過濾checkbox切換
  const handleValidCoupon = () => {
    setShowValidCoupon((prevShowValidCoupon) => !prevShowValidCoupon);
  };
  //刪除失效優惠券並重新渲染
  const handleClearInvalidCoupon = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/memberDashboard//DeleteUnvalidCoupon?memberId=${memberId}`
      );
      if (response.data.code === "200") {
        alert("刪除失效優惠券成功");
        showAllCouponData();
      } else {
        alert("刪除失效優惠券失敗");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //讀取member-coupon & 過濾失效coupon
  const showAllCouponData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/memberDashboard/findMemberCoupon?memberId=${memberId}`
      );
      const allCoupon = response.data.memberCoupon;

      if (showValidCoupon) {
        const validCoupon = allCoupon.filter((coupon) => {
          const deadlineDate = new Date(coupon.deadline);
          const currentDate = new Date();
          return deadlineDate >= currentDate;
        });
        setAllCouponData(validCoupon);
      } else {
        setAllCouponData(allCoupon);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //讀取訂單已使用coupon
  const showUsedCouponData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/memberDashboard//FindUsedCoupon?memberId=${memberId}`
      );
      const UsedCoupon = response.data.UsedCoupons;
      setUsedCoupon(UsedCoupon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showAllCouponData();
    showUsedCouponData();
  }, [showValidCoupon, memberId]);

  return (
    <>
      <Row>
        <Col md="3" className="p-3  offset-md-1 side-bar-border-right">
          <SideBar />
        </Col>
        <Col md="7" className="p-3">
          <Container className="my-3">
            <div className="fs-2 mb-3">我的優惠券</div>
            <div>
              <Tabs
                defaultActiveKey="product"
                id="uncontrolled-tab-example"
                className="mb-3 fav-header"
              >
                <Tab eventKey="product" title="擁有的優惠券">
                  <div className="container">
                    <div className="row p-3 fs-5 fw-bold">
                      <div className="col-12 col-lg-6 text-center align-self-center py-1 coupon-check">
                        <label>
                          <input
                            className="mx-2"
                            name="isCheck"
                            type="checkbox"
                            checked={showValidCoupon}
                            onChange={handleValidCoupon}
                          />
                          <span>僅顯示可使用的優惠券</span>
                        </label>
                      </div>
                      <div
                        className="col-12 col-lg-6 text-center py-1 coupon-clear"
                        onClick={handleClearInvalidCoupon}
                      >
                        一鍵清空失效的優惠券
                      </div>
                    </div>
                    <div className="row">
                      {allCouponData.map((coupon, index) => (
                        <div className="col-12 col-lg-6" key={index}>
                          <CouponCard
                            key={index}
                            name={coupon.name}
                            type={coupon.type}
                            discount={coupon.discount}
                            deadline={coupon.deadline}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="course" title="優惠券使用紀錄">
                  <table className="coupon-table text-center">
                    <thead>
                      <tr>
                        <th>已使用優惠券</th>
                        <th>訂單編號</th>
                        <th>折扣金額</th>
                        <th>訂單折扣後金額</th>
                        <th>使用日期</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UsedCoupon.map((coupon, index) => (
                        <tr key={index}>
                          <td>
                            <CouponCard
                            name={coupon.coupon_name}
                            type={coupon.coupon_type}
                            discount={coupon.coupon_discount}
                            deadline={coupon.coupon_deadline}
                            />
                          </td>
                          <td>
                          <Link href={`/member/order-detail/${coupon.order_id}`}>{coupon.order_id}</Link>
                        </td>
                        <td>$500</td>
                        <td>$1000</td>
                        <td>2023-09-12</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
              </Tabs>
              <Pagination />
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
