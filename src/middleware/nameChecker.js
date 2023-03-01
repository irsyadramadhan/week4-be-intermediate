const nameChecker = (req, res, next) => {
    let name = req.body.name
    if (!name) {
        res.status(400).json({status: 400, message: "name should be character"})
    }else{
        next()
    }
}

module.exports = nameChecker