import React from "react";
import TableBody from "./TableBody";

export default function Syllabus() {
  return (
    <>
      <div className="syllabus-container container">
        <div className="row">
          <div className="col-1">
            <div className="table-header">週次</div>
          </div>
          <div className="col-2">
            <div className="table-header">日期</div>
          </div>
          <div className="col-2">
            <div className="table-header">主題</div>
          </div>
          <div className="col-7">
            <div className="table-header">目標</div>
          </div>
        </div>
        <TableBody
          week_number="第一週"
          course_date="2021/10/10"
          course_topic="課程介紹"
          course_target="學員將了解課程的目標和內容。"
        />
      </div>
    </>
  );
}
