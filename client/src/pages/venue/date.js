import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { zhTW } from 'date-fns/locale';
import axios from 'axios'
import { useRouter } from 'next/router';
// import Reserve from './reserve';


const css = `
.my-selected{
  background: #616153;
  color: #fff;
}

`

  export default function ReserveDate() {
  const [selected, setSelected] = useState([]);
  const [VenueData, setVenueData] = useState(null);
  const [reserveData, setReserveData] = useState(null);


  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const [days, setDays] = useState([]); // 創建一個新的狀態變數用於存儲日期

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

    // 在這裡賦值日期到狀態變數
    if (selected && selected.length > 0) {
      const selectedDates = selected.map((selectedDate, index) => (
        <span key={index}>{selectedDate.toLocaleDateString('zh-TW')} </span>
      ));
      setDays(selectedDates);
    } else {
      setDays(['請選擇日期']);
    }
  }, [isReady, selected, id]);

  const footer =
    selected && selected.length > 0 ? (
      <p>您選擇了一共 {selected.length} 天</p>
    ) : (
      <p>請選擇日期</p>
    );



  return (
    <>
      <Container>
        <div className='my-5 d-flex justify-content-center'>
          <img className='' src='/images/venue/場地流程ui-日期選擇.png'></img>
        </div>

        <div className='reserve-text '>
          <div>
            <p className='fs-5 fw-bold'>您所選擇的</p>
            <p className='fs-5 fw-bold'>道場：{id}</p>
            <p className='fs-5 fw-bold'>日期：{days}</p>
          </div>
          <hr></hr>
        </div>

        <div className='mt-5 mb-2 d-flex justify-content-center'>
          <style>{css}</style>
          <DayPicker
            locale={zhTW}
            mode="multiple"
            max={5}
            selected={selected}
            onSelect={setSelected}
            footer={footer}
            modifiersClassNames={{
              selected: 'my-selected'
            }}
          />
        </div>
        {/* <Reserve selected={selected} /> */}


        <div className='d-flex justify-content-center'>
          <a href='/venue/reserve'>
            <button className='mx-4 mt-2 mb-5 reserve-bt1'>
              返回上一步
            </button>
          </a>
          {/* <a href='/venue/reserve'>
            <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
              下一步
            </button>
          </a> */}
          <a href={`/venue/reserve?days=${encodeURIComponent(days)}`}>
  <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
    下一步
  </button>
</a>
        </div>
      </Container>
    </>
  )
}
