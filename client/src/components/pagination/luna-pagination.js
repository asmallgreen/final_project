import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function LunaPagination(props) {
  const router = useRouter();
  // 資料總筆數
  const { dataLength, pageLength } = props;
  const [localPage, setLocalPage] = useState(props.page);
  // const [localPage, setLocalPage] = useState(1);

  console.log("資料筆數:", dataLength);
  console.log("總頁數:", pageLength);
  console.log("現在頁數:", localPage);

  
  const getCurrentPage = (page) => {
    setLocalPage(page);
  };
  useEffect(() => {
    props.setPage(localPage);
  }, [getCurrentPage]);
  // 迴圈push按鈕數量

  
  
  const pageIndex = [];
  // setPageIndex(index);
  for (let i = 1; i <= pageLength; i++) {
    pageIndex.push(i);
  }
  useEffect(() => {
    getCurrentPage();
    props.setPage(localPage);
  }, [router.pathname]);
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
              return <button className="btn" key={page} onClick={()=>getCurrentPage(page)}>{page}</button>
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
