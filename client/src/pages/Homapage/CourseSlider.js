import React from "react";

export default function CourseSlider(props) {
  const { courseImg, courseTitle, courseParagraph } = props;

  return (
    <>
      <div className="course-slider-container">
        <div
          className="course-img"
          style={{ backgroundImage: `url(${courseImg})` }}
        ></div>
        <div className="course-text">
          <h1>{courseTitle}</h1>
          <p>{courseParagraph}</p>
          <div className="card-btn">
            <div className="arrow-line"></div>
            <div className="text-btn">報名</div>
            <div className="icon"></div>
          </div>
        </div>
      </div>
    </>
  );
}
