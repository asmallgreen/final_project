import { useEffect, useState } from "react";
import { useCourseCart } from "@/hooks/use-course-cart";
import { FaTrashAlt } from "react-icons/fa";

export default function List() {
  // 使用hooks 解出所需的狀態與函式(自context)
  const { courseCart, courses, removeCourse } = useCourseCart();

  // 修正 Next hydration 錯誤
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  // fix end

  return (
    <div>
      <div className="thead row text-center">
        <div className="col">商品</div>
        <div className="col">單價</div>
        <div className="col">小計</div>
        <div className="col">移除</div>
      </div>
      {courses.map((v, i) => {
        return (
          <div className="tbody row text-center align-items-center" key={v.id}>
            <div className="col-3 d-flex justify-content-center align-items-center">
              <img src="/images/member/default_member.png" height={50} alt="" />
              <div className="px-2">{v.name}</div>
            </div>
            <div className="col">{v.price}</div>
            <div className="col">{v.itemTotal}</div>
            <div className="col">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  removeCourse(v.id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
