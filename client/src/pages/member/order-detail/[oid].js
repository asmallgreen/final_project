import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { Rate, Collapse } from 'antd';

import SideBar from "@/components/member/side-bar";
import orderDetails from "@/data/order-detail.json";

export default function OrderDetail() {
  const router = useRouter();
  const { oid } = router.query;

  //處理評價區塊開關
  const [isRatingSectionOpen, setIsRatingSectionOpen] = useState(false);
  const toggleRatingSection = () => {
    setIsRatingSectionOpen(!isRatingSectionOpen);
  };

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
                <div className="col-6">訂單日期：</div>
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
                    {orderDetails.map((order, index) => (
                      <Collapse.Panel
                        key={index}
                        header={(
                          <div>
                            <div className="row text-center">
                              <div className="col"><img src="/images/member/default_member.png" /></div>
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
                        {order.product_name}的評價擺在這裡
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </div>
                <div className="order-table-mobile d-md-none">
                  <div className="row align-items-center py-3">
                    <div className="col-4 text-center">
                      <img src="/images/member/default_member.png" />
                    </div>
                    <div className="col-5">
                      <div className="order-title">產品名稱1</div>
                      <div className="order-contain">產品單價1</div>
                    </div>
                    <div className="col-3">產品數量</div>
                  </div>
                  <div className="row align-items-center py-3">
                    <div className="col-4  text-center">
                      <img src="/images/member/default_member.png" />
                    </div>
                    <div className="col-5">
                      <div className="order-title">產品名稱2</div>
                      <div className="order-contain">產品單價2</div>
                    </div>
                    <div className="col-3">產品數量</div>
                  </div>
                  <div className="container p-3">
                    <div className="order-info">
                      <div>收貨人姓名：紅色死神</div>
                      <div>收貨人地址：桃園市中壢區新生路32號8樓</div>
                      <div>付款方式：貨到付款</div>
                    </div>
                    <div className="text-end">
                      <div>訂單總計</div>
                      <div className="order-subtotal fw-bold">3200元</div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="course" title="課程">
                <table className="order-table-pc d-none d-md-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>名稱</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th>規格</th>
                      <th>小計</th>
                      <th>評價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src="/images/member/default_member.png" />
                      </td>
                      <td>雞雞弓箭</td>
                      <td>777</td>
                      <td>7</td>
                      <td>火雞毛</td>
                      <td>500</td>
                      <td>
                        <button
                          className="btn collapse-btn"
                          onClick={toggleRatingSection}
                        >
                          {isRatingSectionOpen ? "收起" : "展開"}
                        </button>
                      </td>
                    </tr>
                    <tr
                      className={
                        isRatingSectionOpen
                          ? "rating-section open"
                          : "rating-section close"
                      }
                    >
                      <td colSpan="7">
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="/images/member/default_member.png" />
                      </td>
                      <td>雞雞弓箭</td>
                      <td>777</td>
                      <td>7</td>
                      <td>火雞毛</td>
                      <td>500</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div className="order-table-mobile d-md-none">
                  <div className="row align-items-center py-3">
                    <div className="col-4 text-center">
                      <img src="/images/member/default_member.png" />
                    </div>
                    <div className="col-8">
                      <div className="order-title">產品名稱1</div>
                      <div className="order-contain">產品單價1</div>
                    </div>
                  </div>
                  <div className="row align-items-center py-3">
                    <div className="col-4  text-center">
                      <img src="/images/member/default_member.png" />
                    </div>
                    <div className="col-8">
                      <div className="order-title">產品名稱2</div>
                      <div className="order-contain">產品單價2</div>
                    </div>
                  </div>
                  <div className="container p-3">
                    <div className="order-info">
                      <div>收貨人姓名：紅色死神</div>
                      <div>付款方式：信用卡付款</div>
                    </div>
                    <div className="text-end">
                      <div>訂單總計</div>
                      <div className="order-subtotal fw-bold">3200元</div>
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
