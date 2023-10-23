import React, { useEffect } from "react";
import Link from "next/link";
export default function RecommendedCard(props) {
  const { filterRecommendProduct } = props;
  const idData = filterRecommendProduct.id;
  useEffect(() => {
    // console.log(filterRecommendProduct);
  }, [filterRecommendProduct]);

  return (
    <>
      <div className="recommend-cards-area">
        <div className="recommend-cards">
          <div className="rows">
            <div className="card">
              <Link href={`/product/${idData}`} className="img position-relative">
                <img src={filterRecommendProduct.img1} alt=""></img>
                <div className="tags d-flex">
                  <div
                    className={
                      filterRecommendProduct.launched === 1
                        ? "tag1 position-absolute"
                        : "d-none"
                    }
                  >
                    NEW
                  </div>
                  <div
                    className={
                      filterRecommendProduct.hot === 1
                        ? "tag2 position-absolute"
                        : "d-none"
                    }
                  >
                    HOT
                  </div>
                </div>
              </Link>

              <div className="content">
                <div className="product-name">
                  {filterRecommendProduct.name}
                </div>

                <div className="price text-end">
                  NT${filterRecommendProduct.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
