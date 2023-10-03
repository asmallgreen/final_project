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

const table = 'coupon'

const getAllCoupon = async () => {
    const { rows } = await find(table)
    return rows
}

const getCouponById = async (id) => await findOneById(table, id)
const getCount = async (where) => await count(table, where)

export {
    getAllCoupon,
    getCouponById,
    getCount,
}