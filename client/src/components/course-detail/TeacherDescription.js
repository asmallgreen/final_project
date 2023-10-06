import React from "react";

export default function TeacherDescription() {
  //假資料
  const [teacherAvatar, teacherName, teacherRank, teacherParagraph] = [
    "https://github.com/asmallgreen/final_project/blob/Jim/client/public/images/teacher/teacher_2.jpg?raw=true",
    "小明",
    "鍊士 六段",
    "小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師小明是一個很棒的老師"
  ];

  return (
    <>
      <div className="teacher-description-container container d-flex">
        <div className="teacher-avatar ">
          <img
            src={teacherAvatar}
            alt=""
          ></img>
        </div>
        <div className="teacher-intro ">
          <h3 className="teacher-name">{teacherName}</h3>
          <div className="teacher-rank">{teacherRank}</div>
          <div className="teacher-paragraph">{teacherParagraph}</div>
        </div>
      </div>
    </>
  );
}
