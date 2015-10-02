'use strict'

//
// Models
// Created by aallison on 9/30/15.
//

const models = {
    'BaseModel': require('./BaseModel'),
}

const ModelManager = {
    getModel(name) {
        if (!(name in models)) {
            throw new Error(`Invalid model name: ${ name }`)
        }
        return models[name]
    },

    createModel(name, klass) {
        console.log(`createModel(${ name }, ${ klass }`)
        if (name in models) {
            throw new Error(`Model ${ name } already exists`)
        }
        models[name] = klass
        return klass
    },

    fromJSON(json) {
        if (!json) {
            throw new Error('json is undefined')
        }

        if (!json.type) {
            throw new Error('model has no type attribute')
        }

        console.log(`type: ${ json.type }`)
        const Ctor = ModelManager.getModel(json.type)
        const result = new Ctor().initFromJSON(json)

        return result
    }
}
module.exports = ModelManager
