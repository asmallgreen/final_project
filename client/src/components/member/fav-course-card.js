import React from 'react'

export default function FavCourseCard({courses}) {
  const handleInput = (e) => {
    e.stopPropagation()
}


  return (
    <>
    {courses.map((course)=>(
          <div key={course.id} className="course-list-item">
            <div className="course-list-img"></div>
            <div className="course-list-text">
            <input type='checkbox' onClick={handleInput}/>
              <div className="title">{course.name}</div>
              <div className="intro">
                {course.description}</div>
              <div className="items pt-2">
                人數限制：{course.capacity}人
                <br />
                報名截止：{course.deadline}
                <br />
                課程時間：{course.start_date} — {course.end_date}
              </div>
              <div className="course-rating">
                <div className="stars">
                  <div className="star">1</div>
                  <div className="star">2</div>
                  <div className="star">3</div>
                  <div className="star">4</div>
                  <div className="star">5</div>
                </div>
                <div className="counting">888人已評價</div>
              </div>
              <div className="bottom">
                <h2 className="price">NT${course.price}</h2>
                <div className="btn moreBtn">詳細資訊</div>
              </div>
            </div>
          </div>
    ))}
      
    </>
  )
}
