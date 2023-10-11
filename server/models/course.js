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

// 取得分頁資料
const getCoursePageAsc = async (limit, offset)=>{
  const where = ''
  const order = {id: 'ASC'}
  const { rows } = await find(table, where, order,limit, offset)
  return rows;
}
// // 取得新課程資料
// const getNewCourse = async () => {
//   const where = { launched : 1 }
//   const { rows } = await find(table, where);
//   return rows;
// } 

const searchCourse = async (where) => {
  const { rows } = await find(table, where);
  return rows;
}; 

export { getAllCourse, getCourseById, getCoursePageAsc, searchCourse };