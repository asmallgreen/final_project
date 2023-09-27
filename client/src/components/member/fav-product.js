import React from 'react'
import { Container } from 'react-bootstrap'

export default function FavProduct() {
  return (
    <>
        <Container className='my-5'>
            <div className='fs-2 mb-5'>我的收藏</div>
{/* 收藏的商品/收藏的課程 */}
            <div className='d-flex fav-header text-center'>
                <div>收藏商品</div>
                <div>收藏課程</div>
            </div>
{/* 全選/取消收藏/加入購物車 */}
            <div></div>
{/* 商品card */}
            <div></div>
{/* 課程card */}
            <div></div>
{/* 分頁按鈕 */}
      </Container>
    </>
  )
}
