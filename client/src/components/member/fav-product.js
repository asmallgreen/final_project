import React from 'react'
import { Container, Tab, Tabs,Form,InputGroup } from 'react-bootstrap'

export default function FavProduct() {
  return (
    <>
        <Container className='my-3'>
            <div className='fs-2 mb-3'>我的收藏</div>
{/* 收藏的商品/收藏的課程導覽列 */}
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 fav-header"
      fill
    >
      <Tab eventKey="home" title="收藏商品">
{/* 全選/取消收藏/加入購物車 */}
<div>
            <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        <Form.Control aria-label="Text input with checkbox" />
      </InputGroup>
            </div>
{/* 收藏的商品內容 */}
        Tab content for Home
      </Tab>
      <Tab eventKey="profile" title="收藏課程">
      {/* 全選/取消收藏/加入購物車 */}
      <div>
            <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        <Form.Control aria-label="Text input with checkbox" />
      </InputGroup>
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
