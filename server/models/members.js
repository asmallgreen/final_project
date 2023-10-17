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
  } from './base.js'
  
  // 定義資料庫表格名稱
  const table = 'member'
  
  // 所需的資料處理函式
  const getUsers = async () => {
    const { rows } = await find(table)
    return rows
  }
  const getUserById = async (id) => await findOneById(table, id)
  const getCount = async (where) => await count(table, where)
  const createUser = async (member) => await insertOne(table, member)
  const createBulkUsers = async (members) => await insertMany(table, members)
  const deleteUserById = async (id) => await remove(table, { id })
  
  // 檢查使用者帳號密碼是否已註冊
  const checkAccount = async ({account}) => 
    Boolean(await count(table,{account}))
  
  const checkEmail = async ({email}) => 
    Boolean(await count(table,{email}))
  
    const forgotPwdGetUser = async ({ account, email }) =>
    Boolean(await count(table, { account, email }))

  // 針對PUT更新user資料
  const updateUserById = async (member, id) => await updateById(table, member, id)
  const updateUser = async (member) => await updateById(table, member, member.id)
  
  // 登入使用
  const verifyUser = async ({ account, password }) =>
    Boolean(await count(table, { account, password }))
  
  const getUser = async ({ account, password }) =>
    await findOne(table, { account, password })

    const getUserByAccount = async ({ account}) =>
    await findOne(table, { account})


  // 其它用途

  const cleanAll = async () => await cleanTable(table)
  
  export {
    cleanAll,
    createBulkUsers,
    createUser,
    deleteUserById,
    getCount,
    getUser,
    getUserById,
    getUsers,
    updateUser,
    updateUserById,
    verifyUser,
    checkAccount,
    checkEmail,
    forgotPwdGetUser,
    getUserByAccount,
  }