import express from 'express'
const router = express.Router()

import authenticate from '../middlewares/jwt.js'
import jsonwebtoken from 'jsonwebtoken'

import { verifyUser, getUser } from '../models/members.js'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'
import cookieParser from 'cookie-parser'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// const accessTokenSecret = 'thisisasecretkey'



router.get('/private', authenticate, (req, res) => {
  const memberData = req.member
  return res.json({ message: 'authorized', memberData })
})

// 檢查登入狀態用 -----------------------------------------------
router.get('/check-login', authenticate, async (req, res) => {
    const memberData = req.member
    return res.json({ message: 'authorized', memberData})
  })
  

// 登入頁面 -----------------------------------------------------
router.post('/login', async (req, res) => {
  // res.send("後端登入頁")
  // console.log(req.body)
  // 從要求的req.body獲取member account與password
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
  router.post('/register', async (req, res)=>{
    // 先檢查帳號跟信箱是否已註冊過
    // 檢查帳號使否已註冊
    console.log('使用者填入的註冊資料:', req.body);
    const checkAccount = await checkAccount(req.body.account)
    if(!checkAccount){
      return res.json({ message: 'account is used', code: '400' })
    }
    const checkEmail = await checkEmail(req.body.email)
    if(!checkEmail){
      return res.json({ message: 'email is used', code: '400' })
    }
    // const member = await createUser(req.body)
    // 檢查信箱是否已註冊

    // 檢查完存入資料庫

    // 註冊成功後讓使用者直接進入登入狀態
  })

 

export default router