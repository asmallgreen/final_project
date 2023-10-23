import express from "express";
const router = express.Router();
import authenticate from "../middlewares/jwt.js";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from 'nodemailer'
import transporter from '../config/mail.js'
import multer from 'multer'
import { createOtp, updatePassword } from '../models/otp.js'
import 'dotenv/config.js'
import { executeQuery } from '../models/base.js'

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
  getUserById,
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
    if(!account){
      return res.json({ message: '請輸入帳號', code: '400' });
    }
    const user = await checkAccount({ account });

    if (!user) {
      return res.json({ message: '帳號不存在', code: '400' });
    }else{
      const member = await getUserByAccount({account})
      // 使用 argon2.verify 驗證使用者輸入的密碼是否匹配
      // 使用註冊時設定的 Argon2 加密哈希參數
      const options = {
      timeCost: 4, // 迭代次數
      memoryCost: 2 ** 16, // 内存成本（以字節為單位）
      parallelism: 1, // 並行性參數
      };
    const isPasswordValid = await argon2.verify(member.password, password, options);

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
    // Argon2 使用的加密哈希參數
    const options = {
    timeCost: 4, // 迭代次數
    memoryCost: 2 ** 16, // 内存成本（以字節為單位）
    parallelism: 1, // 並行性參數
    };
    const hashedPassword = await argon2.hash(member.password,options);
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
    const account = member.account
    const createNewMember = await createUser(member);
    console.log('createNewMember',createNewMember);
    if (!createNewMember.insertId) {
      return res.json({ message: "fail", code: "400" });
    }
    
    const newMember = await getUserByAccount({account})
    // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
    delete newMember.password;
    console.log('newMember',newMember);
    // 產生存取令牌(access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign(
      newMember,
      accessTokenSecret,
      {
        expiresIn: "24h",
      }
    );
    console.log('second newMember',newMember);

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
// 電子郵件文字訊息樣版
const mailText = (otpToken) => `親愛的會員 您好，
以下為重設密碼所需要的驗証碼，
請在重設密碼頁面的"電子郵件驗証碼"欄位中輸入下方的OTP驗證碼，。
請注意驗証碼將於寄送後30分鐘後到期，如有任何問題請洽網站客服人員:
    
您的OTP驗證碼為：
${otpToken}
    
敬上

良弓制販所`

// create otp
router.post('/otp', async (req, res) => {
  const { email } = req.body

  if (!email) return res.json({ message: '請輸入正確註冊信箱', code: '400' })
  const member = await checkEmail({ email })
  if (!member) return res.json({ message: '此信箱並未註冊過', code: '400' })

  // 建立otp資料表記錄，成功回傳otp記錄物件，失敗為空物件{}
  const otp = await createOtp(email)

  if (!otp.token) return res.json({ message: 'OTP碼輸入錯誤', code: '400' })

  // 寄送email
  const mailOptions = {
    // 這裡要改寄送人名稱，email在.env檔中代入
    from: `"良弓製販所"<${process.env.SMTP_TO_EMAIL}>`,
    to: email,
    subject: '良弓製販所-會員重設密碼驗証信',
    text: mailText(otp.token),
  }
  const token = otp.token 
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      return res.status(400).json({ message: 'email fail', detail: err })
      console.log(err);
    } else {
      // 成功回覆的json
      return res.json({ message: 'OTP驗證信已寄出', code: '200',token })
    }
  })
})

// 重設密碼用
router.post('/resetpassword', async (req, res, next) => {
  const { email, token, newPassword } = req.body
  // 使用 argon2.verify 驗證使用者輸入的密碼是否匹配
  // 使用註冊時設定的 Argon2 加密哈希參數
  const options = {
    timeCost: 4, // 迭代次數
    memoryCost: 2 ** 16, // 内存成本（以字節為單位）
    parallelism: 1, // 並行性參數
  };
  const argon2Password = await argon2.hash(newPassword,options)
  if (!token) return res.json({ message: '請確認token已正確輸入', code: '400' })

  // updatePassword中會驗証otp的存在與合法性(是否有到期)
  const result = await updatePassword(email, token, argon2Password)

  if (!result) return res.json({ message: '後端路由 /resetpassword 失敗', code: '400' })

  return res.json({ message: '成功修改密碼', code: '200' })
})

