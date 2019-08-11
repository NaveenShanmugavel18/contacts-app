'use strict'
const model = require('./model')

module.exports = class ContactsApi {
    constructor(webapp, apiEp, controller) {
        this.apiGet(webapp, apiEp, controller)
        this.apiPost(webapp, apiEp, controller)
    }

    apiGet(webapp, apiEp, controller) {
        webapp.get(apiEp, (req, res, next) => {
            controller.get(req.params)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        })
    }

    apiPost(webapp, apiEp, controller) {
        webapp.post(apiEp, (req, res, next) => {
            controller.post(req.params, req.body)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        })
    }
}