import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function LunaPagination(props) {
  const router = useRouter();
  // 資料總筆數
  // const [btnState, setBtnState] = useState(false)
  const { dataLength, pageLength, limit } = props;
  const [pageIndex, setPageIndex] = useState([]);
  const [localPage, setLocalPage] = useState();
  console.log("每頁顯示:", limit);
  console.log("資料筆數:", dataLength);
  console.log("總頁數:", pageLength);
  console.log("現在頁數:", localPage);
  // useEffect(() => {
  //   console.log(dataLength);
  //   console.log(pageLength);
  //   props.setPage(localPage);
  //   getCurrentPage();
  //   setPageIndex(Array.from({ length: pageLength }, (_, index) => index + 1));
  // }, []);
  const getCurrentPage = (page) => {
    setLocalPage(page);
    props.setPage(page);
  };
  
  const handlePrev = () => {
    localPage > 1 ? setLocalPage(localPage - 1) : setLocalPage(localPage);
    console.log(localPage);
  };
  const handleNext = () => {
    localPage < pageLength
      ? setLocalPage(localPage + 1)
      : setLocalPage(localPage);
      console.log(localPage);
  };
  useEffect(() => {
   console.log(localPage);
  //  handlePrev()
  }, [localPage]);
  useEffect(() => {
    setPageIndex(Array.from({ length: pageLength }, (_, index) => index + 1));
    setLocalPage(1);
  }, [limit, pageLength]);

  useEffect(() => {
    props.setPage(localPage);
  }, [localPage]);

  return (
    <>
      {/* btn */}
      <div className=" page-btns d-flex justify-content-end">
        <div className="btn-group me-2 rounded-0" role="group">
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="fa-solid fa-arrow-left"
              onClick={handlePrev}
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
              onClick={handleNext}
            />
          </button>
        </div>
      </div>
    </>
  );
}
