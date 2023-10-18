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

const getOne = async (where) => {
  const row = await findOne(table, where);
  return row;
};

const getFilter = async (where, order) =>{
  const { rows } = await find(table, where, order)
  return rows;
};

const getDisplay = async (where, order, limit, offset) =>{
  const { rows } = await find(table, where, order, limit, offset);
  return rows;
};

const getCate = async (where) => {
  const { rows } = await find(table, where);
  return rows;
};

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

const searchCourse = async (where) => {
  const { rows } = await find(table, where);
  return rows;
}; 

const updateCourse = async (id, data) => {
  await updateById(table, id, data);

}

export { getAllCourse, getCourseById, getCoursePageAsc, searchCourse, getOne, getFilter, getDisplay, getCate, updateCourse };