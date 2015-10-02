'use strict'

//
// errors
// Created by aallison on 9/21/15.
//

const _ = require('underscore')
const objUtils = require('./util/object')

class BaseError extends Error {
    constructor(message) {
        // must call super before using this
        super(message)

        // see: https://gist.github.com/justmoon/15511f92e5216fa2624b
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }

        this.message = message

        this.statusCode = 500
        this.type = this.constructor.name
    }

    getMessage() { return this.message }

    getStackTrace() { return this.stack }

    toJSON() {
        let result = {}

        Object.getOwnPropertyNames(this).forEach(key => {
            result[key] = this[key]
        }, this)

        return result
    }
}

class ResponseError extends BaseError {
    constructor(message, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
    }

    getStatusCode() { return this.statusCode }
}

class ClientError extends ResponseError {
    constructor(message, data, statusCode = 400) {
        super(message, statusCode)
        this.data = data
    }

    getData() { return this.data }
}

class ServerError extends ResponseError {
    constructor(message, err) {
        super(message, 500)
        this.cause = err
    }

    getCause() { return this.cause }
    getData() { return this.data }
}

let errors = {
    BaseError: BaseError,
    ClientError: ClientError,
    ServerError: ServerError,
    ResponseError: ResponseError
}

function fromJSON(json) {

    if (typeof json === 'string') {
        json = JSON.parse(json)
    }
    if (!objUtils.hasKeys(json, 'message')) {
        throw new Error('error has no message')
    }

    // Get constructor and construct error object
    let result
    if (json.type) {
        const Ctor = errors[json.type]
        result = new Ctor()
    } else {
        result = new Error(json.message)
    }
    _.extend(result, json)

    return result
}
errors.fromJSON = fromJSON

function toJSON(err) {
    if ('toJSON' in err) {
        return err.toJSON()
    } else {
        return {
            message: err.message,
            stack: err.stack.split('\n')
        }
    }
}
errors.toJSON = toJSON

module.exports = errors
