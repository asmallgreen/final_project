import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { BiSolidCrown } from 'react-icons/bi';
import SideBar from '../../components/member/side-bar'
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import Swal
from 'sweetalert2';
import axios from 'axios';
import { DatePicker } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
// 上傳會員頭像
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';


export default function UpdateProfile() {
    const {authJWT, setAuthJWT} = useAuthJWT()
    const [profileInput, setProfileInput] = useState({
        name: '',
        birthday:'',
        email:'',
        phone:'',
        address:'',
    })
    // 驗證信箱的正規表達式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 驗證手機號碼的正規表達式
  const taiwanPhoneNumberRegex = /^09\d{8}$/;
  const [birthday, setBirthday] = useState(new Date())

    // 抓住所有填寫的 input 內容
    const handleInputChange = (e) => {
        // 輸入後更新存放內容的物件
        setProfileInput({
            ...profileInput,
            [e.target.name]: e.target.value,
        })
    }
    // 抓到生日的 Date 寫入 member 物件
  const handleBirthdateChange = (date) => {
    // 先將 data 放入 Birthday的狀態儲存
    setBirthday({date})
    // console.log({date});
    // 轉換{date}物件的格式
    const birthdate = new Date(date)
    const year = birthdate.getFullYear()
    const month = (birthdate.getMonth() + 1).toString().padStart(2, "0");
    const day = birthdate.getDate().toString().padStart(2, "0");
    const formattedBirthdate = `${year}-${month}-${day}`
    // console.log(formattedBirthdate);
    // 再將日期存在 member 的 birthday 屬性中
    setProfileInput({ ...profileInput, birthday: formattedBirthdate });
  };

    // 驗證 email 的正規表達式
    const handleEmailReg =(e)=>{
        const emailReg = emailRegex.test(profileInput.email)
        if(!emailReg){
          Swal.fire({
          icon: "error",
          title: "請輸入有效的信箱格式",
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: "35%",
          padding: "0 0 3.25em",
          customClass: {
            popup: "shadow-sm",
          },
        });}
      }
      // 驗證手機號碼的正規表達式
  const handlePhoneReg =(e)=>{
    const phoneReg = taiwanPhoneNumberRegex.test(profileInput.phone)
    if(!phoneReg){
      Swal.fire({
      icon: "error",
      title: "請輸入有效的手機號碼格式",
      showConfirmButton: false,
      timer: 1500,
      backdrop: `rgba(255, 255, 255, 0.55)`,
      width: "35%",
      padding: "0 0 3.25em",
      customClass: {
        popup: "shadow-sm",
      },
    });}
  }
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.put(
                `http://localhost:3005/member/${authJWT.memberData.id}`,
                profileInput,
                {
                  withCredentials: true,
                }
              );
              await Swal.fire({
                icon: 'success',
                title: '會員資料修改成功',
                showConfirmButton: false,
                timer: 1500,
                backdrop: `rgba(255, 255, 255, 0.55)`,
                width: '35%',
                padding: '0 0 3.25em',
                customClass: {
                  popup: 'shadow-sm',
                },
              })
              console.log(res.data);
        }catch(error){
            console.log(error);
        }
    }

// 重新上傳頭像
const [fileList, setFileList] = useState([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: '/Duo/avatar01.jpg',
  },])
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };


  return (
    <>
  <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
<Container className="my-5">
                <div className="fs-2 mb-5">會員資料設定</div>
                {/* <div className="d-flex justify-content-center align-items-center member-profile-img">
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
                </div> */}
                <div className="text-center member-profile-img">
                                    <ImgCrop rotationslider>
                    <Upload
                    action='http://localhost:3005/member/update-profile-img'
                    listType='picture-card'
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ upload'}
                    </Upload>
                </ImgCrop>
                </div>

                <Form onSubmit={handleUpdateProfile} className='upload-profile-form'>
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
                                value={authJWT.memberData.account}
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
                            <Form.Control name='name' type="text" placeholder={authJWT.memberData.name} 
                                onChange={handleInputChange}/>
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
                            {/* <Form.Control name='birthday' type="text" placeholder={authJWT.memberData.birthday} /> */}
                            <DatePicker
                borderRadius='semi-square'
            id="datePicker-19"
            placeholder="選擇生日"
            value={birthday.date}
            onChange={handleBirthdateChange}
            icon={<FontAwesomeIcon icon={faCalendar} />}
        />
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
                            <Form.Control name='email' type="text" placeholder={authJWT.memberData.email} onBlur={handleEmailReg} 
                                onChange={handleInputChange}/>
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
                            <Form.Control name='phone' type="text" placeholder={authJWT.memberData.phone} onBlur={handlePhoneReg} 
                                onChange={handleInputChange}/>
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
                            <Form.Control name='address' type="text" placeholder={authJWT.memberData.address} 
                                onChange={handleInputChange}/>
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
</Col>

</Row>

    </>
  )
}