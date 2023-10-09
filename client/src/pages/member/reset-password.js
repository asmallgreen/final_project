import React, {useState} from 'react'
import {Container, Form, InputGroup, Col, Row, Button} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

export default function ResetPassword( {formType, setFormType} ) {
  const [validated, setValidated] = useState(false);
  // 設定狀態存放使用者填寫的帳號跟信箱
  const [memberEmail, setMemberEmail] = useState({
    email:''
  })
  // 設定存放使用者輸入的OTP
  const [opt, setOpt] = useState({
    opt:'',
  })
  // 設定函式抓使用者的輸入並寫入存放的狀態
  const handleMemberEmail = (e) => {
    setMemberEmail({...memberEmail, [e.target.name]: e.target.value})
  }
  const router = useRouter()
  const getOTP = async (e) => {
    try{
      const res = await axios.post('http://localhost:3005/member/otp',
      memberEmail,
      {
        withCredentials:true,
      })
      console.log(res.data);
    }catch(error){
      console.log(error);
    }
  }
  // 檢查OTP是否正確
  const handleCheckOTP = (e) => {
    
  }
  // 送出後需送至後端驗證並寄信
  const handleForgotSubmit= async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post('http://localhost:3005/member/forgotpwd',
      memberEmail,
      {
        withCredentials:true,
      })

      console.log(res.data);
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
      // if (res.data.message === 'forgotpwd verified success') {
        
      //   router.push(process.env.BASE_URL || '/')
      // }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
    <div className='login-bg'>
                  <Container className='position-relative d-flex justify-content-center align-items-center bt-container forgot-pwd-container'>
        <div className='login-block my-3'>
        <Form onSubmit={handleForgotSubmit} className='login-block-container'>
          <div>
          <p className='forget-pwd-header mb-3 text-center'>忘記密碼</p></div>
          <div className='my-3 py-1 forgot-pwd-text'>
          <p className='text-center mt-3 mb-0'>請輸入信箱並按下「取得驗證碼」</p>
          <p className='text-center'>我們將立即發送密碼重設指示信給您</p>
          </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>註冊時使用信箱</Form.Label>
          <Form.Control
            required
            type="mail"
            name='email'
            onChange={handleMemberEmail}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="" className='otp-position-relative'>
          <Form.Label>電子郵件驗證碼</Form.Label>
          <Form.Control
            required
            type="text"
            name='otp'
            onChange={handleCheckOTP}
          />
          <Button type='button' className='otp-button' onClick={getOTP}>取得驗證碼</Button>
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
    </div>

    </>
  )
}
