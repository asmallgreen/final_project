import React from "react";
import Link from "next/link";

export default function BreadCrumb() {
  return (
    <>
      <div className="bread-crumb d-flex align-items-center">
        <div className="crumb-item">
          <Link href="/" className="mx-4">
            首頁
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/product" className="mx-4">
            商店
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/product" className="mx-4">
            所有商品
          </Link>
        </div>
      </div>
    </>
  );
}
