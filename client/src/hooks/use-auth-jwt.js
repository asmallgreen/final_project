import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContextJWT = createContext(null)

export const AuthProviderJWT = ({ children }) => {
    const [authJWT , setAuthJWT] = useState({
        isAuth: false,
        memberData: {
            id: 0,
            account: '',
            name: '',
            email: '',
            level: '',
            created_date: '',
        }
    })

    const router = useRouter()
    // 登入頁路由
    const loginRoute = '/member/login'
    // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
    const protectedRoutes = ['/user-test/login-status-jwt', '/xxxx/xxxx']

// 檢查會員認証用
const checkAuth = async () => {
    const res = await axios.get(
      'http://localhost:3005/routers/auth-jwt/check-login',
      {
        withCredentials: true,
      }
    )

    if (res.data.message === 'authorized') {
      setAuthJWT({ isAuth: true, userData: res.data.user })
    }
    // 可以在這裡實作跳轉
    else {
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }
  }

}