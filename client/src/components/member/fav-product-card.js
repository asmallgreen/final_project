import React from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import Link from 'next/link'


export default function FavProductCard() {
    const handleInput = (e) => {
        e.stopPropagation()
    }
  return (
    <>
        <Row className='justify-content-md-center my-5'>
            <Col md='12'>
            <Row>
            <Col lg='6' md='12' className='d-flex justify-content-center mb-3'>
                <Link href='/' className='d-flex position-relative text-center fav-section'>
                    <input type='checkbox' onClick={handleInput}/>
                        <div className='me-2'>
                            <img src='/Duo/avatar01.jpg'></img>
                        </div>
                        <div>
                        <div>
                            <p>特選黑羽雞翅汝拉箭</p>
                            <p>汝拉箭6枚1913年 (5)</p>
                        </div>
                        <div>
                            <p>$8000</p>
                        </div>
                        </div>
                        <div>

                        </div>
                </Link>
            </Col>
            <Col lg='6' md='12' className='d-flex justify-content-center mb-3'>
                <Link href='/' className='d-flex position-relative fav-section'>
                    <input type='checkbox' onClick={handleInput}/>
                        <div className='me-2'>
                            <img src='/Duo/avatar01.jpg'></img>
                        </div>
                        <div>
                        <div>
                            <p>特選黑羽雞翅汝拉箭</p>
                            <p>汝拉箭6枚1913年 (5)</p>
                        </div>
                        <div>
                            <p>$8000</p>
                        </div>
                        </div>
                        <div>

                        </div>
                </Link>
            </Col>
            </Row>
                
            </Col>
        </Row>
        

    </>
  )
}
