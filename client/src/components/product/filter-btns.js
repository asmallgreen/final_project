import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
export default function FilterBtns() {
  return (
    <>
      {/* btn-group */}
      <div className="wrap">
        {/* 排序篩選 */}
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button type="button" className="btn btn-outline-primary">
            <FontAwesomeIcon
              icon={faFilter}
              className="fa-solid fa-filter"
            />
            篩選商品 ({5})
          </button>
          <button type="button" className="btn btn-outline-primary">
            <FontAwesomeIcon icon={faSort} className="fa-solid fa-sort" />
            排序
          </button>
        </div>
        {/* 每頁幾筆 */}
        <div className="per-page align-items-center d-flex">
          每頁顯示
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {5}
          </button>
          筆
        </div>
      </div>
    </>
  );
}
