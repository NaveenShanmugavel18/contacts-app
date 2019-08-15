'use strict'
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const start = (options, api) => {

    return new Promise((resolve, reject) => {

        if (!options.port)
            return reject('Please specify the port to start the application')

        const app = express()
        app.use(helmet())
        app.use(morgan(options.env))
        app.use(bodyParser.json())
        api(app)

        app.get('/', (req, res, next) => {
            res.status(200).json({})
        })

        app.use((err, req, res, next) => {
            console.log('req', err)
            console.log('Error: ', JSON.stringify(err))
            reject(new Error('Something went wrong. err:' + JSON.stringify(err.message)))

            if (err.name == 'ValidationError') {
                res.status(422).json(err)
            } else {
                res.status(500).json({ message: `Something went wrong. Reason: ${JSON.stringify(err.message)}` })
            }

            next()
        })

        const server = app.listen(options.port, () => resolve(server))
    })
}

module.exports = Object.assign({}, { start })
