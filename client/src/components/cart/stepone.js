import React,{ useState } from 'react'
import { Container, Col } from 'react-bootstrap';

export default function StepOne({setstepType}) {
    
    const sendData = () => {
      // 在子组件中调用父组件传递的回调函数，并传递数据
      setstepType(2);
    };
  
  
  
  return (
    <Container>
    <div className="listTitle">
          <Col xs={1} ><input type='checkbox' className='expand pcDNone' /></Col>
          <Col xs={10}>商品</Col>
          <Col xs={1}  ><span className='expand phoneDNone'>+</span></Col>
        </div>
        <div className="productList d-none d-lg-flex">
          <Col xs={1}><input type='checkbox' className='phoneDNone' /></Col>
          <Col xs={4}><span className='phoneDNone'>商品名稱</span></Col>
          <Col xs={2}><span className='phoneDNone'>規格</span></Col>
          <Col xs={2}><span className='phoneDNone'>單價</span></Col>
          <Col xs={2}><span className='phoneDNone'>數量</span></Col>
          <Col xs={1}><span className='phoneDNone'>小計</span></Col>
        </div>

        <div className="productList">
          <div>
            <button className="deleteBtn">刪除</button>
            <div className='couponSection'>
              <select>
                <option>套用優惠券</option>
                <option>1套用優惠券</option>
                <option>套用優惠券</option>
              </select>
              <span>{`共  項 , 商品小計 元`}</span>
            </div>
          </div>
        </div>
        {/* <Row className="productList">
        <Col xs={1}><input type='checkbox' /></Col>
        <Col xs={4}>商品名稱</Col>
        <Col xs={2}>規格</Col>
        <Col xs={2}>單價</Col>
        <Col xs={2}>數量</Col>
        <Col xs={1}>小計</Col>
      </Row> */}

        <div className="listTitle">
          <Col xs={1} ><input type='checkbox' className='expand pcDNone' /></Col>
          <Col xs={10}>課程</Col>
          <Col xs={1}><span className='expand phoneDNone'>+</span></Col>
        </div>
        <div className="productList d-none d-lg-flex">
          <Col xs={1}><input type='checkbox' className='phoneDNone' /></Col>
          <Col xs={4}><span className='phoneDNone'>商品名稱</span></Col>
          <Col xs={4}><span className='phoneDNone'>課程內容</span></Col>
          <Col xs={3}><span className='phoneDNone'>小計</span></Col>
        </div>
        <div className="productList">
          <Col><button className="deleteBtn">刪除</button><div>{`共  項 , 課程小計 元`}</div>
          </Col>
        </div>
        <div className='totalSection'>
          <label>
            <input type='checkbox' />
            {`  全選`}
          </label>
          <div className='total'>
            <div>{`總金額(共 項)`}<span>{`  $ `}</span></div>
            <div className='discount'>{`優惠券折抵   $ `}</div>
            <span className=''>
              <span>{`確認訂單金額    `}</span>
              <button 
              className='nextStepBtn'
              onClick={()=>{
                sendData() ;
                
              }}>下一步</button>
            </span>
            
          </div>
        </div>
    </Container>
  )
}