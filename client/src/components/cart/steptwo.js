import React, { use, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '@/hooks/use-cart';
import axios from 'axios';

export default function StepTwo({setstepType , discountPrice ,discountAmount, setPayment }) {
  const [selectedOption, setSelectedOption] = useState('');

  const { cart } = useCart();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  };

  const sendData = (n) => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(n);
    
  };

  

  const handleNewOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3005/cart/NewOrder',{payment:selectedOption}
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
          />
          <span>{` 宅配 貨到付款（限台灣本島）`}</span>
        </label>
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
          console.log(selectedOption)
        }}>填寫訂單資料</button>

        <button 
        className='nextStepBtn fs-5 d-sm-none d-block'
        onClick={() => {
          sendData(3);
          setPayment(selectedOption);
          console.log(selectedOption)
        }}>下一步</button>
      </div>
    </div>

  )
}