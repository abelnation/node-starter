'use strict'

//
// TcpGameMessageChannel
// Created by aallison on 9/30/15.
//

const GameMessageChannel = require('./GameMessageChannel')
const NetworkMessage = require('../../../shared/models/NetworkMessage')

// Constants
const SOCKET_TIMEOUT = 30 * 1000

// All connected clients
let clients = {}

class TcpGameMessageChannel extends GameMessageChannel {
    constructor(tcpSocket) {
        super()
        if (!tcpSocket) {
            throw new Error('socket is null')
        }

        this.socket = tcpSocket
        this.localId = `${ tcpSocket.localAddress }:${ tcpSocket.localPort }`
        this.remoteId = `${ tcpSocket.remoteAddress }:${ tcpSocket.remotePort }`
        clients[remoteId] = this

        this.init()
    }

    init() {
        const socket = this.socket
        socket.setTimeout(SOCKET_TIMEOUT)

        console.log(`client connected: ${ this.remoteId } => ${ this.localId }`)
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
            delete clients[this.remoteId]
            clients[this.remoteId] = null

            console.log(`socket.close => hadError: ${ hadError }`)
        })

        // Command Stream
        // Parse and de-serialize
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

        // Read as new-line separated json-chunks
        this.commandStream.on('data', json => {
            console.log(`socket.split.parse.data: ${ JSON.stringify(json) }`)
            if (json.error) {
                this.emit('user-command-error', json)
                socket.write(JSON.stringify(json))
            } else {
                this.emit('user-command', json)
                socket.write(JSON.stringify({ echo: json }))
            }
        })
    }

    send(networkMessage) {
        if (!(networkMessage instanceof NetworkMessage)) {
            throw new Error('send can only take instances of type NetworkMessage')
        }
        socket.write(JSON.stringify(json))
    }

    close() {
        socket.end()
    }

    static fromSocket(tcpSocket) {
        return new TcpGameMessageChannel(tcpSocket)
    }
}
module.exports = TcpGameMessageChannel
