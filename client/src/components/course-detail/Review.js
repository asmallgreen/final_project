import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import axios from "axios";
import { set } from "lodash";

export default function Review(props) {
  const { ratingCourseData, memberData } = props
  // console.log(ratingCourseData)
  // console.log(memberData.rows)

  const mergedData = memberData.rows.map((member) => {
    const ratingInfo = ratingCourseData.find((rating) => rating.member_id === member.id);
    return {
      member_img: member.member_img,
      name: member.name,
      score: ratingInfo ? ratingInfo.score : null,
      comment: ratingInfo ? ratingInfo.comment : null,
      created_at: ratingInfo ? ratingInfo.created_at : null,
    };
  });
  
  console.log(mergedData);
  return (
    <>

      <div className="review-container container">
        {mergedData.map((item) => (
          <CommentCard
            Key={item.id}
            member_avatar={ item.member_img }
            member_name={ item.name }
            rating_score={item.score}
            comment_time={item.created_at}
            // comment_title={comment_title}
            comment_content={item.comment}
          />
        ))}
      </div>
    </>
  );
}
