import express from "express";
const router = express.Router();
import authenticate from "../middlewares/jwt.js";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from 'nodemailer'
import transporter from '../config/mail.js'

import {
  verifyUser,
  getUser,
  createUser,
  getCount,
  checkAccount,
  checkEmail,
  forgotPwdGetUser
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

    // 先查詢資料庫是否有同member account/password的資料
  const isMember = await verifyUser({
    account,
    password,
  })

  console.log(isMember)
 
  if(!isMember) {
    return res.json({ message: 'verifyUser fail', code: '400' })
  }

  // 會員存在，將會員的資料取出
  const member = await getUser({
    account,
    password,
  })

  console.log(member)

  // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
  delete member.password

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
    expiresIn: '24h',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie('accessToken', accessToken, { httpOnly: true })

  // 傳送access token回應(react可以儲存在state中使用)
  res.json({
    message: 'login success',
    code: '200',
    accessToken,
  })
  })

// 假資料測試區
// if(account === 'abc' && password === '123'){

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
//   // res.json({ message: 'success', code: '200' })
//   // 產生存取令牌(access token)，其中包含會員資料
// const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
//   expiresIn: '24h',
// })

// // 使用httpOnly cookie來讓瀏覽器端儲存access token
// res.cookie('accessToken', accessToken, { httpOnly: true })

// // 傳送access token回應(react可以儲存在state中使用)
// res.json({
//   message: 'login success',
//   code: '200',
//   accessToken,
//   // isAuth:true,
//   // memberData:member
// })
// }

// 登出 -------------------------------------------------------
router.post("/logout", authenticate, (req, res) => {
  // 清除cookie
  cookieParser()(req, res, () => {
    res.clearCookie("accessToken", { httpOnly: true });

    res.json({ message: "success", code: "200" });
  });
});

router.post("/logout-ssl-proxy", authenticate, (req, res) => {
  // 清除cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "success", code: "200" });
});

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
    const created_at = currentDateTime.toISOString();
    member.created_at = created_at
    const newMember = await createUser(member);
    if (!newMember.insertId) {
      return res.json({ message: "fail", code: "400" });
    }
    // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
    delete newMember.password;

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
  from: `"yoibow"<${process.env.SMTP_TO_EMAIL}>`,
  to: 'k7891532002@gmail.com',
  subject: '這是一封測試電子郵件',
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
export default router;
