import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 獲得加密用字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// const accessTokenSecret = 'thisisasecretkey'


// 中介軟體middleware，用於檢查是否在認証情況下
export default function authenticate(req, res, next) {
  //const token = req.headers['authorization']
cookieParser()(req, res, ()=>{
    const token = req.cookies.accessToken
    //   console.log(token)
    
      // if no token
      if (!token) {
        return res.json({ message: '沒有登入驗證token Forbidden', code: '403' })
      }
    
      if (token) {
        // verify的callback會帶有decoded payload(解密後的有效資料)就是user的資料
        jsonwebtoken.verify(token, accessTokenSecret, (err, member) => {
          if (err) {
            return res.json({ message: '登入token有問題 Forbidden', code: '403' })
          }
    
          // 將user資料加到req中
          req.member = member
          next()
        })
      } else {
        return res.json({ message: 'Unauthorized', code: '401' })
      }
})
}