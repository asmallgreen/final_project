import React, { useState, useReducer, useEffect } from 'react'
import { Container, Col } from 'react-bootstrap';

import List from './list.js';
import { useCart } from '@/hooks/use-cart.js';
import { reducer } from '@/hooks/cart-reducer.js'
import AddCartCourse from './addCartCourse.js'
import AddCartProduct from './addCartProduct.js';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import axios from 'axios';
import { set } from 'lodash';

export default function StepOne({ setstepType, setDiscountPrice, setDiscountAmount }) {

  const [memberCoupon, setMemberCoupon] = useState([])

  const { cart, removeItem, setChecked } = useCart();

  const [selectedValue, setSelectedValue] = useState(1);

  const { authJWT, setAuthJWT } = useAuthJWT()

  let memberId = authJWT.memberData.id;
  useEffect(() => {
    if (memberId > 0) {
      axios.post('http://localhost:3005/cart/MemberCoupon', { memberId })
        .then((res) => {
          setMemberCoupon(res.data.memberCoupon)
          console.log('這是res', res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [memberId])

  const discountPrice = selectedValue > 1 && cart.productTotal > selectedValue ? parseInt(cart.productTotal - selectedValue) : parseInt(cart.productTotal * selectedValue)



  const discountAmount = selectedValue > 1 ? parseInt(selectedValue) : parseInt(cart.productTotal - cart.productTotal * selectedValue)



  const handleSelectChange = (event) => {
    const selectedOptionValue = event.target.value; // 获取选中的<option>的值
    setSelectedValue(selectedOptionValue); // 更新状态变量的值

  };
  const sendDiscount = () => {
    setDiscountPrice(discountPrice)
    setDiscountAmount(discountAmount)
  }



  const sendData = () => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(2);
  };



  return (
    <Container>
      <div className="listTitle">
        <Col xs={1} ><input
          type='checkbox'
          className='expand pcDNone'
          onChange={(event) => {
            let thisChk = event.target

            document.querySelectorAll('.productList .cartChk').forEach(function (element) {

              element.checked = thisChk.checked
              setChecked(+element.getAttribute("data-itemid"), thisChk.checked)

            })
          }}
        /></Col>
        <Col xs={10}>商品</Col>
        <Col xs={1}  ><span className='expand phoneDNone'>+</span></Col>
      </div>
      <div className="productList d-none d-lg-flex">
        <Col xs={1}><input
          type='checkbox'
          className='phoneDNone'
          onChange={(event) => {
            let thisChk = event.target

            document.querySelectorAll('.productList .cartChk').forEach(function (element) {

              element.checked = thisChk.checked
              setChecked(+element.getAttribute("data-itemid"), thisChk.checked)

            })
          }}

        /></Col>
        <Col xs={4}><span className='phoneDNone'>商品名稱</span></Col>
        <Col xs={2}><span className='phoneDNone'>規格</span></Col>
        <Col xs={2}><span className='phoneDNone'>單價</span></Col>
        <Col xs={2}><span className='phoneDNone'>數量</span></Col>
        <Col xs={1}><span className='phoneDNone'>小計</span></Col>



      </div>
      <div>
        <List mode={'product'} />
      </div>


      <div className="productList">
        <Col className='deleteSection'>
          <button className="deleteBtn"
            onClick={() => {

              document.querySelectorAll('.productList .cartChk').forEach(function (element) {
                if (element.checked) {
                  let itemid = element.getAttribute("data-itemid")
                  removeItem(+itemid)
                }

              });
            }}
          >刪除</button>
          <AddCartProduct />
          <div className='couponSection'>
            <select onChange={handleSelectChange}>
              <option value={1}>套用優惠券</option>
              {memberCoupon.map((coupon) => (
                <option value={Number(coupon.discount)}>{coupon.name}</option>
              ))}
            </select>
            <span


            >{`共${cart.productTotalItems}項 , 商品小計${discountPrice} 元`}</span>
          </div>
        </Col>
      </div>


      <div className="listTitle">
        <Col xs={1} ><input
          type='checkbox'
          className='expand pcDNone'
          onChange={(event) => {
            let thisChk = event.target

            document.querySelectorAll('.courseList .cartChk').forEach(function (element) {
              element.checked = thisChk.checked
              setChecked(+element.getAttribute("data-itemid"), thisChk.checked)
            })
          }}
        /></Col>
        <Col xs={10}>課程</Col>
        <Col xs={1}><span className='expand phoneDNone'>+</span></Col>
      </div>
      <div className="productList  d-none d-lg-flex">
        <Col xs={1}><input
          type='checkbox'
          className='phoneDNone'
          onChange={(event) => {
            let thisChk = event.target

            document.querySelectorAll('.courseList .cartChk').forEach(function (element) {
              element.checked = thisChk.checked
              setChecked(+element.getAttribute("data-itemid"), thisChk.checked)
            })
          }}
        /></Col>
        <Col xs={4}><span className='phoneDNone'>商品名稱</span></Col>
        <Col xs={4}><span className='phoneDNone'>課程內容</span></Col>
        <Col xs={3}><span className='phoneDNone'>小計</span></Col>
      </div>
      <div>
        <List mode="course" />
      </div>

      <div className="productList">
        <Col className='deleteSection'><button
          className="deleteBtn"
          onClick={() => {

            document.querySelectorAll('.courseList .cartChk').forEach(function (element) {
              if (element.checked) {
                let itemid = element.getAttribute("data-itemid")
                removeItem(+itemid)
              }

            });
          }}
        >刪除
        </button><div>{`共${cart.courseTotalItems}項 , 課程小計${cart.courseTotal}元`}</div>
        </Col>
        <AddCartCourse />
      </div>
      <div className='totalSection'>
        <label>
          <input
            type='checkbox'
            onChange={(event) => {
              let thisChk = event.target

              document.querySelectorAll('.cartChk').forEach(function (element) {

                element.checked = thisChk.checked
                setChecked(+element.getAttribute("data-itemid"), thisChk.checked)

              })

            }}
          />
          {`全選`}
        </label>
        <div className='total'>
          <div>{`總金額(共${cart.totalItems}項)`}
            <span>${`${discountPrice + cart.courseTotal}`}</span>
          </div>
          <div
            className='discount'

          >
            {`優惠券折抵 $ `}{`${discountAmount}`}
          </div>
          <span className=''>
            <span>{`確認訂單金額    `}</span>
            <button
              className='nextStepBtn'
              onClick={() => {
                sendData();
                sendDiscount();
              }}
              disabled={cart.totalItems === 0}
            >下一步</button>
          </span>

        </div>
      </div>
    </Container>
  )
}
