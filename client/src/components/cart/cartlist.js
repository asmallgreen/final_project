import React from "react";

import { useCourseCart } from "@/hooks/use-course-cart";
import { useProductCart } from "@/hooks/use-product-cart";
import { Collapse } from "antd";

import { ProductList, CourseList } from "./order-list";

export default function CartList() {
  const { productCart, products } = useProductCart();
  const { courseCart, courses } = useCourseCart();


  //折疊面板
  const items = [
    {
      key: "1",
      label: (
        <div className="d-flex justify-content-around">
          <div>+</div>
          <div> 訂單明細</div>
          <div>+</div>
        </div>
      ),
      children: (
        <>
          {productCart.totalItems > 0 ? <ProductList /> : ""}
          {courseCart.totalItems > 0 ? <CourseList /> : ""}
        </>
      ),
    },
  ];

  return (
    <div className="collapse-cart-list">
      <Collapse items={items} expandIcon={(panelProps) => <></>} ghost />
    </div>
  );
}
