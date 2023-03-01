const {selectData} = require('./../models/category')

const categoryController = {
    getCategory: async (req, res, next) => {
        let results = await selectData()
        if (!results) {
            res.status(400).json({status: 400, message: "data not found"})
        }else{
            res.status(200).json({status: 200, message: "get data success", results: results.rows})
        }
    }
}

module.exports = categoryController