import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  InputGroup,
  Col,
  Row,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { DatePicker } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function Login({ formType, setFormType }) {
  // react 表單檢查(不可空白欄位)
  const [validated, setValidated] = useState(false);
  // 是否點選了記住我
  const [rememberMeChecked, setRememberMeChecked] = useState(true);
  // 檢查第二次輸入的密碼是否與第一次輸入的一致
  const [passwordCheck, setPasswordCheck] = useState(false);
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
    total_spant: "0",
    valid: "1",
  });
  // 抓到表單內填寫的內容寫進member物件
  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }
  // 抓到生日的 Date 寫入 member 物件
  const handleBirthdateChange = (date) => {
    // 將選擇的日期存在 member 的 birthday 屬性中
    setMember({ ...member, birthday: date });
  };

  useEffect(() => {
    if (member.password !== member.repassword) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  }, [member.password, member.repassword]);

  // 表單提交時檢查input並用try catch寫入資料庫
  const handleRegisterSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      // 先檢查是否有填寫必填欄位
      e.preventDefault();
      e.stopPropagation();
    } else if (member.password !== member.repassword) {
      // 這裡檢查密碼是否填寫一致
      e.preventDefault();
      e.stopPropagation();
      setPasswordCheck(false);
      Swal.fire({
        icon: "error",
        title: "密碼填寫不一致",
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: "35%",
        padding: "0 0 1.25em",
        customClass: {
          popup: "shadow-sm",
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
      await Swal.fire({
        icon: 'success',
        title: '註冊成功',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
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
            onChange={date => setBirthday({ date })}
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
                  <Form.Label className="mb-0">電話</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入電話
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
