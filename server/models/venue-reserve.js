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

  const table = "venue_reserve";
  // (測試) 取得所有資料
  const getAllVenueReserve = async () => {
    const { rows } = await find(table);
    return rows;
  };

  const saveVenueReserve = async (array) => {
    const { rows } = await insertMany(table,array);
    return rows;
  };

  export { getAllVenueReserve };