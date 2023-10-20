import React, { useState, useRef, useEffect } from "react";
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

  const [showMore, setShowMore] = useState(false);
  const contentBoxRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const checkHeight = () => {
      if (textContainerRef.current) {
        const textContainerHeight = textContainerRef.current.clientHeight;
        // console.log(textContainerHeight)
        if (textContainerHeight > 80) {
          setShowMore(false); // 默认显示"更多"
        } else {
          setShowMore(true);
        }
      }
    };

    // 在组件初次渲染时检查高度
    checkHeight();

    // 监听窗口大小变化以实时检查高度
    window.addEventListener("resize", checkHeight);

    return () => {
      // 在组件卸载时移除监听器
      window.removeEventListener("resize", checkHeight);
    };
  }, []);

  const toggleContent = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <div className="comment-card container p-4 mb-3">
        <div className="comment-card-header d-flex mb-2">
          <Avatar
            className=""
            src={`http://localhost:3005/${member_avatar}`}
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
              key={rating_score}
            />
          </div>
        </div>
        <div className="comment-card-content mt-3">
        {/* 先放棄這個雞巴按鈕 */}
          {/* <div className="comment-content-box" ref={contentBoxRef}>
            <Collapse in={showMore} collapsedSize={70}>
              <div ref={textContainerRef}>{comment_content}</div>
            </Collapse>
          </div>
          {textContainerRef.current &&
            textContainerRef.current.clientHeight > 80 && ( // 只在高度大于80时显示按钮
              <button className="btn" onClick={toggleContent}>
                {showMore ? "收起" : "更多"}
              </button>
            )} */}
            {comment_content}
        </div>
      </div>
    </>
  );
}
