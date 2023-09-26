import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import MemberSidebar from "@/components/member-sidebar";
import Pagination from "@/components/pagination";
import CouponCard from "@/components/coupon-card";

export default function Coupon() {
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-3 p-3">
          <MemberSidebar />
        </div>
        <div className="col-12 col-md-9 my-4">
          <h3>我的優惠券</h3>
          <Tabs
            defaultActiveKey="home"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="home" title="擁有的優惠券">
              <div className="container">
                <div className="row text-center">
                  <div className="col-6">
                    <input type="checkbox" className="form-check-input mx-2" />
                    僅顯示可使用的優惠券
                  </div>
                  <div className="col-6">一鍵清空失效的優惠券</div>
                </div>    
                <div className="row">
                  <div className="col-12 col-xl-6 col-xxl-4">
                    <CouponCard type={1}/>
                  </div>
                  <div className="col-12 col-xl-6 col-xxl-4">
                    <CouponCard type={1}/>
                  </div>
                  <div className="col-12 col-xl-6 col-xxl-4">
                    <CouponCard type={2}/>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="優惠券使用紀錄">
              優惠券使用紀錄
            </Tab>
          </Tabs>
          <Pagination />
        </div>
      </div>
    </>
  );
}
