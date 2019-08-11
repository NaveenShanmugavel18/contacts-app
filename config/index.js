'use strict'
module.exports = Object.assign({}, {
    port: 3000,
    env: 'dev',
    db: {
        host: 'mongodb://localhost:27017/',
        name: 'contacts'
    }
})