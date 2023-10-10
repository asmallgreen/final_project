import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function LunaPagination(props) {
  const router = useRouter();
  // 資料總筆數
  const { dataLength, pageLength, limit } = props;

  // const [localPage, setLocalPage] = useState(props.page);
  const [pageIndex, setPageIndex] = useState([]);
  const [localPage, setLocalPage] = useState();
  console.log("每頁顯示:", limit);
  console.log("資料筆數:", dataLength);
  console.log("總頁數:", pageLength);
  console.log("現在頁數:", localPage);

  const getCurrentPage = (page) => {
    setLocalPage(page);
    props.setPage(page);
  };
  useEffect(() => {
    setLocalPage(1);
  }, [limit]);
  useEffect(() => {
    props.setPage(localPage);
    // getCurrentPage()
  }, [localPage]);

  useEffect(() => {
    setPageIndex(Array.from({ length: pageLength }, (_, index) => index + 1));
  }, [pageLength]);

  // 迴圈push按鈕數量

  console.log(pageIndex);
  // setPageIndex(index);
  // for (let i = 1; i <= pageLength; i++) {
  //   pageIndex.push(i);
  // }
  // useEffect(() => {
  //   getCurrentPage();
  //   props.setPage(localPage);
  // }, []);
  return (
    <>
      {/* btn */}
      <div className=" page-btns d-flex justify-content-end">
        <div className="btn-group me-2 rounded-0" role="group">
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="fa-solid fa-arrow-left"
            />
          </button>
          {/* {index.map((page) => {
            <button key={page}>{page}</button>;
            
          })} */}
          {pageIndex.map((page) => {
            return (
              <button
                className="btn"
                key={page}
                onClick={() => getCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          {/* {generateButtons()} */}
          {/* <button className="btn">1</button> */}
          {/* {pageLength.map((data)=>{
            return <button className="btn" key={data}></button>
          })} */}
          {/* <button className="btn">2</button> */}
          {/* <button className="btn">3</button> */}
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fa-solid fa-arrow-right"
            />
          </button>
        </div>
      </div>
    </>
  );
}
