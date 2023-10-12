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
    const { rows } = await find("shopping_cart" )
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

const addCartProduct = async (product) => {
    const { rows } = await insertOne("product_cart", product)
    return rows
}

const addCartCourse = async (course) => {
    const { rows } = await insertOne("course_cart", course)
    return rows
}

export {
    getCart,
    getOrder,
    getMember,
    addCartProduct,
    addCartCourse,

}