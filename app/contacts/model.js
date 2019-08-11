'use strict'

module.exports = class contactsModel {
    constructor(dbo) {
        this.dbo = dbo
        const Schema = dbo.Schema

        this.dbo.contacts = dbo.model('contacts', 
            new Schema({
                name:  String,
                email: [{ tag: String, value: String }],
                phonenumber: [{ tag: String, value: String }],
                date: { type: Date, default: Date.now }
            })
        );

        return this.dbo.contacts.createCollection()
            .then(() => {
                // console.log('Collection created')
            })
    }
}