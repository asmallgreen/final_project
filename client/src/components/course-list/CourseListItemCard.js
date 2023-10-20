import React, { useState } from "react";
import { Rate } from "antd";
import Link from "next/link";

export default function CourseListItemCard(props) {
  const { CourseData } = props;
  // console.log(CourseData);
  return (
    <>
      <div className="course-list-info-desktop">
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
              <Rate disabled defaultValue={CourseData.rating} />
              {/* <div className="counting">XXXXXX人已評價</div> */}
            </div>
          </div>
          <div className="course-list-bottom">
            <h2 className="price">
              <small>NT$</small>
              {CourseData.price}
            </h2>
            <Link href={`course/${CourseData.id}`}>
              <div className="btn moreBtn">詳細資訊</div>
            </Link>
          </div>
        </div>
      </div>
      {/* 手機板 */}

      <div className="course-list-info-mobile">
        <div className="left">
          <Link
            href={`course/${CourseData.id}`}
            className="text-decoration-none"
          >
            <div className="course-list-img">
              <img src={CourseData.images} alt=""></img>
            </div>
          </Link>
        </div>
        <div className="right">
          <div className="course-list-text">
            <div className="title">{CourseData.name}</div>
            <div className="price">
              NT$
              {CourseData.price}
            </div>
          </div>
        </div>
        <div className="course-rating">
          <Rate disabled defaultValue={CourseData.rating} className="rating-star" />
          <div className="counting">
            {/* <small>XXX人已評價</small> */}
          </div>
        </div>
      </div>
    </>
  );
}
