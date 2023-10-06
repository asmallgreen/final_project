import React, { useState, useEffect } from 'react'
import { Form,  Col, Row, Button} from 'react-bootstrap'
import Link from 'next/link'
import ForgotPwd from '@/components/login/forgotpwd';
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Login() {

  // const { member, setMember, setIsLogin, isLogin } = useLogin()
  const [validated, setValidated] = useState(false);
  const [formType, setFormType] = useState(true)
  const {authJWT, setAuthJWT} = useAuthJWT()
  const [loginData, setLoginData] = useState({
    account:'',
    password:''
  })
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }
  const router = useRouter()

  // 抓取使用者輸入的帳號密碼 input 值
  const handleInputChange = (e) => {
    // 輸入後更新存放內容的物件
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }


  // 會員登入表單提交函數
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    try{
      const res = await axios.post('http://localhost:3005/member/login',
      loginData,
      {
        withCredentials:true,
      })

      console.log(res.data);
      // console.log(parseJwt(res.data.accessToken));
      if(res.data.message === 'verifyUser fail'){
        await Swal.fire({
          icon: 'error',
          title: '帳號或密碼輸入錯誤',
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
      if (res.data.message === 'login success') {
        setAuthJWT({
          isAuth: true,
          memberData: parseJwt(res.data.accessToken),
        })
        if(checked === true){
          setRememberMe()
        }else{
          removeRememberme()
        }
        router.push(process.env.BASE_URL || '/')
      }
    }catch(error){
      console.log(error);
    }

  };

  // 「記住我」功能
  const [checked, setChecked] = useState(false)

  const setRememberMe = (e) => {
    localStorage.setItem('remember', JSON.stringify(loginData))
  }
  const removeRememberme = (e) => {
    localStorage.removeItem('remember',JSON.stringify(loginData))
  }
  useEffect(() => {
    const remember = JSON.parse(localStorage.getItem('remember'))
    if (remember) {
     setChecked(true)
     setLoginData({
      ...loginData,
      account: remember.account,
      password: remember.password,
     })
    }
  }, [])

  // 密碼顯示功能
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
    {formType? (<div className='login-bg'>

      <div className='position-relative d-flex justify-content-center align-items-center bt-container'>
        <div className='login-block my-3'>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='login-block-container'>
          <div className='d-flex justify-content-around fs-3 mb-3'>
            <div className='login-border-bottom d-flex justify-content-center'>
              <Link href='/member/register' className='text-decoration-none' >註冊</Link>
            </div>
            <div>
              <p>|</p>
            </div>
            <div className='login-border-bottom d-flex justify-content-center login-link'>
              <Link href='/member/login' className='text-decoration-none'>登入</Link>
            </div>
          </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>帳號</Form.Label>
          <Form.Control
            required
            type="text"
            name='account'
            value={loginData.account}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">請輸入帳號</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02" className='password-eye'>
          <Form.Label>密碼</Form.Label>
          <Form.Control
            required
            type={showPassword?'text':'password'}
            name='password'
            value={loginData.password}
            onChange={handleInputChange}
          />
          <div className='password-eye2' onClick={()=>{setShowPassword(!showPassword)}}>
             {showPassword? <FaEye/>:<FaEyeSlash/>}
          </div>
           
          
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
        <Link href='/' className='forgetpwd-link' onClick={(e)=>{e.preventDefault();setFormType(false) }}>忘記密碼</Link>
      </Form.Group>
      <Form.Group as={Col} md='5' xs='5' className='p-0 text-end'>
        <Button type="submit" className='login-button bgc-primary update-profile-btn' onClick={handleSubmit}>登入</Button>
      </Form.Group>
    </Row>
    </Form>
    <div><p className='text-center'>_______________________________________</p></div>
    <div className='text-center mb-5'>
    <button className='google-login-btn'>
    <Link href='/google-login/jwt'>
      <img src='/Duo/googleLogin.svg' alt='googleicon'/>使用Google登入
    </Link>
      
    </button>
    </div>
        </div>
      </div>

      </div>):(<div className='login-bg'><div className='position-relative d-flex justify-content-center align-items-center bt-container'>
        <ForgotPwd formType={formType} setFormType={setFormType}/>
      </div>
      
      </div>)}
      
    </>
  )
}

 