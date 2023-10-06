import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import SideBar from "../../components/member/side-bar";
import { FaList } from "react-icons/fa";
import Link from "next/link";

import MemberOrder from "@/data/Member-order.json";
import Pagination from "@/components/pagination";

export default function OrderList() {

  return (
    <>
      <Row>
        <Col md="3" className="p-3  offset-md-1 side-bar-border-right">
          <SideBar />
        </Col>
        <Col md="7" className="p-3">
          <Container className="my-3">
            <div className="fs-2 mb-3">訂單紀錄</div>
            <Tabs
              defaultActiveKey="product"
              id="uncontrolled-tab-example"
              className="mb-3 fav-header"
            >
              <Tab eventKey="product" title="進行中訂單">
                <table className="order-table-pc d-none d-md-table">
                  <thead className="text-center">
                    <tr>
                      <th>#</th>
                      <th>訂單編號</th>
                      <th>訂單金額</th>
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
                          <Link href={`/member/order-detail/${order.orderNumber}`}>
                            <button type="button" className="btn">
                              <FaList />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="container order-table-mobile d-md-none">
                  <div>
                    {MemberOrder.map((order, index) => (
                      <div className="row align-items-center p-2 member-order"
                        key={order.id}>
                        <div className="col-3 text-center">
                          <img
                            src="/images/member/default_member.png"
                            alt={`Order ${order.id}`}
                          />
                        </div>
                        <div className="col-6">
                          <div className="order-title">訂單編號：</div>
                          <div className="order-contain">{order.orderNumber}</div>
                          <div className="order-title">成立日期：</div>
                          <div className="order-contain">{order.orderDate}</div>
                          <div className="order-title">訂單金額：</div>
                          <div className="order-contain">{order.orderAmount}</div>
                        </div>
                        <div className="col-3 text-center">
                          <Link href={`/member/order-detail/${order.orderNumber}`}>
                            <button className="btn">
                              <FaList />
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="course" title="已完成訂單">
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
                          <Link href={`/member/order-detail/${order.orderNumber}`}>
                            <button type="button" className="btn">
                              <FaList />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="container order-table-mobile d-md-none">
                  <div>
                    {MemberOrder.map((order, index) => (
                      <div className="row align-items-center p-2 order"
                        key={order.id}>
                        <div className="col-3 text-center">
                          <img
                            src="/images/member/default_member.png"
                            alt={`Order ${order.id}`}
                          />
                        </div>
                        <div className="col-6">
                          <div className="order-title">訂單編號：</div>
                          <div className="order-contain">{order.orderNumber}</div>
                          <div className="order-title">成立日期：</div>
                          <div className="order-contain">{order.orderDate}</div>
                          <div className="order-title">訂單金額：</div>
                          <div className="order-contain">{order.orderAmount}</div>
                        </div>
                        <div className="col-3 text-center">
                          <Link href={`/member/order-detail/${order.orderNumber}`}>
                            <button className="btn">
                              <FaList />
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>
            </Tabs>
            <Pagination />
          </Container>
        </Col>
      </Row>
    </>
  );
}