import Link from "next/link";
import React from "react";

export default function Logobar() {
  return (
    <>
      <div className="table-logo-bar d-flex justify-content-center align-items-center">
        <Link href="/">
          <img className="logo-img" src="/logo-img.svg" />
          <img className="logo-text" src="/logo-text.svg" />
        </Link>

      </div>
    </>
  );
}
