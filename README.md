# node-starter

Starter project for a node server and react-based client.  Is structured
such that env-agnostic code can be shared and used by both client and
the server.

Technologies include:

* Node
  * Express
  * Mocha tests
* Client
  * React
  * Alt (flux framework)
* Misc
  * Grunt for file-watching and test-running
  * shared BaseModel for easy de/serialization of models to/from JSON

## Getting started

### Initial Setup

```
brew install node          # if you don't have node
npm install -g grunt-cli   # if you don't have grunt
npm install
bower install

# Test it out
grunt build test
```

### Tests

Check out: `src/test/unit/test-spec.es6`

Run tests with:

```
grunt test
```

### Node

To see how api routes are implemented, check out: `src/servers/frontend/api/v1.es6`

### Browser

Check out: `src/client/jsx/app.jsx`

Build client app with:

```
grunt build
```

