import React, { use, useEffect, useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { Rate, Collapse, Input, ConfigProvider } from 'antd';
import axios from "axios";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import SideBar from "@/components/member/side-bar";
import Swal from "sweetalert2";
const { TextArea } = Input;
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
  //取得會員資料member_id
  const { authJWT, favoriteCourses, setFavoriteCourses } = useAuthJWT()
  const memberId = authJWT.memberData.id
  //OrderDetail
  const [order, setOrder] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [courseDetail, setCourseDetail] = useState([]);
  const [ratingCourse, setRatingCourse] = useState([]);
  const [scoreCourse, setScoreCourse] = useState(0);
  const [commentCourse, setCommentCourse] = useState('');
  const [ratingCourseData, setRatingCourseData] = useState({
    order_id: '',
    member_id: memberId,
    // course_id: '',
    score: '',
    comment: ''
  })
  // console.log(courseDetail)
  //該筆訂單資料
  useEffect(() => {
    axios
      .get(`http://localhost:3005/memberDashboard//FindOrder?orderId=${oid}`)
      .then((response) => {
        const order = response.data.order;
        setOrder(order);
        if (order[0] && order[0].status === "已完成") {
          // console.log("已完成")
          setIsFinished(true);
        } else {
          // console.log("理貨中")
          setIsFinished(false);
        }
      })
      .catch((error) => {
        console.error("前端請求該訂單錯誤", error);
      });
  }, [oid]);

  // //舊訂單細節資料
  // useEffect(() => {
  //     axios
  //     .get(`http://localhost:3005/memberDashboard/FindOrderDetail?orderId=${oid}`)
  //     .then((response) => {
  //       const orderDetail = response.data;
  //       const productOrderDetail = response.data.productOrderDetail;
  //       const courseOrderDetail = response.data.courseOrderDetail
  //       setDetailData(orderDetail);
  //       setProductDetail(productOrderDetail);
  //       setCourseDetail(courseOrderDetail);
  //       // console.log(productDetail)
  //     })
  //     .catch((error) => {
  //       console.error("前端請求訂單詳情錯誤:", error);
  //     });
  //   },[oid])

  //新訂單細節資料
  useEffect(() => {
    axios
      .get(`http://localhost:3005/memberDashboard/FindDetailOrder?orderId=${oid}`)
      .then((response) => {
        const detailOrder = response.data.detailOrder;

        const productOrderDetail = detailOrder.filter((detail) => detail.product_id !== "0");
        const courseOrderDetail = detailOrder.filter((detail) => detail.course_id !== "0");

        setDetailData(detailOrder);
        setProductDetail(productOrderDetail);
        setCourseDetail(courseOrderDetail);

        // console.log(productOrderDetail)
        // console.log(courseOrderDetail)
      })
  }, [oid])

  //取得評價留言，並存入state
  const commentCourseCurrent = (e) => {
    setRatingCourseData({
      ...ratingCourseData,
      comment: e.target.value
    })
  }
  //取得評價星星數，並存入state
  const scoreCourseCurrent = (value) => {
    setRatingCourseData({
      ...ratingCourseData,
      score: value,
    })
  }
  //取得會員id，並存入state
  // useEffect(() => {
  //   setRatingCourseData({
  //     ...ratingCourseData,
  //     member_id: memberId
  //   })
  // }, [memberId])
  // 取得訂單id，並存入state
  useEffect(() => {
    setRatingCourseData({
      ...ratingCourseData,
      order_id: oid
    })
  }, [oid])

  // console.log(memberId)
  // console.log(scoreCourse)
  // console.log(commentCourse)

  // console.log('送出前', ratingCourseData)
  //接新增評價的後端路由

  const handleRatingCourse = async (courseId) => {
    // console.log(courseId)
    const newRatingCourseData = {
      ...ratingCourseData,
      course_id: courseId
    }

    try {
      const res = await axios.post(`http://localhost:3005/rating-course/add`, newRatingCourseData)
      // console.log(res)
      if (res.data.code === '200') {
        Swal.fire({
          icon: 'success',
          title: '評價成功',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: '35%',
          padding: '0 0 3.25em',
          customClass: {
          }
        })
        setTimeout(() => {
          window.location.href = `/course/${courseId}`;
        }, 1);
        
      } else {
        Swal.fire({
          icon: 'error',
          title: '評價失敗',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: '35%',
          padding: '0 0 3.25em',
          customClass: {
          }
        })
      }

    } catch (error) {
      console.log(error)
    }
  }
  // console.log(ratingCourseData)
  return (
    <>
      {isFinished ? (
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
                  <div className="col-6">訂單時間：<br />{order[0] ? order[0].order_date : '載入中...'}</div>
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
                              <div className="row text-center align-items-center">
                                <div className="col">
                                  <img src={order.img}
                                    alt={order.img}
                                  />
                                </div>
                                <div className="col">{order.name}</div>
                                <div className="col">{order.price}</div>
                                <div className="col">{order.quantity}</div>
                                <div className="col">
                                  <div>{order.product_detail1}</div>
                                  <div>{order.product_detail2}</div>
                                  <div>{order.product_detail3}</div>
                                </div>
                                <div className="col">{order.price * order.quantity}</div>
                              </div>
                            </div>
                          )}
                        >
                          <div>
                          {/* 課程評價UI */}
                          <div className="comment-wrapper mx-auto">
                            <div className="star-area d-flex align-items-center">
                              <div className="fs-5">評價</div>
                              <div className="star-component ms-3 mt-1">
                                <Rate allowHalf
                                  defaultValue={5}
                                // onChange={scoreCourseCurrent}
                                />
                              </div>
                            </div>
                            <div className="text-area">
                              <div className="fs-5">留言</div>
                              <ConfigProvider
                                theme={{
                                  components: {
                                    Input: {
                                      hoverBorderColor: '#B16464',
                                      activeBorderColor: '#B16464',
                                    },
                                  },
                                }}
                              >
                                <TextArea
                                  maxLength={500}
                                  placeholder="請留下您的評價(限500字)"
                                  className="mt-3"
                                  autoSize={{ minRows: 7, maxRows: 7 }}

                                // onChange={commentCourseCurrent}
                                ></TextArea>
                              </ConfigProvider>
                              {/* <textarea
                                required
                                placeholder="請留下您的評價(限500字)"
                                className="mt-3 d-md-block d-none"
                                maxLength={500}
                                rows={7}
                                cols={157}
                                onChange={commentCourseCurrent}
                                >
                                </textarea> */}
                            </div>
                            <button className="btn mt-3"
                            // onClick={() => handleRatingCourse(order.course_id)}
                            >送出</button>
                          </div>
                        </div>
                        </Collapse.Panel>
                      ))}
                    </Collapse>
                  </div>
                  <div className="order-table-mobile d-md-none">
                    {productDetail.map((order, index) => (
                      <div className="row align-items-center py-3" key={index}>
                        <div className="col-4 text-center">
                          <img src={order.img} alt={order.img} />
                        </div>
                        <div className="col-5">
                          <div className="order-title">{order.name}</div>
                          <div className="order-contain">{order.price}</div>
                        </div>
                        <div className="col-3">{order.quantity}</div>
                        <div className="comment-wrapper mx-auto pt-4">
                            <div className="star-area d-flex align-items-center">
                              <div className="fs-5">評價</div>
                              <div className="star-component ms-3 mt-1">
                                <Rate allowHalf
                                  defaultValue={5}
                                  onChange={scoreCourseCurrent} />
                              </div>
                            </div>
                            <div className="text-area">
                              <div className="fs-5">留言</div>
                              <ConfigProvider
                                theme={{
                                  components: {
                                    Input: {
                                      hoverBorderColor: '#B16464',
                                      activeBorderColor: '#B16464',
                                    },
                                  },
                                }}
                              >
                                <TextArea
                                  maxLength={500}
                                  placeholder="請留下您的評價(限500字)"
                                  className="mt-3"
                                  autoSize={{ minRows: 7, maxRows: 7 }}

                                  onChange={commentCourseCurrent}
                                ></TextArea>
                              </ConfigProvider>
                              {/* <textarea
                                required
                                placeholder="請留下您的評價(限500字)"
                                className="mt-3 d-md-block d-none"
                                maxLength={500}
                                rows={7}
                                cols={157}
                                onChange={commentCourseCurrent}
                                >
                                </textarea> */}
                            </div>
                            {/* <div>課程編號: {order.course_id}</div> */}
                            <button className="btn mt-3"
                              >送出</button>
                          </div>
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
                      <div className="col-4">#</div>
                      <div className="col-3">名稱</div>
                      <div className="col-3">單價</div>
                      <div className="col-2">評價</div>
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
                              <div className="row text-center align-items-center">
                                <div className="col-4"><img src={order.img} alt={order.img} />
                                </div>
                                <div className="col-4">{order.name}</div>
                                <div className="col-4">{order.price}</div>
                              </div>
                            </div>
                          )}
                        >
                          <div>
                          <div className="comment-wrapper mx-auto">
                            <div className="star-area d-flex align-items-center">
                              <div className="fs-5">評價</div>
                              <div className="star-component ms-3 mt-1">
                                <Rate allowHalf
                                  defaultValue={5}
                                  onChange={scoreCourseCurrent} />
                              </div>
                            </div>
                            <div className="text-area">
                              <div className="fs-5">留言</div>
                              <ConfigProvider
                                theme={{
                                  components: {
                                    Input: {
                                      hoverBorderColor: '#B16464',
                                      activeBorderColor: '#B16464',
                                    },
                                  },
                                }}
                              >
                                <TextArea
                                  maxLength={500}
                                  placeholder="請留下您的評價(限500字)"
                                  className="mt-3"
                                  autoSize={{ minRows: 7, maxRows: 7 }}

                                  onChange={commentCourseCurrent}
                                ></TextArea>
                              </ConfigProvider>
                              {/* <textarea
                                required
                                placeholder="請留下您的評價(限500字)"
                                className="mt-3 d-md-block d-none"
                                maxLength={500}
                                rows={7}
                                cols={157}
                                onChange={commentCourseCurrent}
                                >
                                </textarea> */}
                            </div>
                            {/* <div>課程編號: {order.course_id}</div> */}
                            <button className="btn mt-3"
                              onClick={() => handleRatingCourse(order.course_id)}>送出</button>
                          </div>
                          </div>
                        </Collapse.Panel>
                      ))}
                    </Collapse>
                  </div>
                  <div className="order-table-mobile d-md-none">
                    {courseDetail.map((order, index) => (
                      <div className="row align-items-center py-3" key={index}>
                        <div className="col-5 text-center">
                          <img src={order.img} alt={order.img} />
                        </div>
                        <div className="col-7">
                          <div className="order-title">{order.name}</div>
                          <div className="order-contain">{order.price}</div>
                        </div>
                        <div className="comment-wrapper mx-auto pt-4">
                            <div className="star-area d-flex align-items-center">
                              <div className="fs-5">評價</div>
                              <div className="star-component ms-3 mt-1">
                                <Rate allowHalf
                                  defaultValue={5}
                                  onChange={scoreCourseCurrent} />
                              </div>
                            </div>
                            <div className="text-area">
                              <div className="fs-5">留言</div>
                              <ConfigProvider
                                theme={{
                                  components: {
                                    Input: {
                                      hoverBorderColor: '#B16464',
                                      activeBorderColor: '#B16464',
                                    },
                                  },
                                }}
                              >
                                <TextArea
                                  maxLength={500}
                                  placeholder="請留下您的評價(限500字)"
                                  className="mt-3"
                                  autoSize={{ minRows: 7, maxRows: 7 }}

                                  onChange={commentCourseCurrent}
                                ></TextArea>
                              </ConfigProvider>
                              {/* <textarea
                                required
                                placeholder="請留下您的評價(限500字)"
                                className="mt-3 d-md-block d-none"
                                maxLength={500}
                                rows={7}
                                cols={157}
                                onChange={commentCourseCurrent}
                                >
                                </textarea> */}
                            </div>
                            {/* <div>課程編號: {order.course_id}</div> */}
                            <button className="btn mt-3"
                              onClick={() => handleRatingCourse(order.course_id)}>送出</button>
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
      ) : (
        <Row className="member-order-detail">
          <div className="px-5 py-3 d-md-none">
            <Link href="/member/order-list">
              <button className="backBtn">
                <FaAngleLeft />
              </button>
            </Link>
          </div>
          <Col md="3" className="p-3 offset-md-1 side-bar-border-right">
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
                  <div className="col-6">訂單時間：<br />{order[0] ? order[0].order_date : '載入中...'}</div>
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
                    </div>
                    {productDetail.map((order, index) => (
                      <div key={index}>
                        <div className="row text-center align-items-center">
                          <div className="col">
                            <img src={order.img} alt={order.img} />
                          </div>
                          <div className="col">{order.name}</div>
                          <div className="col">{order.price}</div>
                          <div className="col">{order.quantity}</div>
                          <div className="col">
                            <div>{order.product_detail1}</div>
                            <div>{order.product_detail2}</div>
                            <div>{order.product_detail3}</div>
                          </div>
                          <div className="col">{order.price * order.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-table-mobile d-md-none">
                    {productDetail.map((order, index) => (
                      <div key={index} className="row align-items-center py-3">
                        <div className="col-4 text-center">
                          <img src={order.img} alt={order.img} />
                        </div>
                        <div className="col-5">
                          <div className="order-title">{order.name}</div>
                          <div className="order-contain">{order.price}</div>
                        </div>
                        <div className="col-3">{order.quantity}</div>
                      </div>
                    ))}
                    <div className="row align-items-center py-3">
                      {/* 这里放其他内容 */}
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
                      <div className="col-4">#</div>
                      <div className="col-4">名稱</div>
                      <div className="col-4">單價</div>
                    </div>
                    {courseDetail.map((order, index) => (
                      <div key={index} className="row text-center align-items-center">
                        <div className="col-4">
                          <img src={order.img} alt={order.img} />
                        </div>
                        <div className="col-4">{order.name}</div>
                        <div className="col-4">{order.price}</div>
                      </div>
                    ))}
                  </div>
                  <div className="order-table-mobile d-md-none">
                    {courseDetail.map((order, index) => (
                      <div key={index} className="row align-items-center py-3">
                        <div className="col-4 text-center">
                          <img src={order.img} alt={order.img} />
                        </div>
                        <div className="col-5">
                          <div className="order-title">{order.name}</div>
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
      )
      }
    </>
  );
}
