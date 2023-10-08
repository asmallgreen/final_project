// 產品頁=>新品上架/相關商品卡片樣式
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LaunchedCard(props) {
  const idData = props.filterNewProduct.id;
  // const [productId, setProductId] = useState(idData)
  const handleInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/product/productInfo?id=${idData}`
      );
      const aa = res.data.alldata;
      // setProductId(idData)
      console.log(aa);
      // console.log(productId);
      console.log(idData);
    } catch (err) {
      console.error("Error:", err.msg);
    }
  };

  const { filterNewProduct } = props;

  // ***************test**********************

  // console.log(data);
  // *************************************

  return (
    <>
      <Link
        to={`/product?id=${idData}`}
        onClick={handleInfo}
        className="normal-cards-area "
      >
        <div className="normal-cards">
          <div className="rows">
            <div className="card">
              <div className="img position-relative">
                <img src={filterNewProduct.img1} alt="Product Image"></img>
                <div className="tag position-absolute">NEW</div>
              </div>
              <div className="content">
                <div className="product-name">{filterNewProduct.name}</div>
                <div className="description">{filterNewProduct.summary}</div>
                <div className="price text-end">
                  NT${filterNewProduct.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* <div className="card">
            <div className="img position-relative">
              <img src={filterNewProduct.img1} alt="Product Image"></img>
              <div className="tag position-absolute">NEW</div>
            </div>
            <div className="content">
              <div className="product-name">{filterNewProduct.name}</div>
              <div className="description">{filterNewProduct.summary}</div>
              <div className="price text-end">NT${filterNewProduct.price}</div>
            </div>
          </div> */}

      {/* <div className="card">
        <div className="img position-relative">
         <img src={filterNewProduct.img1}></img>
          <div className="tag position-absolute">NEW</div>
        </div>
        <div className="content">
          <div className="product-name">
            {filterNewProduct.name}
          </div>
          <div className="description">{filterNewProduct.summary}</div>
          <div className="price text-end">NT${filterNewProduct.price}</div>
        </div>
      </div> */}
    </>
  );
}
