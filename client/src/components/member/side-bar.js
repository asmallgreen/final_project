import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FaCrown } from "react-icons/fa";
import { useAuthJWT } from '@/hooks/use-auth-jwt';

export default function SideBar() {
  const router = useRouter();
  const path = router.asPath;
  const { authJWT, setAuthJWT } = useAuthJWT();

  return (
    <>
      <div className='member-sidebar'>
        <div className='text-center pt-md-5 row align-items-center'>
          <div className='col-3 col-md-12'>
            <img src={authJWT.memberData.member_img === 'avatar01.jpg'?'/Duo/avatar01.jpg':`http://localhost:3005/${authJWT.memberData.member_img}`} />
          </div>
          <div className='col col-md-12 d-flex justify-content-md-center'>
            <p className='px-2 fs-5'>{authJWT.memberData.name}</p>
            <div className="d-flex align-items-center d-md-none crown">
              <FaCrown className='mx-1'/>
              <p className='mx-1'>金弓</p>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className='text-start'>
              <ul className="list-unstyled pt-3 d-none d-md-block">
                <li className={` ${(path === "/member") ? "active" : ""}`}><Link href='/member'>會員中心</Link></li>
                <li className={` ${(path === "/member/update-profile") ? "active" : ""}`}><Link href='/member/update-profile'>會員資料設定</Link></li>
                <li className={` ${(path === "/member/update-pwd") ? "active" : ""}`}><Link href='/member/update-pwd'>修改密碼</Link></li>
                <li className={` ${(path === "/member/order-list") ? "active" : ""}`}><Link href='/member/order-list'>訂單紀錄</Link></li>
                <li className={` ${(path === "/member/fav-product") ? "active" : ""}`}><Link href='/member/fav-product'>我的收藏</Link></li>
                <li className={` ${(path === "/member/coupon") ? "active" : ""}`}><Link href='/member/coupon'>我的優惠券</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}