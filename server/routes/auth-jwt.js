import express from "express";
const router = express.Router();
import authenticate from "../middlewares/jwt.js";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from 'nodemailer'
import transporter from '../config/mail.js'
import multer from 'multer'

// 定義頭像上傳後存放的地方
const storage = multer.diskStorage({
  destination: function (req, file, cb) {


    console.log('step 1: destination');
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    console.log('step 2: filename');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix); // 使用唯一的檔案名稱
    console.log(file.fieldname);
  }
})
const upload = multer({storage:storage})
import {
  verifyUser,
  getUser,
  createUser,
  getCount,
  checkAccount,
  checkEmail,
  forgotPwdGetUser,
  getUserByAccount,
  updateUserById,
} from "../models/members.js";

// 存取`.env`設定檔案使用
import "dotenv/config.js";
import cookieParser from "cookie-parser";
// Argon2 用來加密寫入資料庫的密碼
import argon2 from "argon2";
import { isEmpty } from "../utils/tool.js";

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
// const accessTokenSecret = 'thisisasecretkey'


//--------------------------------------------------------
router.get("/private", authenticate, (req, res) => {
  const memberData = req.member;
  return res.json({ message: "authorized", memberData });
});

// 檢查登入狀態用 -----------------------------------------------
router.get("/check-login", authenticate, async (req, res) => {
  const memberData = req.member;
  return res.json({ message: "authorized", memberData });
});

// 登入頁面 -----------------------------------------------------
router.post("/login", async (req, res) => {
  // res.send("後端登入頁")
  const { account, password } = req.body
  try {
    // 先檢查資料庫有沒有這個帳號
    const user = await checkAccount({ account });

    if (!user) {
      return res.json({ message: '帳號不存在', code: '400' });
    }else{
      const member = await getUserByAccount({account})
      // 使用 argon2.verify 驗證使用者輸入的密碼是否匹配
    const isPasswordValid = await argon2.verify(member.password, password);

    if (isPasswordValid) {
      console.log('密碼驗證成功！');
      // 成功驗證就執行登入成功的邏輯(生成JWT並跳轉)
      delete member.password
       // 產生存取令牌(access token)，其中包含會員資料
      const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
        expiresIn: '24h',
      })

      // 使用httpOnly cookie來讓瀏覽器端儲存access token
      res.cookie('accessToken', accessToken, { httpOnly: true })

      // 傳送access token回應(react可以儲存在state中使用)
      return res.json({
        message: 'login success',
        code: '200',
        accessToken,
      })
    } else {
      console.log('密碼驗證失敗！');
      return res.json({ message: '密碼驗證失敗', code: '401' });
    }
    }
  } catch (error) {
    console.error('登入錯誤：', error);
    return res.status(500).json({ message: '伺服器出現錯誤', code: '500' });
  }
  // // 先查詢資料庫是否有同member account/password的資料
  // const isMember = await verifyUser({
  //   account,
  //   password,
  // })

  // console.log(isMember)

  // if (!isMember) {
  //   return res.json({ message: 'fail', code: '400' })
  // }

// // 會員存在，將會員的資料取出
// const member = {
//   id: 1,
//   account,
//   password,
//   name: '怡君',
//   email: 'luna@gmail.com',
//   level: '2',
//   created_date: '2023-08-21',
// }

// // console.log(member)

  // // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
  // delete member.password

  // // // 產生存取令牌(access token)，其中包含會員資料
  // // const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
  // //   expiresIn: '24h',
  // // })

  // // // 使用httpOnly cookie來讓瀏覽器端儲存access token
  // // res.cookie('accessToken', accessToken, { httpOnly: true })

  // // // 傳送access token回應(react可以儲存在state中使用)
  // // res.json({
  // //   message: 'success',
  // //   code: '200',
  // //   accessToken,
  // // })
  })


// 登出 -------------------------------------------------------
  router.post('/logout', authenticate, (req, res) => {
    // 清除cookie
    cookieParser()(req, res, ()=>{
    res.clearCookie('accessToken', { httpOnly: true })
  
    res.json({ message: 'success', code: '200' })      
    })

  })
  
  router.post('/logout-ssl-proxy', authenticate, (req, res) => {
    // 清除cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
  
    res.json({ message: 'success', code: '200' })
  })
  
