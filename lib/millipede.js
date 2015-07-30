var errors  = require('./errors');

// ## //

var PADDING = [
    '  ',
    ' ',
    '',
    ' ',
    '  ',
    '   ',
    '    ',
    '    ',
    '   '
];

/**
 * Initialize a new `Millipede` with the given `size` and `options`.
 *
 * @param {Number} size
 * @param {Object} options
 * @return {Millipede}
 * @public
 */

function Millipede(size, options) {
    options = options || {};

    this.size = size || 20;
    this.reverse = options.reverse || false;

    this.validate();
}

/**
 * Return the `Millipede`’s head as a string
 *
 * @return {String} representing the `Millipede`’ head
 * @private
 */

Millipede.prototype._getHead = function () {
    if (this.reverse) {
        return PADDING[PADDING.length - 1] + '  ╔⊙ ⊙╗';
    }
    return PADDING[0] + '  ╚⊙ ⊙╝';
};

/**
 * Return the `Millipede`’s body as a string
 *
 * @return {String} representing the `Millipede`’ body
 * @private
 */

Millipede.prototype._getBody = function () {
    var self = this;

    return Array.apply(null, Array(this.size)).map(function (val, index) {
        if (self.reverse) {
            return PADDING[PADDING.length - 1 - index % PADDING.length] + '╔═(███)═╗';
        }
        return PADDING[index % PADDING.length] + '╚═(███)═╝';
    }).join('\n');
};

/**
 * Validate `Millipede` settings
 *
 * @return {String} representing the `Millipede`
 * @throw {MillipedeValidationError} when a setting is invalid
 * @public
 */

Millipede.prototype.validate = function () {
    if (this.size > 100000) {
        throw new errors.MillipedeValidationError('the size is too great, try something lower than 100,000');
    }
};

/**
 * Return the `Millipede` as a string
 *
 * @param {Object} options
 * @return {String} representing the `Millipede`
 * @public
 */

Millipede.prototype.toString = function () {
    if (this.reverse) {
        return this._getBody() + '\n' +  this._getHead();
    }
    return this._getHead() + '\n' +  this._getBody();
};

Millipede.prototype.inspect = Millipede.prototype.toString;

// ## //

module.exports = exports = Millipede;
