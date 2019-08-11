'use strict'
const model = require('./model')
const api = require('./api')

module.exports = class contactsController {
    constructor(dbo, config, webapp, apiEp) {
        this.dbo = dbo
        this.config = config
        this.model = new model(dbo)
        this.api = new api(webapp, apiEp, this)
    }

    get(params) {
        return new Promise((resolve, reject) => {
            this.dbo.contacts.find()
                .then(resolve)
                .catch(reject)
        })
    }

    post(params, body) {
        return new Promise((resolve, reject) => {
            this.dbo.contacts.insertMany(body)
                .then(resolve)
                .catch(reject)
        })
    }
}