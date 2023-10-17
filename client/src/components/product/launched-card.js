import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";

function LaunchedCard(props) {
  const { filterNewProduct } = props;
  // console.log(filterNewProduct);
  const idData = filterNewProduct.id;

  useEffect(() => {
    // 在组件加载时调用 handleInfo
    // handleInfo();
  }, []); // 空依赖数组确保只在组件加载时调用一次

  return (
    <div className="normal-cards-area">
      <div className="normal-cards">
        <div className="rows">
          <div className="card">
            {/* <div className="img position-relative"> */}
            <Link href={`/product/${idData}`} className="img position-relative">
              <img src={filterNewProduct.img1} alt="Product Image" className=""></img>
              <div className="tags d-flex">
                <div
                className={
                  filterNewProduct.launched === 1
                    ? "tag1 position-absolute"
                    : "d-none"
                }
              >
                NEW
              </div>
              <div
                className={
                  filterNewProduct.hot === 1
                    ? "tag2 position-absolute"
                    : "d-none"
                }
              >
                HOT
              </div>
              </div>
              
            </Link>

            {/* </div> */}
            <div className="content">
              <div className="product-name">{filterNewProduct.name}</div>
              <div className="description">{filterNewProduct.summary}</div>
              <div className="price text-end">NT${filterNewProduct.price}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Link href={`/product/${idData}`} className="normal-cards-area">

    // </Link>
  );
}

export default LaunchedCard;
