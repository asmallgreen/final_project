import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Venue() {
  return (
    <>
      <Container>
        <div className='mt-5'>
          <div className="d-flex align-items-end">
            <h2 className="">北部道場</h2>
            <h5 className="dojo-name">藏月弓道場</h5>
          </div>
          <a href="/venue/date">
            <img src="/images/venue/dojo_n.png"></img>
          </a>
        </div>
        <div className='mt-5'>
          <div className="d-flex align-items-end">
            <h2 className="">中部道場</h2>
            <h5 className="dojo-name">岡達弓道場</h5>
          </div>
          <a href="/venue/date">
            <img src="/images/venue/dojo_s.png"></img>
          </a>
        </div>
        <div className='mt-5 mb-5'>
          <div className="d-flex align-items-end">
            <h2 className="">南部道場</h2>
            <h5 className="dojo-name">駁二弓道場</h5>
          </div>
          <a href="/venue/date">
            <img src="/images/venue/dojo_m.png"></img>
          </a>
        </div>
      </Container>
    </>
  )
}