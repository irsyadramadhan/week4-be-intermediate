const Pool = require('./../config/db')

// JOIN - SORT - ILIKE - LIMIT
const selectData = (value) => {
    let {searchBy, search, sortBy, sort, limit} = value
    return Pool.query(
        `SELECT recipe.id, recipe.title, recipe.image, recipe_category.name AS category, recipe.ingredient, users.fullname AS creator, recipe.time_create
        FROM recipe
        JOIN recipe_category
        ON recipe.category_id = recipe_category.id
        JOIN users
        ON recipe.by_user_id = users.id
        WHERE recipe.isdelete IS NULL AND recipe.${searchBy} ILIKE '%${search}%'
        ORDER BY recipe.${sortBy} ${sort} LIMIT ${limit}`
    )
}

const selectDataById = (value) => {
    let {searchBy, search, sortBy, sort, limit, id} = value
    return Pool.query(
        `SELECT recipe.id, recipe.title, recipe.image, recipe_category.name AS category, recipe.ingredient, users.fullname AS creator, recipe.time_create
        FROM recipe
        JOIN recipe_category
        ON recipe.category_id = recipe_category.id
        JOIN users
        ON recipe.by_user_id = users.id
        WHERE recipe.isdelete IS NULL AND recipe.${searchBy} ILIKE '%${search}%'
        AND recipe.by_user_id = '${id}'
        ORDER BY recipe.${sortBy} ${sort} LIMIT ${limit}`
    )
}

const insertData = (value) => {
    let {title, category_id, ingredient, image, by_user_id} = value
    return Pool.query(
        `INSERT INTO recipe (title, category_id, ingredient, image, by_user_id) VALUES ('${title}', ${category_id}, '${ingredient}', '${image}', '${by_user_id}')`
    )
}

const updateData = (id, value) => {
    let {title, category_id, ingredient, image, by_user_id} = value // <--- add variable by_user_id
    return Pool.query(
        `UPDATE recipe SET title = '${title}', category_id = ${category_id}, ingredient = '${ingredient}', image = '${image}' WHERE id = ${id} AND by_user_id = '${by_user_id}'`
    )
}

const deleteData = (id, by_user_id) => { // <--- add variable by_user_id
    return Pool.query(
        `UPDATE recipe SET isdelete = current_time WHERE id = ${id} AND by_user_id = '${by_user_id}'`
    )
}

module.exports = {selectData, insertData, updateData, deleteData, selectDataById}