import React from "react";
import TableBody from "./TableBody";

export default function Syllabus(props) {
  const { syllabusData } = props;


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
          <div className="col-3">
            <div className="table-header">主題</div>
          </div>
          <div className="col-6">
            <div className="table-header">目標</div>
          </div>
        </div>
        
        {syllabusData.map((item) => (
          <TableBody
            Key={item.id}
            week_number={item.times}
            course_date={item.date}
            course_topic={item.topic}
            course_target={item.target}
          />
        ))}

        {/* {syllabusData.map((item, index) => (
          <div className="row" key={index}>
            <div className="col-1">
              <div className="table-data">{item.times}</div>
            </div>
            <div className="col-2">
              <div className="table-data">{item.course_date}</div>
            </div>
            <div className="col-2">
              <div className="table-data">{item.course_topic}</div>
            </div>
            <div className="col-7">
              <div className="table-data">{item.course_target}</div>
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}
