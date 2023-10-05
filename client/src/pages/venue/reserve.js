import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


export default function Reserve() {
    return (
        <>
            <Container>
                <div className='m-5 d-flex justify-content-center'>
                    <img className='' src='/images/venue/場地流程ui-資料填寫.png'></img>
                </div>

                <div className='reserve-text '>
                    <div>
                        <p className='fs-5 fw-bold'>您所選擇的</p>
                        <p className='fs-5 fw-bold'>日期：２０２３／０７／２７</p>
                        <p className='fs-5 fw-bold'>道場：北道場　藏月弓道場</p>
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