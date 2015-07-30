require('extend-error');

// ## //

var MillipedeError = Error.extend('MillipedeError');
var MillipedeValidationError = MillipedeError.extend('MillipedeValidationError');

// ## //

exports.MillipedeError = MillipedeError;
exports.MillipedeValidationError = MillipedeValidationError;
