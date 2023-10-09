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

const table = "course";
// 取得所有資料
const getAllCourse = async () => {
  const { rows } = await find(table);
  return rows;
};
// 取得單筆資料
const getCourseById = async (id) => await findOneById(table, id);

export { getAllCourse, getCourseById };
