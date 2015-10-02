'use strict';

//
// index.js
// Created by aallison on 9/30/15.
//

require('babel/register')
var app = require('./app')

var PORT = 8001
app.listen(PORT, function() {
    console.log("Game server listening on " + PORT)
})
