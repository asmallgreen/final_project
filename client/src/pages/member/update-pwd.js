import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import SideBar from '../../components/member/side-bar'

export default function UpdatePwd() {
    return (
        <>
            <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
<Container className='my-5'>
                <div className="fs-2 mb-5">修改密碼</div>
                <Form className="ms-3">
                    
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="3">
                            新密碼
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="新密碼" />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="3">
                            再次輸入新密碼
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="再次輸入新密碼" />
                        </Col>
                    </Form.Group>
                    
                    <div className="text-end">
                    <Button variant="primary" type="submit" className="update-profile-btn">
                        確定修改密碼
                    </Button>                        
                    </div>

                </Form>
            </Container>
</Col>

</Row>
        </>
    );
}
