import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Beginner() {
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
                    <Link href={`/product/93`} className="img position-relative">
                      <img src="/product/arrow34.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">碧流箭</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$300</div>
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
                    <Link href={`/product/126`} className="img position-relative">
                      <img src="/product/suit17.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">冬季抓絨弓道製服</div>
                      <div className="description"></div>
                      <div className="price text-end">NT$300</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide><SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/95`} className="img position-relative">
                      <img src="/product/arrow36.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">屋四谷
                      </div>
                      <div className="description"></div>
                      <div className="price text-end">NT$400</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide><SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/113`} className="img position-relative">
                      <img src="/product/suit4.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">男士條紋和服內衣套裝
                      </div>
                      <div className="description"></div>
                      <div className="price text-end">NT$400</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LaunchedCard */}
          </SwiperSlide><SwiperSlide>
            {/* LaunchedCard */}
            <div className="normal-cards-area">
              <div className="normal-cards">
                <div className="rows">
                  <div className="card">
                    {/* <div className="img position-relative"> */}
                    <Link href={`/product/130`} className="img position-relative">
                      <img src="/product/other1.jpg" alt="Product Image" className=""></img>
                    </Link>
                    {/* </div> */}
                    <div className="content">
                      <div className="product-name">弦巻　面取籐
                      </div>
                      <div className="description"></div>
                      <div className="price text-end">NT$400</div>
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