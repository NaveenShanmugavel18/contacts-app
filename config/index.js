'use strict'
require('dotenv').config()

module.exports = Object.assign({}, {
    port: process.env.PORT,
    env: process.env.ENVIRONMENT,
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME
    }
})