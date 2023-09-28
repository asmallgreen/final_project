import React from 'react'
import { Container, Tab, Tabs,Form,InputGroup, Button } from 'react-bootstrap'
import FavProductCard from '../../components/member/fav-product-card'

export default function FavProduct() {
  return (
    <>
        <Container className='my-3'>
            <div className='fs-2 mb-3'>我的收藏</div>
{/* 收藏的商品/收藏的課程導覽列 */}
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3 fav-header"
      fill
    >
      <Tab eventKey="home" title="收藏商品">
{/* 全選/取消收藏/加入購物車 */}
<div className='text-end fav-select-all'>
        <input type='checkbox'/> 全選
        <Button className='mx-3 update-profile-btn'>取消收藏</Button>
        <Button className='update-profile-btn'>加入購物車</Button>
      </div>
{/* 收藏的商品內容 */}
        <FavProductCard/>
      </Tab>

      
      <Tab eventKey="profile" title="收藏課程">
      {/* 全選/取消收藏/加入購物車 */}
      <div className='text-end fav-select-all'>
        <input type='checkbox'/> 全選
        <Button className='mx-3 update-profile-btn'>取消收藏</Button>
        <Button className='update-profile-btn'>加入購物車</Button>
      </div>
{/* 收藏的課程內容 */}
        Tab content for Profile
      </Tab>
    </Tabs>

{/* 商品card */}
            <div></div>
{/* 課程card */}
            <div></div>
{/* 分頁按鈕 */}
      </Container>
    </>
  )
}
