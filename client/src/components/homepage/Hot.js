import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Hot() {
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
                    <Link href={`/product/2`} className="img position-relative">
                      <img src="/product/bow2.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">前煤竹</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$5500</div>
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
                    <Link href={`/product/17`} className="img position-relative">
                      <img src="/product/bow17.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">焦弓</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$3900</div>
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
                    <Link href={`/product/91`} className="img position-relative">
                      <img src="/product/arrow32.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">三郎製造</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$800</div>
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
                    <Link href={`/product/16`} className="img position-relative">
                      <img src="/product/bow16.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">Kushin Arch</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$9100</div>
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
                    <Link href={`/product/58`} className="img position-relative">
                      <img src="/product/bow57.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">前燒弓尼貝</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$6400</div>
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