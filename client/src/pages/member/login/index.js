import {useState} from 'react'
import {Container, Form, InputGroup, Col, Row, Button} from 'react-bootstrap'
import Login from '../../../components/login/login'
import Register from '../../../components/login/register'
import ForgotPwd from '../../../components/login/forgotpwd'


export default function MemberLogin() {
  // const [loginPage, setLoginPage] = useState(true)
  const [ formType, setFormType ] = useState('login')

  return (
    <>
      <div className='login-bg'>
      {formType === 'login' && <Login formType={formType} setFormType={setFormType}/>}
      {formType === 'register' && <Register formType={formType} setFormType={setFormType}/>}
      {formType === 'forgotPwd' && <ForgotPwd formType={formType} setFormType={setFormType}/>}
      {/* {loginPage ? (<Login loginPage={loginPage} setLoginPage={setLoginPage}/>) : (<Register loginPage={loginPage} setLoginPage={setLoginPage}/>)} */}
      </div>
    </>
  )
}

 