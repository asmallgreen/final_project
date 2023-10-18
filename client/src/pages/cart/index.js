import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';


import { CartProvider } from '@/hooks/use-cart.js'

import { Container, Row, Col } from 'react-bootstrap';  // import bootstrap components
import StepOne from '@/components/cart/stepone';
import StepTwo from '@/components/cart/steptwo';
import StepThree from '@/components/cart/stepthree';
import StepFour from '@/components/cart/stepfour';

import { useAuthJWT } from '@/hooks/use-auth-jwt';


export  default  function Index() {

  
  
  

  const [cartList, setCartList] = useState([])

  const {authJWT, setAuthJWT} = useAuthJWT()

  let memberId = authJWT.memberData.id;
  useEffect(() => {
    if(memberId > 0){
    axios.post('http://localhost:3005/cart', {memberId})
      .then((res) => {

        // console.log(res.data.cartList)
        setCartList(res.data.cartList)
        
        
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [memberId])
  

  
  

  const [ payment, setPayment ] = useState(' ')

  const [discountPrice, setDiscountPrice] = useState(0)

  const [discountAmount, setDiscountAmount] = useState(0)

  const [stepType, setStepType] = useState(1)

  const [orderName , setOrderName] = useState('')

  const [orderPhone , setOrderPhone] = useState('')

  const [orderAddress , setOrderAddress] = useState('')

  const [cartCouponId, setCartCouponId] = useState(0)

  const [cartProducDtl, setCartProductDtl] = useState([])

  const [cartOriginDtl, setCartOriginDtl] = useState([])


  const handleStepChange = (newStep) => {
    setStepType(newStep);
  };
  
  

  
  

  return (
    <Container fluid={"xxl"}>






      <Row className="stepBar">
        <Col className={`step ${stepType === 1 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">1</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>First</div>
            <div className='phoneDNone stepLine'></div>
            <span>購物車確認</span>
          </div>
        </Col>
        <Col className={`step ${stepType === 2 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">2</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>Second</div>
            <div className='phoneDNone stepLine'></div>
            <span>選擇付款及配送方式</span>
          </div>
        </Col>
        <Col className={`step ${stepType === 3 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">3</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>Third</div>
            <div className='phoneDNone stepLine'></div>
            <span>填寫訂單資料</span>
          </div>
        </Col>
        <Col className={`step ${stepType === 4 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">4</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>Forth</div>
            <div className='phoneDNone stepLine'></div>
            <span>最後確認</span>
          </div>
        </Col>
      </Row>
      <CartProvider cartList={cartList}>

        {stepType === 1 && 
        <StepOne 
        setstepType={handleStepChange} 
        setDiscountPrice={setDiscountPrice} 
        setDiscountAmount={setDiscountAmount} 
        setCartCouponId={setCartCouponId}
        setCartProductDtl={setCartProductDtl}
        setCartOriginDtl={setCartOriginDtl}
        />}
        {stepType === 2 && 
        <StepTwo 
        setstepType={handleStepChange} 
        discountPrice={discountPrice} 
        discountAmount={discountAmount} 
        setPayment={setPayment}/>}
        {stepType === 3 && 
        <StepThree 
        setstepType={handleStepChange} 
        discountPrice={discountPrice} 
        discountAmount={discountAmount} 
        setOrderAddress={setOrderAddress}
        setOrderName={setOrderName}
        setOrderPhone={setOrderPhone}  
        />}
        {stepType === 4 && 
        <StepFour 
        setstepType={handleStepChange} 
        discountPrice={discountPrice} 
        discountAmount={discountAmount} 
        payment={payment}
        orderName={orderName}
        orderAddress={orderAddress}
        orderPhone={orderPhone}
        cartCouponId={cartCouponId}
        cartOriginDtl={cartOriginDtl}
        cartProducDtl={cartProducDtl}
        />
        }

      </CartProvider>

    </Container>
  );
}