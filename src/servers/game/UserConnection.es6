'use strict'

//
// UserConnection
// Created by aallison on 9/30/15.
//

const EventEmitter = require('events').EventEmitter
const es = require('event-stream')

const User = require('../../shared/models/User')
const Models = require('../../shared/models/Models')

const SOCKET_TIMEOUT = 30 * 1000

let userConnections = {}

class UserConnection extends EventEmitter {
    constructor(socket) {
        super()

        if (!socket) {
            throw new Error('socket is null')
        }
        this.socket = socket
        this.user = new User()

        this.onUserError = () => {}
        this.onUserMessage = () => {}

        // TODO: (aallison) get this out of the constructor
        this.commandStream = socket.pipe(es.split()).pipe(es.mapSync(data => {
            try {
                return JSON.parse(data)
            } catch (e) {
                return { error: 'invalid json' }
            }
        })).pipe(es.mapSync(json => {
            try {
                return Models.fromJSON(json)
            } catch (e) {
                console.log('Error in Models.fromJSON')
                console.log(e.stack)
                return { error: 'message is not a valid game model' }
            }
        }))

        this.init()
    }

    init() {
        const socket = this.socket

        socket.setTimeout(SOCKET_TIMEOUT)

        const localId = `${ socket.localAddress }:${ socket.localPort }`
        const remoteId = `${ socket.remoteAddress }:${ socket.remotePort }`

        console.log(`client connected: ${ remoteId } => ${ localId }`)
        socket.write('connected\n')

        socket.on('connect', () => {
            console.log('socket.connect')
        })

        socket.on('error', err => {
            console.log('socket error')
            console.log(err.stack)
        })

        socket.on('end', () => {
            console.log('client disconnected.  closing...')
            socket.end()
        })

        socket.on('timeout', () => {
            console.log('socket timeout.  closing...')
            socket.end(`connection idle for ${ SOCKET_TIMEOUT }ms. closing...`)
        })

        socket.on('close', hadError => {

            delete userConnections[this.user.id]
            userConnections[this.user.id] = null

            console.log(`socket.close => hadError: ${ hadError }`)
        })

        // Read as new-line separated json-chunks
        this.commandStream.on('data', json => {
            console.log(`socket.split.parse.data: ${ JSON.stringify(json) }`)
            if (json.error) {
                socket.write(JSON.stringify(json))
                this.onUserError(json)
                this.emit('user-command-error', json)
            } else {
                this.emit('user-command', json)
                this.onUserMessage(json)
                socket.write(JSON.stringify({ echo: json }))
            }
        })

    }

    static registerConnectionBySocket(socket) {
        const userConnection = new UserConnection(socket)
        userConnections[userConnection.user.id] = userConnection
        return userConnection
    }
}
module.exports = UserConnection
