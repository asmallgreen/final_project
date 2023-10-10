import React from "react";
import { Rate } from "antd";

export default function CourseListItemCard(props) {
  const { CourseData } = props;
  return (
    <>
      <div className="course-list-info">
        <div className="left">
          <div className="course-list-img">
            <img src={CourseData.images} alt=""></img>
          </div>
        </div>
        <div className="right">
          <div className="course-list-text">
            <div className="title">{CourseData.name}</div>
            <div className="intro-wrapper">
              <div
                className="intro"
                dangerouslySetInnerHTML={{ __html: CourseData.intro }}
              ></div>
            </div>
            <div className="course-list-items">
              上課地點　{CourseData.location}
              <br />
              人數限制　{CourseData.capacity}人
              <br />
              課程時間　{CourseData.start_date} 至 {CourseData.end_date}
              <br />
              報名截止　{CourseData.deadline}
              <br />
            </div>
            <div className="course-rating">
              <Rate disabled defaultValue={0} />
              <div className="counting">XXXXXX人已評價</div>
            </div>
          </div>
          <div className="course-list-bottom">
            <h2 className="price">
              <small>NT$</small>
              {CourseData.price}
            </h2>
            <div className="btn moreBtn">詳細資訊</div>
          </div>
        </div>
      </div>
    </>
  );
}
