var path        = require('path');
var chai        = require('chai');
var blanket     = require('blanket');

// ## //

blanket({
    pattern: path.join(__dirname, '..', '..'),
    'data-cover-never': [
        'node_modules',
        'test'
    ]
});

// ## //

global.expect = chai.expect;
