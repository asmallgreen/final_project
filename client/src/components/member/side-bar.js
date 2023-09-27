import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function SideBar() {
    const router = useRouter();
    const path = router.asPath;

  return (
    <>
        <div className='member-sidebar'>
            <div className='text-center pt-5'>
                  <img src='/images/member/default_member.png'/>
                  <p>會員姓名</p>
                  <div className='d-flex justify-content-center'>
                    <div className='text-start'>
                  <ul className="list-unstyled pt-3 d-none d-md-block">
                    <li className={` ${(path==="/member")?"active":""}`}><Link href='/member'>會員中心</Link></li>
                    <li className={` ${(path==="/member/update-profile")?"active":""}`}><Link href='/member/update-profile'>會員資料設定</Link></li>
                    <li className={` ${(path==="/member/update-pwd")?"active":""}`}><Link href='/member/update-pwd'>修改密碼</Link></li>
                    <li className={` ${(path==="/member/order-list")?"active":""}`}><Link href='/member/order-list'>訂單紀錄</Link></li>
                    <li className={` ${(path==="/member/fav-product")?"active":""}`}><Link href='/member/fav-product'>我的收藏</Link></li>
                    <li className={` ${(path==="/member/coupon")?"active":""}`}><Link href='/member/coupon'>我的優惠券</Link></li>
                  </ul>
                </div>
                  </div>
                
            </div>
            
        </div>
    
    </>
  )
}
