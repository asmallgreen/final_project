import React, { useEffect, useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import ModalAttr from "./modal-attr";
import ModalSort from "./modal-sort";
// note props子傳父:
// 父元件 在引入的子元件後面加上屬性={處理子元件傳遞回來的function}
// handle函式(接收參數)=>{要處理的事ex:更新值}
export default function FilterBtns(props) {
  const { filterdataLength } = props;
  const [attrModal, setAttrModal] = useState();
  const [sortModal, setSortModal] = useState();
  const [localLimit, setLocalLimit] = useState(props.limit);
  const [searchName, setSearchName] = useState();

  const handleSearchName = (name) => {
    setSearchName(name);
    // console.log(name);
  };
  props.searchName(searchName);
  //子元件的屬性
  // console.log(props);
  const handleAttrChange = (attrState) => {
    props.setAttr(attrState);
  };
  const handleSortChange = (sortState) => {
    // 在这里处理从子组件传递回来的 sortState
    // console.log(sortState);
    props.setSort(sortState);
    // 进行其他操作...
  };
  // ******************************

  //篩選&排序Modal
  //觸發篩選modal
  const handleAttrModal = () => {
    setAttrModal(
      attrModal ? (
        ""
      ) : (
        <ModalAttr
          attrChange={handleAttrChange}
          searchName={handleSearchName}
        />
      )
    );
  };
  //觸發排序modal
  const handleSortModal = (sortState) => {
    setSortModal(sortModal ? "" : <ModalSort sortChange={handleSortChange} />);
  };
  // ******************************

  // 狀態用來存儲每頁幾筆狀態
  const handleClick = useCallback((e) => {
    const limitValue = e.target.value;
    setLocalLimit(limitValue);
    props.setLimit(limitValue);  // 在這裡即時更新父級組件
  }, [props]);

  useEffect(() => {
    // console.log(searchName);
  }, [searchName]);
  
  useEffect(() => {
    // 在這裡即時更新父級組件，但避免初次渲染時執行
    if (localLimit !== props.limit) {
      // 使用異步操作以確保在渲染階段結束後執行狀態更新
      setTimeout(() => {
        props.setLimit(localLimit);
      }, 0);
    }
  }, [localLimit, props.limit, props.setLimit]);

  

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
            篩選商品 ({filterdataLength})
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            // 觸發handleSortModal函式
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
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
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
