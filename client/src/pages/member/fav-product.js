import React, { useState, useEffect } from 'react'
import { Container, Tab, Tabs, Button , Row, Col } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import SideBar from '../../components/member/side-bar'
import FavProductCard from '../../components/member/fav-product-card'
import FavCourseCard from '@/components/member/fav-course-card';


export default function MemberCenter() {
  return (
    <>
  <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
<Container className='my-3'>
            <div className='fs-2 mb-3'>我的收藏</div>
{/* 收藏的商品/收藏的課程導覽列 */}
    <Tabs
      defaultActiveKey="product"
      id="uncontrolled-tab-example"
      className="mb-3 fav-header"
    >
      <Tab eventKey="product" title="收藏商品">
{/* 全選/取消收藏/加入購物車 */}
<div className='text-end fav-select-all'>
        <input type='checkbox'/> 全選
        <Button className='mx-3 update-profile-btn'>取消收藏</Button>
        <Button className='update-profile-btn'>加入購物車</Button>
      </div>
{/* 收藏的商品內容 */}
        <FavProductCard/>
      </Tab>

      <Tab eventKey="course" title="收藏課程" className='member-fav-course'>
      {/* 全選/取消收藏/加入購物車 */}
      <div className='text-end fav-select-all'>
        <input type='checkbox'/> 全選
        <Button className='mx-3 update-profile-btn'>取消收藏</Button>
        <Button className='update-profile-btn'>加入購物車</Button>
      </div>
{/* 收藏的課程內容 */}
          <FavCourseCard/>
      </Tab>
    </Tabs>


{/* 商品card */}
            <div></div>
{/* 課程card */}
            <div></div>
{/* 分頁按鈕 */}
      </Container>
</Col>

</Row>

    </>
  )
}