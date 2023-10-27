import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { BiSolidCrown } from "react-icons/bi";
import SideBar from "../../components/member/side-bar";
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import Swal from "sweetalert2";
import axios from "axios";
import { DatePicker } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { upload } from "@testing-library/user-event/dist/upload";
// import path from 'path'
// const uploadFolderPath = path.join(__dirname, '..', 'server', 'uploads');
// console.log(uploadFolderPath); 

export default function UpdateProfile() {
  const { authJWT, setAuthJWT } = useAuthJWT();
  const [profileInput, setProfileInput] = useState(authJWT.memberData);
  // 驗證信箱的正規表達式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 驗證手機號碼的正規表達式
  const taiwanPhoneNumberRegex = /^09\d{8}$/;
  const [birthday, setBirthday] = useState(new Date());

  // 抓住所有填寫的 input 內容
  const handleInputChange = (e) => {
    // 輸入後更新存放內容的物件
const { name, value } = e.target
    setProfileInput((profileInput)=>({
      ...profileInput,
      [name]: value,
    }));
  };
  useEffect(()=>{
      // console.log('this is profileInput',profileInput);
  },[profileInput])
  // 抓到生日的 Date 寫入 member 物件
  const handleBirthdateChange = (date) => {
    // 先將 data 放入 Birthday的狀態儲存
    setBirthday({ date });
    // console.log({date});
    // 轉換{date}物件的格式
    const birthdate = new Date(date);
    const year = birthdate.getFullYear();
    const month = (birthdate.getMonth() + 1).toString().padStart(2, "0");
    const day = birthdate.getDate().toString().padStart(2, "0");
    const formattedBirthdate = `${year}-${month}-${day}`;
    // console.log(formattedBirthdate);
    // 再將日期存在 member 的 birthday 屬性中
    setProfileInput({ ...profileInput, birthday: formattedBirthdate });
  };

  // 驗證 email 的正規表達式
  const handleEmailReg = (e) => {
    const emailReg = emailRegex.test(profileInput.email);
    if (!emailReg) {
      Swal.fire({
        icon: "error",
        title: "請輸入有效的信箱格式",
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: "35%",
        padding: "0 0 3.25em",
        customClass: {
          width:'shadow-sm'
        }
      });
    }
  };
  // 驗證手機號碼的正規表達式
  const handlePhoneReg = (e) => {
    const phoneReg = taiwanPhoneNumberRegex.test(profileInput.phone);
    if (!phoneReg) {
      Swal.fire({
        icon: "error",
        title: "請輸入有效的手機號碼格式",
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: "35%",
        padding: "0 0 3.25em",
        customClass: {
          width:'shadow-sm'
        }
      });
    }
  };
  const updateProfile = {
    ...authJWT,
    memberData: {
      ...authJWT.memberData,
      ...profileInput,
    },
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log(profileInput);
    delete profileInput.exp
    delete profileInput.iat
    try {
      const res = await axios.put(
        'http://localhost:3005/member/update-profile',
        profileInput,
        {
          withCredentials: true,
        }
      );
      console.log('res.data:',res.data);
      const updatedMember = res.data.updatedMember
      console.log('res.data.updatedMember:',updatedMember);
      if (res.data.message === "會員資料修改成功") {
        setAuthJWT({
          ...authJWT,
          memberData:{
            ...authJWT.memberData,
            ...updatedMember
          }
        });
        await Swal.fire({
          icon: "success",
          title: "會員資料修改成功",
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          // width: "35%",
          padding: "0 0 3.25em",
          customClass: {
            width:'shadow-sm'
          }
        });
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
//   const file = e.target.files[0]
//   if(file){
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setPreview(reader.result)
//     }
//   }
// };
  // 重新上傳頭像(選擇檔案後預覽)
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('')
  let filename;
  const handleFileChange = async (e) => {
      const file = e.target.files[0]
      if(file){
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target.result)
        }
        reader.readAsDataURL(file)
      }
      const formData = new FormData()
      console.log('file:' +file);
      formData.append('avatar', file)
      console.log('memberData:'+authJWT.memberData.id);
      formData.append('id', authJWT.memberData.id)
      console.log(formData);
      try{
        const res = await axios.put('http://localhost:3005/member/update-profile-img', formData, { withCredentials:true,
        timeout: 10000 })
      console.log(res.data);
      if(res.data.message === '圖片成功傳入後端指定資料夾'){

        console.log(res.data);
        filename = res.data.filename
        setUploaded(true)
        setUploadFileName(filename)
      }
      }catch(error){
        console.log(error);
      }
      
  };
  useEffect(()=>{
    if(uploadFileName){
        const imageUrl = `http://localhost:3005/${uploadFileName}`
        setPreview(imageUrl)
    } else {
        setPreview('')
    }
  },[uploadFileName])
  // 確定上傳圖片
  const handleUpload = async() => {
    const fileAndId = {
      filename:uploadFileName,
      id:authJWT.memberData.id
    }
    console.log(fileAndId);
    try{
      const res = await axios.put('http://localhost:3005/member/update-profile-img-confirm',fileAndId,{withCredentials:true})
      console.log(res.data);
      if(res.data.message === '圖片成功更新至資料表'){
         setAuthJWT({...authJWT,memberData:{...authJWT.memberData,member_img:uploadFileName}})
        await Swal.fire({
               icon: "success",
               title: "圖片上傳成功",
               showConfirmButton: false,
               timer: 1500,
               backdrop: `rgba(255, 255, 255, 0.55)`,
              //  width: "35%",
               padding: "0 0 3.25em",
               customClass: {
                width:'shadow-sm'
              }
             });
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <Row>
        <Col md="3" className="p-3  offset-md-1 side-bar-border-right">
          <SideBar />
        </Col>
        <Col md="7" className="p-3">
          <Container className="mobile-member-update-container">
            <div className="fs-2 mb-5">會員資料設定</div>
            <div className="d-flex justify-content-center align-items-center member-profile-img mb-5">
              <div>
                <div className="text-center">
                <div className="text-center m-auto img-object-fit">
                {uploaded? <img
                      className="avatar"
                      src={preview}
                    ></img>:<img
                      className="avatar"
                      src={authJWT.memberData.member_img === 'avatar01.jpg'?'/Duo/avatar01.jpg':`http://localhost:3005/${authJWT.memberData.member_img}`}
                    ></img>}
                </div>
                  <div>
                    <input
                    name="avatar"
                    type="file"
                    // accept="image/*"
                    onChange={handleFileChange}
                  />
                  </div>
                  <Button onClick={handleUpload} className="mt-3 px-4 update-profile-btn">
                    重新上傳頭像
                  </Button>
                </div>
              </div>
            </div>

            <Form
              onSubmit={handleUpdateProfile}
              className="upload-profile-form"
            >
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
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder={authJWT.memberData.name}
                    onChange={handleInputChange}
                  />
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
                    borderRadius="semi-square"
                    id="datePicker-19"
                    placeholder="選擇生日"
                    value={birthday.date || authJWT.memberData.birthday}
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
                  <Form.Control
                    name="email"
                    type="text"
                    placeholder={authJWT.memberData.email}
                    onBlur={handleEmailReg}
                    onChange={handleInputChange}
                  />
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
                  <Form.Control
                    name="phone"
                    type="text"
                    placeholder={authJWT.memberData.phone}
                    onBlur={handlePhoneReg}
                    onChange={handleInputChange}
                  />
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
                  <Form.Control
                    name="address"
                    type="text"
                    placeholder={authJWT.memberData.address}
                    onChange={handleInputChange}
                  />
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
  );
}
