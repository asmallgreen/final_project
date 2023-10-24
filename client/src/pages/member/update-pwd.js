import React, {useState, useEffect} from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import SideBar from '../../components/member/side-bar'
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthJWT } from '@/hooks/use-auth-jwt';


export default function UpdatePwd() {
    const {authJWT, setAuthJWT} = useAuthJWT()
    const [newPassword, setNewPassword] = useState({
        newPassword:'',
        reNewPassword:'',
        id:authJWT.memberData.id
    })
    useEffect(()=>{
        setNewPassword({...newPassword,id:authJWT.memberData.id
        })
    },[])
    console.log('id:',newPassword);
    const handleInputChange = (e) => {
        setNewPassword({...newPassword,[e.target.name]:e.target.value})
    }
    // console.log(newPassword);
    const handleNewPwdSubmit = async (e) => {
        e.preventDefault()
        if(newPassword.newPassword !== newPassword.reNewPassword){
            await Swal.fire({
                icon: 'error',
                title: '密碼輸入不一致',
                showConfirmButton: false,
                timer: 1500,
                backdrop: `rgba(255, 255, 255, 0.55)`,
                // width: '35%',
                padding: '0 0 3.25em',
                customClass: {
                    width:'shadow-sm'
                  }
              })
              return
        }
        try{
            const res = await axios.put('http://localhost:3005/member/update-pwd',newPassword,{withCredentials:true})
            console.log(res.data);
            if(res.data.message === '密碼修改成功'){
                await Swal.fire({
                    icon: 'success',
                    title: '密碼修改成功',
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: `rgba(255, 255, 255, 0.55)`,
                    // width: '35%',
                    padding: '0 0 3.25em',
                    customClass: {
                        width:'shadow-sm'
                      }
                  })
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
<Container className='my-5'>
                <div className="fs-2 mb-5">修改密碼</div>
                <Form className="ms-3 update-pwd-form" onSubmit={handleNewPwdSubmit}>
                    
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextPassword"
                    >
                        <Form.Label column sm="3">
                            新密碼
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="新密碼" name='newPassword' onChange={handleInputChange}/>
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
                            <Form.Control type="password" placeholder="再次輸入新密碼" name="reNewPassword" onChange={handleInputChange}/>
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
