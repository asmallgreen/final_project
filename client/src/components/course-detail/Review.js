import React from "react";
import CommentCard from "./CommentCard";  

export default function Review(props) {
  const { ratingCourseData, memberData } = props
  // console.log(ratingCourseData)
  // console.log(memberData.rows)

  // const mergedData = memberData.rows.map((member) => {
  //   const ratingInfo = ratingCourseData.find((rating) => rating.member_id === member.id);
  //   return {
  //     member_img: member.member_img,
  //     name: member.name,
  //     score: ratingInfo ? ratingInfo.score : null,
  //     comment: ratingInfo ? ratingInfo.comment : null,
  //     created_at: ratingInfo ? ratingInfo.created_at : null,
  //   };
  // });

  const integratedData = ratingCourseData.map((rating) => {
    const member = memberData.rows.find((m) => m.id === rating.member_id);
    const createdDate = rating.created_at.split(' ')[0]; // 提取年月日部分

    return {
      member_img: member ? member.member_img : null,
      name: member ? member.name : null,
      score: rating.score,
      comment: rating.comment,
      created_at: createdDate,
    };
  });
  
  console.log(integratedData);
  return (
    <>

      <div className="review-container container">
        {integratedData.map((item) => (
          <CommentCard
            Key={item.id}
            member_avatar={ item.member_img }
            member_name={ item.name }
            rating_score={item.score}
            comment_time={item.created_at}
            comment_content={item.comment}
          />
        ))}
      </div>
    </>
  );
}
