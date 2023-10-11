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


const getCart = async () => {
    const { rows } = await find(table)
    return rows
}

const getOrder = async () =>{
    const { rows } = await find("order_list")
    return rows
}

const getMember = async () => {
    const { rows } = await find("member")
    return rows
}

export {
    getCart,
    getOrder,
    getMember
}