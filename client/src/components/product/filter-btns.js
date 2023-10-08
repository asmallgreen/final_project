import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import ModalAttr from "./modal-attr";
import ModalSort from "./modal-sort";

export default function FilterBtns() {
  // 狀態用來存儲每頁幾筆狀態
  const [selectedValue, setSelectedValue] = useState();
  const handleSelectChange = (e) => {
    const selectedOptionValue = e.target.value;
    setSelectedValue(selectedOptionValue);
    // console.log("選擇的值:", selectedValue);
    getLimit(selectedOptionValue);
  };
  //API送到路由'/'取得每頁幾筆資料
  const getLimit = (newValue) => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3005/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //確保limit值是最新的
          body: JSON.stringify({ limit: newValue }),
        });
        //檢查請求是否成功
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // 解析JSON響應
        const data = await res.json();
        const limitdata = data.limitdata;
        console.log(limitdata);
        console.log("Response from server:", data);

        setLimitData(data.limitdata);
      } catch (err) {
        console.log("err", err.msg);
      }
    })();
  };
  const [limitdata, setLimitData] = useState([]);
  // ******************************
  //篩選&排序Modal
  const [attrModal, setAttrModal] = useState();
  const handleAttrModal = () => {
    setAttrModal(attrModal ? "" : <ModalAttr />);
  };
  const [sortModal, setSortModal] = useState();
  const handleSortModal = () => {
    setSortModal(sortModal ? "" : <ModalSort />);
  };
  // ******************************
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
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAttrModal}
          >
            <FontAwesomeIcon icon={faFilter} className="fa-solid fa-filter" />
            篩選商品 ({5})
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSortModal}
          >
            <FontAwesomeIcon icon={faSort} className="fa-solid fa-sort" />
            排序
          </button>
        </div>
        {/* 每頁幾筆 */}
        <div className="per-page align-items-center d-flex">
          每頁顯示
          <Form.Select
            className="btn btn-primary dropdown-toggle"
            aria-label="Default select example"
            // 添加 onChange 事件處理函數
            onChange={handleSelectChange}
            // 如果你希望設定預設值，可以透過 value 屬性設定
            value={selectedValue}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Form.Select>
          筆
        </div>
      </div>
      <div className="position-absolute filter-modal">
        {attrModal}
        {sortModal}
      </div>
    </>
  );
}
