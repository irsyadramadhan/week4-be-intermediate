const {findUserByEmail, createUser, selectUserById, verifyUser} = require('./../models/auth')
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2')
const generateToken = require('../helpers/generateToken') // changes
// const email = require('../middleware/email')

const authController = {
    registerUser: async (req, res, next) => {
        // checker
        if (!req.body.email || !req.body.password || !req.body.fullname) {
            res.status(400).json({status: 400, message: 'please input email, password, and fullname correctly'})
        } else {
            let {rows:[users]} = await findUserByEmail(req.body.email)
            if (users) {
                res.status(400).json({status: 400, message: 'email address is already registered'})
            } else {
                let id = uuidv4()
                // let otp = Math.floor((Math.random()*1000000)+1)
                let data = {
                id,
                email: req.body.email,
                password: await argon2.hash(req.body.password),
                fullname: req.body.fullname,
                // otp
                }
                let register = await createUser(data)
                if (!register) {
                    res.status(400).json({status: 400, message: 'register failed'})
                } else {
                    res.status(200).json({status: 200, message: 'register success'})
                    // try {
                    //     let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/otp/${id}/${otp}`
                    //     let sendEmail = email(req.body.email, otp, url, req.body.fullname)
                    //     if (sendEmail == 'email not sent') {
                    //         return res.status(400).json({status: 400, message: 'register failed because email not sent'})
                    //     }
                    //     console.log(sendEmail)
                    //     return res.status(200).json({status: 200, message: 'register success, please verify your email'})
                    // } catch {
                    //     res.status(400).json({status: 400, message: 'register failed'})
                    // }
                }
            }
        }
    },
    loginUser: async (req, res, next) => {
        // checker
        if (!req.body.email || !req.body.password) {
            res.status(400).json({status: 400, message: 'please input email and password correctly'})
        } else {
            let {rows:[users]} = await findUserByEmail(req.body.email)
            if (!users) {
                return res.status(400).json({status: 400, message: 'login failed, user not registered'})
            }
            let matchPassword = await argon2.verify(users.password, req.body.password)      
            if (matchPassword) {
                let data = users // changes
                delete data.password // cahanges
                data.token = generateToken(data) // changes
                res.status(200).json({status: 200, message: `login success, welcome ${users.fullname}`, data: users})
            } else {
                res.status(400).json({status: 400, message: 'password incorrect'})
            }
        }
    },
    // otp: async (req, res, next) => {
    //     let userId = req.params.id
    //     let userOtp = req.params.code
    //     if (!userId || !userOtp) {
    //         res.status(400).json({status: 400, message: 'please input OTP correctly'})
    //     } else {
    //         let {rows:[users]} = await selectUserById(userId)
    //         if (!users) {
    //             return res.status(400).json({status: 400, message: 'user data not found'})
    //         }
    //         if (users.otp == otpUser) {
    //             let verif = await verifyUser(userId)
    //             if (verif) {
    //                 res.status(200).json({status: 200, message: 'user verified'})
    //             } else {
    //                 res.status(400).json({status: 400, message: 'failed verify user'})
    //             }
    //         } else {
    //              res.status(400).json({status: 400, message: 'OTP incorrect'})
    //         }
    //     }
    // }
}

module.exports = authController