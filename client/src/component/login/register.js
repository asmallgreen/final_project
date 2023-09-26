import React, { useState, useEffect } from 'react'
import {Container, Form, InputGroup, Col, Row, Button, FloatingLabel} from 'react-bootstrap'


export default function Login({  formType, setFormType }) {

  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
    <div className='position-relative d-flex justify-content-center align-items-center bt-container '>
        <div className='login-block my-3'>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='login-block-container'>
          <div className='d-flex justify-content-around fs-3 mb-3'>
          <div className='login-border-bottom d-flex justify-content-center login-link'>
              <a href='/member/login' className='text-decoration-none' onClick={(e)=>{e.preventDefault();setFormType('register')}}>註冊</a>
            </div>
            <div>
              <p>|</p>
            </div>
            <div className='login-border-bottom d-flex justify-content-center '>
              <a href='/member/login' className='text-decoration-none' onClick={(e)=>{e.preventDefault();setFormType('login')}}>登入</a>
            </div>
          </div>
      <Row>
        <Form.Group as={Col} md="12" controlId="validationCustom01" className='mb-2'>
          <Form.Label className='mb-0'>帳號</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder='註冊後無法修改'
          />
          <Form.Control.Feedback type="invalid">請輸入帳號</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02" className='mb-2'>
          <Form.Label className='mb-0'>密碼</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder='請輸入至少6位英文大小寫及數字'
          />
          <Form.Control.Feedback type='invalid'>請輸入密碼</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom03" className='mb-2'>
          <Form.Label className='mb-0'>請再次輸入密碼</Form.Label>
          <Form.Control
            required
            type="text"
          />
          <Form.Control.Feedback type='invalid'>再次輸入密碼</Form.Control.Feedback>
        </Form.Group>        
        </Row>
        <Row className='justify-content-between'>
          <Form.Group as={Col} md="6" xs='6' controlId="validationCustom04" className='mb-2'>
          <Form.Label className='mb-0'>姓名</Form.Label>
          <Form.Control
            required
            type="text"
          />
          <Form.Control.Feedback type='invalid'>請輸入姓名</Form.Control.Feedback>
        </Form.Group>        
        <Form.Group as={Col} md="5" xs='5' controlId="validationCustom05" className='mb-2 '>
          <Form.Label className='mb-0 text-end'>性別</Form.Label>
          <Form.Select>
            <option>請選擇</option>
            <option value='1'>男</option>
            <option value='2'>女</option>
          </Form.Select>
          </Form.Group>
        </Row>
        <Row className='d-flex'>
          <Form.Group as={Col} md='4' xs='4' controlId="validationCustom06" className='mb-2'>
          <Form.Label className='mb-0'>生日</Form.Label>
          <Form.Control
            type="text"
            placeholder='西元年'
            className='text-end'
          />
        </Form.Group>
        <Form.Group as={Col} md='4' xs='4' controlId="validationCustom06" className='mb-2'>
          <Form.Label className='mb-0'></Form.Label>
          <Form.Control
            type="text"
            placeholder='月'
            className='text-end'
          />
        </Form.Group>
        <Form.Group as={Col} md='4' xs='4' controlId="validationCustom06" className='mb-2'>
          <Form.Label className='mb-0'></Form.Label>
          <Form.Control
            type="text"
            placeholder='日'
            className='text-end'
          />
        </Form.Group>
          </Row>
          <Row>
        <Form.Group as={Col} md="12" controlId="validationCustom07" className='mb-2'>
          <Form.Label className='mb-0'>Email</Form.Label>
          <Form.Control
            required
            type="mail"
          />
          <Form.Control.Feedback type='invalid'>請輸入Email</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12" controlId="validationCustom07" className='mb-2'>
          <Form.Label className='mb-0'>電話</Form.Label>
          <Form.Control
            required
            type="tel"
          />
          <Form.Control.Feedback type='invalid'>請輸入電話</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12" controlId="validationCustom07" className='mb-2'>
          <Form.Label className='mb-0'>地址</Form.Label>
          <Form.Control
            required
            type="address"
          />
          <Form.Control.Feedback type='invalid'>請輸入地址</Form.Control.Feedback>
        </Form.Group>
      </Row>

    <Row className='mt-3 d-flex justify-content-center'>

      <Form.Group as={Col} md='12' xs='12' className='p-0 text-end'>
        <Button type="submit" className='login-button mb-4'>送出</Button>
      </Form.Group>
    </Row>
    </Form>
        </div>
      </div>
      </>
  )
}
