'use strict'
const baseApi = require('../base/api')

module.exports = class ContactsApi extends baseApi {
    constructor(webapp, apiEp, controller) {
        super(webapp, apiEp, controller)
        this.apiSearch(webapp, apiEp, controller)
    }

    apiSearch(webapp, apiEp, controller) {
        webapp.get(apiEp + '/search', (req, res, next) => {
            controller.searchContacts(req.query)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        })
    }
}