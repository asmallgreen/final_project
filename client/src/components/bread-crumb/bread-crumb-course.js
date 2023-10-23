import React from "react";
import Link from "next/link";

export default function BreadCrumbCourse(props) {
  const { currentPage } = props;
  return (
    <>
      <div className="bread-crumb d-flex align-items-center">
        <div className="crumb-item">
          <Link href="/" className="crumb-link">
            首頁
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/course" className="crumb-link">
            課程
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href={`/course/${currentPage.id == null ? "" : currentPage.id}`} className="crumb-link">
            {currentPage.name == null ? "所有課程" : currentPage.name}
          </Link>
        </div>
      </div>
    </>
  );
}
