import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { Rate, Collapse } from 'antd';
import axios from "axios";

import SideBar from "@/components/member/side-bar";
// import orderDetails from "@/data/order-detail.json";

export default function OrderDetail() {
  const router = useRouter();
  //oid要改
  const { oid } = router.query;

  //處理評價區塊開關
  const [isRatingSectionOpen, setIsRatingSectionOpen] = useState(false);
  const toggleRatingSection = () => {
    setIsRatingSectionOpen(!isRatingSectionOpen);
  };

  //OrderDetail
  const [order,setOrder]=useState("");
  const [detailData, setDetailData] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [courseDetail, setCourseDetail] = useState([]);
  

  //該筆訂單資料
  useEffect(() => {
    axios
    .get(`http://localhost:3005/memberDashboard//FindOrder?orderId=${oid}`)
    .then((response) => {
      const order = response.data.order;
      setOrder(order);
    })
    .catch((error) => {
      console.error("前端請求該筆訂單錯誤:", error);
    });
  },[oid])

  //訂單細節資料
  useEffect(() => {
      axios
      .get(`http://localhost:3005/memberDashboard/FindOrderDetail?orderId=${oid}`)
      .then((response) => {
        const orderDetail = response.data;
        const productOrderDetail = response.data.productOrderDetail;
        const courseOrderDetail = response.data.courseOrderDetail
        setDetailData(orderDetail);
        setProductDetail(productOrderDetail);
        setCourseDetail(courseOrderDetail);
        // console.log(productDetail)
      })
      .catch((error) => {
        console.error("前端請求訂單詳情錯誤:", error);
      });
    },[oid])

  return (
    <>
      <Row className="member-order-detail">
        <div className="px-5 py-3 d-md-none">
          <Link href="/member/order-list">
            <button className="backBtn">
              <FaAngleLeft />
            </button>
          </Link>
        </div>
        <Col md="3" className="p-3  offset-md-1 side-bar-border-right">
          <SideBar />
        </Col>
        <Col md="7" className="p-3">
          <Container className="my-3">
            <div className="fs-2 mb-3 title-bar">
              訂單詳情
            </div>
            <div className="row align-items-center py-2">
              <div className="row col-md-10 col-lg-6 text-start">
                <div className="col-6">訂單編號：{oid}</div>
                <div className="col-6">訂單時間：{order[0] ? order[0].order_date : '載入中...'}</div>
              </div>
              <div className="col text-end d-none d-md-block">
                <Link href="/member/order-list">
                  <button className="backBtn">返回訂單紀錄</button>
                </Link>
              </div>
            </div>
            <Tabs
              defaultActiveKey="product"
              id="uncontrolled-tab-example"
              className="mb-3 fav-header"
            >
              <Tab eventKey="product" title="商品">
                <div className="order-table-pc d-none d-md-block">
                  <div className="thead text-center py-2 row">
                    <div className="col">#</div>
                    <div className="col">名稱</div>
                    <div className="col">單價</div>
                    <div className="col">數量</div>
                    <div className="col">規格</div>
                    <div className="col">小計</div>
                    <div className="col">評價</div>
                  </div>
                  <Collapse
                    accordion
                    expandIcon={(panelProps) => (
                      <button className="btn m-2 text-light">展開</button>
                    )}
                    expandIconPosition="end"
                    style={{
                      borderRadius: 0,
                    }}
                  >
                    {productDetail.map((order, index) => (
                      <Collapse.Panel
                        key={index}
                        header={(
                          <div>
                            <div className="row text-center">
                              <div className="col">
                              {/* <img src="/images/member/default_member.png" /> */}
                              {order.product_img}
                              </div>
                              <div className="col">{order.product_name}</div>
                              <div className="col">{order.price}</div>
                              <div className="col">{order.quantity}</div>
                              <div className="col">
                                <div>{order.detail_1}</div>
                                <div>{order.detail_2}</div>
                                <div>{order.detail_3}</div>
                              </div>
                              <div className="col">{order.price * order.quantity}</div>
                            </div>
                          </div>
                        )}
                      >
                        <div>
                        <div className="comment-wrapper">
                          <div className="star-area d-flex">
                            <div>評價</div>
                            <div className="star-component">
                              <Rate allowHalf defaultValue={2.5} />
                            </div>
                          </div>
                          <div className="text-area">
                            <div>留言</div>
                            <textarea placeholder="請留下您的評價"></textarea>
                          </div>
                          <button className="btn">送出</button>
                        </div>
                      </div>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </div>
                <div className="order-table-mobile d-md-none">
                  {productDetail.map((order, index) => (
                    <div className="row align-items-center py-3">
                      <div className="col-4 text-center">
                        {/* <img src="/images/member/default_member.png" /> */}
                        {order.product_img}
                      </div>
                      <div className="col-5">
                        <div className="order-title">{order.product_name}</div>
                        <div className="order-contain">{order.price}</div>
                      </div>
                      <div className="col-3">{order.quantity}</div>
                    </div>
                  ))}
                  <div className="row align-items-center py-3">
                  </div>
                  <div className="container p-3">
                    <div className="order-info">
                      <div>收貨人姓名：{order[0] ? order[0].receive_name : '載入中...'}</div>
                      <div>收貨人地址：{order[0] ? order[0].receive_add : '載入中...'}</div>
                      <div>付款方式：{order[0] ? order[0].payment : '載入中...'}</div>
                    </div>
                    <div className="text-end">
                      <div>訂單總計</div>
                      <div className="order-subtotal fw-bold">{order[0] ? order[0].subtotal : '載入中...'}</div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="course" title="課程">
              <div className="order-table-pc d-none d-md-block">
                  <div className="thead text-center py-2 row">
                    <div className="col">#</div>
                    <div className="col">名稱</div>
                    <div className="col">單價</div>
                    <div className="col">評價</div>
                  </div>
                  <Collapse
                    accordion
                    expandIcon={(panelProps) => (
                      <button className="btn m-2 text-light">展開</button>
                    )}
                    expandIconPosition="end"
                    style={{
                      borderRadius: 0,
                    }}
                  >
                    {courseDetail.map((order, index) => (
                      <Collapse.Panel
                        key={index}
                        header={(
                          <div>
                            <div className="row text-center">
                              <div className="col">{/* <img src="/images/member/default_member.png" /> */}
                              {order.course_img}</div>
                              <div className="col">{order.course_name}</div>
                              <div className="col">{order.price}</div>
                            </div>
                          </div>
                        )}
                      >
                        <div>
                        <div className="comment-wrapper">
                          <div className="star-area d-flex">
                            <div>評價</div>
                            <div className="star-component">
                              <Rate allowHalf defaultValue={2.5} />
                            </div>
                          </div>
                          <div className="text-area">
                            <div>留言</div>
                            <textarea placeholder="請留下您的評價"></textarea>
                          </div>
                          <button className="btn">送出</button>
                        </div>
                      </div>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </div>       
                <div className="order-table-mobile d-md-none">
                {courseDetail.map((order, index) => (
                    <div className="row align-items-center py-3">
                      <div className="col-4 text-center">
                        {/* <img src="/images/member/default_member.png" /> */}
                        {order.course_img}
                      </div>
                      <div className="col-5">
                        <div className="order-title">{order.course_name}</div>
                        <div className="order-contain">{order.price}</div>
                      </div>
                    </div>
                  ))}
                  <div className="container p-3">
                    <div className="order-info">
                      <div>收貨人姓名：{order[0] ? order[0].receive_name : '載入中...'}</div>
                      <div>收貨人地址：{order[0] ? order[0].receive_add : '載入中...'}</div>
                      <div>付款方式：{order[0] ? order[0].payment : '載入中...'}</div>
                    </div>
                    <div className="text-end">
                      <div>訂單總計</div>
                      <div className="order-subtotal fw-bold">{order[0] ? order[0].subtotal : '載入中...'}</div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Container>
        </Col>
      </Row>
    </>
  );
}
