import React from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export default function Pagination() {
  return (
    <>
      <div className="text-center">
        <ul className="btn-group m-2 list-unstyled">
          <li className="page-btn"><FaAngleDoubleLeft /></li>
          <li className="page-btn">1</li>
          <li className="page-btn">2</li>
          <li className="page-btn">3</li>
          <li className="page-btn">4</li>
          <li className="page-btn">5</li>
          <li className="page-btn"><FaAngleDoubleRight /></li>
        </ul>
      </div>
    </>
  )
}
