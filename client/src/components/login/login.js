import React, { useState, useEffect } from 'react'
import {Container, Form, InputGroup, Col, Row, Button} from 'react-bootstrap'
import Link from 'next/link'


export default function Login({ formType, setFormType }) {

  // const { member, setMember, setIsLogin, isLogin } = useLogin()
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false)

  // 會員登入表單提交函數
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }

  };
  



 
  return (
    <>
    <div className='position-relative d-flex justify-content-center align-items-center vh-100 bt-container'>
        <div className='login-block'>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='login-block-container'>
          <div className='d-flex justify-content-around fs-3 mb-3'>
            <div className='login-border-bottom d-flex justify-content-center'>
              <Link href='/member/register' className='text-decoration-none' onClick={(e)=>{e.preventDefault();setFormType('register')}}>註冊</Link>
            </div>
            <div>
              <p>|</p>
            </div>
            <div className='login-border-bottom d-flex justify-content-center login-link'>
              <a href='/member/login' className='text-decoration-none' onClick={(e)=>{e.preventDefault();setFormType('login')}}>登入</a>
            </div>
          </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>帳號</Form.Label>
          <Form.Control
            required
            type="text"
          />
          <Form.Control.Feedback type="invalid">請輸入帳號</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            required
            type="text"
          />
          <Form.Control.Feedback type='invalid'>請輸入密碼</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='my-4'>
        <Form.Group as={Col} md='12' controlId="validationCustom03">
          <Form.Label >
            <input type='checkbox' checked={checked} onChange={()=>{
                setChecked(!checked)
            }} className='me-2'/> 記住我
          </Form.Label>
            
        </Form.Group>
      </Row>
    <Row className='d-flex justify-content-center'>
      <Form.Group as={Col} md='7' xs='5' className='p-0 '>
        <a href='/' className='forgetpwd-link' onClick={(e)=>{e.preventDefault();setFormType('forgotPwd') }}>忘記密碼</a>
      </Form.Group>
      <Form.Group as={Col} md='5' xs='5' className='p-0 text-end'>
        <Button type="submit" className='login-button bgc-primary'>登入</Button>
      </Form.Group>
    </Row>
    </Form>
    <div><p className='text-center'>_______________________________________</p></div>
    <div className='text-center mb-5'>
    <button className='google-login-btn'>
      <img src='/Duo/googleLogin.svg' alt='googleicon'/>使用Google登入
    </button>
    </div>
        </div>
      </div>
      </>
  )
}
