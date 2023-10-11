import React from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import Link from 'next/link'


export default function FavProductCard({products}) {
console.log('product card product:',products);
    const handleInput = (e) => {
        e.stopPropagation()
    }
  return (
    <>

        <Row className='justify-content-md-center my-5'>
            <Col md='12'>
            
            <Row>
             {products.map((product)=>(
            <Col key={product.id} lg='6' md='12' className='d-flex justify-content-center mb-3'>
               
        <Link href='/' className='d-flex position-relative text-center fav-section'>
                    <input type='checkbox' onClick={handleInput}/>
                        <div className='me-2'>
                            <img src='/Duo/avatar01.jpg'></img>
                        </div>
                        <div>
                        <div>
                            <p>{product.name}</p>
                            <p>{product.summary}</p>
                        </div>
                        <div>
                            <p>${product.price}</p>
                        </div>
                        </div>
                        <div>
                        </div>
                </Link>
            </Col>
                ))}
            </Row>
                
            </Col>
        </Row>
        

    </>
  )
}
