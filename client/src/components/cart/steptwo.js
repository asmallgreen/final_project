import React , { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function StepTwo() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <h2>付款及配送方式</h2>
      </div>
      <div className='radioSection'>
      <label>
        <input
          type="checkbox"
          name="choice"
          value="creditCard"
          checked={selectedOption === 'creditCard'}
          onChange={handleOptionChange}
        />
        {` 宅配 信用卡/金融卡付款（購買課程限此付款方式）`}
      </label>
      <label>
        <input
          type="checkbox"
          name="choice"
          value="cashOnDelivery"
          checked={selectedOption === 'cashOnDelivery'}
          onChange={handleOptionChange}
        />
        {` 宅配 貨到付款（限台灣本島）`}
      </label>
      </div>
    </div>
  )
}