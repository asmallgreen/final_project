import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { zhTW } from 'date-fns/locale';
import axios from 'axios'
import { useRouter } from 'next/router';

const css = `
.my-selected{
  background: #616153;
  color: #fff;
}

`

export default function ReserveDate() {
  const [selected, setSelected] = useState();
  // const [VenueData, setVenueData] = useState(null)
  // const [reserveData, setReserveData] = useState(null);
  // const [selectedDay, setSelectedDay] = useState();

  const router = useRouter()
  const { isReady } = router
  const { id } = router.query


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


  // const [footer , setFooter] = useState(message)

  // if (selected) {
  //   message = <p>您所選擇的日期為</p>
  //   setFooter(message)
  // }
  // const [days, setDays] = useState()

  const footer =
    selected && selected.length > 0 ? (
      <p>您選擇了一共 {selected.length} 天</p>
    ) : (
      <p>請選擇日期</p>
    );
  // const day = 
  //   selected && selected.length > 0  ? (
  //     <p>You selected {selected.get(0)}.</p>
  //   ) : (
  //     <p>Please pick a day.</p>
  //   );

  const days =
  selected && selected.length > 0 ? (
      <p>
        {/* You selected {selected.length} day(s):{' '} */}
        {selected.map((selected, index) => (
          <span key={index}>{selected.toLocaleDateString('zh-TW')} </span>
        ))}
      </p>
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


        <div className='d-flex justify-content-center'>
          <a href='/venue/reserve'>
            <button className='mx-4 mt-2 mb-5 reserve-bt1'>
              返回上一步
            </button>
          </a>
          <a href='/venue/reserve'>
            <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
              下一步
            </button>
          </a>
        </div>
      </Container>
    </>
  )
}
