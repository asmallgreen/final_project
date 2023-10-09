import React, { useState, useEffect } from "react";
import { ConfigProvider, Tabs, Rate } from "antd";
import StickyBox from "react-sticky-box";
import axios from "axios";
import { useRouter } from "next/router";

// 引入Tabs頁面
// import CourseDescription from "../../components/course-detail/CourseDescription";
import TeacherDescription from "../../components/course-detail/TeacherDescription";
import Syllabus from "../../components/course-detail/Syllabus";
import Faq from "../../components/course-detail/Faq";
import Review from "../../components/course-detail/Review";

const onChange = (key) => {
  // console.log(key);
};

export default function CourseDetail() {
  //處理antd的tabBar的sticky效果
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox
      offsetTop={0}
      offsetBottom={20}
      style={{
        zIndex: 1,
      }}
    >
      <DefaultTabBar
        {...props}
        style={{
          background: "#FCFAF2",
          zIndex: 1,
        }}
      />
    </StickyBox>
  );

  // 處理動態路由
  const router = useRouter();
  const { cid } = router.query;
  // console.log("cid", cid);

  // 取得課程資料
  const [CourseDateById, setCourseDateById] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/course/${cid}`);
        // console.log("伺服器回應:", response.data);
        setCourseDateById(response.data);
      } catch (error) {
        console.error("錯誤：請確認後台API功能", error);
      }
    };

    fetchData(); // 呼叫包裹的 async 函數
  }, [cid]);
  // console.log(AllCourseDate);

  // 處理老師資料(關聯課程)
  // console.log(CourseDateById.teacher_id);
  const [TeacherDateById, setTeacherDateById] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (CourseDateById !== null) {
          const response = await axios.get(
            `http://localhost:3005/teacher/${CourseDateById.teacher_id}`
          );
          // console.log("伺服器回應:", response.data);
          setTeacherDateById(response.data);
        }
      } catch (error) {
        console.error("錯誤：請確認後台API功能", error);
      }
    };

    fetchData(); // 呼叫包裹的 async 函數

    // 在這裡處理Tabs的資料呼叫
    const items = [
      // {
      //   key: "1",
      //   label: "課程介紹",
      //   children: <CourseDescription />,
      // },
      {
        key: "2",
        label: "講師介紹",
        children: (
          <TeacherDescription
            teacherPhoto={TeacherDateById ? TeacherDateById.photo : ""}
            teacherName={TeacherDateById ? TeacherDateById.name : ""}
            teacherRank={TeacherDateById ? TeacherDateById.rank : ""}
            teacherParagraph={TeacherDateById ? TeacherDateById.description : ""}
          />
        ),
      },
      {
        key: "3",
        label: "課程大綱",
        children: <Syllabus />,
      },
      {
        key: "4",
        label: "常見問題",
        children: <Faq />,
      },
      {
        key: "5",
        label: "學員評價",
        children: <Review />,
      },
    ];
    setItems(items);
  }, [CourseDateById, TeacherDateById]);

  return CourseDateById !== null && TeacherDateById !== null ? (
    <div className="course-detail-body">
      <div className="container">
        <div className="bread-crumb">
          <div className="breadCrumb"></div>
        </div>
        <div className="course-detail-info">
          <div className="left">
            <div className="course-detail-img">
              <img src={CourseDateById.images} alt=""></img>
            </div>
          </div>
          <div className="right ">
            <div className="course-detail-text">
              <div className="title">{CourseDateById.name}</div>
              <div
                className="intro"
                dangerouslySetInnerHTML={{ __html: CourseDateById.intro }}
              ></div>
              <div className="course-detail-items">
                人數限制　{CourseDateById.capacity}人
                <br />
                報名截止　{CourseDateById.deadline}
                <br />
                課程時間　{CourseDateById.start_date} 至{" "}
                {CourseDateById.end_date}
                <br />
                單堂時數　{CourseDateById.hour} 小時
                <br />
                上課地點　{CourseDateById.location}
                <br />
                授課教師　{TeacherDateById.name}
                <br />
              </div>
              <div className="course-rating">
                <h2 className="price">
                  <small>NT$</small> {CourseDateById.price}
                </h2>
                <div className="stars">
                  <Rate disabled defaultValue={0} />
                  <div className="counting">XXXXXX人已評價</div>
                </div>
              </div>
            </div>
            <div className="btns">
              <div className="btn course-detail-btn like-btn">加入收藏</div>
              <div className="btn course-detail-btn cart-btn">加入購物車</div>
            </div>
          </div>
        </div>
        <div className="course-detail-tabs">
          <ConfigProvider
            theme={{
              // token: {
              //   fontFamily: "Inter, AbeeZee",
              // },

              components: {
                Tabs: {
                  // cardBg: "#000000",
                  //   horizontalItemGutter: 50,
                  titleFontSize: "18px",
                  itemColor: "#000",
                  inkBarColor: "#616153",
                  itemActiveColor: "# ",
                  itemHoverColor: "#000",
                  itemSelectedColor: "#000",
                  horizontalItemPadding: "12px 60px",
                  horizontalMargin: "0 0 100px 0",
                },
              },
            }}
          >
            <Tabs
              type="primary"
              centered
              defaultActiveKey="1"
              renderTabBar={renderTabBar}
              items={items}
              // onChange={onChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  ) : (
    <h1>loading</h1>
  );
}
