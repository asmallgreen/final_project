import React from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import Link from 'next/link'


export default function FavProductCard({products, toggleProductCheck }) {
console.log('product card product:',products);
    const handleCheckboxChange  = (e, productId) => {
        e.stopPropagation()
        toggleProductCheck(productId);
    }

  return (
    <>

        <Row className='justify-content-md-center my-5 fav-product-cards pb-5'>
            <Col md='12'>
            
            <Row>
             {products.map((product)=>(
            <Col key={product.id} lg='6' md='12' className='d-flex justify-content-center mb-3'>
               
        <Link href={`/product/${product.id}`} className='d-flex position-relative text-center fav-section'>
                    <input type='checkbox' checked={product.checked || false} onChange={(e)=>handleCheckboxChange(e, product.id) } onClick={(e) => e.stopPropagation()}/>
                        <div className='me-2'>
                            <img src={product.img1}></img>
                        </div>
                        <div className='fav-product-card-div'>
                        <div>
                            <p className='product-name'>{product.name}</p>
                            <p className='product-summary'>{product.summary}</p>
                        </div>
                        <div>
                            <p className='product-price'>${product.price}</p>
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
