Error.extend = function (name) {
    var ctor = function (message) {
        this.message = message;
        this.stack = Error().stack;
    };

    ctor.prototype = Object.create(Error.prototype);
    ctor.prototype.name = name;

    ctor.extend = Error.extend;

    return ctor;
};

var MillipedeError = Error.extend('MillipedeError');
var MillipedeValidationError = MillipedeError.extend('MillipedeValidationError');

// ## //

exports.MillipedeError = MillipedeError;
exports.MillipedeValidationError = MillipedeValidationError;
