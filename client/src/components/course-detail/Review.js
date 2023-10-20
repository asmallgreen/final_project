import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Review(props) {
  const { ratingCourseData, memberData } = props;
  // 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredCourses, setFilteredCourses] = useState([]);
  //排序
  const [sortOrder, setSortOrder] = useState("default");
  //  console.log(filteredCourses);
  // console.log(ratingCourseData)
  // 整合課程資料與會員資料，並使用useEffect控制無限迴圈
  useEffect(() => {
    // console.log(ratingCourseData);
    const integratedData = ratingCourseData.map((rating) => {
      const member = memberData.rows.find((m) => m.id === rating.member_id);
      const createdDate = rating.created_at.split(" ")[0]; // 提取年月日部分

      return {
        id: rating.id,
        member_img: member ? member.member_img : null,
        name: member ? member.name : null,
        score: rating.score,
        comment: rating.comment,
        created_at: createdDate,
      };
    });

    setFilteredCourses(integratedData);
  }, [ratingCourseData, memberData.rows]);

  // 計算當前頁數的數據長度
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // 排序條件篩選
  const sortedAndFilteredCourses = filteredCourses.sort((a, b) => {
    if (sortOrder === "highToLow") {
      return b.score - a.score;
    } else if (sortOrder === "lowToHigh") {
      return a.score - b.score;
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

  // console.log(filteredCourses);
  return (
    <>
      <div className="review-container container">
        {/* 排序 */}
        <div className="funtion-btns">
          <Form.Select
            className="btn btn-outline-primary dropdown-toggle "
            aria-label="Default select example"
            onChange={handleSortOrderChange}
            value={sortOrder}
          >
            <option value="default">
              預設排序
            </option>
            <option value="highToLow">評分最高</option>
            <option value="lowToHigh">評分最低</option>
            <option value="newest">最新評論</option>
          </Form.Select>
          {/* 分頁 */}
          <div className="per-page align-items-center d-flex">
            每頁顯示
            <Form.Select
              className="btn dropdown-toggle"
              aria-label="Default select example"
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Select>
          </div>
        </div>
        {
          currentItems && currentItems.length > 0 ? (
            currentItems.map((item) => (
              <CommentCard
                key={item.id}
                member_avatar={item.member_img}
                member_name={item.name}
                rating_score={item.score}
                comment_time={item.created_at}
                comment_content={item.comment}
              />
            ))
          ) : (
            <div className="no-comment text-center py-5 my-3">目前沒有評論</div>
          )
        }

        {/* 把luna-pagination拆進來 */}
        {/* btn */}
        <div className=" page-btns d-flex justify-content-end">
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
                <button className="btn" onClick={() => paginate(index + 1)}>
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
      </div>
    </>
  );
}
