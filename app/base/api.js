'use strict'

module.exports = class baseApi {
    constructor(webapp, apiEp, controller) {
        this.apiGet(webapp, apiEp, controller)
        this.apiPost(webapp, apiEp, controller)
        this.apiPut(webapp, apiEp, controller)
        this.apiDelete(webapp, apiEp, controller)
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

    apiPut(webapp, apiEp, controller) {
        webapp.put(apiEp, (req, res, next) => {
            controller.put(req.params, req.body)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        })
    }

    apiDelete(webapp, apiEp, controller) {
        webapp.delete(apiEp + '/:id', (req, res, next) => {
            controller.delete(req.params, req.body)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
        })
    }
}