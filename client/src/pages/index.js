import React , { useState }from "react";
import Collapse from "@mui/material/Collapse";
import { ConfigProvider, Tabs } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// 引入slider卡片元件
import CourseSlider from "../components/homepage/CourseSlider";

// 引入IntroCard元件
import IntroCard from "../components/homepage/IntroCard";

// Tabs分頁內容
import New from "../components/homepage/New"
import Season from "../components/homepage/Season"
import Hot from "../components/homepage/Hot"
import Beginner from "../components/homepage/Beginner"
import Welfare from "../components/homepage/Welfare"

// 視差滾動效果
import { useParallax } from "react-scroll-parallax";

// slider卡片內容
const courseParagraph1 = `
<p>
初生嬰兒打開眼睛所見看到的畫面，決定了他如何看待世界。
<br/><br/>
弓道亦如此，弓道初體驗彌足珍貴，是無可取代的經驗。
<br/>
我們非常重視初探弓道的活動，竭盡全力傳達弓道精神和弓道之美。
<br/>
透過道場的空間、物件、伙伴們，到自己親歷引弓放箭，累積對於弓道的感受。
<br/>
期盼曾感動過我們的弓道，能夠在這裡與你們分享。
<br/>
<p/>
`;
const courseParagraph2 = `
<p>
當你已經踏入弓道的門檻，你將進入一個更深刻的世界。
<br/><br/>
我們繼續傳遞弓道的精髓，引導你深入體驗這項古老的藝術。
<br/>
不僅是技術的提升，更是心靈的成長。
<br/>
透過經驗豐富的導師，你將掌握更高級的技巧，提高專注力。
<br/>
無論你是追求競技，還是追求更深層次的平靜
<br/>
進階弓道課程將為你打開新的可能性，讓你更深刻地理解自己和這個世界。
`;
const courseParagraph3 = `
<p>
專業弓道，極致的藝術。狹隘崎嶇的山徑，只為堅韌者開啟。
<br/><br/>
這是一個完全沉浸式的旅程，要求你的心、身、靈全然奉獻。
<br/>
在這裡，你將學會掌握各種優美的射擊技巧，還將深入理解弓道的哲學和歷史。
<br/>
我們將透過嚴格的訓練和深度的內省，引導你達到專業弓道的頂峰。
<br/>
這不僅是一門技藝，更是一種生活方式，一種尋找心靈平靜的方式。
`;

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
  // {
  //   key: "3",
  //   label: "季節",
  //   children: <Season />,
  // },
  {
    key: "4",
    label: "初學",
    children: <Beginner />,
  },
  // {
  //   key: "5",
  //   label: "福利品",
  //   children: <Welfare />,
  // },
];

