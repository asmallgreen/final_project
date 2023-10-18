import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function BreadCrumb(props) {
  const { currentPage } = props;
  // let currentLink;
  const [currentLink, setCurrentLink] = useState()
 
  const router = useRouter();
  const [pathnameValue, setPathNameValue] = useState();
  // 在 useEffect 中監聽路由的變化
  useEffect(()=>{
    
// console.log(currentLink);
  },[currentLink])
  useEffect(()=>{
    switch (currentPage) {
      case "所有商品":
        setCurrentLink('')
        break;
      case "良弓":
        setCurrentLink(1)
        break;
      case "羽箭":
        setCurrentLink(2)
        break;
      case "道服":
        setCurrentLink(3)
        break;
      case "其他":
        setCurrentLink(4)
        break;
    }
  },[currentPage])
  useEffect(() => {
    
    // 在這裡可以根據路由的不同值改變相應的內容
    // 更新內容
    // ...
  }, [router.pathname]);
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
            商品
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link
            href={`/product${currentLink == null ? "" : '/category'}/${currentLink == null ? "" : currentLink}`}
            className="crumb-link"
          >
            {currentPage}
          </Link>
        </div>
      </div>
      {/* <div className="bread-crumb d-flex align-items-center">
        <div className="crumb-item">
          <Link href="/" className="crumb-link">
            首頁
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/product" className="crumb-link">
            
          </Link>
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/product" className="crumb-link">
            
          </Link>
        </div>
      </div> */}
    </>
  );
}
