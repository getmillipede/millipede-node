var validator   = require('validator');

// ## //

/**
 * Polyfill for isInteger (e.g. node<0.12)
 *
 * @param some input value
 * @return {Boolean} returns true if `value` is an integer
 * @public
 */

if (!Number.isInteger) {
    Number.isInteger = function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

    Number.isInteger.polyfilled = true;
}

/**
 * Extract an integer from command line arguments.
 *
 * @param {Boolean} unsigned to only allow positive integers.
 * @return {Function} that will extract the integer.
 * @public
 */

var int = function (unsigned) {
    return function (value, initial) {
        initial = Number.isInteger(initial) ? initial : 0;
        if (validator.isInt(value)) {
            value = parseInt(value, 10);
            return value < 0 && unsigned ? initial : value;
        }
        return initial;
    };
};

// ## //

exports.int = int;
