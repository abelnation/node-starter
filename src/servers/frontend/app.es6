'use strict'

//
// app.es6
// Created by aallison on 9/30/15.
//

const express = require('express')

const app = express()

// Access Log
app.use(require('morgan')('dev'))

// Api Endpoints
app.use('/api/v1', require('./api/v1'))

module.exports = app
