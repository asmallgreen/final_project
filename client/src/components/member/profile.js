import React from 'react'
import { Container } from 'react-bootstrap'

export default function Profile() {
  return (
    <>
      <Container className='my-5'>
            <div className='fs-2 mb-5'>會員中心</div>
            <div className='d-flex justify-content-center align-items-center'>
              <div>
                
                <div>
                  <img className='avatar' src='/Duo/avatar01.jpg'></img>
                  <p className='text-center mt-3'>怡君</p>
                </div>
                <div className='mt-5'>
                  <p className='text-center'>會員等級：金弓會員</p>
                  <p className='text-center'>加入日期：2023-08-21</p>
                </div>
              </div>
            </div>
      </Container>
    </>
  )
}