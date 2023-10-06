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

  const table = "venue";
  // (測試) 取得所有資料
  const getAllVenue = async () => {
    const { rows } = await find(table);
    return rows;
  };

  export { getAllVenue };