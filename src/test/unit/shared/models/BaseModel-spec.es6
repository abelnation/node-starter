'use strict'

/*eslint-disable no-unused-vars */
//
// BaseModel-spec
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert
const assertJsonEqual = require('../../../util/json').assertJsonEqual

const Models = require('../../../../shared/models/Models')
const BaseModel = require('../../../../shared/models/BaseModel')

class ChildModel extends BaseModel {
    constructor() { super() }
    childMethod() {}
}
Models.createModel('ChildModel', ChildModel)

describe('BaseModel', () => {

    describe('set', () => {
        it('sets value in data dict', () => {
            const m = new BaseModel()
            const key = 'key'
            const val = 'val'

            m.set(key, val)
            assert.equal(val, m.data[key])
        })
    })

    describe('get', () => {
        it('fetches values set on model', () => {
            const m = new BaseModel()
            const key = 'key'
            const val = 'val'

            m.set(key, val)
            assert.equal(val, m.get(key))
        })
    })

    describe('toJSON', () => {
        it('works for simple model', () => {
            const m = new BaseModel()
            const expected = {
                type: 'BaseModel',
                data: {
                    key1: 'val1',
                    key2: 'val2'
                }
            }

            m.set('key1', 'val1')
            m.set('key2', 'val2')

            assertJsonEqual(expected, m.toJSON())
        })
    })

    describe('fromJSON', () => {
        it('works for simple model', () => {
            const json = require('../../../fixtures/BaseModel/simple_01')
            const m = Models.fromJSON(json)

            // assert data is the same
            assertJsonEqual(json, m.toJSON())

            // ensure BaseModel methods are there
            assert.isDefined(m.get)
            assert.isDefined(m.set)
        })

        it('works for nested models', () => {
            const json = require('../../../fixtures/BaseModel/simple_nested_01')
            const m = Models.fromJSON(json)

            assertJsonEqual(json, m.toJSON())
            assert.isDefined(m.get)
            assert.isDefined(m.set)

            const nested = m.get('nested')
            assert.isDefined(nested.get)
            assert.isDefined(nested.set)
            assert.equal('nestVal1', nested.get('nestKey1'))
        })

        it('works for nested subclasses of Base-model', () => {
            const json = require('../../../fixtures/BaseModel/nested_subclass_01')
            const m = Models.fromJSON(json)

            assertJsonEqual(json, m.toJSON())
            assert.isDefined(m.get)
            assert.isDefined(m.set)

            const nested = m.get('nested')
            assert.isDefined(nested.get)
            assert.isDefined(nested.set)

            assert.equal('ChildModel', nested.type)
            assert.isDefined(nested.childMethod)
            assert.equal('nestVal1', nested.get('nestKey1'))
        })
    })

    describe('subclassing', () => {
        // TODO: (aallison) implement
    })
})
