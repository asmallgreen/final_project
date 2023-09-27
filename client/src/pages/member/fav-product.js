import React, { useState, useEffect } from 'react'
import { Container, Tab, Tabs, Button , Row, Col } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import SideBar from '../../components/member/side-bar'
import FavProductCard from '../../components/member/fav-product-card'


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

      <Tab eventKey="course" title="收藏課程" className='fav-course'>
      {/* 全選/取消收藏/加入購物車 */}
      <div className='text-end fav-select-all'>
        <input type='checkbox'/> 全選
        <Button className='mx-3 update-profile-btn'>取消收藏</Button>
        <Button className='update-profile-btn'>加入購物車</Button>
      </div>
{/* 收藏的課程內容 */}
<div className="course-list-item">
            <div className="course-list-img"></div>
            <div className="course-list-text">
              <div className="title">初探：射法八節</div>
              <div className="intro">
                且而抱樹小空誰拉邊了就車吉固，蝶貓年真快。師跑亭眼；午哥兆說合眼動把習爪右安頁常許，遠校候「魚隻幾抄園」。登也身司光北具，月枝巴登寺主羽，下早急房訴玩月美夏，葉造新雄給頁來品知游後大飽。圓河毛夕文員快犬訴貝苦坐反再良點實。歡男米己去雲原。
              </div>
              <div className="items">
                <br />
                人數限制：25人
                <br />
                報名截止：2023-00-00
                <br />
                課程時間：2023-00-00 — 2023-00-00
              </div>
              <div className="course-rating">
                <div className="stars">
                  <div className="star">1</div>
                  <div className="star">2</div>
                  <div className="star">3</div>
                  <div className="star">4</div>
                  <div className="star">5</div>
                </div>
                <div className="counting">888人已評價</div>
              </div>
              <div className="bottom">
                <h2 className="price">NT$8000</h2>
                <div className="btn moreBtn">詳細資訊</div>
              </div>
            </div>
          </div>
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