import React, {useState, useEffect} from 'react'
import {Container, Form, InputGroup, Col, Row, Button} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  // 設定存放token
  const [tokenValue, setTokenValue] = useState()
  const [tokenInput, setTokenInput] = useState()
  // 設定顯示輸入新密碼
  const [show, setShow] = useState(false)
  // 設定存放表單輸入資料
  const [formInput, setFormInput] = useState({
    email:'',
    token:'',
    newPassword:'',
    reNewPassword:'',
  })
  // 設定函式抓使用者的輸入並寫入存放的狀態
  const handleMemberEmail = (e) => {
    setMemberEmail({...memberEmail, [e.target.name]: e.target.value})
    handleNewPasswordChange(e)
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
      if(res.data.message === '請輸入正確註冊信箱'){
        await Swal.fire({
          icon: 'error',
          title: '請輸入正確註冊信箱',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
        return
      }
      if(res.data.message === '此信箱並未註冊過'){
        await Swal.fire({
          icon: 'error',
          title: '此信箱並未註冊過',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
        return
      }
        if(res.data.message === 'OTP碼輸入錯誤'){
        await Swal.fire({
          icon: 'error',
          title: 'OTP碼輸入錯誤',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
        return
      }
      if(res.data.message === 'OTP驗證信已寄出'){
        setTokenValue(res.data.token)
        await Swal.fire({
          icon: 'success',
          title: '信件已寄出',
          text: '請於30分鐘內使用信件內驗證碼完成重設密碼',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
      }
    }catch(error){
      console.log(error);
    }
  }
  // 檢查OTP是否正確
  const handleCheckOTP = (e) => {
    setTokenInput(e.target.value)
    console.log(tokenInput);
    handleNewPasswordChange(e)
  }
  useEffect(()=>{
    console.log(tokenInput);
    console.log(tokenValue);
    if(tokenInput == tokenValue){
      setShow(!show)
    }
  },[tokenInput,tokenValue])

  // 抓到整張表單的內容inputChange
  const handleNewPasswordChange = (e) => {
    setFormInput({...formInput,[e.target.name]:e.target.value})
  }

  // 送出表單，送入新密碼資訊並驗證輸入的信箱、token
  const handleResetPasswordSubmit= async (e) => {
    e.preventDefault();
    console.log(formInput);
    if(formInput.newPassword !== formInput.reNewPassword){
      await Swal.fire({
        icon: 'error',
        title: '新密碼輸入不一致',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          width:'shadow-sm'
        }
      })
      return
    }
    delete formInput.reNewPassword
    try{
      const res = await axios.post('http://localhost:3005/member/resetpassword',
      formInput,
      {
        withCredentials:true,
      })

      console.log(res.data);
      if(res.data.message === '請確認token已正確輸入'){
        await Swal.fire({
          icon: 'error',
          title: '請確認token已正確輸入',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
        return
      }
      if(res.data.message === '後端路由 /resetpassword 失敗'){
        await Swal.fire({
          icon: 'error',
          title:'密碼重設失敗',
          text: '請重新取得驗證碼以重設密碼',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
        return
      }
      if(res.data.message === '成功修改密碼'){
        await Swal.fire({
          icon: 'success',
          title:'成功修改密碼',
          showConfirmButton: false,
          timer: 2500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: '35%',
          padding: '0 0 3.25em',
          customClass: {
            width:'shadow-sm'
          }
        })
      }
        router.push(process.env.BASE_URL || '/member/login')
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
    <div className='login-bg'>
                  <Container className='position-relative d-flex justify-content-center align-items-center bt-container forgot-pwd-container'>
        <div className='login-block my-3'>
        <Form onSubmit={handleResetPasswordSubmit} className='login-block-container'>
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
            name='token'
            onChange={handleCheckOTP}
          />
          <Button type='button' className='otp-button' onClick={getOTP}>取得驗證碼</Button>
        </Form.Group>
      </Row>
      {show? '': ( <div>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>請輸入新密碼</Form.Label>
          <Form.Control
            required
            type="password"
            name='newPassword'
            onChange={handleNewPasswordChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="">
          <Form.Label>再次輸入新密碼</Form.Label>
          <Form.Control
            required
            type="password"
            name='reNewPassword'
            onChange={handleNewPasswordChange}
          />
        </Form.Group>
      </Row>
      </div>)}

      <Row className='mb-3'>
      <Form.Group as={Col} md='12' xs='12' className='my-4 d-flex justify-content-between'>
      <Link className='login-button forgot-pwd-back'href='/member/login'>返回</Link>
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