export default function Homepage() {
  
  const { ref:refFirst,style } = useParallax({ speed: -32,opacity:[0.3,1], scale:[2] });
  const { ref:refsecond } = useParallax({ translateX: [-300, 150], });
  const { ref:refthird } = useParallax({ translateX: [-300, 150], });
  const { ref:reffourth } = useParallax({ translateX: [60, 0], });
  const { ref:firstPic} = useParallax({   translateY: [-5, 5, 'easeIn'],opacity: [0, 1], });
  const { ref:reffifth  } = useParallax({ translateY: [0, 85, 'easeIn'],opacity:[0.8,1] });
  const { ref:refsixth  } = useParallax({ translateY: [-80, 220, 'easeIn'],opacity:[0.8,1] });
  const { ref:refseventh  } = useParallax({ translateY: [-10, 90, 'easeIn'],opacity:[0.8,1] });
  const { ref:refeight } = useParallax({ translateX: [-15, 0], });
  const { ref:refnine } = useParallax({ translateX: [15, 0], });
  const { ref:reften } = useParallax({ translateX: [-15, 0], });
  const { ref:refeleven } = useParallax({ translateX: [15, 0], });
  const { ref:reftwelve  } = useParallax({ translateY: [-80, 220, 'easeIn'],opacity:[0.8,1] });
  const { ref:refthirteen  } = useParallax({ translateY: [-10,220] });
  const { ref:secondPic } = useParallax({   translateY: [-5, 5, 'easeIn'],opacity: [0, 1], });
  const { ref:reffourteen  } = useParallax({ translateY: [-10,250] });
  const { ref:reffifteen  } = useParallax({ translateY: [-10,30] });
  const { ref:refsixteen } = useParallax({ translateX: [-5, 5], });
  const { ref:refseventeen } = useParallax({ translateY: [-5, 35], });
  const { ref:refeighteen } = useParallax({ translateY: [-5, 200], });
  const { ref:thirdPic } = useParallax({  opacity: [0, 1] });

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <div className="homepage-body">
        <div className="homepageHero1">
        <video
            className="homepage-video"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline=""
            src="images/homepage/hero_1.mp4"
            width={1902}
            data-object-fit="cover"
            data-object-position="45% 45%"
          ></video>
        </div>
        <div className="homepageHero2">
          <p ref={refFirst}  style={style} className="">探求弓道的本質</p>
        </div>
        <div className="aboutUs" id="aboutUs">
          <div className="aboutUs-container">
            <div className="left-desktop">
              <div ref={refsecond} className="p1">關於</div>
              <div ref={refthird} className="p2">良弓制販所</div>
            </div>
            <div ref={reffourth} className="right-desktop">
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
            <div className="right-mobile">
              <div className="textarea">
                <h1>關於良弓制販所</h1>
                <Collapse collapsedSize={150} in={checked}>
                  <p>
                    弓具並沒有絕對的答案。這是我們的信念。
                    <br />
                    在重新審視材質、耐久性和技術的同時，
                    <br />
                    弓具一直在默默的，卻穩步地發展著。
                    <br />
                    我們不願被傳統所局限，
                    <br />
                    而是要勇敢地走在傳統的前線。
                    <br />
                    <br />
                    想像一下，世界上第一支採用玻璃纖維的弓
                    <br />
                    「直心」、「練心」，
                    <br />
                    還有結合碳纖維與竹子的弓「清芳」等……
                    <br />
                    這些創新性的弓具已經問世，
                    <br />
                    正是我們態度的一種體現。
                    <br />
                    而如今，我們更榮幸的提供弓道的課程。
                    <br />
                    這是一次了解這門古老藝術、
                    <br />
                    深入探索其精髓的機會。
                    <br />
                    當展望弓道的未來一百年，
                    <br />
                    什麼樣的工具更能配得上這個時代呢？
                    <br />
                    這個問題，我們將不斷追求探索。
                    <br />
                    因為，我們相信，弓道的可能性，
                    <br />
                    將與時俱進，永不止步。
                  </p>
                </Collapse>
              </div>
              {checked ? (
                <button className="btn" onClick={handleChange}>
                  收起內容
                </button>
              ) : (
                <button className="btn" onClick={handleChange}>
                  ...繼續閱讀
                </button>
              )}
            </div>
          </div>
        </div>
        <img ref={firstPic}  className="hr" src="images/homepage/hr_1.webp" ></img>
        <div ref={reffifth} className="textarea">
          <h1 ref={reftwelve}>良物優選</h1>
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
        <div className="textarea" ref={refseventh}>
          <h1 ref={refsixth}>商品介紹</h1>
          <p>
            讓我們介紹由工匠們手工製作的弓具。
            <br />
            我們在自家工廠擁有高度技術的工匠團隊，
            <br />
            請看看優質的「弓」「箭」「弦」「衣」。
          </p>
        </div>
        <div className="introduction">
          <div className="container">
          <div ref={refeight}>
           <IntroCard
              introImg="images/homepage/product_intro_1.webp"
              introTitle="弓"
              introCat="竹弓｜合成弓"
              introHref="/product/category/bow"
          />
          </div>
          <div ref={refnine}>
           <IntroCard
              introImg="images/homepage/product_intro_2.webp"
              introTitle="箭"
              introCat="鋁箭｜合成箭"
              introHref="/product/category/arrow"
          />
          </div>
          <div ref={reften}>
          <IntroCard
              introImg="images/homepage/product_intro_3.webp"
              introTitle="道服"
              introCat=""
              introHref="/product/category/suit"
          />
          </div>
          <div ref={refeleven}>
          <IntroCard
              introImg="images/homepage/product_intro_4.webp"
              introTitle="其他"
              introCat="箭頭｜箭筒｜粉容器｜弦卷"
              introHref="/product/category/other"
          />
          </div>

          </div>
        </div>
        <div className="textarea">
          <h1 ref={refthirteen}>弓道良物盡在良弓制販所</h1>
          <p>
            我們備有弓道所需的各種物品
            <br />
            滿心期待您的光臨
          </p>
          <Link href="/product"className="btn">前往網路商店</Link>
        </div>
        <img ref={secondPic} className="hr" src="images/homepage/hr_2.webp" alt=""></img>
        <div ref={reffifteen} className="textarea">
          <h1 ref={reffourteen}>課程介紹</h1>
          <p>
            弓道以弓和箭鍛練身心。
            <br />
            <br />
            在學習弓道的過程中，
            <br className="d-sm-none" />
            我們追求射法、射技的精進，
            <br />
            以禮為基石的儀態養成，射手品格的鍛練，
            <br className="d-sm-none" />
            心技一體、群體和諧，深化豐富人生，
            <br />
            透過弓道的修練，
            <br className="d-sm-none" />
            揭示真、善、美的最高目標。
          </p>
        </div>
        <div ref={refsixteen} className="course-slider">
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide>
            <CourseSlider
                courseImg="images/homepage/course-image1.webp"
                courseTitle="初探弓道"
                courseParagraph={courseParagraph1}
                courseHref="/course"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CourseSlider
                courseImg="images/homepage/course-image2.webp"
                courseTitle="進階弓道"
                courseParagraph={courseParagraph2}
                courseHref="/course"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CourseSlider
                courseImg="images/homepage/course-image3.webp"
                courseTitle="專業弓道"
                courseParagraph={courseParagraph3}
                courseHref="/course"
              />
            </SwiperSlide>
          </Swiper>
          <Link href="/product" className="btn d-sm-none">
            更多課程介紹
          </Link>
        </div>
        <div ref={refseventeen} className="textarea">
          <br className="d-sm-none" />
          <br className="d-sm-none" />
          <br className="d-sm-none" />
          <br className="d-sm-none" />
          <br className="d-sm-none" />
          <br className="d-sm-none" />
          <h1 ref={refeighteen}>全然一身，正射必中</h1>
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
        <img ref={thirdPic} className="hr" src="images/homepage/hr_3.webp" alt=""></img>
      </div>
    </>
  );
}