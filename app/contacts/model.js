'use strict'

module.exports = class contactsModel {
    constructor(dbo) {
        this.dbo = dbo
        const Schema = dbo.Schema
        const contactSchema = new Schema({
            name: { type: String, required: [true, 'Your username cannot be blank.'], text: true },
            email: [{ tag: { type: String, enum: ['personal', 'work'], required: [true, 'email type is required'] }, value: { type: String, required: [true, 'email is required'], text: true } }],
            phonenumber: [{ tag: { type: String, enum: ['personal', 'work'], required: [true, 'phone number type is required'] }, value: { type: String, required: [true, 'phone number is required'], minlength: 10, maxlength: 10, text: true } }],
            date: { type: Date, default: Date.now }
        })

        contactSchema.index({"name": true, "email.value": true, "phonenumber.value": true});

        this.dbo.contacts = dbo.model('contacts', contactSchema);

        return this.dbo.contacts.createCollection()
            .then(() => {
                // console.log('Collection created')
            })
    }
}