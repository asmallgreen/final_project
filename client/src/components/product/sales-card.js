// 產品頁=>優惠專區(橫式)卡片樣式
import React from "react";
import Link from "next/link";
export default function SalesCard(props) {
  const { filterSaleProduct } = props;
  const idData = filterSaleProduct.id;
  return (
    <>
      <div className="sales">
        <div className="sales-row">
          <div className="card p-0 m-2">
            <div className="d-flex">
              <Link href={`/product/${idData}`} className="img">
                <img src={filterSaleProduct.img1} alt=""></img>
              </Link>
              <div className="content d-flex flex-column justify-content-between">
                <div className="tags d-flex">
                  <div
                    className={
                      filterSaleProduct.launched === 1
                        ? "tag1 text-center me-2"
                        : "d-none"
                    }
                  >
                    NEW
                  </div>
                  <div
                    className={
                      filterSaleProduct.hot === 1
                        ? "tag2 text-center"
                        : "d-none"
                    }
                  >
                    HOT
                  </div>
                </div>
                <div className="product-name">{filterSaleProduct.name}</div>
                <div className="price">NT${filterSaleProduct.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
