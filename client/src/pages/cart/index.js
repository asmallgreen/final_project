import React, { useState ,useEffect ,useContext ,createContext } from 'react';
import axios from 'axios';
import { CartProvider } from '@/hooks/use-cart'


import { Container, Row, Col } from 'react-bootstrap';  // import bootstrap components
import StepOne from '@/components/cart/stepone';
import StepTwo from '@/components/cart/steptwo';
import StepThree from '@/components/cart/stepthree';
import StepFour from '@/components/cart/stepfour';
import { useCart } from '@/hooks/use-cart.js';


export default function Index() {

  
  const [cartList, setCartList] = useState([])
  useEffect(() => {
    axios.post('http://localhost:3005/cart' , {test:'123'})
    .then((res) => {
      console.log(res.data.cartList)
      setCartList(res.data.cartList)
    
      

    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const [stepType, setStepType] = useState(1)
  console.log(123)
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
            <div className='phoneDNone'>—————————</div>
            <span>購物車確認</span>
          </div>
        </Col>
        <Col className={`step ${stepType === 2 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">2</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>Second</div>
            <div className='phoneDNone'>—————————</div>
            <span>選擇付款及配送方式</span>
          </div>
        </Col>
        <Col className={`step ${stepType === 3 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">3</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>Third</div>
            <div className='phoneDNone'>—————————</div>
            <span>填寫訂單資料</span>
          </div>
        </Col>
        <Col className={`step ${stepType === 4 && 'nowStep'}`}>
          <div className="stepBox">
            <div className="stepNum">4</div>
          </div>
          <div className="stepWords">
            <div className='phoneDNone'>Forth</div>
            <div className='phoneDNone'>—————————</div>
            <span>最後確認</span>
          </div>
        </Col>
      </Row>
      <CartProvider cartList={cartList}>
      {stepType === 1 && <StepOne setstepType={handleStepChange} />}
      {stepType === 2 && <StepTwo setstepType={handleStepChange} />}
      {stepType === 3 && <StepThree setstepType={handleStepChange} />}
      {stepType === 4 && <StepFour setstepType={handleStepChange} />}
      
      </CartProvider>
    
    </Container>
  );
}