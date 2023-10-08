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

// 定義資料庫表格名稱
const table = "product";
// 所需的資料處理函式

const getLimit = async (aa) => {
  const where = ''
  const order = { id: "ASC" };
  const limit = aa
  const { rows } = await find(table, where, order, limit);
  return rows;
};

// 抓全部產品的程式碼
const getAllProduct = async () => {
  const { rows } = await find(table);
  return rows;
};
// const alldata = getAllProduct()
// const aa = alldata.id
// console.log(alldata);
// 查詢產品
const searchProduct = async (where) => {
  const { rows } = await find(table, where);
  return rows;
};

// 上面定義的函式都要放進來導出
export { getLimit, getAllProduct, searchProduct };
