import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useCart } from '@/hooks/use-cart';

export default function StepThree({ setstepType }) {

  const { cart } = useCart();

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
              <Form.Control type='text' placeholder='會員姓名' disabled />
              <Form.Control type='text' placeholder='會員手機' disabled />
            </div>
            <div className='m-2'>
              <Form.Control type='text' placeholder='地址'  />
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
            />
            <span>{`同訂購人資訊`}</span>
          </label>
          <Form className='orderInfo'>
            <div className='cartMemberInfo'>
              <Form.Control type='text' placeholder='姓名*' />
              <Form.Control type='text' placeholder='手機*' />
            </div>
            <div className='m-2'>
              <Form.Control type='text' placeholder='配送地址'  />
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
          <div className='fs-5'>{`共 件商品`}&nbsp;{`$`}</div>
          <div className='fs-5'>{`共 堂課程`}&nbsp;{`$`}</div>
          <br />
          <div className='fs-5'>{`優惠券折抵`}&nbsp;{`-$`}</div>
        </div>
        <div className='line'></div>
        <div className='orderTotal fs-5'>
          {`金額總計 `}&nbsp;<span>{`$ `}{` `}</span>
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

          }}>確認訂單明細</button>

        <button
          className='nextStepBtn fs-5 d-sm-none d-block'
          onClick={() => {
            sendData(4);

          }}>下一步</button>
      </div>
    </div>
  )
}