import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetAll() {
  const [AllCourseDate, setAllCourseDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/course/"
        );
        console.log("伺服器回應:", response.data.allCourse);
        setAllCourseDate(response.data.allCourse);
      } catch (error) {
        console.error("錯誤：請確認後台API功能", error);
      }
    };

    fetchData(); // 呼叫包裹的 async 函數
  }, []);
  console.log(AllCourseDate);
  return AllCourseDate!==null ? <div>{AllCourseDate[0].name}</div> : <div>loading</div>
    
    {/* <div>{AllCourseDate[0].name}</div> */}
  
}
