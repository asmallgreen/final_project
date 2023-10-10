// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
// import { useEffect, useState } from 'react';
// import 'react-day-picker/dist/style.css';
// import { zhTW } from 'date-fns/locale';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';



// const css = `
// .my-selected{
//   background: #616153;
//   color: #fff;
// }
// `

// export default function ReserveDate() {
//   const [selected, setSelected] = useState();
//   const [VenueData, setVenueData] = useState(null)
//   const [reserveData, setReserveData] = useState(null);

//   const router = useRouter()
//   const { isReady } = router
//   const { id } = router.query


//   useEffect(() => {
//     async function fetchVenueData(id) {
//       try {
//         const response = await axios.get(`http://127.0.0.1:3005/venue`);
//         setVenueData(response.data.allVenue);
//       } catch (error) {
//         console.error('資料庫連結錯誤:', error);
//       }
//     }
//     async function fetchVenueReserveData() {
//       try {
//         const response = await axios.get('http://127.0.0.1:3005/venue_reserve');
//         setReserveData(response.data.allVenueReserve);

//       } catch (error) {
//         console.error('資料庫連結錯誤:', error);
//       }
//     }
//     if(isReady){
//       fetchVenueData(id);
//       fetchVenueReserveData()
//     }
//   }, [isReady])


//   const footer =
//     selected && selected.length > 0 ? (
//       <p>您選擇了一共 {selected.length} 天</p>
//     ) : (
//       <p>請選擇日期</p>
//     );
    

//   const days =
//   selected && selected.length > 0 ? (
//       <p>
//         {selected.map((selected, index) => (
//           <span key={index}>{selected.toLocaleDateString('zh-TW')} </span>
//         ))}
//       </p>
//     ) : (
//       <p>請選擇日期</p>
//     );


//     return (
//         <>
//             <Container>
//                 <div className='m-5 d-flex justify-content-center'>
//                     <img className='' src='/images/venue/場地流程ui-資料填寫.png'></img>
//                 </div>

//                 <div className='reserve-text '>
//                     <div>
//                         <p className='fs-5 fw-bold'>您所選擇的</p>
//                         <p className='fs-5 fw-bold'>道場：北道場　藏月弓道場</p>
//                         <p className='fs-5 fw-bold'>日期：{ selected }</p>

//                     </div>
//                     <hr></hr>

//                     <div>
//                         <p className='mt-4 fs-5 fw-bold'>預約人姓名</p>
//                         <input type='name' className='mb-4 form-control'></input>
//                     </div>
//                     <div>
//                         <p className='fs-5 fw-bold'>Email</p>
//                         <input type='email' className='mb-4 form-control'></input>
//                     </div>
//                     <div>
//                         <p className='fs-5 fw-bold'>連絡電話</p>
//                         <input type='phone' className='mb-4 form-control'></input>
//                     </div>
//                 </div>

//                 <div className='d-flex justify-content-center'>
//                     <a href='/venue/date'>
//                         <button className='mx-4 mt-2 mb-5 reserve-bt1'>
//                             返回上一步
//                         </button>
//                     </a>
//                     <a href='/venue/check'>
//                         <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
//                             下一步
//                         </button>
//                     </a>
//                 </div>



//             </Container>
//         </>
//     )
// }




import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { zhTW } from 'date-fns/locale';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useLocation } from 'react-router-dom'; // 导入 useLocation

const css = `
.my-selected{
  background: #616153;
  color: #fff;
}

`

export default function ReserveDate() {
  const [selected, setSelected] = useState();
  const [VenueData, setVenueData] = useState(null)
  const [reserveData, setReserveData] = useState(null);

  const router = useRouter()
  const { isReady } = router
  const { id } = router.query
  const days = String(router.query.days); // 获取 URL 查询参数中的 'days'
  console.log('Days:', days);


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

  const footer =
    selected && selected.length > 0 ? (
      <p>您選擇了一共 {selected.length} 天</p>
    ) : (
      <p>請選擇日期</p>
    );


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
            <p className='fs-5 fw-bold'>日期：{days}</p>
          </div>
          <hr></hr>

          <div>
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
        </div>

        <div className='d-flex justify-content-center'>
          <a href='/venue/date'>
            <button className='mx-4 mt-2 mb-5 reserve-bt1'>
              返回上一步
            </button>
          </a>
          <a href='/venue/check'>
            <button className='mx-4 mt-2 mb-5 reserve-bt2' type='submit'>
              下一步
            </button>
          </a>
        </div>
      </Container>
    </>
  )
}
