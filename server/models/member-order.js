import {
    cleanTable,
  count,
  createTable,
  dropTable,
  executeQuery,
  find,
  findOne,
  findOneById,
  insertMany,
  insertOne,
  remove,
  removeById,
  testQuery,
  testTable,
  update,
  updateById,
  } from "./base.js";


    const getMemberOrder = async (where) => {
      const  result  = await find("order_list", where);
      return result.rows;
    }

    export { getMemberOrder };