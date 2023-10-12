import { useProductCart } from "@/hooks/use-product-cart";
import { useEffect, useState } from "react";

import { FaTrashAlt } from "react-icons/fa";

export default function List() {
  // 使用商品購物車hooks
  const {
    productCart,
    products,
    plusOneProduct,
    minusOneProduct,
    removeProduct,
  } = useProductCart();

  // 修正 Next hydration 錯誤
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  // fix end

  return (
    <div>
      <div className="thead row text-center">
        <div className="col-3">商品</div>
        <div className="col-2">規格</div>
        <div className="col-2">單價</div>
        <div className="col-2">數量</div>
        <div className="col-2">計</div>
        <div className="col-1">移除</div>
      </div>
      {products.map((v, i) => {
        return (
          <div className="tbody row text-center align-items-center" key={v.id}>
            <div className="col-3 d-flex justify-content-center align-items-center">
              <img src="/images/member/default_member.png" height={50} alt="" />
              <div className="px-2">{v.name}</div>
            </div>
            <div className="col-2">
              <div>{v.detail_1}</div>
              <div>{v.detail_2}</div>
              <div>{v.detail_3}</div>
            </div>
            <div className="col-2">{v.price}</div>
            <div className="col-2">
              <div className="btn-group mr-2" role="group">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    minusOneProduct(v.id);
                  }}
                >
                  -
                </button>
                <button type="button" className="btn btn">
                  {v.quantity}
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    plusOneProduct(v.id);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-2">{v.itemTotal}</div>
            <div className="col-1">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  removeProduct(v.id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
