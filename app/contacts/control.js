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
            if (Array.isArray(body))
                return reject({ message: "Please enter only one contact" })

            if (Array.isArray(body.phonenumber) && body.phonenumber.length == 0)
                return reject({ message: "Please enter valid phone number" })

            if (Array.isArray(body.email) && body.email.length == 0)
                return reject({ message: "Please enter valid phone number" })

            this.dbo.contacts.create(body)
                .then(resolve)
                .catch(reject)
        })
    }

    put(params, body) {
        return new Promise((resolve, reject) => {

            if (Array.isArray(body))
                return reject({ message: "Please enter only one contact" })

            if (Array.isArray(body.phonenumber) && body.phonenumber.length == 0)
                return reject({ message: "Please enter valid phone number" })

            if (Array.isArray(body.email) && body.email.length == 0)
                return reject({ message: "Please enter valid phone number" })

            if (!body._id)
                return reject({ message: "Please enter the contact id to update" })

            this.dbo.contacts.findOneAndUpdate({ _id: body._id }, body, { new: true })
                .then(response => {

                    if (response == null)
                        return reject({ message: "Please enter a valid contact id" })

                    resolve(response)
                })
                .catch(reject)
        })
    }

    delete(params, body) {
        return new Promise((resolve, reject) => {
            if (!params.id)
                return reject({ message: "Please enter a contact id to delete" })

            this.dbo.contacts.deleteOne({ _id: params.id })
                .then(() => {
                    resolve({ message: "Contact Deleted successfully!" })
                })
                .catch(reject)
        })
    }

    searchContacts(query) {
        return new Promise((resolve, reject) => {
            if (!query.text)
                return reject({ message: "Please enter a valid search text" })

            this.dbo.contacts.find({ $text: { $search: query.text } }).sort({ date: 'desc' })
                .then(resolve)
                .catch(reject)
        })
    }
}