// 確定上傳頭像
router.put('/update-profile-img-confirm', async(req, res)=>{
  console.log('確定要上傳的檔名與id：',req.body);
  if(!req.body){
    res.json({message:'請選擇檔案', code:'400'})
  }
    const member = {member_img: req.body.filename}
    const id = req.body.id
    const result = await updateUserById(member,id)
    console.log(result);
    const updatedMember = await getUserById(id)
    // 先清除原本的cookie
    cookieParser()(req, res, ()=>{
      res.clearCookie('accessToken', { httpOnly: true })     
      })
      const accessToken = jsonwebtoken.sign({ ...updatedMember }, accessTokenSecret, {
        expiresIn: '24h',
      })
    
      // 使用httpOnly cookie來讓瀏覽器端儲存access token
      res.cookie('accessToken', accessToken, { httpOnly: true })
  res.json({message:'圖片成功更新至資料表', code:'200',accessToken})
})
// 修改會員頭像(選擇檔案並預覽)
router.put('/update-profile-img', upload.single('avatar'), async (req, res)=>{
  // console.log('step 3: entering router');
  console.log((req.file, req.body));

  if(req.file){
    // console.log('step 4: file upload successfully');
    console.log('req.file',req.file);
    // console.log('req.body',req.body);
    const filename = req.file.filename
    
    return res.json({message:'圖片成功傳入後端指定資料夾', code:'200', filename})
  } else {
    // console.log('step 5: file upload failed');
    console.log('檔案傳入失敗');
    return res.json({message:'檔案傳入失敗', code:'409'})
  }
})

// 修改會員密碼
router.put('/update-pwd', async (req, res)=>{
  console.log(req.body);
  delete req.body.reNewPassword;
  // 使用 argon2.verify 驗證使用者輸入的密碼是否匹配
  // 使用註冊時設定的 Argon2 加密哈希參數
  const options = {
    timeCost: 4, // 迭代次數
    memoryCost: 2 ** 16, // 内存成本（以字節為單位）
    parallelism: 1, // 並行性參數
  };
  const hashedPassword = await argon2.hash(req.body.newPassword, options);
  const id = req.body.id
  const newPassword = {password:hashedPassword}
  const result = await updateUserById(newPassword,id)
  res.json({message:'密碼修改成功', code:'200'})
  
})

