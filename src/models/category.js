const Pool = require('./../config/db')

const selectData = () => {
    return Pool.query(
        'SELECT * FROM recipe_category'
    )
}

module.exports = {selectData}