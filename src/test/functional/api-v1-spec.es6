'use strict'

/*eslint-disable no-unused-vars */
//
// api-v1-spec
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert

const PORT = 8999
const ApiClient = require('../../shared/api/ApiClient')
const client = new ApiClient('localhost', PORT)

const app = require('../../servers/frontend/app')

describe('API V1 Endpoints', () => {

    before((done) => {
        app.listen(PORT, () => {
            console.log('functional test server started')
            done()
        })
    })

    describe('/test', () => {
        it('returns response', (done) => {
            client.testAsync().then(res => {
                assert.equal('hello, world!', res.response)
                done()
            }).catch(errorResponse => {
                done(errorResponse)
            })
        })
    })
})
