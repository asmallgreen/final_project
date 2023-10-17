import React, { useState,useEffect } from 'react';
import Cards from 'react-credit-cards-2';

const PaymentForm = (props) => {


  const creditValue = props.selectedOption
  const [cardState, setCardState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const parentsProps = props.setCardState

  useEffect(()=>{
    parentsProps(cardState)
  },[parentsProps ,cardState])
  


  
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setCardState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setCardState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div className={`${creditValue == 'credit' ?'d-lg-flex d-block':'d-none'} w-100 justify-content-between card-section`}>
      <Cards
        number={cardState.number}
        expiry={cardState.expiry}
        cvc={cardState.cvc}
        name={cardState.name}
        focused={cardState.focus}

      />
      <form className='d-flex flex-column justify-content-around m-auto cardForm'>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardState.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='mb-3'
          maxLength='16'
        />
        <input
          type="text"
          name="expiry"
          placeholder="expiry"
          value={cardState.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='mb-3'
          maxLength='4'
        />
        
        <input
          type="text"
          name="name"
          placeholder="name"
          value={cardState.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='mb-3'
        />
        <input
          type="text"
          name="cvc"
          placeholder="cvc"
          value={cardState.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength='3'
          
        />
      </form>
    </div>
  );
}

export default PaymentForm;