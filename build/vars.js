const path = require('path')
const dotenv = require('dotenv')
const isDev = process.env.NODE_ENV === 'development'
dotenv.config({
  path: path.resolve(__dirname, isDev ? '.env' : '.prod.env'),
})
module.exports = isDev
