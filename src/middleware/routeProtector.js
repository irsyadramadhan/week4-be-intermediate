const jwt = require('jsonwebtoken')
let key = process.env.JWT_KEY

const protect = (req, res, next) => {
    try {
        let token
        if (req.headers.authorization) {
            let auth = req.headers.authorization
            console.log(auth)
            token = auth.split(' ')[1] // focus on this
            console.log(token)
            let decode = jwt.verify(token, key)
            req.payload = decode
            next()
        } else {
            res.status(400).json({status: 400, message: 'cant access you need token, try login'}) // may use return
        }
    } catch (error) {
        console.log('error', error)
        if (error && error.name == 'JsonWebTokenError'){
            res.status(400).json({status: 400, message: 'invalid token'}) // may use return
        } else if (error && error.name == 'TokenExpireError') {
            res.status(400).json({status: 400, message: 'token expired'}) // may use return
        } else {
            res.status(400).json({status: 400, message: 'token not active'}) // may use return
        }
    }
}

module.exports = {protect}