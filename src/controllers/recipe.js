const {selectData, selectDataById, insertData, updateData, deleteData} = require('./../models/recipe')
const cloudinary = require('../config/images')

const recipeController = {
    postRecipe: async (req, res, next) => {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {folder: 'food'})

        console.log('imageUrl', imageUrl)

        let data = {}
        data.title = req.body.title
        data.category_id = req.body.category_id
        data.ingredient = req.body.ingredient
        data.image = imageUrl.secure_url
        data.by_user_id = req.payload.id // <---
        let results = await insertData(data)
        if (!results) {
            res.status(400).json({status: 400, message: "insert data failed"})
        }else{
            res.status(200).json({status: 200, message: "insert data success"})
        }
    },
    getRecipe: async (req, res, next) => {
        let {searchBy, search, sortBy, sort, limit} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'time_create',
            sort: sort || 'ASC',
            limit: limit || 30
        }
        let results = await selectData(data)
        if (!results) {
            res.status(400).json({status: 400, message: "get data failed"})
        }else{
            res.status(200).json({status: 200, message: "get data success", results: results.rows})
        }
    },
    getRecipeById: async (req, res, next) => {
        let {searchBy, search, sortBy, sort, limit} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'time_create',
            sort: sort || 'ASC',
            limit: limit || 30,
            id: req.payload.id
        }
        let results = await selectDataById(data)
        if (!results) {
            res.status(400).json({status: 400, message: "get data failed"})
        }else{
            res.status(200).json({status: 200, message: "get data success", results: results.rows})
        }
    },
    putRecipe: async (req, res, next) => {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {folder: 'food'})

        let id = req.params.id
        let title = req.body.title
        let ingredient = req.body.ingredient
        let category_id = req.body.category_id
        let image = imageUrl.secure_url
        let by_user_id = req.payload.id // <--- here
        let data = {title, ingredient, image, category_id, by_user_id} // <-- here
        let results = await updateData(id, data)
        if (!results) {
            res.status(400).json({status: 400, message: "update data failed"})
        }else{
            res.status(200).json({status: 200, message: "update data success"})
        }
    },
    delRecipe: async (req, res, next) => {
        let id = req.params.id
        let by_user_id = req.payload.id // <--- here
        let result = await deleteData(id, by_user_id)
        if (!result) {
            res.status(400).json({status: 400, message: "delete data failed"})
        }else{
            res.status(200).json({status: 200, message: "delete data success"})
        }
    }
}

module.exports = recipeController