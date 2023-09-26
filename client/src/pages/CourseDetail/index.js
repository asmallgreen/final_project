import React from "react";

export default function CourseDetail() {
  return (
    <div className="course-detail-body">
      <div className="container">
        <div className="bread-crumb">
          <div className="breadCrumb"></div>
        </div>
        <div className="course-detail-info">
          <div className="left">
            <div className="course-detail-img"></div>
          </div>
          <div className="right">
            <div className="course-detail-text">
              <p className="title"></p>
              <p className="intro"></p>
            </div>
            <div className="course-detail-items">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="btns">
                <div className="like-btn"></div>
                <div className="cart-btn"></div>
            </div>
          </div>
        </div>
        <div className="course-detail-tabs"></div>
      </div>
    </div>
  );
}
