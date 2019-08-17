'use strict'

module.exports = class contactsModel {
    constructor(dbo) {
        this.dbo = dbo
        const Schema = dbo.Schema
        const contactSchema = new Schema({
            name: { type: String, required: [true, 'Your username cannot be blank.'] },
            email: [{ tag: { type: String, enum: ['personal', 'work'], required: [true, 'email type is required'] }, value: { type: String, required: [true, 'email is required'] } }],
            phonenumber: [{ tag: { type: String, enum: ['personal', 'work'], required: [true, 'phone number type is required'] }, value: { type: String, required: [true, 'phone number is required'], minlength: 10, maxlength: 10 } }],
            date: { type: Date, default: Date.now }
        }, { autoCreate: true })

        contactSchema.index({ "name": 'text', "email.value": 'text', "phonenumber.value": 'text' });

        this.dbo.contacts = dbo.model('contacts', contactSchema);
    }
}