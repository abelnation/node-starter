'use strict'

//
// BaseClient
// Created by aallison on 9/30/15.
//

const bluebird = require('bluebird')
const client = require('superagent')

class BaseClient {
    constructor(apiPrefix = '', host = 'localhost', port = '8000') {
        this.apiPrefix = apiPrefix
        this.host = host
        this.port = port

        bluebird.promisifyAll(this)
    }

    get(route) {
        let host = ''
        if (this.host) { host = this.host }
        if (this.port) { host += `:${ this.port }` }
        return client.get(`${ host }${ this.apiPrefix }/${ route }`)
            .set('Accept', 'application/json')
    }

    post(route, body) {
        let host = ''
        if (this.host) { host = this.host }
        if (this.port) { host += `:${ this.port }` }
        let result = client.post(`${ host }${ this.apiPrefix }/${ route }`)
            .set('Accept', 'application/json')

        if (body) {
            result = result.send(body)
        }

        return result
    }

    getErrorResponse(err, res) {
        if (err) {
            return err
        } else if (!res) {
            return new Error('null response returned')
        } else if (res.statusCode && res.statusCode > 299) {
            return res
        }
        return undefined
    }
}
module.exports = BaseClient
