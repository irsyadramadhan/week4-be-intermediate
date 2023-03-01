const express = require('express')
const router = express.Router()
const {registerUser, otp, loginUser} = require('../controllers/auth')


router.post('/register', registerUser)
// router.post('/otp/:id/:code', otp)
router.post('/login', loginUser)

module.exports = router