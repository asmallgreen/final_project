import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useCart } from '@/hooks/use-cart';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import OrderList from './orderList'


export default function StepThree({ setstepType, discountPrice, discountAmount, setOrderName, setOrderPhone, setOrderAddress }) {


  const { cart } = useCart();
  const { authJWT, setAuthJWT } = useAuthJWT()

  const [inputState, setInputState] = useState(false)

  const [accordionState, setAccordionState] = useState(true)

  const [nameValue, setNameValue] = useState('')

  const [phoneValue, setPhoneValue] = useState('')

  const [addressValue, setAddressValue] = useState('')


  const handleSetInputState = () => {
    setInputState(!inputState)
    setNameValue(authJWT.memberData.name)
    setPhoneValue(authJWT.memberData.phone)
    setAddressValue(authJWT.memberData.address)

    if (!inputState) {
      document.getElementById('name').value = ''
      document.getElementById('phone').value = ''
      document.getElementById('address').value = ''
     

    }else if(inputState){
      setNameValue('')
      setPhoneValue('')
      setAddressValue('')
    }
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
              <Form.Control type='text' value={authJWT.memberData.address} disabled></Form.Control>
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
              onChange={
                handleSetInputState

              }
            />
            <span>{`同訂購人資訊`}</span>
          </label>
          <Form className='orderInfo'>
            <div className='cartMemberInfo'>
              <Form.Control type='text'
                placeholder={
                  inputState ? authJWT.memberData.name : '姓名*'
                }

                disabled={inputState ? true : false}
                defaultValue={inputState ? authJWT.memberData.name : nameValue}
                id='name'
                onChange={(e) => {
                  setNameValue(e.target.value)
                }}
              />
              <Form.Control type='text'
                placeholder={
                  inputState ? authJWT.memberData.phone : '手機*'
                }
                disabled={inputState ? true : false}
                defaultValue={inputState ? authJWT.memberData.phone : phoneValue}
                id='phone'
                onChange={(e) => {
                  setPhoneValue(e.target.value)
                }}
              />
            </div>
            <div className='m-2'>
              <Form.Control type='text'
                placeholder={
                  inputState ? authJWT.memberData.address : '配送地址*'
                }
                disabled={inputState ? true : false}
                defaultValue={inputState ? authJWT.memberData.address : addressValue}
                id='address'
                onChange={(e) => {
                  setAddressValue(e.target.value)
                }}
              />
            </div>
          </Form>
        </div>
      </div>
      <div
        className="orderTitle"

      >
        <Col className=''>
          <button
            className='btn d-flex justify-content-between w-100'
            onClick={() => {
              setAccordionState(!accordionState)
            }}
          >
            <span>+</span>
            <span>訂單明細</span>
            <span>+</span>
          </button>
        </Col>

      </div>

      <OrderList discountPrice={discountPrice} discountAmount={discountAmount} accordionState={accordionState} />
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
            setOrderName(nameValue)
            setOrderPhone(phoneValue)
            setOrderAddress(addressValue)
          }}
          disabled={nameValue && phoneValue && addressValue !== "" ? false : true}
        >確認訂單明細</button>

        <button
          className='nextStepBtn fs-5 d-sm-none d-block'
          onClick={() => {
            sendData(4);
            setOrderName(nameValue)
            setOrderPhone(phoneValue)
            setOrderAddress(addressValue)
          }}

          disabled={nameValue && phoneValue && addressValue !== "" ? false : true}

        >下一步</button>
      </div>
    </div>
  )
}