import React, { useState, useEffect} from "react";
import {
  Form,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { DatePicker } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import { useRouter } from 'next/router';
// import "dotenv/config.js";


export default function Login({ formType, setFormType }) {
  // react 表單檢查(不可空白欄位)
  const [validated, setValidated] = useState(false);
  // 是否點選了記住我
  const [rememberMeChecked, setRememberMeChecked] = useState(true);
  // 檢查第二次輸入的密碼是否與第一次輸入的一致
  const [passwordCheck, setPasswordCheck] = useState('');
  const [elememtId, setElementId] = useState()
  // 驗證密碼的正規表達式
  const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  // 驗證信箱的正規表達式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 驗證手機號碼的正規表達式
  const taiwanPhoneNumberRegex = /^09\d{8}$/;
  // 抓到選擇的生日
  const [birthday, setBirthday] = useState(new Date())
  // 註冊時寫入後端資料庫的會員欄位內容
  const [member, setMember] = useState({
    account: "",
    password: "",
    name: "",
    gender: "",
    birthday: "",
    email: "",
    phone: "",
    address: "",
    level: "1",
    member_img: "avatar01.jpg",
    created_at: "",
    total_spent: "0",
    valid: "1",
  });
  // 抓到表單內填寫的內容寫進member物件
  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }
// 額外驗證密碼的正規表達式
  const handlepwdReg = (e) => {
    const pwdReg = passwordRegex.test(member.password)
    if(!pwdReg){
      Swal.fire({
      icon: "error",
      title: "請輸入至少6位英文大小寫及數字",
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      // width: "35%",
      padding: "0 0 3.25em",
      customClass: {
        popup: "shadow-sm",
        width:'shadow-sm'
      },
    })}
  }
  // 驗證 email 的正規表達式
  const handleEmailReg =(e)=>{
    const emailReg = emailRegex.test(member.email)
    if(!emailReg){
      Swal.fire({
      icon: "error",
      title: "請輸入有效的信箱格式",
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      // width: "35%",
      padding: "0 0 3.25em",
      customClass: {
        popup: "shadow-sm",
        width:'shadow-sm'
      },
    });}
  }
  // 驗證手機號碼的正規表達式
  const handlePhoneReg =(e)=>{
    const phoneReg = taiwanPhoneNumberRegex.test(member.phone)
    if(!phoneReg){
      Swal.fire({
      icon: "error",
      title: "請輸入有效的手機號碼格式",
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      // width: "35%",
      padding: "0 0 3.25em",
      customClass: {
        popup: "shadow-sm",
        width:'shadow-sm'
      },
    });}
  }
  // 抓到生日的 Date 寫入 member 物件
  const handleBirthdateChange = (date) => {
    // 先將 data 放入 Birthday的狀態儲存
    setBirthday({date})
    // console.log({date});
    // 轉換{date}物件的格式
    const birthdate = new Date(date)
    const year = birthdate.getFullYear()
    const month = (birthdate.getMonth() + 1).toString().padStart(2, "0");
    const day = birthdate.getDate().toString().padStart(2, "0");
    const formattedBirthdate = `${year}-${month}-${day}`
    // console.log(formattedBirthdate);
    // 再將日期存在 member 的 birthday 屬性中
    setMember({ ...member, birthday: formattedBirthdate });
  };

  useEffect(() => {
    if (member.password !== member.repassword) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  }, [member.password, member.repassword]);

  useEffect(()=>{
    setElementId('input-1')
  },[])
  useEffect(() => {
      const dateInput = document.querySelector('.hmgnAx');
      if (dateInput) {
        dateInput.id = elememtId;
      }
  }, [elememtId]);

  const {authJWT, setAuthJWT} = useAuthJWT()
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }
  const router = useRouter()

  // 表單提交時檢查input並用try catch寫入資料庫
  const handleRegisterSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if(member.account === ''){
      await Swal.fire({
        icon: 'error',
        title: '請輸入帳號',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          popup: 'shadow-sm',
          width:'shadow-sm'
        },
      })
      return
    }
    
    if (form.checkValidity() === false) {
      // 先檢查是否有填寫必填欄位
      e.stopPropagation();
    } else if(member.password === ''){
        Swal.fire({
        icon: "error",
        title: "請輸入至少6位英文大小寫及數字",
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: "35%",
        padding: "0 0 3.25em",
        customClass: {
          popup: "shadow-sm",
          width:'shadow-sm'
        },
      })
      return;
    }else if (member.password !== member.repassword) {
      // 這裡檢查密碼是否填寫一致
      e.preventDefault();
      e.stopPropagation();
      setPasswordCheck(false);
      await Swal.fire({
        icon: "error",
        title: "密碼填寫不一致",
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: "35%",
        padding: "0 0 3.25em",
        customClass: {
          popup: "shadow-sm",
          width:'shadow-sm'
        },
      });
      return;
    }
    setValidated(true);

    try {
      const res = await axios.post(
        "http://localhost:3005/member/register",
        member,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if(res.data.message === "帳號已有人使用"){
        await Swal.fire({
        icon: 'error',
        title: '此帳號已有人使用',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          popup: 'shadow-sm',
          width:'shadow-sm'
        },
      })
      return
      }
      if(member.email === ""){
        await Swal.fire({
        icon: 'error',
        title: '請輸入信箱',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          popup: 'shadow-sm',
          width:'shadow-sm'
        },
      })
      return
      }
      if(res.data.message === "信箱已被註冊過"){
        await Swal.fire({
        icon: 'error',
        title: '此信箱已被註冊',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          popup: 'shadow-sm',
          width:'shadow-sm'
        },
      })
      return
      }
      if(res.data.message === 'register success'){
        setAuthJWT({
          isAuth:true,
          memberData:parseJwt(res.data.accessToken)
        })
        await Swal.fire({
        icon: 'success',
        title: '註冊成功',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          popup: 'shadow-sm',
          width:'shadow-sm'
        },
      })
        router.push(process.env.BASE_URL || '/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-bg">
        <div className="position-relative d-flex justify-content-center align-items-center bt-container ">
          <div className="login-block my-3">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleRegisterSubmit}
              className="login-block-container"
            >
              <div className="d-flex justify-content-around fs-3 mb-3">
                <div className="login-border-bottom d-flex justify-content-center login-link">
                  <Link
                    href="/member/register"
                    className="text-decoration-none"
                  >
                    註冊
                  </Link>
                </div>
                <div>
                  <p>|</p>
                </div>
                <div className="login-border-bottom d-flex justify-content-center ">
                  <Link href="/member/login" className="text-decoration-none">
                    登入
                  </Link>
                </div>
              </div>
              <Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom01"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">帳號</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="account"
                    placeholder="註冊後無法修改"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入帳號
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom02"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">密碼</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="請輸入至少6位英文大小寫及數字"
                    onChange={handleChange}
                    onBlur={handlepwdReg}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入密碼
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">請再次輸入密碼</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="repassword"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    再次輸入密碼
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="justify-content-between">
                <Form.Group
                  as={Col}
                  md="6"
                  xs="6"
                  controlId="validationCustom04"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">姓名</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入姓名
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="5"
                  xs="5"
                  controlId="validationCustom05"
                  className="mb-2 "
                >
                  <Form.Label className="mb-0 text-end">性別</Form.Label>
                  <Form.Select onChange={handleChange} name="gender">
                    <option>請選擇</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="d-flex">
                <Form.Group
                  as={Col}
                  md="4"
                  xs="4"
                  controlId="validationCustom06"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">生日</Form.Label>
                  {/* <Form.Control
                    type="text"
                    name="year"
                    placeholder="西元年"
                    className="text-end"
                    onChange={handleChange}
                  /> */}
                  
                </Form.Group>
                {/* <Form.Group
                  as={Col}
                  md="4"
                  xs="4"
                  controlId="validationCustom07"
                  className="mb-2"
                >
                  <Form.Label className="mb-0"></Form.Label>
                  <Form.Control
                    type="text"
                    name="month"
                    placeholder="月"
                    className="text-end"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  xs="4"
                  controlId="validationCustom08"
                  className="mb-2"
                >
                  <Form.Label className="mb-0"></Form.Label>
                  <Form.Control
                    type="text"
                    name="day"
                    placeholder="日"
                    className="text-end"
                    onChange={handleChange}
                  />
                </Form.Group> */}
                <DatePicker
                borderRadius='semi-square'
            id="datePicker-19"
            placeholder="選擇生日"
            value={birthday.date}
            onChange={handleBirthdateChange}
            icon={<FontAwesomeIcon icon={faCalendar} />}
        />
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom09"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">Email</Form.Label>
                  <Form.Control
                    required
                    type="mail"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleEmailReg}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入Email
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom10"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">手機號碼</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handlePhoneReg}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入手機號碼
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom11"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">地址</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入地址
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mt-3 d-flex justify-content-center">
                <Form.Group as={Col} md="12" xs="12" className="p-0 text-end">
                  <Button
                    type="submit"
                    className="login-button mb-4 update-profile-btn"
                    onClick={handleRegisterSubmit}
                  >
                    送出
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
