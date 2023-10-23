import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';



export default function ReserveCheck() {

    const [selectedDates, setSelectedDates] = useState(toString);
    const [venuePosition, setVenuePosition] = useState(toString);
    const [venueName, setVenueName] = useState(toString);


    useEffect(() => {
    const sd = localStorage.getItem('selectedDates');

        const venuePosition = localStorage.getItem('venuePosition');
        const venueName = localStorage.getItem('venueName');
        const selectedDatesString = localStorage.getItem('selectedDates');
        const selectedDatesArray = selectedDatesString.split(',');
        // console.log(selectedDatesArray);
    
        setSelectedDates(sd)
        setVenuePosition(venuePosition)
        setVenueName(venueName)
      }, [])

    return (
        <>
            <Container>
                <div className='mt-3 mb-5 d-flex justify-content-center'>
                    <img className='reserve-setp setp-3' src='/images/venue/場地流程ui-3.webp'></img>
                    <img className='reserve-setp setp-m' src='/images/venue/場地流程ui-3-m.webp'></img>
                </div>

                <div className='reserve-text '>
                    <div>
                        <p className='fs-5 fw-bold'>您所選擇的</p>
                        <p className='fs-5 fw-bold'>道場：{venuePosition} {venueName}</p>
                        <p className='fs-5 fw-bold'>日期：{selectedDates}</p>
                    </div>
                    <hr></hr>

                    <div className='my-5 d-flex flex-column align-items-center justify-content-center'>
                        <div className='display-6 check-title'>
                            <div>感謝預約</div>
                        </div>
                        {/* <div className='h4 mt-5'>
                            <p>已完成預約</p>
                        </div>
                        <div className='h4'>
                            <p>詳情可至會員中心查看</p>
                        </div> */}
                    </div>

                </div>
            </Container>
        </>
    )
}