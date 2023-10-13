// 資料庫查詢處理函式
import {
  find,
  count,
  findOneById,
  insertOne,
  insertMany,
  remove,
  updateById,
  cleanTable,
  findOne,
} from "./base.js";

const table = "syllabus";

// 取得所有資料
// const getAllSyllabus = async () => {
//   const { rows } = await find(table);
//   return rows;
// };

// 取得單筆資料
const getSyllabusByCourseId = async (courseId) => {
  const where = { course_id: courseId };
  const { rows } = await find(table, where);
  return rows;
};

export { getSyllabusByCourseId };
