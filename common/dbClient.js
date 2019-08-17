const mongoose = require('mongoose');
const schema = mongoose.Schema

const connect = (options) => {
    return new Promise((resolve, reject) => {

        if (!options.db)
            return reject("Please specify db details")

        if (!options.db.name)
            return reject("Please specify the db name")

        if (!options.db.host)
            return reject("Please specify the db host")

        const db = mongoose.connection;
        mongoose.connect(`${options.db.host}${options.db.name}`, { useNewUrlParser: true, useCreateIndex: true })
            .then(res => {
                resolve(mongoose)
            })
            .catch(err => {
                return reject(err)
            })
    })
}

module.exports = Object.assign({}, { connect })


