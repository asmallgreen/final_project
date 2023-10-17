import React from "react";
import { useCourseCart } from "@/hooks/use-course-cart";
import { useProductCart } from "@/hooks/use-product-cart";

export function ProductList() {
  const { productCart, products } = useProductCart();
  return (
    <div>
      <div className="thead row text-center py-3 fs-6">
        <div className="col">商品</div>
        <div className="col">規格</div>
        <div className="col">單價</div>
        <div className="col">數量</div>
      </div>
      {products.map((v, i) => {
        return (
          <div
            className="tbody row text-center align-items-center py-3 fs-6"
            key={v.id}
          >
            <div className="col d-flex justify-content-center align-items-center">
              <img src={v.product_img} height={75} alt="" />
              <div className="px-2">{v.name}</div>
            </div>
            <div className="col">
              <div>{v.detail_1}</div>
              <div>{v.detail_2}</div>
              <div>{v.detail_3}</div>
            </div>
            <div className="col">{v.price}</div>
            <div className="col">{v.quantity}</div>
          </div>
        );
      })}
    </div>
  );
}

export function CourseList() {
  const { courseCart, courses } = useCourseCart();
  return (
    <div>
      <div className="thead row text-center py-3 fs-6">
        <div className="col">商品</div>
        <div className="col">小計</div>
      </div>
      {courses.map((v, i) => {
        return (
          <div className="tbody row text-center align-items-center py-3 fs-6" key={v.id}>
            <div className="col d-flex justify-content-center align-items-center">
              <img src={v.course_img} height={75} alt="" />
              <div className="px-2">{v.name}</div>
            </div>
            <div className="col">{v.price}</div>
          </div>
        );
      })}
    </div>
  );
}
