import React from "react";
import { Collapse } from "antd";

export default function Faq() {
  const questions = [
    "這門課程適合初學者嗎？",
    "我需要自己準備弓箭嗎？",
    "課程內容包括什麼？",
    "我需要特別的體能嗎？",
    "課程的時間表是什麼樣的？",
    "需要購買額外的裝備嗎？",
    "我可以租借課程所需的裝備嗎？",
    "課程結束後，我可以參加比賽或更高級的課程嗎？",
  ];
  const answers = [
    "是的，「射法八節」 課程專為初學者設計，不需要任何弓道經驗。",
    "大多數課程提供學生使用的弓箭，但您也可以自行攜帶，以便更熟悉自己的設備。",
    "課程將涵蓋基本的弓道姿勢、射擊技巧、安全須知、弓的保養等主題。",
    "不需要特別的體能，但要有基本的體力和耐力以參加課程。",
    "課程的時間表通常因地點和教練而異，您可以向課程提供者查詢詳細的時間安排。",
    "基本的課程通常包括必要的裝備，但您可能需要購買一些個人保護裝備，如手套、腕帶等。",
    "一些課程提供租借弓箭和其他必要的裝備，以供學生使用。您可以向課程提供者詢問關於租借裝備的詳細信息，這有助於節省初期的費用。",
    "當您完成初級課程後，您可以考慮參加更高級的弓道課程或參加弓道比賽，以提高您的技能水平。您的教練將為您提供建議和指導。",
  ];
  const items = [
    {
      key: "1",
      label: <h5>{questions[0]}</h5>,
      children: <p>{answers[0]}</p>,
    },
    {
      key: "2",
      label: <h5>{questions[1]}</h5>,
      children: <p>{answers[1]}</p>,
    },
    {
      key: "3",
      label: <h5>{questions[2]}</h5>,
      children: <p>{answers[2]}</p>,
    },
    {
      key: "4",
      label: <h5>{questions[3]}</h5>,
      children: <p>{answers[3]}</p>,
    },
    {
      key: "5",
      label: <h5>{questions[4]}</h5>,
      children: <p>{answers[4]}</p>,
    },
    {
      key: "6",
      label: <h5>{questions[5]}</h5>,
      children: <p>{answers[5]}</p>,
    },
    {
      key: "7",
      label: <h5>{questions[6]}</h5>,
      children: <p>{answers[6]}</p>,
    },
    {
      key: "8",
      label: <h5>{questions[7]}</h5>,
      children: <p>{answers[7]}</p>,
    },
  ];
  return (
    <>
      <Collapse accordion items={items}></Collapse>
    </>
  );
}
