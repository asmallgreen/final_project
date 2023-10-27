import React from 'react'
import Link from 'next/link';

export default function FavCourseCard({courses, toggleCourseCheck}) {
  const handleCheckboxChange = (e, courseId) => {
    e.stopPropagation()
    toggleCourseCheck(courseId);
}


  return (
    <>
    {courses.map((course)=>(
          <div key={course.id} className="course-list-item mb-5 pb-5">
            <div className="course-list-img">
              <img className="course-list-img"src={course.images}></img>
            </div>
            <div className="course-list-text">
            <input type='checkbox' checked={course.checked || false} onClick={(e) => e.stopPropagation()} onChange={(e)=>handleCheckboxChange(e, course.id) }/>
              <div className="title">{course.name}</div>
              <div className="intro">
                {course.description}</div>
              <div className="items pt-2">
                人數限制：{course.capacity}人
                <br />
                報名截止：{course.deadline}
                <br />
                課程時間：
                <br className='d-sm-none'/>
                {course.start_date} — {course.end_date}
              </div>
            </div>
          </div>
    ))}
      
    </>
  )
}
