import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function BreadCrumb(props) {
  const { currentCate } = props;
  const router = useRouter();
  const [pathnameValue, setPathNameValue] = useState()
  // 在 useEffect 中監聽路由的變化
  useEffect(() => {
    // 在這裡可以根據路由的不同值改變相應的內容
    const currentRoute = router.pathname;
    const asPath = router.asPath
    const route = router.query
    console.log(asPath);
    console.log(route);
    console.log(currentRoute);
    // let pathnameValue = "";
    console.log(pathnameValue);

    // 根據不同的路由值設定不同的 pathnameValue
    // if (currentRoute === "/route1") {
    //   pathnameValue = "路由1的值";
    // } else if (currentRoute === "/route2") {
    //   pathnameValue = "路由2的值";
    // } 
    // 可以根據需求添加其他路由的判斷

    switch(currentRoute){
      case '/product':
        setPathNameValue('商品')
        break;
        case '/course':
          setPathNameValue('弓道課程')
        break;
        case '/venue':
          setPathNameValue('場地')
        break;
    }
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
          <Link href="/product" className="crumb-link">{pathnameValue}</Link>
          
          &gt;
        </div>
        <div className="crumb-item">
          <Link href="/product" className="crumb-link">{pathnameValue}</Link>
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
