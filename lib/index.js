var Millipede   = require('./millipede');
var errors      = require('./errors');

// ## //

/**
 * Create a millipede
 *
 * @return {Millipede}
 * @api public
 */

function createMillipede() {
    var millipede = Object.create(Millipede.prototype);
    Millipede.apply(millipede, arguments);
    return millipede;
}

// ## //

module.exports = exports = createMillipede;

exports.Millipede = Millipede;

exports.MillipedeError = errors.MillipedeError;
exports.MillipedeValidationError = errors.MillipedeValidationError;
