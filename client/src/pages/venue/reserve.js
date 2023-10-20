import React from 'react';
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
import { useRouter } from 'next/router';


export default function ReserveDate({ formType, setFormType }) {

  useEffect(() => {
    async function fetchVenueData(id) {
      try {
        const response = await axios.get(`http://localhost:3005/venue/${id}`, { params: { id: id } });
        setVenueData(response.data.once);
      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
      // console.log(VenueData)
    }
  })

  // react 表單檢查(不可空白欄位)
  // const [validated, setValidated] = useState(false);
  // const [elememtId, setElementId] = useState()

  // const chineseNameRegex = /^[\u4e00-\u9fa5]+$/; // 中文姓名正規表達式
  // const taiwanPhoneRegex = /^09\d{8}$/; // 09開頭的手機號碼正規表達式

  // 驗證信箱的正規表達式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 驗證手機號碼的正規表達式
  const taiwanPhoneNumberRegex = /^09\d{8}$/;

  const [dateObj, setDateObj] = useState({
    date_1: "",
    date_2: "",
    date_3: "",
    date_4: "",
    date_5: "",
  })

  const [rental_duration, setRental_duration] = useState(0)

  useEffect(() => {
    const sd = localStorage.getItem('selectedDates');
    const id = localStorage.getItem('id');
    const venuePosition = localStorage.getItem('venuePosition');
    const venueName = localStorage.getItem('venueName');
    const selectedDatesString = localStorage.getItem('selectedDates');
    const selectedDatesArray = selectedDatesString.split(',');
    // console.log(selectedDatesArray);

    setDateObj({
      date_1: selectedDatesArray[0],
      date_2: selectedDatesArray[1],
      date_3: selectedDatesArray[2],
      date_4: selectedDatesArray[3],
      date_5: selectedDatesArray[4],
    })

    setRental_duration(selectedDatesArray.length);

    // const dataToStore = {
    //   selectedDates: selectedDatesArray,
    // };
    // const jsonData = JSON.stringify(dataToStore);

    // const dateObject = {
    //   date_1: selectedDatesArray[0] || null,
    //   date_2: selectedDatesArray[1] || null,
    //   date_3: selectedDatesArray[2] || null,
    //   date_4: selectedDatesArray[3] || null,
    //   date_5: selectedDatesArray[4] || null,
    // };

    // console.log(venuePosition);
    // console.log('this is id',id);
    // console.log(sd)
    setSelectedDates(sd)
    setId(id)
    setVenuePosition(venuePosition)
    setVenueName(venueName)
  }, [])

  // 預約時寫入後端資料庫的預約欄位內容
  const [reserve, setReserve] = useState({
    venue_id: "",
    // date_1: "",
    // date_2: "",
    // date_3: "",
    // date_4: "",
    // date_5: "",
    // rental_duration: "",
    reserve_name: "",
    reserve_email: "",
    reserve_phone: "",
    created_at: "",
    // ...dateObject,
  });
  // 抓到表單內填寫的內容寫進reserve物件
  function handleChange(e) {
    setReserve({ ...reserve, [e.target.name]: e.target.value });
  }

  // 驗證 email 的正規表達式
  const handleEmailReg = (e) => {
    const emailReg = emailRegex.test(reserve.reserve_email)
    if (!emailReg) {
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
      });
    }
  }
  // 驗證手機號碼的正規表達式
  const handlePhoneReg = (e) => {
    const phoneReg = taiwanPhoneNumberRegex.test(reserve.reserve_phone)
    if (!phoneReg) {
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
      });
    }
  }

  // useEffect(()=>{
  //   setElementId('input-1')
  // },[])

  // const parseJwt = (token) => {
  //   const base64Payload = token.split('.')[1]
  //   const payload = Buffer.from(base64Payload, 'base64')
  //   return JSON.parse(payload.toString())
  // }
  const router = useRouter()

  //   const handleGoBack = () => {
  //     history.push('/venue/date');
  // };

  const handleReserveGoback = () => {
    localStorage.setItem('selectedDates', selectedDates);
    localStorage.setItem('venuePosition', venuePosition);
    localStorage.setItem('venueName', venueName);

    router.push(`/venue/date`);
  }

  // 表單提交時檢查input並用try catch寫入資料庫
  const handleReserveSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    localStorage.setItem('selectedDates', selectedDates);
    localStorage.setItem('id', id);
    localStorage.setItem('venuePosition', venuePosition);
    localStorage.setItem('venueName', venueName);

    router.push(`/venue/check`);

    // if (form.checkValidity() === false) {
    //   // 先檢查是否有填寫必填欄位
    //   e.stopPropagation();
    // }
    // setValidated(true);

    const allData = {...reserve, ...dateObj, rental_duration: rental_duration}

    try {
      const res = await axios.post(
        "http://localhost:3005/venue_reserve",
        allData,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [VenueData, setVenueData] = useState(null)
  const [reserveData, setReserveData] = useState(null);
  const [id, setId] = useState(null);


  const { isReady } = router
  // const { id } = router.query

  const [selectedDates, setSelectedDates] = useState(toString);
  const [venuePosition, setVenuePosition] = useState(toString);
  const [venueName, setVenueName] = useState(toString);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');





  // useEffect (() => {
  //   async function fetchVenueData(id) {
  //     async function fetchVenueData(id) {
  //       try {
  //         const response = await axios.get(`http://localhost:3005/venue/${id}`, { params: { id: id } });
  //         setVenueData(response.data.once);
  //       } catch (error) {
  //         console.error('資料庫連結錯誤:', error);
  //       }
  //       console.log(VenueData)  
  //     }
  //     try {
  //       const response = await axios.get(`http://localhost:3005/venue`);
  //       setVenueData(response.data.allVenue);
  //     } catch (error) {
  //       console.error('資料庫連結錯誤:', error);
  //     }
  //   }
  //   async function fetchVenueReserveData() {
  //     try {
  //       const response = await axios.get('http://localhost:3005/venue_reserve');
  //       setReserveData(response.data.allVenueReserve);

  //     } catch (error) {
  //       console.error('資料庫連結錯誤:', error);
  //     }
  //   }

  //   async function saveVenueReserveData() {
  //     try {
  //       const response = await axios.get('http://localhost:3005/venue_reserve', { array: { id: id }});
  //       setReserveData(response.data.saveDb);

  //     } catch (error) {
  //       console.error('資料庫連結錯誤:', error);
  //     }
  //   }

  //   if (isReady) {
  //     fetchVenueData(id);
  //     fetchVenueReserveData();
  //   }
  // }, [isReady]);


  return (
    <Container>
      <div className="my-5 d-flex justify-content-center">
        <img src="/images/venue/場地流程ui-2.webp" className="reserve-setp" alt="Venue" />
        <img className='reserve-setp setp-m' src='/images/venue/場地流程ui-2-m.webp'></img>
      </div>

      <div className="reserve-text">
        <div>
          <p className="fs-5 fw-bold">您所選擇的</p>
          <p className="fs-5 fw-bold">道場：{venuePosition} {venueName}</p>
          <p className="fs-5 fw-bold">日期：{selectedDates}</p>
        </div>
        <hr />

        <Row>
          <Form.Group md="12" controlId="validationCustom01" className="mb-2">
            <Form.Label className="mb-0">預約人姓名</Form.Label>
            <Form.Control required type="text" name="reserve_name" onChange={handleChange} />
            <Form.Control.Feedback type="invalid">請輸入姓名</Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="12" xs="5" controlId="validationCustom05" className="mb-2">
            <Row>
              <Form.Group md="12" controlId="validationCustom09" className="mb-2">
                <Form.Label className="mb-0">Email</Form.Label>
                <Form.Control
                  required
                  type="email" // Corrected type from "mail" to "email"
                  name="reserve_email"
                  onChange={handleChange}
                  onBlur={handleEmailReg}
                />
                <Form.Control.Feedback type="invalid">請輸入Email</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group md="12" controlId="validationCustom10" className="mb-2">
                <Form.Label className="mb-0">手機號碼</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="reserve_phone"
                  onChange={handleChange}
                  onBlur={handlePhoneReg}
                />
                <Form.Control.Feedback type="invalid">請輸入手機號碼</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <div className='d-flex justify-content-center'>
          <Link
            type="button"
            className="mx-4 mt-2 mb-5 text-decoration-none reserve-bt1  "
            href={`/venue/date?id=${id}`}
          >
            <div className='text-center reserve-bn-text'>返回上一步</div>
          </Link>
          <div className='d-flex justify-content-center '>
          <button
            className='mx-4 mt-2 mb-5 reserve-bt2'
            type='submit'
            onClick={handleReserveSubmit}
          >
            下一步
          </button>
          </div>
        </div>
      </div>
    </Container>
  );
}



