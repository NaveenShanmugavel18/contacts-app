const mongoose = require('mongoose');
const schema = mongoose.Schema

const connect = (options) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${options.db.host}${options.db.name}`, { useNewUrlParser: true , useCreateIndex: true });
        const db = mongoose.connection;
        resolve(mongoose)
    })
}

module.exports = Object.assign({}, { connect })


