'use strict'
module.exports = class app {
    constructor(dbo, config, webapp) {
        this.dbo = dbo
        this.config = config

        this.controller = []
        this.controller.push(new (require('./contacts/control'))(dbo, config, webapp, '/contacts' ))
    }
}