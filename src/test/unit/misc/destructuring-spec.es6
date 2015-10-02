'use strict'

/*eslint-disable no-unused-vars */
//
// destructuring
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert

describe('destructuring', () => {
    it('is ok if a key is missing', () => {
        const x = { a: 1, b: 2 }

        let { a, b, c } = x

        assert.equal(1, a)
        assert.equal(2, b)
        assert.isUndefined(c)
    })

    it('throws if root object is undefined', () => {
        const x = undefined
        try {
            let { a, b, c } = x
            assert.fail('should have thrown')
        } catch (e) {}
    })
})
