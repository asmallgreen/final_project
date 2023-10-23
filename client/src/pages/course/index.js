import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import CourseListItemCard from "@/components/course-list/CourseListItemCard";
import BreadCrumbCourse from "@/components/bread-crumb/bread-crumb-course";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Link from "next/link";

function CourseList() {
  const [allCourse, setAllCourse] = useState([]);
  //分頁
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredCourses, setFilteredCourses] = useState([]);
  //排序
  const [sortOrder, setSortOrder] = useState("default");
  //篩選
  const [filters, setFilters] = useState({
    level: [],
    location: [],
  });
  const [filteredData, setFilteredData] = useState(allCourse);
  const [open, setOpen] = useState(false);
console.log(currentPage);
  //取得資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3005/course");
        setAllCourse(res.data.allCourse);
      } catch {
        console.log("error");
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  // 有alldata時才傳入的判斷避免初始化時傳入空值
  useEffect(() => {
    if (allCourse.length > 0) {
      setFilteredCourses(allCourse);
    }
  }, [allCourse]);
  // console.log(allCourse);
  // 使用useEffect來監聽篩選條件的變化並應用篩選
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // 計算當前頁數的數據長度
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //排序
  const sortedAndFilteredCourses = filteredCourses.sort((a, b) => {
    if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return a.id - b.id;
    }
  });

  const currentItems = sortedAndFilteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // 計算總頁數
  const totalPages = Math.ceil(sortedAndFilteredCourses.length / itemsPerPage);

  // 更新當前頁數
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // 更新每頁顯示數量
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // 重置當前頁數
  };
  // 更新排序條件
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // 篩選
  // 抓取篩選條件更新的事件
  // 處理篩選條件改變
  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;

    // 更新篩選條件的狀態值
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value),
    }));
  };
  //   console.log(filters);

  // 應用篩選條件
  const applyFilters = () => {
    // 根據篩選條件更新filteredCourses
    let updatedFilteredCourses = allCourse;

    if (filters.level.length > 0) {
      updatedFilteredCourses = updatedFilteredCourses.filter((course) =>
        filters.level.includes(course.level)
      );
    }

    if (filters.location.length > 0) {
      updatedFilteredCourses = updatedFilteredCourses.filter((course) =>
        filters.location.includes(course.location)
      );
    }

    // 更新filteredCourses狀態值
    setFilteredCourses(updatedFilteredCourses);
  };

  // 清除篩選條件
  const clearFilters = () => {
    // 清空篩選條件並觸發useEffect來應用清空後的篩選
    setFilters({ level: [], location: [] });
  };

  return (
    <>

<Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={3}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        initialSlide={1}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper ad-swiper"
      >
      {/* <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top1.jpg" alt="img" />
        <img src="/product/top2.jpg" alt="img" />
        <img src="/product/top3.jpg" alt="img" />
        </div>
      </div>
      </Link>
      </SwiperSlide> */}
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top2.jpg" alt="img" />
        </div>
        </div>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top3.jpg" alt="img" />
        </div>
        </div>   
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top1.jpg" alt="img" />
        </div>
        </div>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
         <div className="ads">
        <div className="ad">
        <img src="/product/top2.jpg" alt="img" />
        </div>
        </div>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top3.jpg" alt="img" />
        </div>
        </div>  
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href='/publicCoupon'>
        <div className="ads">
        <div className="ad">
        <img src="/product/top4.jpg" alt="img" />
        </div>
        </div>  
      </Link>
      </SwiperSlide>
      </Swiper>
      <div className="phone-ad">
      <Link href='/publicCoupon'>
        <img src="/product/top1.jpg" alt="img"></img>
      </Link>
      </div>
      <div className="filter-area container-fluid">
        <div className="container">
          <div className="all-product all-course">
            <div className="p-0">
              <p>所有課程</p>
            </div>
            <div className="p-0">
              {/* filterBtn元件拆進來 */}
              {/* btn-group */}
              <div className="wrap">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <Button
                    className="btn btn-outline-primary position-relative"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      className="fa-solid fa-filter"
                    />
                    篩選
                  </Button>
                  <Collapse in={open}>
                    <div className="collapsed-content-box position-absolute top-100">
                      <div>
                        <div>課程難度</div>
                        <label className="">
                          <input
                            type="checkbox"
                            value="初探"
                            name="level"
                            checked={filters.level.includes("初探")}
                            onChange={handleFilterChange}
                          />
                          初探
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="中階"
                            name="level"
                            checked={filters.level.includes("中階")}
                            onChange={handleFilterChange}
                          />
                          中階
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="專業"
                            name="level"
                            checked={filters.level.includes("專業")}
                            onChange={handleFilterChange}
                          />
                          專業
                        </label>
                      </div>
                      <div>
                        <div>課程地點</div>
                        <label>
                          <input
                            type="checkbox"
                            value="藏月弓道場"
                            name="location"
                            checked={filters.location.includes("藏月弓道場")}
                            onChange={handleFilterChange}
                          />
                          藏月弓道場
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="岡達弓道場"
                            name="location"
                            checked={filters.location.includes("岡達弓道場")}
                            onChange={handleFilterChange}
                          />
                          岡達弓道場
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="駁二弓道場"
                            name="location"
                            checked={filters.location.includes("駁二弓道場")}
                            onChange={handleFilterChange}
                          />
                          駁二弓道場
                        </label>
                      </div>
                      {/* <button className="btn" onClick={applyFilters}>
                        送出篩選條件
                      </button> */}
                      <button className="btn" onClick={clearFilters}>
                        清除所有篩選條件
                      </button>
                    </div>
                  </Collapse>
                  {/* 排序 */}
                  <Form.Select
                    className="btn btn-outline-primary dropdown-toggle "
                    aria-label="Default select example"
                    onChange={handleSortOrderChange}
                    value={sortOrder}
                  >
                    <option value="default">
                      預設排序
                    </option>
                    <option value="highToLow">價格由高至低</option>
                    <option value="lowToHigh">價格由低至高</option>
                    <option value="newest">最新上架日期</option>
                  </Form.Select>
                </div>
                {/* 每頁幾筆 */}
                <div className="per-page align-items-center d-flex">
                  每頁顯示
                  <Form.Select
                    className="btn btn-primary dropdown-toggle"
                    aria-label="Default select example"
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </Form.Select>
                  筆
                </div>
              </div>

              {/* filterBtn元件到此結束 */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <BreadCrumbCourse currentPage="所有課程" />
      </div>
      {/* 所有課程card */}
      <div className="course-list container">
        <Container>
          {currentItems.map((data) => {
            return <CourseListItemCard key={data.id} CourseData={data} />;
          })}
        </Container>
      </div>
      {/* 把luna-pagination拆進來 */}
      {/* btn */}
      <div className=" page-btns d-flex justify-content-end mb-3">
        <div className="btn-group me-2 rounded-0" role="group">
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="fa-solid fa-arrow-left"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <li className="list-unstyled" key={index}>
              <button className="btn" 
              onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fa-solid fa-arrow-right"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </button>
        </div>
      </div>
      {/* luna-pagination到此結束 */}
    </>
  );
}
export default CourseList;
