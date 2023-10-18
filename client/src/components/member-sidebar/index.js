import React from 'react'

export default function MemberSidebar() {
    return (
        <div className='member-sidebar'>
            <div className='text-center pt-5'>
                <img src='/images/member/default_member.png'/>
                <p>會員姓名</p>
            </div>
            <ul className="list-unstyled pt-3 d-none d-md-block">
                <li>會員資料設定</li>
                <li>修改密碼</li>
                <li>訂單紀錄</li>
                <li>我的收藏</li>
                <li>我的優惠券</li>
            </ul>
        </div>
    )
}