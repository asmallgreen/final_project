import React, { useState, useEffect,} from "react";
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
import { useAuthJWT } from "@/hooks/use-auth-jwt";
import { useCourseCart } from "@/hooks/use-course-cart";
import Swal from "sweetalert2";

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

  // 取得課程資料
  const [CourseDateById, setCourseDateById] = useState(null);
  const [TeacherDateById, setTeacherDateById] = useState(null);
  const [SyllabusDateByCourseId, setSyllabusDateByCourseId] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:3005/course/${cid}`
        );
        const courseData = courseResponse.data;
        setCourseDateById(courseData);

        if (courseData.teacher_id) {
          const teacherResponse = await axios.get(
            `http://localhost:3005/teacher/${courseData.teacher_id}`
          );
          setTeacherDateById(teacherResponse.data);
        }

        if (courseData.syllabus_id) {
          const syllabusResponse = await axios.get(
            `http://localhost:3005/syllabus/${courseData.syllabus_id}`
          );
          setSyllabusDateByCourseId(syllabusResponse.data);
        }
      } catch (error) {
        console.error("錯誤，請確認API", error);
      }
    };

    fetchData();
  }, [cid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (TeacherDateById && SyllabusDateByCourseId) {
          const newItems = [
            {
              key: "2",
              label: "講師介紹",
              children: (
                <TeacherDescription
                  teacherPhoto={TeacherDateById ? TeacherDateById.photo : ""}
                  teacherName={TeacherDateById ? TeacherDateById.name : ""}
                  teacherRank={TeacherDateById ? TeacherDateById.rank : ""}
                  teacherParagraph={
                    TeacherDateById ? TeacherDateById.description : ""
                  }
                />
              ),
            },
            {
              key: "3",
              label: "課程大綱",
              children: <Syllabus syllabusData={SyllabusDateByCourseId} />, // 使用SyllabusDateByCourseId
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

          setItems(newItems);

        }
      } catch (error) {
        console.error("錯誤，請確認API", error);
      }
    };

    fetchData();
  }, [TeacherDateById, SyllabusDateByCourseId]);

   // 會員收藏課程
   const { authJWT,favoriteCourses, setFavoriteCourses } = useAuthJWT()
   const memberId = authJWT.memberData.id
   console.log('cid:',cid);
   // 拿出會員收藏的所有課程id
   console.log(favoriteCourses);
   const cidNum = parseInt(cid, 10)
   // const [products, setProducts] = useState([])
   // 判斷是否該課程id有在收藏資料表，有代表已收藏
   function isCourseFavorited(courseId) {
     return favoriteCourses.includes(courseId);
   }

   const handleTriggerCourseFav = async (id) => {
     // 在陣列中->移出，不在陣列中加入
     console.log('id=',id);
     if (favoriteCourses.includes(id)) {
 // 如果在陣列中，執行移除收藏
       try{
         const res = await axios.delete(`http://localhost:3005/member/course/${cid}`,
         {
           data:{memberId},
           withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
         })
         console.log(res.data);
         if(res.data.message === '已取消收藏'){
           await Swal.fire({
             icon: 'success',
             title: '課程已取消收藏',
             showConfirmButton: false,
             timer: 1500,
             backdrop: `rgba(255, 255, 255, 0.55)`,
             width: '35%',
             padding: '0 0 3.25em',
             customClass: {
             }
           })
         }
       }catch(error){
         console.log(error);
       }
       setFavoriteCourses(favoriteCourses.filter((v) => v !== id))
     } else {
 // 如果不在陣列中，執行加入收藏
       try{
         const res = await axios.put(`http://localhost:3005/member/course/${cid}`,
         {memberId},
         {
           withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
         })
         console.log(res.data);
 
         if(res.data.message === '課程收藏成功'){
           await Swal.fire({
             icon: 'success',
             title: '課程收藏成功',
             showConfirmButton: false,
             timer: 1500,
             backdrop: `rgba(255, 255, 255, 0.55)`,
             width: '35%',
             padding: '0 0 3.25em',
             customClass: {
             }
           })
         }
       }catch(error){
         console.log(error);
       }
       setFavoriteCourses([...favoriteCourses, id])
     }
   }

   //加入購物車
   const { courseCart, courses, addCourse } = useCourseCart();

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
                  <div className="counting-mobile">XXXXXX人已評價</div>
                  <Rate disabled defaultValue={0} />
                  <div className="counting-desktop">XXXXXX人已評價</div>
                </div>
              </div>
            </div>
            <div className="btns">
              <div onClick={()=>handleTriggerCourseFav(cidNum)} className="btn course-detail-btn like-btn">{isCourseFavorited(cidNum)?'取消收藏':'加入收藏'}</div>
              <div className="btn course-detail-btn cart-btn" onClick={()=>{
                addCourse({
                  // images: CourseDateById.images,
                  id: CourseDateById.id,
                  name: CourseDateById.name,
                  price: CourseDateById.price,
                  quantity: 1,
                });
              }}>加入購物車</div>
            </div>
          </div>
        </div>
        <div className="course-detail-tabs-desktop">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  titleFontSize: "18px",
                  itemColor: "#000",
                  inkBarColor: "#616153",
                  itemActiveColor: "# ",
                  itemHoverColor: "#000",
                  itemSelectedColor: "#000",
                  horizontalItemPadding: "12px 60px",
                  horizontalMargin: "0 0 50px 0",
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
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
        <div className="course-detail-tabs-mobile pt-1">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  titleFontSize: "14px",
                  itemColor: "#000",
                  inkBarColor: "#616153",
                  itemActiveColor: "# ",
                  itemHoverColor: "#000",
                  itemSelectedColor: "#000",
                  horizontalItemPadding: "10px 5px",
                  horizontalMargin: "5px 0 10px 0",
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
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  ) : (
    <h1>loading</h1>
  );
}
