import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

export default function UpdateProfile() {
    return (
        <>
            <Container className="my-5">
                <div className="fs-2 mb-5">會員資料設定</div>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <div className="text-center">
                            <img
                                className="avatar d-block"
                                src="/Duo/avatar01.jpg"
                            ></img>
                            <Button className="mt-3 px-4 update-profile-btn">
                                重新上傳頭像
                            </Button>
                        </div>
                        <div className="mt-5"></div>
                    </div>
                </div>
                <Form>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label column sm="2">
                            會員帳號
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                placeholder="會員帳號"
                                disabled
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="2">
                            會員姓名
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="會員姓名" />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="2">
                            生日
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="會員生日" />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="會員Email" />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="2">
                            電話
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="會員電話" />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="2">
                            地址
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="會員地址" />
                        </Col>
                    </Form.Group>
                    <div className="text-end">
                        <Button
                            variant="primary"
                            type="submit"
                            className="update-profile-btn"
                        >
                            送出修改
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}
