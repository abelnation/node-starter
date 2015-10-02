'use strict'

/*eslint-disable no-unused-vars */
//
// subclassing
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert

describe('subclassing', () => {
    it('instanceof works for child and parent classes', () => {
        class Base {}
        class Child extends Base {}

        const b = new Base()
        const c = new Child()

        assert.isTrue(b instanceof Base)
        assert.isFalse(b instanceof Child)

        assert.isTrue(c instanceof Child)
        assert.isTrue(c instanceof Base)
    })
})

