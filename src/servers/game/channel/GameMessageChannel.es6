'use strict'

//
// GameMessageChannel
// Created by aallison on 9/30/15.
//

const EventEmitter = require('events').EventEmitter

class GameMessageChannel extends EventEmitter {
    send(message) {}
    close() {}
}
module.exports = GameMessageChannel
