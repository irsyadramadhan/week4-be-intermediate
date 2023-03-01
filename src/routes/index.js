const express = require('express')
const router = express.Router()
const Recipe = require('./recipe')
const Category = require('./category')
const Auth = require('./auth')

router.use('/recipe', Recipe)
router.use('/category', Category)
router.use('/auth', Auth)

module.exports = router