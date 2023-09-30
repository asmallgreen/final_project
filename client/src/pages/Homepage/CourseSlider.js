import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <div id="courseParagraph" dangerouslySetInnerHTML={{ __html: courseParagraph }}></div>
        </div>
        <div className="card-btn">
          <div className="arrow-line"></div>
          <div className="text-btn">報名</div>
          <div className="icon">
          <FontAwesomeIcon icon="fa-solid fa-angles-left" style={{color: "#0c0c0c",}} />
          </div>
        </div>
      </div>
      {/* <div className="course-slider-container">
                <div className="course-img"></div>
                <div className="course-text">
                  <h1>初探弓道</h1>
                  <p>
                    初生嬰兒打開眼睛所見看到的畫面，決定了他如何看待世界。
                    <br />
                    <br />
                    弓道亦如此，弓道初體驗彌足珍貴，是無可取代的經驗。
                    <br />
                    我們非常重視初探弓道的活動，竭盡全力傳達弓道精神和弓道之美。
                    <br />
                    透過道場的空間、物件、伙伴們，到自己親歷引弓放箭，累積對於弓道的感受。
                    <br />
                    期盼曾感動過我們的弓道，能夠在這裡與你們分享。
                  </p>
                </div>
                <div className="card-btn">
                    <div className="arrow-line"></div>
                    <div className="text-btn">報名</div>
                    <div className="icon"></div>
                  </div>  
              </div> */}
    </>
  );
}
