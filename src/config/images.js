const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.IMAGE_NAME,
    api_key: process.env.IMAGE_KEY,
    api_secret: process.env.IMAGE_SECRET
})

module.exports = cloudinary