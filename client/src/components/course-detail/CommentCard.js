import React, { useState, useRef, useEffect } from "react";
import { Rate, Avatar } from "antd";
import Collapse from "@mui/material/Collapse";

export default function CommentCard(props) {
  const {
    member_avatar,
    member_name,
    rating_score,
    comment_time,
    comment_title,
    comment_content,
  } = props;
  // console.log(member_avatar)
  // const [showFullContent, setShowFullContent] = useState(false);
  // const toggleContent = () => {
  //   setShowFullContent(!showFullContent);
  // };
  // 處理內容超過高度的摺疊狀態
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // 處理低於折疊高度隱藏按鈕的useRef
  const contentBoxRef = useRef(null);
  useEffect(() => {
    if (contentBoxRef.current) {
      const contentBoxHeight = contentBoxRef.current.clientHeight;
      if (contentBoxHeight <= 70) {
        setChecked(false);
      }
    }
  }, [comment_content]);

  return (
    <>
      <div className="comment-card container p-4 mb-3 ">
        <div className="comment-card-header d-flex mb-2">
          <Avatar
            className=""
            // src={`/Duo/${member_avatar}`}
            src={`/Duo/${member_avatar}`}
            size={{
              xs: 40,
              xl: 65,
            }}
          />
          <div className="comment-card-info">
            <div className="comment-card-info-text">
              <div className="member-name">{member_name}</div>
              <div className="comment-time">{comment_time}</div>
            </div>
            <Rate
              disabled
              defaultValue={rating_score}
              className="comment-rating"
            />
          </div>
        </div>
        <div className="comment-card-content mt-3 ">
          <div className="comment-content-box" ref={contentBoxRef}>
            <Collapse collapsedSize={70} in={checked}>
              {comment_content}
            </Collapse>
          </div>
          {contentBoxRef.current && contentBoxRef.current.clientHeight > 69 && (
            <button className="btn" onClick={handleChange}>
              {checked ? "收起" : "更多"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
