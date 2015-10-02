'use strict'

//
// app.es6
// Created by aallison on 9/30/15.
//

const TcpGameMessageChannel = require('./channel/TcpGameMessageChannel')
const BaseCommand = require('../../shared/models/commands/BaseCommand')

const PORT = 8002
const server = require('net').createServer(socket => {

    let channel = TcpGameMessageChannel.fromSocket(socket)

    channel.on('user-command', networkMessage => {

        const command = networkMessage.getMessage()
        if (command instanceof BaseCommand) {
            const result = command.execute()
            channel.send(result)
        } else {
            console.log('Invalid command: Not subclass of BaseCommand')
            console.log(JSON.stringify(command))
        }

    })

    channel.on('user-command-error', networkMessage => {
        console.log('user command error')
        console.log(JSON.stringify(networkMessage))
    })
})

console.log(`listening on port: ${ PORT }`)
server.listen(PORT)
