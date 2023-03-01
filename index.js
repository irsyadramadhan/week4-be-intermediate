const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mainRouter = require('./src/routes')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use('/', mainRouter)
app.use('/img', express.static('./tmp'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})