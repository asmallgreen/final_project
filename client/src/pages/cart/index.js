import React from 'react'
import styles from './cart.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap css
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';  // import bootstrap components

export default function Index() {
  return (

    <Container fluid>
      <Row className={`${styles.stepBar}`}>
        <Col className={`${styles.step}`}>
          <div className={styles.stepBox}>
            <div className={styles.stepNum}>1</div>
          </div>
          <div className={styles.stepWords}>
            <div>First</div>
            <div>—————————</div>
            <div>購物車確認</div>
          </div>
        </Col>
        <Col className={`${styles.step} ${styles.otherStep}`}>
          <span className={styles.stepBox}>
            <div className={styles.stepNum}>2</div>
          </span>
          <div className={styles.stepWords}>
            <div>Second</div>
            <div>—————————</div>
            <div>選擇付款及配送方式</div>
          </div>
        </Col>
        <Col className={`${styles.step} ${styles.otherStep}`}>
          <span className={styles.stepBox}>
            <div className={styles.stepNum}>3</div>
          </span>
          <div className={styles.stepWords}>
            <div>Third</div>
            <div>—————————</div>
            <div>填寫訂單資料</div>
          </div>
        </Col>
        <Col className={`${styles.step} ${styles.otherStep}`}>
          <span className={styles.stepBox}>
            <div className={styles.stepNum}>4</div>
          </span>
          <div className={styles.stepWords}>
            <div>Forth</div>
            <div>—————————</div>
            <div>最後確認</div>
          </div>
        </Col>
      </Row>
      <Row className={styles.listTitle}>
        <Col xs={11}>商品</Col>
        <Col xs={1}><span className='expand'>+</span></Col>
      </Row>
      <Row className={styles.productList}>
        <Col xs={1}><input type='checkbox' /></Col>
        <Col xs={4}>商品名稱</Col>
        <Col xs={2}>規格</Col>
        <Col xs={2}>單價</Col>
        <Col xs={2}>數量</Col>
        <Col xs={1}>小計</Col>
      </Row>
      <Row className={styles.productList}>
        <Col xs={2}><Button className={`${styles.deleteBtn}`}>刪除</Button></Col>
        <Col xs={2}>
          <select>
            <option>套用優惠券</option>
          </select>
          <div>{`共  項 , 商品小計 元`}</div>
        </Col>
      </Row>
      {/* <Row className={styles.productList}>
        <Col xs={1}><input type='checkbox'/></Col>
        <Col xs={4}>商品名稱</Col>
        <Col xs={2}>規格</Col>
        <Col xs={2}>單價</Col>
        <Col xs={2}>數量</Col>
        <Col xs={1}>小計</Col>
      </Row> */}

      <Row className={styles.listTitle}>
        <Col xs={11}>課程</Col>
        <Col xs={1}><span className='expand'>+</span></Col>
      </Row>
      <Row className={styles.productList}>
        <Col xs={3}><input type='checkbox' /></Col>
        <Col xs={3}>商品名稱</Col>
        <Col xs={3}>課程內容</Col>
        <Col xs={3}>小計</Col>
      </Row>
      <Row className={styles.productList}>
        <Col xs={2}><Button className={`${styles.deleteBtn}`}>刪除</Button></Col>
        <Col xs={2}>
          <div>{`共  項 , 課程小計 元`}</div>
        </Col>
      </Row>
    </Container>

  );
}