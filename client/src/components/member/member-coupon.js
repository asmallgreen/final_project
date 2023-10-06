import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Pagination from "@/components/pagination";
import CouponCard from "@/components/coupon-card";

import OrderList from "@/data/order-list.json";

export default function MemberCoupon() {
  return (
    <>
      <div className="row">
        <div className="my-4">
          <h3>我的優惠券</h3>
          <Tabs
            defaultActiveKey="have"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="have" title="擁有的優惠券">
              <div className="container">
                <div className="row p-3 fs-5 fw-bold">
                  <div className="col-12 col-md-6 text-center align-self-center py-1 coupon-check">
                    <input type="checkbox" className="form-check-input mx-2" />
                    <span>僅顯示可使用的優惠券</span>
                  </div>
                  <div className="col-12 col-md-6 text-center py-1 coupon-clear">
                    一鍵清空失效的優惠券
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <CouponCard/>
                  </div>
                  <div className="col-12 col-lg-6">
                    <CouponCard type={1} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <CouponCard type={2} />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="used" title="優惠券使用紀錄">
              優惠券使用紀錄
              <table className="coupon-table text-center">
                <thead className="">
                  <tr>
                    <th>已使用優惠券</th>
                    <th>訂單編號</th>
                    <th>折扣金額</th>
                    <th>訂單折扣後金額</th>
                    <th>使用日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <CouponCard type={1} />
                    </td>
                    <td>A123456</td>
                    <td>$500</td>
                    <td>$1000</td>
                    <td>2023-09-12</td>
                  </tr>
                  <tr>
                    <td>
                      <CouponCard type={2} />
                    </td>
                    <td>A123456</td>
                    <td>$500</td>
                    <td>$1000</td>
                    <td>2023-09-12</td>
                  </tr>
                </tbody>
              </table>
            </Tab>
          </Tabs>
          <Pagination />
        </div>
      </div>
    </>
  );
}
