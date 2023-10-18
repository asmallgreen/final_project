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

  const table = "rating";

  const getAllRate = async () => {
    const { rows } = await find(table);
    return rows;
  };

  export { getAllRate };