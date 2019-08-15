'use strict'
const { EventEmitter } = require('events')
const mediator = new EventEmitter()
const server = require('./common/server')
const config = require('./config')
const db = require('./common/dbClient')
const app = require('./app')

console.log('---- Contact Application ----')
console.log('Starting...')
console.log('---- Connecting to the repository ----')

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
})

mediator.on('on.boot', () => {
    let expapp

    db.connect(config)
        .then(dbo => {
            console.log('Connected to DB succesfully.')
            let myapp
            return server.start(config, (webapp) => {
                myapp = new app(dbo, config, webapp)
            })
                .then(app => {
                    expapp = app
                    console.log(`Server started succesfully, running on port ${config.port}`)

                    app.on('close', () => {
                        dbo.connection.close()
                        console.log('Terminating database connection')
                        console.log('Server shutting down')
                    })
                })
                .catch(err => {
                    console.log('Error starting server.')
                    console.log(err)
                })
        })
        .catch(err => {
            console.log('Error connecting to DB')
            console.log(err)
        })

    process.on('SIGINT', () => {
        expapp.close()
    })

    process.on('SIGTERM', () => {
        expapp.close()
    })
})



mediator.emit('on.boot');