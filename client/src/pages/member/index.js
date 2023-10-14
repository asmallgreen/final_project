import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { BiSolidCrown } from "react-icons/bi";
import SideBar from "../../components/member/side-bar";
import axios from "axios";
import { useAuthJWT } from "@/hooks/use-auth-jwt";

export default function MemberCenter() {
  const {authJWT, setAuthJWT} = useAuthJWT()
  
  return (
    <>
      <Row>
        <Col md="3" className="p-3  offset-md-1 side-bar-border-right">
          <SideBar />
        </Col>
        <Col md="7" className="p-3">
          <Container className="my-5">
          <div className='fs-2 mb-5'>會員中心</div>
            <div className='d-flex justify-content-center align-items-center'>
              <div>
                <div className='text-center'>
                  <div className='text-center m-auto img-object-fit'>
                  <img
                      className="avatar"
                      src={authJWT.memberData.member_img === 'avatar01.jpg'?'/Duo/avatar01.jpg':`http://localhost:3005/${authJWT.memberData.member_img}`}
                    ></img>
                  </div>
                  <p className='text-center mt-3'>{authJWT.memberData.name}</p>
                </div>
                <div className='mt-5'>
                  <p className='text-center'>
                  會員等級：
                  {authJWT.memberData.level === 1 ? '竹弓會員' : 
                  authJWT.memberData.level === 2 ? '銀弓會員' : 
                  '金弓會員'}</p>
                  <p className='text-center'>加入日期：{authJWT.memberData.created_at}</p>
                </div>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
