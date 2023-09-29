import React from 'react'
import { Container, Row, Col} from 'react-bootstrap';  // import bootstrap components


export default function Index() {

  return (
    <Container fluid>
      <Container fluid={"xxl"}>
        <Row className="stepBar">
          <Col className="step">
            <div className="stepBox">
              <div className="stepNum">1</div>
            </div>
            <div className="stepWords">
              <div className='phoneDNone'>First</div>
              <div className='phoneDNone'>—————————</div>
              <span>購物車確認</span>
            </div>
          </Col>
          <Col className="step otherStep">
            <div className="stepBox">
              <div className="stepNum">2</div>
            </div>
            <div className="stepWords">
              <div>Second</div>
              <div>—————————</div>
              <div>選擇付款及配送方式</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <div className="stepBox">
              <div className="stepNum">3</div>
            </div>
            <div className="stepWords">
              <div>Third</div>
              <div>—————————</div>
              <div>填寫訂單資料</div>
            </div>
          </Col>
          <Col className="step otherStep">
            <div className="stepBox">
              <div className="stepNum">4</div>
            </div>
            <div className="stepWords">
              <div>Forth</div>
              <div>—————————</div>
              <div>最後確認</div>
            </div>
          </Col>
        </Row>
        <Row className="listTitle">
          <Col xs={1} ><input type='checkbox' className='expand pcDNone' /></Col>
          <Col xs={10}>商品</Col>
          <Col xs={1}  ><span className='expand phoneDNone'>+</span></Col>
        </Row>
        <Row className="productList phoneDNone">
          <Col xs={1}><input type='checkbox' className='phoneDNone'/></Col>
          <Col xs={4}><span className='phoneDNone'>商品名稱</span></Col>
          <Col xs={2}><span className='phoneDNone'>規格</span></Col>
          <Col xs={2}><span className='phoneDNone'>單價</span></Col>
          <Col xs={2}><span className='phoneDNone'>數量</span></Col>
          <Col xs={1}><span className='phoneDNone'>小計</span></Col>
        </Row>

        <Row className="productList">
          <Col xs={2}><button className="deleteBtn">刪除</button></Col>
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
          <Col xs={1} ><input type='checkbox' className='expand pcDNone' /></Col>
          <Col xs={10}>課程</Col>
          <Col xs={1}><span className='expand phoneDNone'>+</span></Col>
        </Row>
        <Row className="productList phoneDNone">
          <Col xs={1}><input type='checkbox' className='phoneDNone'/></Col>
          <Col xs={4}><span className='phoneDNone'>商品名稱</span></Col>
          <Col xs={4}><span className='phoneDNone'>課程內容</span></Col>
          <Col xs={3}><span className='phoneDNone'>小計</span></Col>
        </Row>
        <Row className="productList">
          <Col xs={2}><button className="deleteBtn">刪除</button></Col>
          <Col xs={2}>
            <div>{`共  項 , 課程小計 元`}</div>
          </Col>
        </Row>
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



    </Container>
  );
}