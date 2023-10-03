import React from "react";
import Link from "next/link";

export default function BreadCrumb(props) {
  const {  product, breadCate }  = props;
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
          <Link href="/product" className="crumb-link">
            商店{product}
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/product" className="crumb-link">
            {breadCate}
          </Link>
        </div>
      </div>
    </>
  );
}
