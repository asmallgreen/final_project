import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { zhTW } from 'date-fns/locale';
import axios from 'axios'
// import Reserve from './reserve';


const css = `
.my-selected{
  background: #616153;
  color: #fff;
}

`
//偷偷marge
export default function ReserveDate() {
  const [selected, setSelected] = useState([]);
  const [VenueData, setVenueData] = useState([]);
  const [reserveData, setReserveData] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);


  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  // console.log(router.query);

  const [days, setDays] = useState([]); // 創建一個新的狀態變數用於存儲日期

  useEffect(() => {
    async function fetchVenueData(id) {
      try {
        const response = await axios.get(`http://localhost:3005/venue/${id}`, { params: { id: id } });
        setVenueData(response.data.once);
        // console.log(VenueData)
      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
      console.log(VenueData)
    }
    async function fetchVenueReserveData() {
      try {
        const response = await axios.get('http://localhost:3005/venue_reserve');
        setReserveData(response.data.allVenueReserve);

        // 取得 venue_reserve 中的日期
        const reservedDates = response.data.allVenueReserve.map((reserve) => [
          reserve.date_1,
          reserve.date_2,
          reserve.date_3,
          reserve.date_4,
          reserve.date_5,
        ]).flat();

        // 在日期选择器中禁用已被预定的日期
        const disabledDates = reservedDates.map((date) => new Date(date));
        setDisabledDates(disabledDates);
        // console.log(disabledDates); 

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
            <p className='fs-5 fw-bold'>道場：{VenueData.venue_position} {VenueData.venue_name}</p>
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
            disabled={(date) => {
              // // 禁止选择当天和过去的日期，以及已被预定的日期
              return date <= new Date() || disabledDates.includes(date.toISOString());
            }}
          />
        </div>

        <div className='d-flex justify-content-center'>
          <a href='/venue'>
            <button
              className='mx-4 mt-2 mb-5 reserve-bt1'>
              返回上一步
            </button>
          </a>
          {/* <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'
                onClick={()=>{
                  if (selected && selected.length > 0) {
                    const selectedDates = selected.map((selectedDate, index) => (
                      selectedDate.toLocaleDateString('zh-TW')
                    ));
                    localStorage.setItem('selectedDates',selectedDates)
                  } 
                  router.push(`/venue/reserve`)
                  }} */}
          <button
            className='mx-4 mt-2 mb-5 reserve-bt2'
            type='submit'
            onClick={() => {
              if (selected && selected.length > 0) {
                const selectedDates = selected.map((selectedDate, index) => (
                  selectedDate.toLocaleDateString('zh-TW')
                ));
                localStorage.setItem('selectedDates', selectedDates);
                localStorage.setItem('id', id);

                router.push(`/venue/reserve`);
              } else {
                // 使用者未選擇日期，你可以添加一個提示或其他操作
                alert('請選擇至少一天');
              }
            }}
          >
            下一步
          </button>

        </div>
      </Container>
    </>
  )
}
