import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// productCard
// import FilterProductCard from "../components/product/filter-product-card";

export default function New() {
  return (
    <>
      <div className=" container">
        <Swiper
          spaceBetween={0}
          slidesPerView={5}
          navigation={true}
          // pagination={true}
          // modules={[Navigation, Pagination]}
          className="mySwiper launched-product-swiper"
        >
          <SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/4`} className="img position-relative">
                      <img src="/product/bow4.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">小山雅史</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$5400</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide>
          <SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/59`} className="img position-relative">
                      <img src="/product/arrow1.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">土耳其箭</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$1200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide>
          <SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/118`} className="img position-relative">
                      <img src="/product/suit9.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">海軍藍聚酯褲裙</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$400</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide>
          <SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/131`} className="img position-relative">
                      <img src="/product/other2.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">鶴捲藤</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$400</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide>
          <SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/8`} className="img position-relative">
                      <img src="/product/bow8.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">實用技能
                      </div>
                      <div className="description"></div>
                      <div className="price text-end">NT$3900</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide>

        </Swiper>
      </div>


    </>

  )
}

