// import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
// import SideBar from "@/components/member/side-bar";
// import Pagination from "@/components/pagination";
// import Link from "next/link";
// import { useRouter } from 'next/router';

// export default function OrderDetail() {
//   const router = useRouter();
//   const { oid } = router.query;
//   return (
//     <>
//       <Row className="member-order-detail">
//       <div className="px-5 py-3">
//         <Link href="/member/order-list">
//           <button className="d-md-none backBtn">返回訂單紀錄</button>
//         </Link>
//       </div> 
//         <Col md="3" className="p-3  offset-md-1 side-bar-border-right">
//           <SideBar />
//         </Col>
//         <Col md="7" className="p-3">
//           <Container className="my-3">
//             <div className="fs-2 mb-3">訂單詳情</div>
//             <div className="row align-items-center py-2">
//               <div className="row col-md-10 text-center">
//                 <div className="col-6">訂單編號： {oid}</div>
//                 <div className="col-6">訂單日期：</div>
//               </div>
//               <div className="col text-center d-none d-md-block">
//                 <Link href="/member/order-list">
//                   <button className="backBtn">返回訂單紀錄</button>
//                 </Link>
//               </div>
//             </div>
//             <Tabs
//               defaultActiveKey="product"
//               id="uncontrolled-tab-example"
//               className="mb-3 fav-header"
//             >
//               <Tab eventKey="product" title="商品">
//                 <table className="order-table-pc">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>名稱</th>
//                       <th>單價</th>
//                       <th>數量</th>
//                       <th>規格</th>
//                       <th>小計</th>
//                       <th>評價</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <img src="/images/member/default_member.png" />
//                       </td>
//                       <td>雞雞弓箭</td>
//                       <td>777</td>
//                       <td>7</td>
//                       <td>火雞毛</td>
//                       <td>500</td>
//                       <td></td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <img src="/images/member/default_member.png" />
//                       </td>
//                       <td>雞雞弓箭</td>
//                       <td>777</td>
//                       <td>7</td>
//                       <td>火雞毛</td>
//                       <td>500</td>
//                       <td></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </Tab>
//               <Tab eventKey="course" title="課程">
//                 <table className="order-table-pc">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>名稱</th>
//                       <th>單價</th>
//                       <th>數量</th>
//                       <th>規格</th>
//                       <th>小計</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <img src="/images/member/default_member.png" />
//                       </td>
//                       <td>雞雞弓箭</td>
//                       <td>777</td>
//                       <td>7</td>
//                       <td>火雞毛</td>
//                       <td>500</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </Tab>
//             </Tabs>
//           </Container>          
//           <Pagination />
//         </Col>
//       </Row>
//     </>
//   );
// }
