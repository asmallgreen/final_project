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

const getLimitCoupon = async (where,order,limit) => {
    const result = await find("coupon",where,order,limit)
    return result.rows
}
export {
    getLimitCoupon,
}