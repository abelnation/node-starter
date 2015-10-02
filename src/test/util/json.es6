'use strict'

//
// json
// Created by aallison on 9/23/15.
//

const assert = require('chai').assert

module.exports = {
    assertJsonEqual(expected, actual) {
        if (typeof expected === 'undefined') {
            throw new Error('expected is undefined')
        }
        if (typeof actual === 'undefined') {
            throw new Error('actual is undefined')
        }

        if (typeof expected !== 'string') {
            expected = JSON.stringify(expected)
        }
        if (typeof actual !== 'string') {
            actual = JSON.stringify(actual)
        }

        assert.deepEqual(JSON.parse(expected), JSON.parse(actual))
    }
}
