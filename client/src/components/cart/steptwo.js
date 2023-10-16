import React, { use, useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { useCart } from '@/hooks/use-cart';
import axios from 'axios';
import CreditCard from './creditCard'
import OrderList from './orderList'

export default function StepTwo({ setstepType, discountPrice, discountAmount, setPayment }) {
  const [selectedOption, setSelectedOption] = useState('');

  const { cart, items } = useCart();

  const [accordionState, setAccordionState] = useState(false)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  };

  const sendData = (n) => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(n);

  };


  const detectOnlyCourse = items.filter((item) => item.product_id === null&& item.isChecked === true);
  const detectNullProduct = items.filter((item) => item.course_id === null&& item.isChecked === true);


  const handleNewOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3005/cart/NewOrder', { payment: selectedOption }
      )
      if (response.status === 200) {
        alert('連結成功');

      } else {
        alert('連接失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='stepTypeTitle phoneDNone'>
        <h2>付款及配送方式</h2>
      </div>
      <div className='radioSection'>
        <label className='customCheckbox'>
          <input
            type="checkbox"
            name="choice"
            value="credit"
            checked={selectedOption === 'credit'}
            onChange={handleOptionChange}

          />
          <span>{` 宅配 信用卡/金融卡付款（購買課程限此付款方式）`}</span>
        </label>
        <label className='customCheckbox'>
          <input
            type="checkbox"
            name="choice"
            value="cashOn"
            checked={selectedOption === 'cashOn'}
            onChange={handleOptionChange}
            disabled={detectOnlyCourse.length>0 && detectNullProduct.length ==0 ? true : false}
          />
          <span>{` 宅配 貨到付款（限台灣本島）`}</span>
        </label>
        <CreditCard selectedOption={selectedOption} />
      </div>
      <div
        className="orderTitle"

      >
        <Col className=''>
          <button 
          className='btn d-flex justify-content-between w-100'
          onClick={()=>{
            setAccordionState(!accordionState)
          }}
          >
            <span>+</span>
            <span>訂單明細</span>
            <span>+</span>
          </button>
        </Col>

      </div>
      
      <OrderList discountPrice={discountPrice} discountAmount={discountAmount} accordionState={accordionState}/>
      <div className='stepBtnGroup'>
        <button
          className='nextStepBtn fs-5 opacity-50 d-lg-block d-none'
          onClick={() => {
            sendData(1);

          }}>返回購物車 </button>

        <button
          className='nextStepBtn fs-5 opacity-50 d-sm-none d-block'
          onClick={() => {
            sendData(1);

          }}>上一步 </button>

        <button
          className='nextStepBtn fs-5 d-sm-block d-none'
          onClick={() => {
            sendData(3);
            setPayment(selectedOption);

          }}>填寫訂單資料</button>

        <button
          className='nextStepBtn fs-5 d-sm-none d-block'
          onClick={() => {
            sendData(3);
            setPayment(selectedOption);

          }}>下一步</button>
      </div>
    </div>

  )
}