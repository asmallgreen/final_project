import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import { zhTW } from 'date-fns/locale';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function ReserveDate() {
  const [VenueData, setVenueData] = useState(null)
  const [reserveData, setReserveData] = useState(null);

  const router = useRouter()
  const { isReady } = router
  const { id } = router.query

const [selectedDates, setSelectedDates] = useState(toString);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');

const chineseNameRegex = /^[\u4e00-\u9fa5]+$/; // 匹配中文姓名
const taiwanPhoneRegex = /^09[0-9]{8}$/; // 匹配以"09"开头的台湾手机号码

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
    if(isReady){
      fetchVenueData(id);
      fetchVenueReserveData()
    }
  }, [isReady])

  const isInputValid = () => {
    return (
      selectedDates &&
      chineseNameRegex.test(name) &&
      email &&
      taiwanPhoneRegex.test(phone)
    );
  };


  return (
    <>
      <Container>
        <div className='m-5 d-flex justify-content-center'>
          <img className='' src='/images/venue/場地流程ui-資料填寫.png'></img>
        </div>

        <div className='reserve-text '>
          <div>
            <p className='fs-5 fw-bold'>您所選擇的</p>
            <p className='fs-5 fw-bold'>道場：北道場　藏月弓道場</p>
            <p className='fs-5 fw-bold'>日期：{selectedDates}</p>
          </div>
          <hr></hr>

          {/* <div>
            <p className='mt-4 fs-5 fw-bold'>預約人姓名</p>
            <input type='name' className='mb-4 form-control'></input>
          </div>
          <div>
            <p className='fs-5 fw-bold'>Email</p>
            <input type='email' className='mb-4 form-control'></input>
          </div>
          <div>
            <p className='fs-5 fw-bold'>連絡電話</p>
            <input type='phone' className='mb-4 form-control'></input>
          </div>
        </div> */}

        <div className='mb-4'>
          <p className='fs-5 fw-bold'>預約人姓名</p>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {!chineseNameRegex.test(name) && (
            <p className='text-danger'>請輸入姓名</p>
          )}
        </div>
        <div className='mb-4'>
          <p className='fs-5 fw-bold'>Email</p>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {!chineseNameRegex.test(email) && (
            <p className='text-danger'>請輸入有效的電子信箱</p>
          )}
        </div>
        <div className='mb-5'>
          <p className='fs-5 fw-bold'>連絡電話</p>
          <input
            type='tel'
            className='form-control'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          {!taiwanPhoneRegex.test(phone) && (
            <p className='text-danger'>請輸入行動電話"09"開頭</p>
          )}
        </div>
      </div>

        <div className='d-flex justify-content-center'>
          <a href='/venue/date'>
            <button className='mx-4 mt-2 mb-5 reserve-bt1'>
              返回上一步
            </button>
          </a>
          {/* <a href='/venue/check'>
            <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
              下一步
            </button>
          </a> */}
          <a href='/venue/check'>
          <button
            className='mx-4 mt-2 mb-5 reserve-bt2'
            type='submit'
            disabled={!isInputValid()}
          >
            下一步
          </button>
        </a>
        </div>
      </Container>
    </>
  )
}
