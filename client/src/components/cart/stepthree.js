import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useCart } from '@/hooks/use-cart';
import { useAuthJWT } from '@/hooks/use-auth-jwt';

export default function StepThree({ setstepType , discountPrice ,discountAmount, setOrderName , setOrderPhone , setOrderAddress}) {

  const { cart } = useCart();
  const {authJWT, setAuthJWT} = useAuthJWT()

  const [inputState, setInputState] = useState(false)

  const handleSetInputState = () => {
    setInputState(!inputState)
  }
  const sendData = (n) => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(n);
  };
  return (
    <div>
      <div className='stepTypeTitle phoneDNone'>
        <h2>填寫訂單資料</h2>
      </div>
      <div className='stepThreeMain'>
        <div>
          <p className='ordererTitle'>訂購人資訊</p>
          <Form className='orderInfo'>
            <div className='cartMemberInfo'>
              <Form.Control type='text' placeholder={authJWT.memberData.name} disabled value={authJWT.memberData.name}></Form.Control>
              <Form.Control type='text' placeholder={authJWT.memberData.phone} disabled value={authJWT.memberData.phone}></Form.Control>
            </div>
            <div className='m-2'>
              <Form.Control type='text' value={authJWT.memberData.address}  disabled ></Form.Control>
            </div>
          </Form>

        </div>
        <div>
          <label className='customCheckbox'>  
            <span className='receiverInfo'>收件人資訊</span>
            <input
              type="checkbox"
              name="choice"
              value="creditCard"
              onChange={handleSetInputState}
            />
            <span>{`同訂購人資訊`}</span>
          </label>
          <Form className='orderInfo'>
            <div className='cartMemberInfo'>
              <Form.Control type='text' 
              placeholder={
                inputState? authJWT.memberData.name : '姓名*'
              } 
              disabled={inputState? true : false}
              value={inputState? authJWT.memberData.name : ''}
              id='name'
              />
              <Form.Control type='text' 
              placeholder={
                inputState? authJWT.memberData.phone : '手機*'
              } 
              disabled={inputState? true : false}
              value={inputState? authJWT.memberData.phone : ''}
              id='phone'

              />
            </div>
            <div className='m-2'>
              <Form.Control type='text' 
                placeholder={
                inputState? authJWT.memberData.address : '配送地址*'
              } 
              disabled={inputState? true : false}
              value={inputState? authJWT.memberData.address : ''}
              id='address'
              />
            </div>
          </Form>
        </div>
      </div>
      <div className="orderTitle">
        <Col xs={1} ><span>+</span></Col>
        <Col xs={10} className='fs-4'>訂單明細</Col>
        <Col xs={1}><span>+</span></Col>
      </div>
      <div>
        <div className='order'>
          <div className='fs-5'>{`共${cart.productTotalItems}件商品`}&nbsp;$ {`${!discountPrice ? cart.productTotal :discountPrice}`}</div>
          <div className='fs-5'>{`共${cart.courseTotalItems}堂課程`}&nbsp;$ {`${cart.courseTotal}`}</div>
          <br />
          <div className='fs-5'>{`優惠券折抵`}&nbsp;$ {`${!discountAmount ? "0":discountAmount}`}</div>
        </div>
        <div className='line'></div>
        <div className='orderTotal fs-5'>
          {`金額總計 `}&nbsp;<span>{`$ `}{`${!discountPrice ? cart.productTotal+cart.courseTotal:discountPrice+cart.courseTotal}`}</span>
        </div>
      </div>
      <div className='stepBtnGroup'>
        <button
          className='nextStepBtn fs-5 opacity-50 d-lg-block d-none'
          onClick={() => {
            sendData(2);

          }}>返回付款及配送方式</button>

        <button
          className='nextStepBtn fs-5 opacity-50 d-sm-none d-block'
          onClick={() => {
            sendData(2);

          }}>上一步</button>

        <button
          className='nextStepBtn fs-5 d-sm-block d-none'
          onClick={() => {
            sendData(4);
            setOrderName(document.getElementById('name').value)
            setOrderPhone(document.getElementById('phone').value)
            setOrderAddress(document.getElementById('address').value)
          }}>確認訂單明細</button>

        <button
          className='nextStepBtn fs-5 d-sm-none d-block'
          onClick={() => {
            sendData(4);
            setOrderName(document.getElementById('name').value)
            setOrderPhone(document.getElementById('phone').value)
            setOrderAddress(document.getElementById('address').value)
          }}>下一步</button>
      </div>
    </div>
  )
}