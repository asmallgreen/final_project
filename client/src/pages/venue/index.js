import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function index() {
  return (
    <>
      <Container>
        <div>
          <h1>北部道場</h1>
        </div>
        <div className=''>
          <img src="/images/dojo_n.png"></img>
        </div>
        <div>
          <h1>中部道場</h1>
        </div>
        <div className=''>
          <img src="/images/dojo_n.png"></img>
        </div>
        <div>
          <h1>南部道場</h1>
        </div>
        <div className=''>
          <img src="/images/dojo_n.png"></img>
        </div>
      </Container>
    </>
  )
}