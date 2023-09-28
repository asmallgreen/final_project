import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, Tab, Tabs } from 'react-bootstrap';
import SideBar from '@/components/member/side-bar';
import Pagination from "@/components/pagination";
import CouponCard from "@/components/coupon-card";
import Link from 'next/link';

import CouponData from "@/data/coupon-list"

export default function MemberCoupon() {
  return (
    <>
      <Row>
        <Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
          <SideBar />
        </Col>
        <Col md='7' className='p-3'>
          <Container className='my-3'>
            <div className='fs-2 mb-3'>我的優惠券</div>
            <Tabs
              defaultActiveKey="product"
              id="justify-tab-example"
              className="mb-3 fav-header"
              justify
            >
              <Tab eventKey="product" title="擁有的優惠券">
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
                    {CouponData.map((coupon, index) => (
                      <div className='col-12 col-lg-6'>
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
                    <tr>
                      <td>
                        <CouponCard type={1} />
                      </td>
                      <td><Link href="/">A123456</Link></td>
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
          </Container>
        </Col>
      </Row>



    </>
  )
}