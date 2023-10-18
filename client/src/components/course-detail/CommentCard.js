import React, { useState } from "react";
import { Rate, Avatar } from "antd";

export default function CommentCard(props) {
  const {
    member_avatar,
    member_name,
    rating_score,
    comment_time,
    comment_title,
    comment_content,
  } = props;

  const [showFullContent, setShowFullContent] = useState(false);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      <div className="comment-card container p-4 ">
        <div className="comment-card-header d-flex mb-2">
          <Avatar
            className=""
            src={member_avatar}
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
            <Rate disabled 
            defaultValue={rating_score}
            className="comment-rating"
             />
          </div>
        </div>
        <div className="comment-card-content mt-3 ">
          <h3>{comment_title}</h3>
          {showFullContent ? (
            <div>
              <div className="hhhh">{comment_content}</div>
              <button className="btn" onClick={toggleContent}>
                收起內容
              </button>
            </div>
          ) : (
            <div>
              <div className="h150px">{comment_content}</div>
              {/* <div className={`blur-block ${showFullContent ? "hidden" : ""}`}>
                {comment_content}
              </div> */}
              <button className="btn" onClick={toggleContent}>
                查看更多
              </button>
            </div>
          )}
          {/* <p>{comment_content}</p> */}
        </div>
      </div>
    </>
  );
}
