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
const table = "shopping_cart"


const addCart = async () => {
    const { rows } = await find(table)
    return rows
}

export {
    addCart
}