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


    const getMemberOrder = async (where,order) => {
      const  result  = await find("order_list", where, order);
      return result.rows;
    }

    const getSepcOrder = async (where) => {
      const  result  = await find("order_list", where);
      return result.rows;
    }

    const getProductOrder = async (where) => {
      const  result  = await find("order_product", where);
      return result.rows;
    }

    const getCourseOrder = async (where) => {
      const  result  = await find("order_course", where);
      return result.rows;
    }

    const getDetailOrder = async (where) => {
      const  result  = await find("order_detail", where);
      return result.rows;
    }

    export { getMemberOrder,getSepcOrder,getProductOrder,getCourseOrder,getDetailOrder };