// 修改會員資料
router.put('/update-profile', async (req, res)=>{
  const member = req.body
  console.log(member);

  // 檢查有沒有在網址上抓到 memberId
  // 如果為空物件則失敗
  if(!member.id || isEmpty(member)){
    return res.json({message:'抓不到會員ID或是空物件', code:'400'})
  }

  // 檢查從 react 來的資料，那些資料是必要的(name, account...)
  console.log(member);
  const id = member.id
  // 對資料庫執行update
  const result = await updateUserById(member, id)
  console.log(result);
  const updatedMember = await getUserById(id)

  if(!result.affectedRows){
    return res.json({message:'會員資料修改失敗', code:'400'})
  }
  // 先清除原先的 token
      // 清除cookie
    cookieParser()(req, res, ()=>{
    res.clearCookie('accessToken', { httpOnly: true })   
    })

  const accessToken = jsonwebtoken.sign({ ...updatedMember }, accessTokenSecret, {
    expiresIn: '24h',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie('accessToken', accessToken, { httpOnly: true })

  // 更新成功
  return res.json({message:'會員資料修改成功', code:'400', accessToken,updatedMember})
})

// 會員商品收藏---------------------------------------------------------
// 先抓到關聯資料表中的商品id
router.get('/favorite-product-id', authenticate, async (req, res, next) => {
  const sql = `SELECT f.product_id
        FROM fav_product AS f
        WHERE f.member_id = ${req.member.id}
        ORDER BY f.product_id ASC;`

  const { rows } = await executeQuery(sql)
  // 將結果中的product_id取出變為一個純資料的陣列
  const favoriteProducts = rows.map((v) => v.product_id)

  res.json({ favoriteProducts })
})
// 再去產品資料表拿收藏的商品資料

router.get('/fav-products', authenticate, async (req, res, next) => {
  const member = req.member
  const mid = member.id

  const sql = `SELECT p.*
FROM product AS p
    INNER JOIN fav_product AS f ON f.product_id = p.id
    AND f.member_id = ${mid}
ORDER BY p.id ASC`

  const { rows } = await executeQuery(sql)

  // console.log(rows)

  res.json({ products: rows })
})
// 刪除收藏的商品
router.delete('/:pid', authenticate, async (req, res, next) => {
  const pid = req.params.pid
  // console.log('pid:',pid);
  const memberId = req.body.memberId
  // console.log('這是memberId',memberId);
  // console.log('刪除收藏商品的 res.body',res.body);
  // console.log('刪除收藏商品的 res.params',res.params);

  // return res.json({ message: '刪除點擊後有傳到後端', code: '200' })
  const sql = `DELETE FROM fav_product WHERE product_id IN (${pid}) AND member_id=${memberId}; `

  const { rows } = await executeQuery(sql)

  // console.log(rows.affectedRows)

  if (rows.affectedRows) {
    return res.json({ message: '已取消收藏', code: '200' })
  } else {
    return res.json({ message: '取消收藏失敗', code: '400' })
  }
})
// 新增收藏的商品
router.put('/:pid', authenticate, async (req, res, next) => {
  const pid = req.params.pid
  const memberId = req.body.memberId
  // console.log('這是memberId',memberId);
  // const member = req.member
  // const mid = member.id
  // console.log('新增商品req.params:',req.params);
  // return res.json({ message: '新增點擊後有傳到後端', code: '200' })
  const sql = `INSERT INTO fav_product (member_id, product_id) VALUES (${memberId}, ${pid})`

  const { rows } = await executeQuery(sql)

  // console.log(rows.affectedRows)

  if (rows.affectedRows) {
    return res.json({ message: '商品收藏成功', code: '200' })
  } else {
    return res.json({ message: '商品收藏失敗', code: '400' })
  }
})
// 會員課程收藏---------------------------------------------------------
// 先抓到關聯資料表中的課程id
router.get('/favorite-course-id', authenticate, async (req, res, next) => {
  const sql = `SELECT f.course_id
        FROM fav_course AS f
        WHERE f.member_id = ${req.member.id}
        ORDER BY f.course_id ASC;`

  const { rows } = await executeQuery(sql)
  // 將結果中的course_id取出變為一個純資料的陣列
  const favoriteCourses = rows.map((v) => v.course_id)

  res.json({ favoriteCourses })
})
// 再去產品資料表拿收藏的商品資料
router.get('/fav-courses', authenticate, async (req, res, next) => {
  const member = req.member
  const mid = member.id

  const sql = `SELECT c.*
FROM course AS c
    INNER JOIN fav_course AS fc ON fc.course_id = c.id
    AND fc.member_id = ${mid}
ORDER BY c.id ASC`

  const { rows } = await executeQuery(sql)

  // console.log(rows)

  res.json({ courses: rows })
})
// 刪除收藏的課程
router.delete('/course/:cid', authenticate, async (req, res, next) => {
  const cid = req.params.cid
  const memberId = req.body.memberId
  // console.log('這是memberId',memberId);
  // console.log('刪除收藏課程的 res.body',res.body);
  // console.log('刪除收藏課程的 res.params',res.params);

  // return res.json({ message: '刪除課程收藏點擊後有傳到後端', code: '200' })
  const sql = `DELETE FROM fav_course WHERE course_id IN (${cid}) AND member_id=${memberId}; `

  const { rows } = await executeQuery(sql)

  // console.log(rows.affectedRows)

  if (rows.affectedRows) {
    return res.json({ message: '已取消收藏', code: '200' })
  } else {
    return res.json({ message: '取消收藏失敗', code: '400' })
  }
})
// 新增收藏的課程
router.put('/course/:cid', authenticate, async (req, res, next) => {
  const cid = req.params.cid
  const memberId = req.body.memberId
  // console.log('這是memberId',memberId);
  // const member = req.member
  // const mid = member.id
  // console.log('新增課程req.params:',req.params);
  // return res.json({ message: '新增課程收藏點擊後有傳到後端', code: '200' })
  const sql = `INSERT INTO fav_course (member_id, course_id) VALUES (${memberId}, ${cid})`

  const { rows } = await executeQuery(sql)

  // console.log(rows.affectedRows)

  if (rows.affectedRows) {
    return res.json({ message: '課程收藏成功', code: '200' })
  } else {
    return res.json({ message: '課程收藏失敗', code: '400' })
  }
})
export default router;