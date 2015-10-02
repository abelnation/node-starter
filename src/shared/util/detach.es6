'use strict'

//
// detach
// Created by aallison on 9/21/15.
//

module.exports = function detach(/* fn, ... args */) {
    const [callback, ...args] = Array.prototype.slice.call(arguments)
    console.log(callback)
    process.nextTick(() => {
        callback.apply(null, args)
    })
}
