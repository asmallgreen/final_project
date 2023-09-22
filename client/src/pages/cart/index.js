import React from 'react'
import styles from './cart.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap css
import { Container, Row, Col} from 'react-bootstrap';  // import bootstrap components

export default function Index() {
  return (
    
    <Container fluid>
    <div className={styles.main}>
      <Row className={styles.stepBar}>
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
      <div className={styles.listTitle}>
        <div><span>商品</span></div>
        <div>+</div>
      </div>
      <div className={styles.listTitle}>
        <div><span>課程</span></div>
        <div>+</div>
      </div>
    </div>
    </Container>
    
  );
}