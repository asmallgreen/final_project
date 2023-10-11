import React, {useState} from 'react'
import {Container, Form, InputGroup, Col, Row, Button} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

export default function ForgotPwd( {formType, setFormType} ) {
  const [validated, setValidated] = useState(false);
  // 設定狀態存放使用者填寫的帳號跟信箱
  const [memberInput, setMemberInput] = useState({
    account:'',
    email:''
  })
  // 設定函式抓使用者的輸入並寫入存放的狀態
  const handleMemberInput = (e) => {
    setMemberInput({...memberInput, [e.target.name]: e.target.value})
  }
  const router = useRouter()
  // 送出後需送至後端驗證並寄信
  const handleForgotSubmit= async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
  console.log(memberInput);
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    try{
      const res = await axios.post('http://localhost:3005/member/forgotpwd',
      memberInput,
      {
        withCredentials:true,
      })

      console.log(res.data);
      if(res.data.message === 'no account'){
        await Swal.fire({
          icon: 'error',
          title: '查無此帳號',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: '35%',
          padding: '0 0 3.25em',
          customClass: {
          }
        })
        return
      }
      if(res.data.message === 'no email'){
        await Swal.fire({
          icon: 'error',
          title: '查無此信箱',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: '35%',
          padding: '0 0 3.25em',
          customClass: {
          }
        })
        return
      }
      if(res.data.message === '信箱和帳號不匹配'){
        await Swal.fire({
          icon: 'error',
          title: '信箱和帳號不匹配',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: '35%',
          padding: '0 0 3.25em',
          customClass: {
          }
        })
        return
      }
      // if (res.data.message === 'forgotpwd verified success') {
        
      //   router.push(process.env.BASE_URL || '/')
      // }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
            <Container className='position-relative d-flex justify-content-center align-items-center bt-container'>
        <div className='login-block my-3'>
        <Form noValidate validated={validated} onSubmit={handleForgotSubmit} className='login-block-container'>
          <div>
          <p className='fs-3 mb-3 text-center'>忘記密碼</p></div>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>帳號</Form.Label>
          <Form.Control
            required
            type="text"
            name='account'
            value={memberInput.account}
            onChange={handleMemberInput}
          />
          <Form.Control.Feedback type="invalid">請輸入帳號</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>註冊時使用信箱</Form.Label>
          <Form.Control
            required
            type="mail"
            name='email'
            value={memberInput.email}
            onChange={handleMemberInput}
          />
          <Form.Control.Feedback type='invalid'>請輸入註冊時填寫的信箱</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
      <Form.Group as={Col} md='12' xs='12' className='my-4 d-flex justify-content-between'>
      <Button className='login-button' onClick={()=>{setFormType(true)}}>返回</Button>
        <Button type="submit" className='login-button' >送出</Button>
      </Form.Group>
      </Row>
    </Form>
        </div>
      </Container>
    </>
  )
}
