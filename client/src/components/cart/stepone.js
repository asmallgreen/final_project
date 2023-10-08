import React, { useState, useReducer, useEffect } from 'react'
import { Container, Col } from 'react-bootstrap';
import List from '@/components/cart/list';
import { useCart } from '@/hooks/use-cart';
import { reducer } from '@/hooks/cart-reducer.js'

export default function StepOne({ setstepType }) {

  const { cart, removeItem, items, setChecked } = useCart();

  const [selectedValue, setSelectedValue] = useState(1);

  const discountPrice = selectedValue > 1 &&  cart.productTotal > selectedValue ? cart.productTotal - selectedValue : cart.productTotal * selectedValue

  const handleSelectChange = (event) => {
    const selectedOptionValue = event.target.value; // 获取选中的<option>的值
    setSelectedValue(selectedOptionValue); // 更新状态变量的值
  };




  const sendData = () => {
    // 在子组件中调用父组件传递的回调函数，并传递数据
    setstepType(2);
  };

  const handleCheckboxChange = (event) => {
    let thisEle = event.target
    let itemid = +thisEle.getAttribute("data-itemid")
    let isChecked = thisEle.checked

    setChecked(itemid,isChecked)
    // console.log(items)
    //setCheckValue();
    
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
        <List mode="product" />
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
          <div className='couponSection'>
            <select onChange={handleSelectChange}>
              <option value={1}>套用優惠券</option>
              <option value={200}>折200</option>
              <option value={0.8}>8折</option>
            </select>
            <span>{`共${cart.productTotalItems}項 , 商品小計${discountPrice} 元`}</span>
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
          <div className='discount'>
            {`優惠券折抵 $ `}{`${selectedValue > 1 ? selectedValue : cart.productTotal - Number(cart.productTotal * selectedValue)}`}
          </div>
          <span className=''>
            <span>{`確認訂單金額    `}</span>
            <button
              className='nextStepBtn'
              onClick={() => {
                sendData();

              }}>下一步</button>
          </span>

        </div>
      </div>
    </Container>
  )
}
