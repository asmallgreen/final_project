import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { FaShop } from "react-icons/fa6";

export default function IntroCard(props) {
  const { introImg, introTitle, introCat } = props;
  return (
    <>
      <div className="intro-card">
        <div
          className="intro-card-img"
          style={{ backgroundImage: `url(${introImg})` }}
        ></div>
        <div className="intro-card-text">
          <div className="intro-card-title">{introTitle}</div>
          <div className="intro-card-content">{introCat}</div>
          <div className="intro-card-btn">
            <div className="arrow-line"></div>
            <div className="text-btn">商城</div>
            <div className="icon">
              <FaShop/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
