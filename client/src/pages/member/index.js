import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function index() {
  return (
    <>
      <Container>
        <Row>
          <Col md='3' className='member-side-bar'>
            123
          </Col>
          <Col md='auto' >
            <div className='fs-3'>會員中心</div>
            <div className='d-flex justify-content-center align-items-center'>
              <div>
                <div>
                  <img src=''></img>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
