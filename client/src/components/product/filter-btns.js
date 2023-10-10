import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import ModalAttr from "./modal-attr";
import ModalSort from "./modal-sort";

export default function FilterBtns(props) {
  // const {limit} = props;
  // 狀態用來存儲每頁幾筆狀態
  const [localLimit, setLocalLimit] = useState(props.limit);
  const handleClick = (e) => {
    const limitValue = e.target.value;
    // setLocalLimit(limitValue)
    setLocalLimit(limitValue);

  };
  // const handleInputChange = (e) => {
  //   // 在 input 變更時更新 localLimit
  //   setLocalLimit(e.target.value);
  // };
  // console.log(localLimit);
useEffect(()=>{
  // console.log(localLimit);
  props.setLimit(localLimit);
},[handleClick])

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
            //  onChange={handleInputChange}
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
            // onChange={handleInputChange}
            onChange={handleClick}
            
            // 如果你希望設定預設值，可以透過 value 屬性設定
            value={localLimit}
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
