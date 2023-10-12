import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import { zhTW } from 'date-fns/locale';
import Link from "next/link";
import Swal from "sweetalert2";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import { useRouter } from 'next/router';


export default function ReserveDate({ formType, setFormType }) {
  

  // react 表單檢查(不可空白欄位)
  const [validated, setValidated] = useState(false);
  const [elememtId, setElementId] = useState()
  // 驗證信箱的正規表達式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 驗證手機號碼的正規表達式
  const taiwanPhoneNumberRegex = /^09\d{8}$/;
  // 預約時寫入後端資料庫的預約欄位內容
  const [venue_reserve, setVenue_Reserve] = useState({
    venue_id: "",
    date_1: "",
    date_2: "",
    date_3: "",
    date_4: "",
    date_5: "",
    rental_duration: "",
    reserve_name: "",
    reserve_email: "",
    reserve_phone: "",
    created_at: "",
  });
  // 抓到表單內填寫的內容寫進reserve物件
  function handleChange(e) {
    setReserve({ ...reserve, [e.target.name]: e.target.value });
  }

  // 驗證 email 的正規表達式
  const handleEmailReg =(e)=>{
    const emailReg = emailRegex.test(venue_reserve.reserve_email)
    if(!emailReg){
      Swal.fire({
      icon: "error",
      title: "請輸入有效的信箱格式",
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      width: "35%",
      padding: "0 0 3.25em",
      customClass: {
        popup: "shadow-sm",
      },
    });}
  }
  // 驗證手機號碼的正規表達式
  const handlePhoneReg =(e)=>{
    const phoneReg = taiwanPhoneNumberRegex.test(venue_reserve.reserve_phone)
    if(!phoneReg){
      Swal.fire({
      icon: "error",
      title: "請輸入有效的手機號碼格式",
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      width: "35%",
      padding: "0 0 3.25em",
      customClass: {
        popup: "shadow-sm",
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
    // 再將日期存在 venue_reserve 的 birthday 屬性中
    setReserve({ ...venue_reserve, date_1: formattedBirthdate });
  };

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

    const handleGoBack = () => {
      history.push('/venue/date');
  };
  

  // 表單提交時檢查input並用try catch寫入資料庫
  const handleReserveSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      // 先檢查是否有填寫必填欄位
      e.stopPropagation();
    }
    setValidated(true);

    try {
      const res = await axios.post(
        "http://localhost:3005/venue/venue_reserve",
        reserve,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      
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
        width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
        router.push(process.env.BASE_URL || '/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [VenueData, setVenueData] = useState(null)
  const [reserveData, setReserveData] = useState(null);

  const { isReady } = router
  const { id } = router.query

const [selectedDates, setSelectedDates] = useState(toString);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');

// const chineseNameRegex = /^[\u4e00-\u9fa5]+$/; // 中文姓名正規表達式
// const taiwanPhoneRegex = /^09[0-9]{8}$/; // 09開頭的手機號碼正規表達式

// const router = useRouter();

useEffect(()=>{
  const sd = localStorage.getItem('selectedDates')
  console.log(sd)
  setSelectedDates (sd)
},[])

  useEffect(() => {
    async function fetchVenueData(id) {
      try {
        const response = await axios.get(`http://127.0.0.1:3005/venue`);
        setVenueData(response.data.allVenue);
      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
    }
    async function fetchVenueReserveData() {
      try {
        const response = await axios.get('http://127.0.0.1:3005/venue_reserve');
        setReserveData(response.data.allVenueReserve);

      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
    }
    if (isReady) {
      fetchVenueData(id);
      fetchVenueReserveData();
    }
  }, [isReady]);

  // const isInputValid = () => {
  //   return (
  //     selectedDates &&
  //     chineseNameRegex.test(name) &&
  //     email &&
  //     taiwanPhoneRegex.test(phone)
  //   );
  // };


//   return (
//     <>
//       <Container>
//         <div className='m-5 d-flex justify-content-center'>
//           <img className='' src='/images/venue/場地流程ui-資料填寫.png'></img>
//         </div>

//         <div className='reserve-text '>
//           <div>
//             <p className='fs-5 fw-bold'>您所選擇的</p>
//             <p className='fs-5 fw-bold'>道場：北道場　藏月弓道場</p>
//             <p className='fs-5 fw-bold'>日期：{selectedDates}</p>
//           </div>
//           <hr></hr>

//           {/* <div>
//             <p className='mt-4 fs-5 fw-bold'>預約人姓名</p>
//             <input type='name' className='mb-4 form-control'></input>
//           </div>
//           <div>
//             <p className='fs-5 fw-bold'>Email</p>
//             <input type='email' className='mb-4 form-control'></input>
//           </div>
//           <div>
//             <p className='fs-5 fw-bold'>連絡電話</p>
//             <input type='phone' className='mb-4 form-control'></input>
//           </div>
//         </div> */}

//         {/* <div className='mb-4'>
//           <p className='fs-5 fw-bold'>預約人姓名</p>
//           <input
//             type='text'
//             className='form-control'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></input>
//           {!chineseNameRegex.test(name) && (
//             <p className='text-danger'>請輸入姓名</p>
//           )}
//         </div>
//         <div className='mb-4'>
//           <p className='fs-5 fw-bold'>Email</p>
//           <input
//             type='email'
//             className='form-control'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>
//           {!chineseNameRegex.test(email) && (
//             <p className='text-danger'>請輸入有效的電子信箱</p>
//           )}
//         </div>
//         <div className='mb-5'>
//           <p className='fs-5 fw-bold'>連絡電話</p>
//           <input
//             type='tel'
//             className='form-control'
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           ></input>
//           {!taiwanPhoneRegex.test(phone) && (
//             <p className='text-danger'>請輸入行動電話"09"開頭</p>
//           )}
//         </div>
//       </div> */}

//       <Row>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom01"
//                   className="mb-2"
//                 >
//                   <Form.Label className="mb-0">預約人姓名</Form.Label>
//                   <Form.Control
//                     required
//                     type="text"
//                     name="name"
//                     onChange={handleChange}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     請輸入姓名
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   md="5"
//                   xs="5"
//                   controlId="validationCustom05"
//                   className="mb-2 "
//                 >
//               <Row>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom09"
//                   className="mb-2"
//                 >
//                   <Form.Label className="mb-0">Email</Form.Label>
//                   <Form.Control
//                     required
//                     type="mail"
//                     name="email"
//                     onChange={handleChange}
//                     onBlur={handleEmailReg}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     請輸入Email
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Row>
//               <Row>
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationCustom10"
//                   className="mb-2"
//                 >
//                   <Form.Label className="mb-0">手機號碼</Form.Label>
//                   <Form.Control
//                     required
//                     type="tel"
//                     name="phone"
//                     onChange={handleChange}
//                     onBlur={handlePhoneReg}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     請輸入手機號碼
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Row>

//               <Row className="mt-3 d-flex justify-content-center">
//                 <Form.Group as={Col} md="12" xs="12" className="p-0 text-end">
//                   <Button
//                     type="submit"
//                     className="login-button mb-4 update-profile-btn"
//                     onClick={handleRegisterSubmit}
//                   >
//                     送出
//                   </Button>
//                 </Form.Group>
//               </Row>

//         {/* <div className='d-flex justify-content-center'>
//           <a href='/venue/date'>
//             <button className='mx-4 mt-2 mb-5 reserve-bt1'>
//               返回上一步
//             </button>
//           </a>
//           {/* <a href='/venue/check'>
//             <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
//               下一步
//             </button>
//           </a> */}
//           <a href='/venue/check'>
//           <button
//             className='mx-4 mt-2 mb-5 reserve-bt2'
//             type='submit'
//             disabled={!isInputValid()}
//           >
//             下一步
//           </button>
//         </a>
//         </div> */}
//       </Container>
//     </>
//   )
// }
return (
  <Container>
    <div className="m-5 d-flex justify-content-center">
      <img className="" src="/images/venue/場地流程ui-資料填寫.png" alt="Venue" />
    </div>

    <div className="reserve-text">
      <div>
        <p className="fs-5 fw-bold">您所選擇的</p>
        <p className="fs-5 fw-bold">道場：北道場　藏月弓道場</p>
        <p className="fs-5 fw-bold">日期：{selectedDates}</p>
      </div>
      <hr />

      <Row>
        <Form.Group as={Col} md="12" controlId="validationCustom01" className="mb-2">
          <Form.Label className="mb-0">預約人姓名</Form.Label>
          <Form.Control required type="text" name="name" onChange={handleChange} />
          <Form.Control.Feedback type="invalid">請輸入姓名</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" xs="5" controlId="validationCustom05" className="mb-2">
          <Row>
            <Form.Group as={Col} md="12" controlId="validationCustom09" className="mb-2">
              <Form.Label className="mb-0">Email</Form.Label>
              <Form.Control
                required
                type="email" // Corrected type from "mail" to "email"
                name="email"
                onChange={handleChange}
                onBlur={handleEmailReg}
              />
              <Form.Control.Feedback type="invalid">請輸入Email</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="12" controlId="validationCustom10" className="mb-2">
              <Form.Label className="mb-0">手機號碼</Form.Label>
              <Form.Control
                required
                type="tel"
                name="phone"
                onChange={handleChange}
                onBlur={handlePhoneReg}
              />
              <Form.Control.Feedback type="invalid">請輸入手機號碼</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mt-3 d-flex justify-content-center align-items-center">
          <Form.Group as={Col} md="12" xs="12" className="p-0 text-end">
            <Link
              type="button"
              className="mx-4 mt-2 mb-5 text-decoration-none reserve-bt2 align-middle "
              // onClick={handleGoBack}
              href={"/venue/date"}
            >
              <div className='text-center reserve-bn-text'>返回上一步</div>
              
              
            </Link>
            <Button
              type="submit"
              className="mx-4 mt-2 mb-5 reserve-bt1 "
              onClick={handleReserveSubmit}
            >
              送出
                  </Button>
                </Form.Group>
              </Row>
            </Form.Group>
          </Row>
      {/* <div className="d-flex justify-content-center">
        <a href="/venue/date">
          <button className="mx-4 mt-2 mb-5 reserve-bt1">返回上一步</button>
        </a>
        <a href="/venue/check">
          <button
            className="mx-4 mt-2 mb-5 reserve-bt2"
            type="submit"
            disabled={!isInputValid()}
          >
            下一步
          </button>
        </a>
      </div> */}
    </div>
  </Container>
);
}

