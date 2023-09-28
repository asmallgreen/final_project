import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


export default function index() {
    return (
        <>
            <Container>
                <img className='m-5 d-flex justify-content-center' src='/images/venue/場地流程ui-日期選擇.png'></img>

                <p>您所選擇的</p>
                <p>日期：２０２３／０７／２７</p>
                <p>道場：北道場　藏月弓道場</p>
                <hr></hr>

                <div>
                    <p>預約人姓名</p>
                    <input type='name' className='form-control'></input>
                </div>
                <div>
                    <p>Email</p>
                    <input type='email' className='form-control'></input>
                </div>
                <div>
                    <p>連絡電話</p>
                    <input type='phone' className='form-control mb-5'></input>
                </div>



            </Container>
        </>
    )
}