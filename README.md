# millipede-node

[![npm version](https://badge.fury.io/js/millipede.svg)](http://badge.fury.io/js/millipede)
[![Build Status](https://secure.travis-ci.org/getmillipede/millipede-node.svg)](https://travis-ci.org/getmillipede/millipede-node)
[![Dependencies Status](https://david-dm.org/getmillipede/millipede-node.svg)](https://david-dm.org/getmillipede/millipede-node)
[![Dev Dependencies Status](https://david-dm.org/getmillipede/millipede-node/dev-status.svg)](https://david-dm.org/getmillipede/millipede-node#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/getmillipede/millipede-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/getmillipede/millipede-node?branch=master)

Print a beautiful millipede

## Installation

First, install [node.js](http://nodejs.org/).

### You want a cool millipede command-line tool to impress your friends?

Install it globally! Run

    npm install -g millipede

Then show off as much as you can!

    millipede --size 42 --reverse --animate

See the usage for more amazing features:

```text
  Usage: millipede [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -s, --size <value>      size of the millipede
    -p, --position <value>  move the millipede forward, make it move!
    -r, --reverse           reverse the millipede
    -a, --animate           animate the millipede
```

### You want to integrate a cool millipede in your application or website?

Add it to the dependencies of your project!

    npm install millipede --save

Then use it everywhere!

```javascript
var millipede = require('millipede');
var express   = require('express');

module.exports = express()
  .get('/', function (req, res) {
      res.setHeader('Content-Type', 'text/plain');
      res.send(millipede(42).toString());
  })
  .listen(4242);
```

## Support

* [Stack Overflow](http://stackoverflow.com/questions/tagged/millipede)
* [Twitter](https://twitter.com/getmillipede)
* [#getmillipede](http://webchat.freenode.net?channels=%23getmillipede&uio=d4) on Freenode

## Development

Install the development dependencies:

    npm install -g grunt-cli
    npm install

## Testing

We want 100% test coverage on this project, everything has to be tested.

Run the tests using

    grunt test

## License

[MIT](https://github.com/getmillipede/millipede-node/blob/master/LICENSE)
