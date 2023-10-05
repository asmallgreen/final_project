import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import SweetAlert2 from 'react-sweetalert2';

export default function StepThree({ setstepType }) {

  const [swalProps, setSwalProps] = useState({});

  function handleClick() {
    setSwalProps({
      show: true,
      text: '訂購已完成 感謝您的訂購',
      imageUrl: 'Ciro/modalImg.png',
      customClass:{
        confirmButton: 'custom-confirm-button-class'
      },
      confirmButtonText:'關閉',

    });
  }
  function didSwalClose() {
    setSwalProps({
      show:false,
    })
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
              <Form.Control type='text' placeholder='付款方式' disabled />
            </div>
            <div className='m-2'>
              <Form.Control type='text' placeholder='地址' />
            </div>
          </Form>
        </div>
        <div className='mb-5'>
          <p className='ordererTitle'>收件人資訊</p>
          <Form className='orderInfo'>
            <div className='cartMemberInfo'>
              <Form.Control type='text' placeholder='姓名*' disabled />
              <Form.Control type='text' placeholder='手機*' disabled />
            </div>
            <div className='m-2'>
              <Form.Control type='text' placeholder='配送地址' disabled />
            </div>
          </Form>
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
    </div>
  )
}