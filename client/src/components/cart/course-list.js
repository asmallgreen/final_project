import { useEffect, useState } from "react";
import { useCourseCart } from "@/hooks/use-course-cart";

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
      <table
        className="table"
        cellPadding="0"
        border="1"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>名稱</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
            <th>移除</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name} </td>
                <td>{v.price}</td>
                <td>{v.quantity}</td>
                <td>{v.itemTotal}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeCourse(v.id);
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        items: {courseCart.totalItems} / total: {courseCart.cartTotal}
        <br />
        {courseCart.isEmpty && "購物車為空"}
        <hr />
      </div>
    </div>
  );
}
