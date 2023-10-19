import express from 'express'
const router = express.Router()

import { findOne, insertOne, count } from '../models/base.js'

import jsonwebtoken from 'jsonwebtoken'
// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

router.post('/jwt', async function (req, res, next) {
  //get providerData
  const providerData = req.body

  console.log(JSON.stringify(providerData))

  // 檢查從react來的資料
  if (!providerData.providerId || !providerData.uid) {
    return res.json({ message: '找不到前端傳入的資料', code: '400' })
  }

  // 以下流程:
  // 1. 先查詢資料庫是否有同google_uid的資料
  // 2-1. 有存在 -> 執行登入工作
  // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作

  const isFound = await count('member', { google_uid: providerData.uid })

  if (isFound) {
    // 有存在 -> 執行登入工作
    const member = await findOne('member', { google_uid: providerData.uid })

    // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
    delete member.password

    // 產生存取令牌(access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
      expiresIn: '24h',
    })

    // 使用httpOnly cookie來讓瀏覽器端儲存access token
    res.cookie('accessToken', accessToken, { httpOnly: true })

    // 傳送access token回應(react可以儲存在state中使用)
    return res.json({
      message: 'google登入成功',
      code: '200',
      accessToken,
    })
  } else {
    // 3. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作
    // 抓到當下時間
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // 月份從0開始，需要加1，並且補零
    const day = String(currentDateTime.getDate()).padStart(2, '0'); // 日需要補零
    const hours = String(currentDateTime.getHours()).padStart(2, '0'); // 小時需要補零
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0'); // 分鐘需要補零
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0'); // 秒需要補零
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const newMember = {
      name: providerData.displayName,
      email: providerData.email,
      google_uid: providerData.uid,
      photo_url: providerData.photoURL,
      created_at:formattedDateTime
    }
    await insertOne('member', newMember)

    const member = await findOne('member', { google_uid: providerData.uid })

    // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
    delete member.password

    // 產生存取令牌(access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
      expiresIn: '24h',
    })

    // 使用httpOnly cookie來讓瀏覽器端儲存access token
    res.cookie('accessToken', accessToken, { httpOnly: true })

    // 傳送access token回應(react可以儲存在state中使用)
    return res.json({
      message: 'google登入成功',
      code: '200',
      accessToken,
    })
  }
})


export default router