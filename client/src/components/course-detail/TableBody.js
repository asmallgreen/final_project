import React from "react";

export default function TableBody(props) {
  const { week_number, course_date, course_topic, course_target } = props;
  return (
    <>
      <div className="row">
        <div className="col-1">
          <div className="table-data">{week_number}</div>
        </div>
        <div className="col-2">
          <div className="table-data">{course_date}</div>
        </div>
        <div className="col-3">
          <div className="table-data">{course_topic}</div>
        </div>
        <div className="col-6">
          <div className="table-data">{course_target}</div>
        </div>
      </div>
    </>
  );
}
