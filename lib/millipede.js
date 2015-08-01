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

    this.size = size;
    this.reverse = options.reverse;
    this.horizontal = options.horizontal || false;
    this.position = options.position || 0;

    this.top = options.top || 0;
    this.left = options.left || 0;

    this.validate();
}

/**
 * Size of the `Millipede`
 *
 * @return {Number} representing the size of the `Millipede`
 * @public
 */

Object.defineProperty(Millipede.prototype, 'size', {
    get: function () {
        return this._size;
    },
    set: function (value) {
        this._size = value || 20;
        this._computePadding();
    }
});

/**
 * Direction of the `Millipede`
 *
 * @return {Boolean} representing the direction of the `Millipede`
 * @public
 */

Object.defineProperty(Millipede.prototype, 'reverse', {
    get: function () {
        return this._reverse;
    },
    set: function (value) {
        this._reverse = !!value;
        this._computePadding();
    }
});

/**
 * Compute used padding
 *
 * @private
 */

Millipede.prototype._computePadding = function () {
    this._P = PADDING;

    if (this.size < PADDING.length) {
        if (this.reverse) {
            this._P = PADDING.slice(PADDING.length - this.size);
        }
        else {
            this._P = PADDING.slice(0, this.size);
        }
    }

    this._PL = this._P.length;
    this._LP = this._PL - 1;
};

/**
 * Return the vertical `Millipede`’s head as a string
 *
 * @return {String} representing the `Millipede`’ head
 * @private
 */

Millipede.prototype._getVerticalHead = function () {
    var leftPad = this.left ? new Array(this.left + 1).join(' ') : '';

    if (this.reverse) {
        return leftPad + this._P[this._LP - this.position % this._PL] + '  ╔⊙ ⊙╗';
    }
    return leftPad + this._P[this.position % this._PL] + '  ╚⊙ ⊙╝';
};

/**
 * Return the vertical `Millipede`’s body as a string
 *
 * @return {String} representing the `Millipede`’ body
 * @private
 */

Millipede.prototype._getVerticalBody = function () {
    var self = this;
    var leftPad = this.left ? new Array(this.left + 1).join(' ') : '';

    return Array.apply(null, Array(this.size)).map(function (val, index) {
        var part = leftPad;

        if (self.reverse) {
            part += self._P[self._LP - (self.size - 1 - index + self.position) % self._PL];
            part += '╔═(███)═╗';
        }
        else {
            part += self._P[(index + self.position) % self._PL];
            part += '╚═(███)═╝';
        }

        return part;
    }).join('\n');
};

/**
 * Return the vertical `Millipede` as a string
 *
 * @return {String} representing the vertical `Millipede`
 * @private
 */

Millipede.prototype._getVertical = function () {
    if (this.reverse) {
        return this._getVerticalBody() + '\n' +  this._getVerticalHead();
    }
    return this._getVerticalHead() + '\n' +  this._getVerticalBody();
};

/**
 * Return the horizontal `Millipede` as a string
 *
 * @return {String} representing the horizontal `Millipede`
 * @private
 */

Millipede.prototype._getHorizontal = function () {
    var lines = new Array(this.getLargestBodyPart()).join('.').split('.');
    var position;
    var index;

    if (this.reverse) {
        position = this._P[(this.position) % this._PL].length;

        for (index = 0; index < position; index++) {
            lines[index] = '    ';
        }

        lines[position] += '══  ';
        lines[position + 1] += '  ⊙ ';
        lines[position + 2] += '  ⊙ ';
        lines[position + 3] += '══  ';

        for (index = position + 4; index < lines.length; index++) {
            lines[index] = '    ';
        }
    }

    for (index = 0; index < this.size; index++) {
        position = this._P[this._LP - (this.size - 1 - index + this.position) % this._PL].length;

        if (this.reverse) {
            position = this._P[(index + this.position) % this._PL].length;
        }

        for (var p = 0; p < position; p++) {
            lines[p] += '  ';
        }

        lines[position] += '╔ ';
        lines[position + 1] += '﹋';
        lines[position + 2] += '﹏';
        lines[position + 3] += '╚ ';

        for (p = position + 4; p < lines.length; p++) {
            lines[p] += '  ';
        }
    }

    if (!this.reverse) {
        lines[position] += '  ══';
        lines[position + 1] += ' ⊙';
        lines[position + 2] += ' ⊙';
        lines[position + 3] += '  ══';
    }

    return lines.join('\n');
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
    if (this.top > 100000) {
        throw new errors.MillipedeValidationError('the top padding is too great, try something lower than 100,000');
    }
    if (this.left > 100000) {
        throw new errors.MillipedeValidationError('the left padding is too great, try something lower than 100,000');
    }
};

/**
 * Return the `Millipede`’s largest body part
 *
 * @return {Number} the `Millipede`’s largest body part
 * @public
 */

Millipede.prototype.getLargestBodyPart = function () {
    var largest = Math.max.apply(Math, this._P.map(function (padding) {
        return padding.length;
    }));

    if (this.horizontal) {
        return largest + 4;
    }

    if (this.reverse) {
        return largest + '╔═(███)═╗'.length;
    }

    return largest + '╚═(███)═╝'.length;
};

/**
 * Return the `Millipede` as a string
 *
 * @param {Object} options
 * @return {String} representing the `Millipede`
 * @public
 */

Millipede.prototype.toString = function () {
    var output = '';

    if (this.top) {
        output += new Array(this.top + 1).join('\n');
    }

    if (this.horizontal) {
        output += this._getHorizontal();
    }
    else {
        output += this._getVertical();
    }

    return output;
};

Millipede.prototype.inspect = Millipede.prototype.toString;

// ## //

module.exports = exports = Millipede;
