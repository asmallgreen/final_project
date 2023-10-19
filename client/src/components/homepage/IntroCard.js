import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaShop } from "react-icons/fa6";
import Link from "next/link";

export default function IntroCard(props) {
  const { introImg, introTitle, introCat, introHref } = props;
  return (
    <>
    <Link href={introHref}
    className="desktop-none text-decoration-none">
      <div className="intro-card">
        <img
          className="intro-card-img"
          src={introImg}
          alt=""
        ></img>
        <div className="intro-card-text">
          <div className="intro-card-title">{introTitle}</div>
          <div className="intro-card-content">{introCat}</div>
          <div
          // href={introHref}
          className="intro-card-btn text-decoration-none">
            <div className="arrow-line"></div>
            <div className="text-btn">商城</div>
            <div className="icon">
              <FaShop />
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
}
