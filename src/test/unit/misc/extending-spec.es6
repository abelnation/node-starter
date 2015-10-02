'use strict'

/*eslint-disable no-unused-vars */
//
// extending-spec
// Created by aallison on 9/30/15.
//

const _ = require('underscore')
const assert = require('chai').assert

describe('Extending', () => {
    it('extending class objects only takes properties', () => {
        class Foo {
            constructor() {
                this.a = 1
                this.b = 2
            }
            doFoo() {}
        }

        class Bar {
            constructor() {
                this.c = 3
            }
            doBar() {}
        }


        let x = new Foo()
        _.extend(x, new Bar())

        assert.equal(3, x.c)
        assert.isDefined(x.doFoo)
        assert.isUndefined(x.doBar)

    })
})
