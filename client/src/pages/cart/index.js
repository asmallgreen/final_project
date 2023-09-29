import React ,{ useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap';  // import bootstrap components
import StepOne from '@/components/cart/stepone';
import StepTwo from '@/components/cart/steptwo';
import StepThree from '@/components/cart/stepthree';
import StepFour from '@/components/cart/stepfour';


export default function Index() {
  const [stepType , setstepType] = useState(1)
  

  
  function switchStep(){
    if(stepType === 1){
      return <StepOne stepType={stepType} setstepType={setstepType}/>;
    }else if(stepType === 2){
      return <StepTwo stepType={stepType} setstepType={setstepType}/>;
    }else if(stepType === 3){
      return <StepThree stepType={stepType} setstepType={setstepType}/>;
    }else if(stepType === 4){
      return <StepFour stepType={stepType} setstepType={setstepType}/>;
    }
  }
  return (
    
      <Container fluid={"xxl"}>
        <Row className="stepBar">
          <Col className="step">
            <div className="stepBox">
              <div className="stepNum">1</div>
            </div>
            <div className="stepWords">
              <div className='phoneDNone'>First</div>
              <div className='phoneDNone'>—————————</div>
              <span>購物車確認</span>
            </div>
          </Col>
          <Col className="step otherStep">
            <div className="stepBox">
              <div className="stepNum">2</div>
            </div>
            <div className="stepWords">
              <div>Second</div>
              <div>—————————</div>
              <div>選擇付款及配送方式</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <div className="stepBox">
              <div className="stepNum">3</div>
            </div>
            <div className="stepWords">
              <div>Third</div>
              <div>—————————</div>
              <div>填寫訂單資料</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <div className="stepBox">
              <div className="stepNum">4</div>
            </div>
            <div className="stepWords">
              <div>Forth</div>
              <div>—————————</div>
              <div>最後確認</div>
            </div>
          </Col>
        </Row>
        {switchStep()}
      </Container>
      



    
  );
}