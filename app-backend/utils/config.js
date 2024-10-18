require('dotenv').config()

const PORT = process.env.PORT || 8080
const POSTGRES_URI = process.env.DATABASE_URL

module.exports = {
  PORT,
  POSTGRES_URI
}