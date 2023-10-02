# Todo
### 20230926
### 使用JWT(Json web token)進行會員登入驗證

 - [ ] 建立登入表單收集使用者登入資訊(帳號、密碼)
 - [ ] 提交表單時，建立handleLogin函數，使用axios執行post請求，並使用try catch來處理可能錯誤的情況，傳送帳號密碼到後端API處理 (點擊登入時會呼叫此函數發送post請求)


import React, { useState } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import Profile from '../../components/member/profile'
import UpdateProfile from '../../components/member/update-profile'
import UpdatePwd from '../../components/member/update-pwd'
import FavProduct from '../../components/member/fav-product'


export default function MemberCenter() {
  return (
    <>
<Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                  <Col sm='3' className='me-3' md='3'>
                    <div className='text-center pt-5 side-avatar-block '>
                        <img className='rounded-circle ' src='/images/member/default_member.png'/>
                        <p>會員姓名</p>
                        <BiSolidCrown className='crown'/>
                    </div>
                    <Nav variant="pills" className="flex-column side-nav-d-none">
                    <Nav.Item>
                        <Nav.Link eventKey="first">會員中心</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">會員資料設定</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">修改密碼</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">訂單紀錄</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fifth">我的收藏</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="sixth">我的優惠券</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Col md='8' sm='8'>
                    <Tab.Content>
                      <Tab.Pane eventKey="first"><Profile/></Tab.Pane>
                      <Tab.Pane eventKey="second"><UpdateProfile/></Tab.Pane>
                      <Tab.Pane eventKey="third"><UpdatePwd/></Tab.Pane>
                      <Tab.Pane eventKey="fourth">訂單管理</Tab.Pane>
                      <Tab.Pane eventKey="fifth"><FavProduct/></Tab.Pane>
                      <Tab.Pane eventKey="sixth">我的優惠券</Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
                    </Tab.Container>
          
      </Container>
    </>
  )
}