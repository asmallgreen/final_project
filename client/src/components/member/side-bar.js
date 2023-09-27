import React from 'react'
import Link from 'next/link'

export default function SideBar() {
  return (
    <>
        <div className='member-sidebar'>
            <div className='text-center pt-5'>
                  <img src='/images/member/default_member.png'/>
                  <p>會員姓名</p>
                  <div className='d-flex justify-content-center'>
                    <div className='text-start'>
                  <ul className="list-unstyled pt-3 d-none d-md-block">
                    <li><Link href='/member'>會員中心</Link></li>
                    <li><Link href='/member/update-profile'>會員資料設定</Link></li>
                    <li><Link href='/member/update-pwd'>修改密碼</Link></li>
                    <li><Link href='/member/order-list'>訂單紀錄</Link></li>
                    <li><Link href='/member/fav-product'>我的收藏</Link></li>
                    <li><Link href='/member/coupon'>我的優惠券</Link></li>
                  </ul>
                </div>
                  </div>
                
            </div>
            
        </div>
    
    </>
  )
}