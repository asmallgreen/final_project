import React from "react";

export default function Attributes() {
  return (
    <>
        <div className="attr d-flex">
          <div className="attr-name">材質</div>
          <div className="attr-items d-flex ">
            <div className="item btn">竹</div>
            <div className="item btn">碳</div>
            <div className="item btn">木</div>
            <div className="item btn">鋁</div>
          </div>
         {/* <div className="attr d-flex">
                <div className="attr-name">軸心</div>
                <div className="attr-items d-flex">
                  <div className="item">1913</div>
                  <div className="item">2014</div>
                  <div className="item">7620</div>
                  <div className="item">8023</div>
                </div>
              </div>
              <div className="attr d-flex">
                {" "}
                <div className="attr-name">箭頭長度</div>
                <div className="attr-items">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle mx-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {5}
                  </button>
                </div>
              </div> */}
      </div>
    </>
  );
}