// 註冊頁面 --------------------------------------------------
router.post("/register", async (req, res) => {
  console.log("使用者填入的註冊資料:", req.body);
  // 先檢查帳號跟信箱是否已註冊過
  const member = req.body;
  // 檢查是否為空物件
  if (isEmpty(member)) {
    return res.json({ message: "member is empty", code: "400" });
  }

  // 檢查帳號及信箱是否已註冊過
  const checkAccount = await getCount({ account: member.account });
  if (checkAccount) {
    return res.json({ message: "帳號已有人使用", code: "400" });
  }
  const checkEmail = await getCount({ email: member.email });
  if (checkEmail) {
    return res.json({ message: "信箱已被註冊過", code: "400" });
  }
  // 檢查完存入資料庫
  try {
    delete member.repassword;
    const hashedPassword = await argon2.hash(member.password);
    member.password = hashedPassword;
    // 抓到當下時間
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // 月份從0開始，需要加1，並且補零
    const day = String(currentDateTime.getDate()).padStart(2, '0'); // 日需要補零
    const hours = String(currentDateTime.getHours()).padStart(2, '0'); // 小時需要補零
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0'); // 分鐘需要補零
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0'); // 秒需要補零

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    member.created_at = formattedDateTime
    const newMember = await createUser(member);
    if (!newMember.insertId) {
      return res.json({ message: "fail", code: "400" });
    }
    // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
    delete newMember.password;
    console.log(newMember);
    // 產生存取令牌(access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign(
      { ...newMember, id: newMember.insertId },
      accessTokenSecret,
      {
        expiresIn: "24h",
      }
    );

    // 使用httpOnly cookie來讓瀏覽器端儲存access token
    res.cookie("accessToken", accessToken, { httpOnly: true });

    // 傳送access token回應(react可以儲存在state中使用)
    res.json({
      message: "register success",
      code: "200",
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
  // 註冊成功後讓使用者直接進入登入狀態
});

// 忘記密碼 ------------------------------------------------------
router.post('/forgotpwd', async(req, res)=>{
  console.log('使用者填入的忘記密碼資料:',req.body)
  const { account, email } = req.body
  const isMemberAccount = await checkAccount(
    {account}
  )
  console.log(isMemberAccount);
if(!isMemberAccount){
  return res.json({ message: 'no account', code: '400' })
}
  const isMemberEmail = await checkEmail(
    {email}
  )
  console.log(isMemberEmail);

  if(!isMemberEmail){
    return res.json({ message: 'no email', code: '400' })
  }
  const isMember = await forgotPwdGetUser({account, email})
  console.log(isMember);
  if(!isMember){
    return res.json({message:'信箱和帳號不匹配', code:'400'})
  }

const mailOptions = {
  from: `"良弓製販所"<${process.env.SMTP_TO_EMAIL}>`,
  to: 'k7891532002@gmail.com',
  subject: '良弓製販所-重新設定密碼',
  // html: `
  // <div>
  //     <a href=${process.env.FRONTEND_URL}/resetPassword/${mail}>請點此處重置密碼</a>
  //     <p>或是直接複製下列網址貼到瀏覽器上重置密碼</p>
  //     <span>${process.env.FRONTEND_URL}/resetPassword/${mail}</span>
  // </div>
  //     `,
}

// 寄送
transporter.sendMail(mailOptions, (err, response) => {
  if (err) {
    // 失敗處理
    return res.status(400).json({ message: 'Failure', detail: err })
  } else {
    // 成功回覆的json
    return res.json({ message: 'Success sending' })
  }
})

// 使用 nodemailer
// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   auth:{
//     user:'k7891532002@gmai.com',
//     pass:''
//   }
// })


// 忘記密碼寄發驗證信
// router.get('/send', function (req, res, next) {
//   // email內容
//   const mailOptions = {
//     from: `"yoibow"<${process.env.SMTP_TO_EMAIL}>`,
//     to: mail,
//     subject: '這是一封測試電子郵件',
//     text: `你好， \r\n通知你有關第一封郵件的事。\r\n\r\n敬上\r\n開發團隊`,
//   }

//   // 寄送
//   transporter.sendMail(mailOptions, (err, response) => {
//     if (err) {
//       // 失敗處理
//       return res.status(400).json({ message: 'Failure', detail: err })
//     } else {
//       // 成功回覆的json
//       return res.json({ message: 'Success sending' })
//     }
//   })
// })
})
// 確定上傳頭像
router.put('/update-profile-img-confirm', async(req, res)=>{
  console.log('確定要上傳的檔名與id：',req.body);
    const member = {member_img: req.body.filename}
    const id = req.body.id
    const result = await updateUserById(member,id)
    console.log(result);
  res.json({message:'圖片成功更新至資料表', code:'200'})
})
// 修改會員頭像(選擇檔案並預覽)
router.put('/update-profile-img', upload.single('avatar'), async (req, res)=>{
  console.log('step 3: entering router');
  console.log((req.file, req.body));

  if(req.file){
    console.log('step 4: file upload successfully');
    console.log('req.file',req.file);
    // console.log('req.body',req.body);
    const filename = req.file.filename
    
    return res.json({message:'圖片成功傳入後端指定資料夾', code:'200', filename})
  } else {
    console.log('step 5: file upload failed');
    console.log('檔案傳入失敗');
    return res.json({message:'檔案傳入失敗', code:'409'})
  }
})

// 修改會員密碼
router.put('/update-pwd', async (req, res)=>{
  console.log(req.body);
  delete req.body.reNewPassword;
  const hashedPassword = await argon2.hash(req.body.newPassword);
  const id = req.body.id
  const newPassword = {password:hashedPassword}
  const result = await updateUserById(newPassword,id)
  res.json({message:'密碼修改成功', code:'200'})
  
})

// 修改會員資料
router.put('/:memberId', async (req, res)=>{
  const memberId = req.params.memberId
  const member = req.body
  console.log(memberId, member);

  // 檢查有沒有在網址上抓到 memberId
  // 如果為空物件則失敗
  if(!memberId || isEmpty(member)){
    return res.json({message:'抓不到會員ID或是空物件', code:'400'})
  }

  // 檢查從 react 來的資料，那些資料是必要的(name, account...)
  console.log(member);

  // 對資料庫執行update
  const result = await updateUserById(member, memberId)
  console.log(result);

  if(!result.affectedRows){
    return res.json({message:'會員資料修改失敗', code:'400'})
  }
  // 更新成功
  return res.json({message:'會員資料修改成功', code:'400'})
})



export default router;