import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import Link from "next/link";

export default function CourseSlider(props) {
  const { courseImg, courseTitle, courseParagraph, courseHref } = props;

  return (
    <>
      <div className="course-slider-container">
        <img
          className="course-img"
          src={courseImg}
          alt=""
        ></img>
        <div className="course-text">
          <h1>{courseTitle}</h1>
          <div id="courseParagraph" dangerouslySetInnerHTML={{ __html: courseParagraph }}></div>
        </div>
        <Link
        href={courseHref}
        className="card-btn text-decoration-none">
          <div className="arrow-line"></div>
          <div className="text-btn">報名</div>
          <div className="icon">
          <RiArrowLeftDoubleFill/>
          </div>
        </Link>
      </div>
    </>
  );
}
