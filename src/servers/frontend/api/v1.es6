'use strict'

//
// v1
// Created by aallison on 9/30/15.
//

const express = require('express')
const api = express.Router() // eslint-disable-line new-cap

api.get('/test', (req, res) => {
    res.status(200).json({
        response: 'hello, world!'
    })
})

module.exports = api
