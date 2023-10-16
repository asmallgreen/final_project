import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';

const PaymentForm = (props) => {

  const creditValue = props.selectedOption
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div className={`${creditValue == 'credit' ?'d-flex':'d-none'} w-50 justify-content-between`}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form className='d-flex flex-column justify-content-around'>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='mb-3'
          maxLength='16'
        />
        <input
          type="text"
          name="expiry"
          placeholder="expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='mb-3'
          maxLength='4'
        />
        
        <input
          type="text"
          name="name"
          placeholder="name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='mb-3'
        />
        <input
          type="text"
          name="cvc"
          placeholder="cvc"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength='3'
          
        />
      </form>
    </div>
  );
}

export default PaymentForm;