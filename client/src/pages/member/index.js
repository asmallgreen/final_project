import React, { useState } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import Profile from '../../components/member/profile'
import UpdateProfile from '../../components/member/update-profile'
import UpdatePwd from '../../components/member/update-pwd'
import FavProduct from '../../components/member/fav-product'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export default function MemberCenter() {
  return (
    <>
<Router>
  <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
<div className='member-sidebar'>
            <div className='text-center pt-5'>
                  <img src='/images/member/default_member.png'/>
                  <p>會員姓名</p>
                  <div className='d-flex justify-content-center'>
                    <div className='text-start'>
                  <ul className="list-unstyled pt-3 d-none d-md-block">
                    <li><Link to='/member'>會員中心</Link></li>
                    <li><Link to='/member/update-profile'>會員資料設定</Link></li>
                    <li><Link to='member/update-pwd'>修改密碼</Link></li>
                    <li><Link to='/member/order-list'>訂單紀錄</Link></li>
                    <li><Link to='/member/fav-product'>我的收藏</Link></li>
                    <li><Link to='/member/coupon'>我的優惠券</Link></li>
                  </ul>
                </div>
                  </div>
                
            </div>
            
        </div>
    
</Col>
<Col md='7' className='p-3'>
    <Routes>
      <Route path='/member' element={<Profile/>}></Route>
      <Route path='/member/update-profile' element={<UpdateProfile/>}></Route>
      <Route path='/member/update-pwd' element={<UpdatePwd/>}></Route>    <Route path='/member/order-list' element={<UpdateProfile/>}></Route>
      <Route path='/member/fav-product' element={<FavProduct/>}></Route>
      <Route path='/member/coupon' element={<UpdateProfile/>}></Route>
  </Routes>
</Col>

</Row>



</Router>
{/* <h1>123</h1> */}
    </>
  )
}