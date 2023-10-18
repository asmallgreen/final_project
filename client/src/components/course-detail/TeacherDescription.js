import React from "react";

export default function TeacherDescription(props) {
  const {teacherPhoto, teacherName, teacherRank, teacherParagraph} = props
  //假資料
  // const [teacherPhoto, teacherName, teacherRank, teacherParagraph] = [
  //   "/images/teacher/teacher_1.webp",
  //   "小明",
  //   "鍊士 六段",
  //   "擁有超過十五年的弓道經驗，曾受訓於多位知名大師並在國際和國內比賽中屢獲殊榮。他的弓道之旅始於年輕時，對日本文化和武道產生浓厚興趣，逐漸精通這門藝術。<br/><br/>教學風格強調基本功和技術細節，注重心靈平靜和集中力。啟發學生發掘潛力。無論您的經驗或年齡如何，他都調整課程以滿足需求，確保每位學生在弓道中進步。"
  // ];

  return (
    <>
      <div className="teacher-description-container container">
        <div className="teacher-avatar ">
          <img
            src={teacherPhoto}
            alt=""
          ></img>
        </div>
        <div className="teacher-intro ">
          <h3 className="teacher-name">{teacherName}</h3>
          <div className="teacher-rank">{teacherRank}</div>
          <div className="teacher-paragraph" dangerouslySetInnerHTML={{__html: teacherParagraph}}></div>
        </div>
      </div>
    </>
  );
}
