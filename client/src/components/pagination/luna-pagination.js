import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function LunaPagination(props) {
  const router = useRouter();
  const { dataLength, pageLength, limit } = props;
  const [pageIndex, setPageIndex] = useState([]);
  const [localPage, setLocalPage] = useState();
  // const [pageStyle, setPageStyle] = useState()
  const getCurrentPage = (page) => {
    setLocalPage(page);
    props.setPage(page);
  };
  
  const handlePrev = () => {
    localPage > 1 ? setLocalPage(localPage - 1) : setLocalPage(localPage);
  };
  const handleNext = () => {
    localPage < pageLength
      ? setLocalPage(localPage + 1)
      : setLocalPage(localPage);
  };
  useEffect(() => {
  }, [localPage]);
  useEffect(() => {
    setPageIndex(Array.from({ length: pageLength }, (_, index) => index + 1));
    setLocalPage(1);
    console.log(localPage);
  }, [limit, pageLength]);

  useEffect(() => {
    props.setPage(localPage);
    console.log(localPage);
    // setPageStyle()
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
          {pageIndex.map((page) => {
            return (
              <button
               className={`btn ${localPage === page ? "active" : "btn"}`}
                key={page}
                onClick={() => getCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
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
