import React from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'


export default function FavProductCard() {
  return (
    <>
        <Row className='justify-content-md-center my-5'>
            <Col md='12'>
            <Row>
                <div className='d-flex position-relative fav-section col-md-6'>
                    <input type='checkbox' className='end-0'/>
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
                        </div>
                        <div className='d-flex position-relative fav-section col-md-6'>
                    <input type='checkbox' className='end-0'/>
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
                        </div>
            </Row>
                
            </Col>
        </Row>
        

    </>
  )
}
