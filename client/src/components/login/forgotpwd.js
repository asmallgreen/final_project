import React, {useState} from 'react'
import {Container, Form, InputGroup, Col, Row, Button} from 'react-bootstrap'

export default function ForgotPwd( {formType, setFormType} ) {
  const [validated, setValidated] = useState(false);
  
  const handleForgotSubmit= () => {

  }

  return (
    <>
            <Container className='position-relative d-flex justify-content-center align-items-center vh-100 bt-container'>
        <div className='login-block'>
        <Form noValidate validated={validated} onSubmit={handleForgotSubmit} className='login-block-container'>
          <div>
          <p className='fs-3 mb-3 text-center'>忘記密碼</p></div>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>帳號</Form.Label>
          <Form.Control
            required
            type="text"
          />
          <Form.Control.Feedback type="invalid">請輸入帳號</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>註冊時使用信箱</Form.Label>
          <Form.Control
            required
            type="mail"
          />
          <Form.Control.Feedback type='invalid'>請輸入註冊時填寫的信箱</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
      <Form.Group as={Col} md='12' xs='12' className='my-4 d-flex justify-content-between'>
      <Button className='login-button' onClick={()=>{setFormType(true)}}>返回</Button>
        <Button type="submit" className='login-button'>送出</Button>
      </Form.Group>
      </Row>
    </Form>
        </div>
      </Container>
    </>
  )
}
