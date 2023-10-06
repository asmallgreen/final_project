import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { zhTW } from 'date-fns/locale';


const css = `
.my-selected{
  background: #616153;
  color: #fff;
}

`

export default function ReserveDate() {
  const [selected, setSelected] = useState();


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
  return (
    <>
      <Container>
        <div className='mt-5 d-flex justify-content-center'>
          <img className='' src='/images/venue/場地流程ui-日期選擇.png'></img>
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
