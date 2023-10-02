import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import './main.css';


export default function index() {
    return (
        <>
            <Container>
                <div className='m-5 d-flex justify-content-center'>
                    <img className='' src='/images/venue/場地流程ui-日期選擇.png'></img>
                </div>
                <div className='calendar-test1'>
                    <a href="/venue/date/reserve/" className='calendar-test2'>
                        日期選擇器
                    </a>
                </div>

                {/* <div class="calendar">
                    <div class="mLeft">
                        <div class="ctrl">
                            <i class="fa-solid fa-circle-chevron-left btnMonth btnMonthPrev"></i>
                            <div class="info"></div>
                            <i class="fa-solid fa-circle-chevron-right btnMonth btnMonthNext"></i>
                        </div>
                        <div class="line">
                            <div class="day day1">MON</div>
                            <div class="day day2">TUE</div>
                            <div class="day day3">WED</div>
                            <div class="day day4">THU</div>
                            <div class="day day5">FRI</div>
                            <div class="day day6">SAT</div>
                            <div class="day day0">SUN</div>
                        </div>
                        <div class="line mainLine">
                        </div>
                    </div>
                </div> */}
            </Container>
        </>
    )
}