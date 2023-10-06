import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


export default function CourseSwiper() {
  return (
    <>
      <div className="course-slider">
        <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper">
          <SwiperSlide>
          <div className="course-slider-container">
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
              <div className="card-btn">
                <div className="arrow-line"></div>
                <div className="text-btn">報名</div>
                <div className="icon"></div>
              </div>
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
