import React, { useState, useRef, useEffect, useCallback } from "react";
import { Rate, Avatar } from "antd";
import Collapse from "@mui/material/Collapse";

export default function CommentCard(props) {
  const {
    member_avatar,
    member_name,
    rating_score,
    comment_time,
    comment_content,
  } = props;

  const [checked, setChecked] = useState(false);
  const contentBoxRef = useRef(null);
  const textContainerRef = useRef(null);

  const checkHeight = useCallback(() => {
    if (textContainerRef.current) {
      const textContainerHeight = textContainerRef.current.clientHeight;
      if (textContainerHeight > 70) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, []);

  useEffect(() => {
    // 在组件初次渲染时检查高度
    checkHeight();

    // 监听窗口大小变化以实时检查高度
    window.addEventListener("resize", checkHeight);

    return () => {
      // 在组件卸载时移除监听器
      window.removeEventListener("resize", checkHeight);
    };
  }, [checkHeight]);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <div className="comment-card container p-4 mb-3">
        <div className="comment-card-header d-flex mb-2">
          <Avatar
            className=""
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
        <div className="comment-card-content mt-3">
          <div className="comment-content-box" ref={contentBoxRef}>
            <Collapse in={checked} collapsedSize={70}>
              <div ref={textContainerRef}>{comment_content}</div>
            </Collapse>
          </div>
          {checked && (
            <button className="btn" onClick={handleChange}>
              {checked ? "收起" : "更多"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}