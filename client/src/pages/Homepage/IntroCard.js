import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IntroCard(props) {
  const { IntroImg, IntroTitle, IntroCat } = props;
  return (
    <>
      <div className="intro-card">
        <div
          className="intro-card-img"
          style={{ backgroundImage: `url(${IntroImg})` }}
        ></div>
        <div className="intro-card-text">
          <div className="intro-card-title">{IntroTitle}</div>
          <div className="intro-card-content">{IntroCat}</div>
          <div className="intro-card-btn">
            <div className="arrow-line"></div>
            <div className="text-btn">商城</div>
            <div className="icon">
              <FontAwesomeIcon
                icon="fa-solid fa-shop"
                style={{ color: "#0c0c0c" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
