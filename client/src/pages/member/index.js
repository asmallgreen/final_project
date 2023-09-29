import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import SideBar from '../../components/member/side-bar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login'


export default function MemberCenter() {
  return (
    <>
  <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
    <Container className='my-5'>
            <div className='fs-2 mb-5'>會員中心</div>
            <div className='d-flex justify-content-center align-items-center'>
              <div>
                
                <div>
                  <img className='avatar' src='/Duo/avatar01.jpg'></img>
                  <p className='text-center mt-3'>怡君</p>
                </div>
                <div className='mt-5'>
                  <p className='text-center'>會員等級：金弓會員</p>
                  <p className='text-center'>加入日期：2023-08-21</p>
                </div>
              </div>
            </div>
      </Container>
</Col>
        
</Row>

    </>
  )
}