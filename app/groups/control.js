'use strict'
const model = require('./model')
const api = require('./api')

module.exports = class groupsController {
    constructor(dbo, config, webapp, apiEp) {
        this.dbo = dbo
        this.config = config
        this.model = new model(dbo)
        this.api = new api(webapp, apiEp, this)
    }

    get(params) {
        return new Promise((resolve, reject) => {
            this.dbo.groups.find().populate('contacts')
                .then(resolve)
                .catch(reject)
        })
    }

    post(params, body) {

        return new Promise((resolve, reject) => {
            if (Array.isArray(body))
                return reject({ message: "Please enter only one contact" })

            if (Array.isArray(body.contacts) == false)
                return reject({ message: "Please enter the contact as array" })

            if (body.contacts.length <= 0)
                return reject({ message: "Please enter the contact to map it to the group" })

            return this.dbo.contacts.find({ '_id': { $in: body.contacts } })
                .then(contactsRecord => {

                    if (contactsRecord.length == 0)
                        return reject({ message: "Please enter a valid contact id" })

                    return this.dbo.groups.create(body)
                        .then(createdGroup => {
                            return this.dbo.groups.find({ _id: createdGroup._id }).populate('contacts')
                                .then(resolve)
                                .catch(reject)
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    put(params, body) {
        return new Promise((resolve, reject) => {

            if (Array.isArray(body))
                return reject({ message: "Please enter only one contact" })

            if (Array.isArray(body.contacts) == false)
                return reject({ message: "Please enter the contact as array" })

            if (body.contacts.length <= 0)
                return reject({ message: "Please enter the contact to map it to the group" })

            if (!body._id)
                return reject({ message: "Please enter the group id to update" })

            return this.dbo.contacts.find({ '_id': { $in: body.contacts } })
                .then(contactsRecord => {

                    if (contactsRecord.length == 0)
                        return reject({ message: "Please enter a valid contact id" })

                    return this.dbo.groups.findOneAndUpdate({ _id: body._id }, body, { new: true })
                        .then(createdGroup => {

                            if (createdGroup == null)
                                return reject({ message: "Please enter a valid group id" })

                            return this.dbo.groups.find({ _id: createdGroup._id }).populate('contacts')
                                .then(resolve)
                                .catch(reject)
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    delete(params, body) {
        return new Promise((resolve, reject) => {
            if (!params.id)
                return reject({ message: "Please enter a group id to delete" })

            this.dbo.groups.deleteOne({ _id: params.id })
                .then(() => {
                    resolve({ message: "Group Deleted successfully!" })
                })
                .catch(reject)
        })
    }
}