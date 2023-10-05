import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
export default function LunaPagination() {
  return (
    <>
      {/* btn */}
      <div className=" page-btns d-flex justify-content-end">
        <div className="btn-group me-2 rounded-0" role="group">
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="fa-solid fa-arrow-left"
            />
          </button>
          <button className="btn">1</button>
          <button className="btn">2</button>
          <button className="btn">3</button>
          <button className="btn">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fa-solid fa-arrow-right"/>
          </button>
        </div>
      </div>
    </>
  );
}
