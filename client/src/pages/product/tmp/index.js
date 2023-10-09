import ModalAttr from "@/components/product/modal-attr";
import ModalSort from "@/components/product/modal-sort";
import React, { useState } from "react";

export default function FilterModal() {
  const [attrModal, setAttrModal] = useState();
  const handleAttrModal = () => {
    setAttrModal(attrModal ? '' : <ModalAttr />);
  };
  const [sortModal, setSortModal] = useState()
  const handleSortModal = () => {
    setSortModal(sortModal ? '' : <ModalSort />);
  };


  return (
    <>
      <div className="btn btn-secondary m-3" onClick={handleAttrModal}>
        篩選
      </div>
      {attrModal}
      <div className="btn btn-secondary m-3" onClick={handleSortModal}>
        排序
      </div>
      {sortModal}
    </>
  );
}
