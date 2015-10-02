'use strict'

//
// object
// Created by aallison on 9/17/15.
//

const _ = require('underscore')

module.exports = {

    // e.g.
    // let x = { a: 1, b: 2 }
    // object.map(x, (v) => v * 2)
    //
    // output:
    // { a: 2, b: 4 }
    map(obj, mapFn) {
        // convert object to array of key/val pairs
        let data = _(obj)
            .pairs() // convert obj to array of pairs [key, val] for filtering
            .map((pair) => [ pair[0], mapFn(pair[1]) ])

        // convert array of pairs to key/val object
        data = _.object(data)
        return data
    },

    filter(obj, filterFn) {
        // convert object to array of key/val pairs
        let data = _(obj)
            .pairs() // convert obj to array of pairs [key, val] for filtering
            .filter((pair) => filterFn(pair[1], pair[0]))

        // convert array of pairs to key/val object
        data = _.object(data)
        return data
    },

    hasKeys(obj, ...keys) {
        for (let key of keys) {
            if (!_.has(obj, key)) {
                return false
            }
        }
        return true
    }

}
