import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';



export default function ReserveCheck() {

    const [selectedDates, setSelectedDates] = useState(toString);
    const [venuePosition, setVenuePosition] = useState(toString);
    const [venueName, setVenueName] = useState(toString);


    useEffect(() => {
        const sd = localStorage.getItem('selectedDates');
        const id = localStorage.getItem('id');
        const venuePosition = localStorage.getItem('venuePosition');
        const venueName = localStorage.getItem('venueName');
        const selectedDatesString = localStorage.getItem('selectedDates');
        const selectedDatesArray = selectedDatesString.split(',');
        console.log(selectedDatesArray);
    
        setSelectedDates(sd)
        // setId(id)
        setVenuePosition(venuePosition)
        setVenueName(venueName)
      }, [])

    return (
        <>
            <Container>
                <div className='m-5 d-flex justify-content-center'>
                    <img className='' src='/images/venue/場地流程ui-結帳.png'></img>
                </div>

                <div className='reserve-text '>
                    <div>
                        <p className='fs-5 fw-bold'>您所選擇的</p>
                        <p className='fs-5 fw-bold'>道場：{venuePosition} {venueName}</p>
                        <p className='fs-5 fw-bold'>日期：{selectedDates}</p>
                    </div>
                    <hr></hr>

                    <div className='my-5'>
                        <div className='display-6 d-flex justify-content-center check-title'>
                            <div>感謝預約</div>
                        </div>
                        <div className='h4 m-5 d-flex justify-content-center'>
                            <p>已完成預約，詳情可至會員中心查看</p>
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}