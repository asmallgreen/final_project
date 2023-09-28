import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, Tab, Tabs } from 'react-bootstrap'
import SideBar from '../../components/member/side-bar'
import { FaList } from "react-icons/fa";

import MemberOrder from "@/data/Member-order.json";
import Pagination from "@/components/pagination";


export default function OrderList() {
  return (
    <>
      <Row>
        <Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
          <SideBar />
        </Col>
        <Col md='7' className='p-3'>
          <Container className='my-3'>
            <div className='fs-2 mb-3'>訂單紀錄</div>
            <Tabs
              defaultActiveKey="product"
              id="uncontrolled-tab-example"
              className="mb-3 fav-header"
              justify
            >
              <Tab eventKey="product" title="進行中訂單">
                <table className="order-table-pc d-none d-md-table">
                  <thead className="text-center">
                    <tr>
                      <th>#</th>
                      <th>訂單編號</th>
                      <th>訂單金額 </th>
                      <th>成立日期</th>
                      <th>訂單詳情</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {MemberOrder.map((order, index) => (
                      <tr key={order.id}>
                        <th>
                          <img
                            src="/images/member/default_member.png"
                            alt={`Order ${order.id}`}
                          />
                        </th>
                        <td>{order.orderNumber}</td>
                        <td>{order.orderAmount}</td>
                        <td>{order.orderDate}</td>
                        <td>
                          <button type="button" className="btn btn-dark">
                            <FaList />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="container order-table-mobile d-md-none">
                  <div>
                    <div className="row align-items-center p-2">
                      <div className="col-3 text-center">
                        <img src="/images/member/default_member.png" />
                      </div>
                      <div className="col-8">
                        <h5>產品名稱</h5>
                        <p>產品價格</p>
                      </div>
                      <div className="col-1">*1</div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-6 text-center">
                        <button className="btn">訂單詳情</button>
                      </div>
                      <div className="col-6 text-end">
                        <div>訂單總計</div>
                        <div className="subtotal">$123</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="course" title="已完成訂單">

              </Tab>
            </Tabs>
            <Pagination />
          </Container>
        </Col>
      </Row>
    </>
  )
}