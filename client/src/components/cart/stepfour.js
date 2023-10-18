import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import SweetAlert2 from 'react-sweetalert2';
import { useCart } from '@/hooks/use-cart';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import OrderList from './orderList'


export default function StepThree({ setstepType, discountPrice, payment, discountAmount, orderName, orderPhone, orderAddress, cartCouponId, cartOriginDtl, cartProductDtl }) {


  const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

  const { cart, items } = useCart();

  const [swalProps, setSwalProps] = useState({});

  const { authJWT, setAuthJWT } = useAuthJWT()

  const [accordionState, setAccordionState] = useState(true)

  const handleSummit = () => {
    axios.post('http://localhost:3005/cart/NewOrder/',
      {
        member_id: authJWT.memberData.id,
        order_id: uuidv4(),
        payment: payment,
        subtotal: discountPrice + cart.courseTotal,
        receive_name: orderName,
        receive_phone: orderPhone,
        receive_add: orderAddress,
        order_date: currentDate,
        // course_id:items.course_id,
        // product_id:items.product_id,
        // quantity:items.quantity,
        // price:items.price,
        // itemTotal:items.itemTotal,
        // itemName:items.name,
        items: items,
        coupon_id: cartCouponId,

      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function handleClick() {
    setSwalProps({
      show: true,
      text: '訂購已完成 感謝您的訂購',
      imageUrl: 'Ciro/modalImg.png',
      customClass: {
        confirmButton: 'custom-confirm-button-class'
      },
      confirmButtonText: '關閉',
      

    });
    handleSummit()

  }
  function didSwalClose() {
    const didClose = () => {
      window.location.href = 'http://localhost:3000/product';
    };
    didClose();
  }
  


  // const [smShow, setSmShow] = useState(false);

  // const handleClose = () => {
  //   setSmShow(false)
  // }
  const sendData = (n) => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(n);
  };
  return (
    <div>
      {/* <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <img alt="" src='https://i.imgur.com/YDZ6bV5.png' />
          訂單已送出<br />感謝您的訂購
          <button
            onClick={
              handleClose
            }
          >關閉</button>
        </Modal.Header>
      </Modal> */}

      <div className='stepTypeTitle phoneDNone'>
        <h2>確認訂單明細</h2>
      </div>

      <div className='stepThreeMain'>
        <div>
          <p className='ordererTitle'>付款資訊</p>
          <Form className='orderInfo'>
            <div className='payTypeInput m-2'>
              <Form.Control type='text' value={payment === 'cashON' ? '宅配 貨到付款（限台灣本島）' : '金融卡付款（購買課程限此付款方式）'} disabled />
            </div>
            <div className='m-2'>
              <Form.Control type='text' value={authJWT.memberData.address} disabled />
            </div>
          </Form>
        </div>
        <div>
          <p className='ordererTitle'>收件人資訊</p>
          <Form className='orderInfo'>
            <div className='cartMemberInfo'>
              <Form.Control type='text' value={orderName} disabled />
              <Form.Control type='text' value={orderPhone} disabled />
            </div>
            <div className='m-2'>
              <Form.Control type='text' value={orderAddress} disabled />
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
            sendData(3);

          }}>返回訂單資料</button>

        <button
          className='nextStepBtn fs-5 opacity-50 d-sm-none d-block'
          onClick={() => {
            sendData(3);

          }}>上一步</button>

        <button
          className='nextStepBtn fs-5 d-sm-block d-none'
          onClick={handleClick
          }>確認送出</button>

        <button
          className='nextStepBtn fs-5 d-sm-none d-block'
          onClick={handleClick
          }>
          確認送出
        </button>
        <SweetAlert2 {...swalProps} didClose={didSwalClose} />
      </div>
    </div>
  )
}