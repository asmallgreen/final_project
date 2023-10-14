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
  
  // 抓全部產品的程式碼
  const getAllProduct = async () => {
    const { rows } = await find(table);
    return rows;
  };
  // 抓產品分類
  const getCate = async (where) => {
    const { rows } = await find(table, where);
    return rows;
  };
  // 篩選價格
  const getProductPrice = async (where) => {
    const { rows } = await find(table, where);
    return rows;
  };
  // 篩選上架時間
  const getProductCreate = async (where) => {
    const { rows } = await find(table, where);
    return rows;
  };
  // 篩選商品名稱
  const getProductName = async (where) => {
    const { rows } = await find(table, where);
    return rows;
  };
  
  
  
  // 限制筆數
  const getLimit = async (where) => {
    //limit使用數字
    const { rows } = await find(table, where, limit);
    return rows;
  };
  // 排序
  const getOrder = async (where) => {
    // order使用物件:{id: 'asc', name: 'desc', username: ''}
    const { rows } = await find(table, where, order, limit);
    return rows;
  };
  
  // 上面定義的函式都要放進來導出
  export { getAllProduct, getCate, getProductPrice, getProductCreate, getProductName };