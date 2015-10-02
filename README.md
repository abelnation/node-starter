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

