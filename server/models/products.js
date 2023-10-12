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

// const executeSql = async (sql, logRows = false, logFields = false) => {
//   // limit log string string length
//   const sqlLog = sql.length < 1500 ? sql : sql.slice(0, 1500) + '...'
//   debug && console.log(sqlLog.bgWhite)

//   try {
//     const [rows, fields] = await pool.execute(sql)
//     debug && logRows && console.log(rows)
//     debug && logFields && console.log(fields)
//     return { rows, fields }
//   } catch (error) {
//     console.log('error occurred: ', error)
//   }
// }


const getOne = async (where) => {
  // const where = {id:1}
  const row  = await findOne(table, where);
  return row
};

const getFilter = async (where, order, limit, offset) => {
  // const where = "";
  // const order = {id: 'ASC'}
  const { rows } = await find(table, where, order, limit, offset);
  return rows;
};

const getNew = async () => {
  const where = { launched: 1 };
  const { rows } = await find(table, where);
  return rows;
};

// 抓全部產品的程式碼
const getAll = async () => {
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
export { searchProduct, getFilter, getNew, getAll, getOne };
