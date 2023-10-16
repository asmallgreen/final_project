import React, { useEffect } from "react";
import Link from "next/link";
export default function RecommendedCard(props) {
  const { filterRecommendProduct } = props;
  // const idData = filterRecommendProduct.id;
  useEffect(() => {
    console.log(filterRecommendProduct);
  }, [filterRecommendProduct]);

  return (
    <>
      <div className="recommend-cards-area">
        <div className="recommend-cards">
          <div className="rows">
            <div className="card">
              <Link
                href={`/product/${123}`}
                className="img position-relative"
              >
                <img src={filterRecommendProduct.img1} alt=""></img>
                <div className="tag position-absolute">NEW</div>
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
