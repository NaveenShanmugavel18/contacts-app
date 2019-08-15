'use strict'

module.exports = class groupsModel {
    constructor(dbo) {
        this.dbo = dbo
        const Schema = dbo.Schema

        this.dbo.groups = dbo.model('groups',
            new Schema({
                group_name: { type: String, required: [true, 'Group name cannot be blank.'] },
                contacts: [{ type: Schema.Types.ObjectId, ref: 'contacts' }],
                date: { type: Date, default: Date.now }
            })
        );

        return this.dbo.groups.createCollection()
            .then(() => {
                // console.log('Collection created')
            })
    }
}