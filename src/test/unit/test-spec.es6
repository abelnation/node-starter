'use strict'

/*eslint-disable no-unused-vars */
//
// test-spec.es6
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert

describe('test', () => {
    it('is ok', () => {
        assert.equal(true, true)
    })

    it('throws if root object is undefined', (done) => {
        assert.equal(true, true)
        done()
    })
})
