import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';  // import bootstrap components
import { useCart } from '@/hooks/use-cart'
import List from '@/components/cart/list'

export default function Index() {
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne,
  } = useCart()
  return (
    <Container fluid>
      <Container fluid={"xxl"}>
        <Row className="stepBar">
          <Col className="step">
            <span className="stepBox">
              <div className="stepNum">1</div>
            </span>
            <div className="stepWords">
              <div>First</div>
              <div>—————————</div>
              <div>購物車確認</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <span className="stepBox">
              <div className="stepNum">2</div>
            </span>
            <div className="stepWords">
              <div>Second</div>
              <div>—————————</div>
              <div>選擇付款及配送方式</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <span className="stepBox">
              <div className="stepNum">3</div>
            </span>
            <div className="stepWords">
              <div>Third</div>
              <div>—————————</div>
              <div>填寫訂單資料</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <span className="stepBox">
              <div className="stepNum">4</div>
            </span>
            <div className="stepWords">
              <div>Forth</div>
              <div>—————————</div>
              <div>最後確認</div>
            </div>
          </Col>
        </Row>
        <Row className="listTitle">
          <Col xs={11}>商品</Col>
          <Col xs={1}><span className='expand'>+</span></Col>
        </Row>
        <Row className="productList">
          <Col xs={1}><input type='checkbox' /></Col>
          <Col xs={4}>商品名稱</Col>
          <Col xs={2}>規格</Col>
          <Col xs={2}>單價</Col>
          <Col xs={2}>數量</Col>
          <Col xs={1}>小計</Col>
        </Row>
        <List />
        <Row className="productList">
          <Col xs={2}><Button className="deleteBtn">刪除</Button></Col>
          <Col xs={2}>
            <select>
              <option>套用優惠券</option>
            </select>
            <div>{`共  項 , 商品小計 元`}</div>
          </Col>
        </Row>
        {/* <Row className="productList">
        <Col xs={1}><input type='checkbox' /></Col>
        <Col xs={4}>商品名稱</Col>
        <Col xs={2}>規格</Col>
        <Col xs={2}>單價</Col>
        <Col xs={2}>數量</Col>
        <Col xs={1}>小計</Col>
      </Row> */}

        <Row className="listTitle">
          <Col xs={11}>課程</Col>
          <Col xs={1}><span className='expand'>+</span></Col>
        </Row>
        <Row className="productList">
          <Col xs={1}><input type='checkbox' /></Col>
          <Col xs={4}>商品名稱</Col>
          <Col xs={4}>課程內容</Col>
          <Col xs={3}>小計</Col>
        </Row>
        <Row className="productList">
          <Col xs={2}><Button className="deleteBtn">刪除</Button></Col>
          <Col xs={2}>
            <div>{`共  項 , 課程小計 元`}</div>
          </Col>
        </Row>

      </Container>
      <h4>測試按鈕</h4>
      <div className="btn-group-vertical">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            console.log(cart)
          }}
        >
          log cart
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '111',
              quantity: 5,
              name: 'iphone',
              price: 15000,
              color: 'red',
              size: '',
            })
          }}
        >
          add item (id=111, x5)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '222',
              quantity: 1,
              name: 'ipad',
              price: 19000,
              color: '',
              size: '',
            })
          }}
        >
          add item (id=222, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            removeItem('222')
          }}
        >
          remove item(id=222)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItem({
              id: '222',
              quantity: 7,
            })
          }}
        >
          update id=222 item quantity to 7
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItem({
              id: '111',
              quantity: 99,
            })
          }}
        >
          update id=111 item quantity to 99
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            clearCart()
          }}
        >
          clear cart
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            if (isInCart('222')) alert('id=222 item is in cart')
            else alert('no id=222  ')
          }}
        >
          check if id=222 in cart
        </button>
      </div>
      <div className='totalSection'>
        <label>
          <input type='checkbox' />
          {`  全選`}
        </label>
        <div className='total'>
          <div>{`總金額(共 項)`}<span>{`  $ `}</span></div>
          <div className='discount'>{`優惠券折抵   $ `}</div>
          <span className=''>
            <span>{`確認訂單金額    `}</span> 
            <button>下一步</button>
          </span>          
        </div>
      </div>

    </Container>
  );
}