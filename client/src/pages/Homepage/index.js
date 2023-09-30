import React from "react";
import { ConfigProvider, Tabs } from "antd";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// courseSlider
import CourseSlider from "./CourseSlider";

// Tabs分頁內容
import New from "./New";
import Season from "./Season";
import Hot from "./Hot";
import Beginner from "./Beginner";
import Welfare from "./Welfare";

//引入圖片
import CourseSlider1 from "../../../public/images/homepage/course-image1.png";

// Tabs Index
const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "新品",
    children: <New />,
  },
  {
    key: "2",
    label: "熱銷",
    children: <Hot />,
  },
  {
    key: "3",
    label: "季節",
    children: <Season />,
  },
  {
    key: "4",
    label: "初學",
    children: <Beginner />,
  },
  {
    key: "5",
    label: "福利品",
    children: <Welfare />,
  },
];

export default function Homepage() {
  return (
    <>
      <div className="homepage-body">
        <div className="homepageHero1">
          {/* <video
            autoplay=""
            muted=""
            loop=""
            playsinline=""
            src=""
            style="object-position:45% 45%"
            data-object-fit="cover"
            data-object-position="45% 45%"
          ></video> */}
        </div>
        <div className="homepageHero2">
          <p className="">探求弓道的本質</p>
        </div>
        <div className="aboutUs">
          <div className="aboutUs-container">
            <div className="left">
              <div className="p1">關於</div>
              <div className="p2">良弓制販所</div>
            </div>
            <div className="right">
              <p>
                弓具並沒有絕對的答案。這是我們的信念。
                <br />
                在重新審視材質、耐久性和技術的同時，弓具一直在默默的，卻穩步地發展著。
                <br />
                我們不願被傳統所局限，而是要勇敢地走在傳統的前線。
                <br />
                想像一下，世界上第一支採用玻璃纖維的弓「直心」、「練心」，
                <br />
                還有結合碳纖維與竹子的弓「清芳」等……
                <br />
                這些創新性的弓具已經問世，正是我們態度的一種體現。
                <br />
                而如今，我們更榮幸的提供弓道的課程。
                <br />
                這是一次了解這門古老藝術、深入探索其精髓的機會。
                <br />
                當展望弓道的未來一百年，什麼樣的工具更能配得上這個時代呢？
                <br />
                這個問題，我們將不斷追求探索。
                <br />
                因為，我們相信，弓道的可能性，將與時俱進，永不止步。
              </p>
            </div>
          </div>
        </div>
        <div className="hr homepage-hr1"></div>
        <div className="textarea">
          <h1>良物優選</h1>
          <p>
            良工匯聚，優質無慮
            <br />
            請看看我們為您挑選的弓道好物
          </p>
        </div>
        <div className="collection">
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Inter, AbeeZee",
              },

              components: {
                Tabs: {
                  cardBg: "parent",
                  //   horizontalItemGutter: 50,
                  titleFontSize: "18px",
                  itemColor: "#000",
                  inkBarColor: "#616153",
                  itemActiveColor: "#000",
                  itemHoverColor: "#000",
                  itemSelectedColor: "#000",
                  horizontalItemPadding: "12px 30px",
                },
              },
            }}
          >
            <Tabs
              type="primary"
              centered
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
        <div className="textarea">
          <h1>商品介紹</h1>
          <p>
            讓我們介紹一下由工匠們一個接一個地手工製作的弓具。
            <br />
            我們在自家工廠擁有高度技術的工匠團隊，他們負責製作弓具。
            <br />
            請看看優質的「弓」「箭」「弦」「衣」「良物」。
          </p>
        </div>
        <div className="introduction">
          <div className="container">
            <div className="intro-card">
              <div className="intro-card-img ic-img1"></div>
              <div className="intro-card-text">
                <div className="intro-card-title">弓</div>
                <div className="intro-card-content">竹弓｜合成弓</div>
                <div className="intro-card-btn">
                  <div className="arrow-line"></div>
                  <div className="text-btn">商城</div>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="intro-card">
              <div className="intro-card-img ic-img2"></div>
              <div className="intro-card-text">
                <div className="intro-card-title">箭</div>
                <div className="intro-card-content">鋁箭｜合成箭</div>
                <div className="intro-card-btn">
                  <div className="arrow-line"></div>
                  <div className="text-btn">商城</div>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="intro-card">
              <div className="intro-card-img ic-img3"></div>
              <div className="intro-card-text">
                <div className="intro-card-title">道服</div>
                <div className="intro-card-content"></div>
                <div className="intro-card-btn">
                  <div className="arrow-line"></div>
                  <div className="text-btn">商城</div>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="intro-card">
              <div className="intro-card-img ic-img4"></div>
              <div className="intro-card-text">
                <div className="intro-card-title">其他</div>
                <div className="intro-card-content">
                  箭頭｜箭筒｜粉容器｜弦卷
                </div>
                <div className="intro-card-btn">
                  <div className="arrow-line"></div>
                  <div className="text-btn">商城</div>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="textarea">
          <h1>弓道良物盡在良弓制販所</h1>
          <p>
            我們備有弓道所需的各種物品
            <br />
            滿心期待您的光臨
          </p>
          <div className="btn">前往網路商店</div>
        </div>
        <div className="hr homepage-hr2"></div>
        <div className="textarea">
          <h1>課程介紹</h1>
          <p>
            弓道以弓和箭鍛練身心。
            <br />
            <br />
            在學習弓道的過程中，我們追求射法、射技的精進，
            <br />
            以禮為基石的儀態養成，射手品格的鍛練，心技一體、群體和諧，深化豐富人生，
            <br />
            透過弓道的修練，揭示真、善、美的最高目標。
          </p>
        </div>
        <div className="course-slider">
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide>
              <CourseSlider
                 courseImg='https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png'
                 courseTitle="初探弓道"
                 courseParagraph="初生嬰兒打開眼睛所見看到的畫面，決定了他如何看待世界。"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CourseSlider />
            </SwiperSlide>
            <SwiperSlide>
              <CourseSlider />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="textarea">
          <h1>全然一身，正射必中</h1>
          <p>
            我們串聯臺灣北、中、南三地的弓道場
            <br />
            集結深耕弓道數十餘年的老師
            <br />
            <br />
            您所期待的弓道之旅
            <br />
            隨時啟程
          </p>
        </div>
        <div className="hr homepage-hr3"></div>
      </div>
    </>
  );
}
