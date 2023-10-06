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

const table = "coupon"

const getCouponList = async () => {
    const { rows } = await find(table)
    return rows
}
export {
    getCouponList,
}