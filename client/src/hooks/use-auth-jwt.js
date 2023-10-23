import React, { useState, useContext, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContextJWT = createContext(null);
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
        },
        favoriteProducts:[],
        favoriteCourses:[],
    })

    const router = useRouter()
    // 登入頁路由
    const loginRoute = '/member/login'
    // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
    const protectedRoutes = ['/member', '/member/update-profile', '/member/update-pwd', '/member/order-list', '/member/coupon', '/member/fav-product','/cart', ]

// 檢查會員認証用
const checkAuth = async () => {
    const res = await axios.get(
      'http://localhost:3005/member/check-login',
      {
        withCredentials: true,
      }
    )
    if (res.data.message === 'authorized') {
      // console.log('checklogin ahthorized');
      // console.log(res.data);
      // console.log(res.data.memberData);
      setAuthJWT({ isAuth: true, memberData: res.data.memberData })
    }
    // 可以在這裡實作跳轉
    else {
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute);
      }
    }
  };

  //撈取memberCoupon的state
  const [memberCoupon, setMemberCoupon] = useState([]);
  const getMemberCoupon = async () => {
    const res = await axios.get(
      `http://localhost:3005/memberDashboard/findMemberCoupon?memberId=${authJWT.memberData.id}`
    );
    // console.log(res.data.memberCoupon);
    if (res.data.memberCoupon) {
      setMemberCoupon(res.data.memberCoupon);
    }
  };
  useEffect(() => {
    if (authJWT.isAuth) {
      getMemberCoupon();
    }else{
      setMemberCoupon([]);
    }
  }, [authJWT]);

  
  // // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !authJWT.isAuth) {
      checkAuth();
    }
    // 下面加入router.pathname，是為了要在向伺服器檢查後，
    // 如果有比對到是隱私路由，就執行跳轉到登入頁面工作
    // 注意有可能會造成向伺服器要求多次，此為簡單的實作範例
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  // 會員收藏清單
  // 收藏的商品
  const [favoriteProducts, setFavoriteProducts] = useState([])
  // 得到會員的商品收藏清單
  const getFavoriteProducts = async () => {
    const res = await axios.get(
      'http://localhost:3005/member/favorite-product-id',
      {
        withCredentials: true,
      }
    )
        // console.log('getFavoriteProducts:',res.data);
    if (res.data.favoriteProducts) {
      setFavoriteProducts(res.data.favoriteProducts)
    }
  }

  useEffect(() => {
    if (authJWT.isAuth) {
      // 成功登入後要執行一次向伺服器取得商品收藏清單
      getFavoriteProducts()
    } else {
      // 登出時要設回空陣列
      setFavoriteProducts([])
    }
  }, [authJWT])

  // 收藏的課程
  const [favoriteCourses, setFavoriteCourses] = useState([])
    // 得到會員的課程收藏清單
  const getFavoriteCourses = async () => {
    const res = await axios.get(
      'http://localhost:3005/member/favorite-course-id',
      {
        withCredentials: true,
      }
    )
      // console.log('this is fav course:',res.data);
    if (res.data.favoriteCourses) {
      setFavoriteCourses(res.data.favoriteCourses)
    }
  }

  useEffect(() => {
    if (authJWT.isAuth) {
      // 成功登入後要執行一次向伺服器取得商品收藏清單
      getFavoriteCourses()
    } else {
      // 登出時要設回空陣列
      setFavoriteCourses([])
    }
  }, [authJWT])

  return (
    <AuthContextJWT.Provider
      value={{
        authJWT,
        setAuthJWT,
        favoriteProducts,
        setFavoriteProducts,
        favoriteCourses,
        setFavoriteCourses,
        getFavoriteProducts,
        getFavoriteCourses,
        memberCoupon,
        setMemberCoupon,
      }}
    >
      {children}
    </AuthContextJWT.Provider>
  );
};

export const useAuthJWT = () => useContext(AuthContextJWT);
