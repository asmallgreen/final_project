import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
export default function FilterBtns() {
  // 狀態用來存儲所選擇的值
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (e) => {
    const selectedOptionValue = e.target.value;
    setSelectedValue(selectedOptionValue);
    console.log("選擇的值:", selectedOptionValue);
  };
  // 篩選&排序
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
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
            onClick={handleButtonClick}
          >
            <FontAwesomeIcon icon={faFilter} className="fa-solid fa-filter" />
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

        {/* modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>篩選商品</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* 在這裡放入你的篩選內容 */}
            {/* 例如篩選表單、條件等 */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              關閉
            </Button>
            {/* 其他按鈕或操作 */}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
