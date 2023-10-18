import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Tab, Tabs } from "react-bootstrap";
import SideBar from "../../components/member/side-bar";
import { FaList } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useAuthJWT } from "@/hooks/use-auth-jwt";

import MemberOrder from "@/data/Member-order.json";
// import Pagination from "@/components/pagination";

export default function OrderList() {
  const { authJWT } = useAuthJWT();

  // OrderList
  const [ordersData, setOrdersData] = useState([]);
  const [finishedOrder, setFinishedOrder] = useState([]);

  useEffect(() => {
    if (authJWT.isAuth) {
      const memberId = authJWT.memberData.id;
      axios
        .get(
          `http://localhost:3005/memberDashboard/FindMemberOrder?memberId=${memberId}`
        )
        .then((response) => {
          setOrdersData(response.data.ordersData);
        })
        .catch((error) => {
          console.error("前端請求訂單資料錯誤:", error);
        });
    }
  }, [authJWT.isAuth]);

  useEffect(() => {
    if (authJWT.isAuth) {
      const memberId = authJWT.memberData.id;
      axios
        .get(
          `http://localhost:3005/memberDashboard/FindFinishedOrder?memberId=${memberId}`
        )
        .then((response) => {
          setFinishedOrder(response.data.finishedOrder);
        })
        .catch((error) => {
          console.error("前端請求已完成訂單資料錯誤:", error);
        });
    }
  }, [authJWT.isAuth]);

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
                      <th>訂單編號</th>
                      <th>訂單金額</th>
                      <th>成立日期</th>
                      <th>訂單詳情</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {ordersData.map((order, index) => (
                      <tr key={order.id}>
                        <td>{order.order_id}</td>
                        <td>{order.subtotal}</td>
                        <td>{order.date}</td>
                        <td>
                          <Link href={`/member/order-detail/${order.order_id}`}>
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
                    {ordersData.map((order, index) => (
                      <div
                        className="row align-items-center p-2 member-order"
                        key={order.id}
                      >
                        <div className="col-9">
                          <div className="order-title">訂單編號：</div>
                          <div className="order-contain">{order.order_id}</div>
                          <div className="order-title">成立日期：</div>
                          <div className="order-contain">{order.date}</div>
                          <div className="order-title">訂單金額：</div>
                          <div className="order-contain">{order.subtotal}</div>
                        </div>
                        <div className="col-3 text-center">
                          <Link href={`/member/order-detail/${order.order_id}`}>
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
                      <th>訂單編號</th>
                      <th>訂單金額</th>
                      <th>成立日期</th>
                      <th>訂單詳情</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {finishedOrder.map((order, index) => (
                      <tr key={order.id}>
                        <td>{order.order_id}</td>
                        <td>{order.subtotal}</td>
                        <td>{order.date}</td>
                        <td>
                          <Link href={`/member/order-detail/${order.order_id}`}>
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
                    {finishedOrder.map((order, index) => (
                      <div
                        className="row align-items-center p-2 member-order"
                        key={order.id}
                      >
                        <div className="col-9">
                          <div className="order-title">訂單編號：</div>
                          <div className="order-contain">{order.order_id}</div>
                          <div className="order-title">成立日期：</div>
                          <div className="order-contain">{order.date}</div>
                          <div className="order-title">訂單金額：</div>
                          <div className="order-contain">{order.subtotal}</div>
                        </div>
                        <div className="col-3 text-center">
                          <Link href={`/member/order-detail/${order.order_id}`}>
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
            {/* <Pagination /> */}
          </Container>
        </Col>
      </Row>
    </>
  );
}
