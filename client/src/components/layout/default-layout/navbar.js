import React from "react";
//fontawesome
import{ FaShoppingCart, FaUser, FaSearch} from "react-icons/fa"
import Link from 'next/link';
import { Button } from "react-bootstrap";
import { useAuthJWT } from "@/hooks/use-auth-jwt";

export default function Navbar() {
  const {authJWT , setAuthJWT} = useAuthJWT()
  return (
    <>
      {/* 桌機版nav */}
      <div className="table-nav position-relative d-flex align-items-center">
        <ul className="nav position-absolute top-0 d-flex justify-content-center align-items-center">
          <li className="list-unstyled">
            <a href="/product">關於良弓</a>
          </li>
          <li className="list-unstyled product-page">
            <a href="/product">商品介紹</a>

            <div className="hover-type d-flex justify-content-center position-absolute align-items-center">
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">弓</span>
                </div>
              </div>
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">箭</span>
                </div>
              </div>
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">道服</span>
                </div>
              </div>
              <div className="box">
                <img src="/images/nav/type1.png" />
                <div className="text">
                  <span className="text-bottom">其他</span>
                </div>
              </div>
            </div>
            <div className="hover-space position-absolute"></div>
          </li>
          <li className="list-unstyled">
            <a href="/product">弓道課程</a>
          </li>
          <li className="list-unstyled">
            <a href="/product">場地租借</a>
          </li>
          <li className="list-unstyled">
            <a href="/product">聯絡我們</a>
          </li>
        </ul>
        <ul className="nav-fk d-flex position-absolute top-0 end-0 align-items-center">
          <li className=" align-items-center list-unstyled d-flex  position-relative">
            <input
              className="form-control ms-3 rounded-5 "
              type="text"
              placeholder="請輸入商品名稱"
            />
            <FaSearch className="fa-magnifying-glass position-absolute" />
          </li>
          <li className="list-unstyled">
            <FaShoppingCart className="fa-cart-shopping" />
          </li>
          <li className="list-unstyled">
            <Link href='/member' className="text-decoreation-none"><FaUser className="fa-user" /></Link>
          </li>
          <li className="list-unstyled">
            {authJWT.isAuth? (<Button onClick={()=>{
              setAuthJWT({
                isAuth:false,
                memberData: {
                  id: 0,
                  account: '',
                  name: '',
                  email: '',
                  level: '',
                  created_date: '',
              }
              })
            }}>登出</Button>)
            :
            (<Button onClick={()=>{
              setAuthJWT({
                isAuth:true,
                memberData: {
                  id: 1,
                  account: 'abc',
                  name: 'Harry Potter',
                  email: 'harry@gmail.com',
                  level: '2',
                  created_date: '2023-08-21',
              }
              })
            }}>一鍵登入</Button>)}
            
            
          </li>
          <li className="list-unstyled">
            {authJWT.isAuth?'登入中':'未登入'}
          </li>
        </ul>
      </div>
    </>
  );
}
