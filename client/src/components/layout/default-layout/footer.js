import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//fontawesome
import {
  faLocationDot,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <>
              {/* footer */}
      <div className="footer d-flex justify-content-center">
        <div className="logo d-flex flex-column justify-content-center align-items-center">
          <img className="logo-img" src="/logo-img.svg" />
          <img className="logo-text" src="/logo-text.svg" />
        </div>
        <div className="d-flex">
          <div className="button d-flex flex-column rounded-0">
            <div className="btn d-flex justify-content-center align-items-center rounded-0">寫信給良弓</div>
            <div className="btn d-flex justify-content-center align-items-center rounded-0">聯絡客服</div>
          </div>
          <ul className="list-unstyled d-flex flex-column justify-content-between">
            <li>營業時間：10:00-19:00</li>
            <li>連絡電話： 03-4253057</li>
            <li>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="me-2 fa-solid fa-location-dot"
              />
              桃園市中壢區新生路二段421號
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCopyright}
                className="me-2 fa-regular fa-copyright"
              />
              2023良弓制販所
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
