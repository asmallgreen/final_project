import { useEffect, useState, useReducer, createContext, useContext } from 'react'
import { useCart } from '@/hooks/use-cart';
import { Container, Row, Col } from 'react-bootstrap';

export default function OrderList({ discountPrice, discountAmount, accordionState }) {

    const { cart, items } = useCart();


    return (

        <div className={`${accordionState === false ? 'd-none' : ""} `}>
            <div className="orderTableHead d-flex">
                <Col className='d-flex justify-content-center'>#</Col>
                <Col className='d-flex justify-content-center'>名稱</Col>
                <Col className='d-flex justify-content-center'>單價</Col>
                <Col className='d-flex justify-content-center'>數量</Col>
                <Col className='d-flex justify-content-center'>小計</Col>
            </div>
            <div className='orderDetail'>
                {
                    items
                        .filter((item) => item.isChecked)
                        .sort((a, b) => a.product_price - b.product_price)
                        .map((item, index) => (
                            <div key={index} className='py-2 itemDetail d-flex align-items-center'>
                                <div className='orderItem d-flex justify-content-around w-100 align-items-center' >
                                    <Col className='orderItemImg d-flex justify-content-center'>
                                        <img src={item.image} alt="" className='w-25 text-center  ' />
                                    </Col>
                                    <Col className='orderItemName d-flex justify-content-center'>{item.name}&nbsp;</Col>
                                    <Col className='orderItemPrice d-flex justify-content-center'>$ {item.price}</Col>
                                    <Col className='orderItemQty d-flex justify-content-center'>&nbsp;{item.quantity}</Col>
                                    <Col className='orderItemTotal d-flex justify-content-center'>$ {item.price * item.quantity}</Col>

                                </div>
                            </div>
                        ))


                }
            </div>
            <div className='mt-2'>
                <div className='fs-5 d-flex justify-content-center'>{`共${cart.productTotalItems}件商品`}&nbsp;$ {`${!discountPrice ? cart.productTotal : discountPrice}`}</div>
                <div className='fs-5 d-flex justify-content-center'>{`共${cart.courseTotalItems}堂課程`}&nbsp;$ {`${cart.courseTotal}`}</div>
                <br />
                <div className='fs-5 d-flex justify-content-center'>{`優惠券折抵`}&nbsp;$ {`${!discountAmount ? "0" : discountAmount}`}</div>
            </div>
            <div className='line'></div>
            <div className='orderTotal fs-5'>
                {`金額總計 `}&nbsp;<span>{`$ `}{`${!discountPrice ? cart.productTotal + cart.courseTotal : discountPrice + cart.courseTotal}`}</span>
            </div>
        </div>
    )
}