/* global describe, it, expect */
/* jshint expr: true */

var validators  = require('../bin/utils/validators');

// ## //

describe('bin.utils.validators', function () {
    if (Number.isInteger.polyfilled) {
        describe('Number.isInteger polyfill', function () {
            it('should return false for 0.1', function () {
                expect(Number.isInteger(0.1)).to.be.false;
            });

            it('should return true for 1', function () {
                expect(Number.isInteger(1)).to.be.true;
            });

            it('should return true for pi', function () {
                expect(Number.isInteger(Math.PI)).to.be.false;
            });

            it('should return true for -100000', function () {
                expect(Number.isInteger(-100000)).to.be.true;
            });

            it('should return false for NaN', function () {
                expect(Number.isInteger(NaN)).to.be.false;
            });

            it('should return true for 0', function () {
                expect(Number.isInteger(0)).to.be.true;
            });

            it('should return false for "10"', function () {
                expect(Number.isInteger('10')).to.be.false;
            });
        });
    }

    describe('int validator', function () {
        it('should return a function', function () {
            expect(validators.int()).to.be.a('function');
        });

        it('should have an initial default value of 0', function () {
            var f = validators.int();
            expect(f()).to.equal(0);
        });

        it('should have an initial value of 0 if the provided value is not a number', function () {
            var f = validators.int();
            expect(f(undefined, 'not-a-number')).to.equal(0);
        });

        it('should have an initial value of 0 if the provided value is not an integer', function () {
            var f = validators.int();
            expect(f(undefined, 4.2)).to.equal(0);
        });

        it('should have the provided initial value if it is an integer', function () {
            var f = validators.int();
            expect(f(undefined, 42)).to.equal(42);
        });

        it('should return the initial value if the value provided cannot be a number', function () {
            var f = validators.int();
            expect(f('not-a-number', 42)).to.equal(42);
        });

        it('should return the initial value if the value provided cannot be an integer', function () {
            var f = validators.int();
            expect(f('12.3', 42)).to.equal(42);
        });

        it('should parse the provided value as an integer if it is valid', function () {
            var f = validators.int();
            expect(f('12', 42)).to.equal(12);
        });

        it('should return the unsigned initial value if the provided value is negative', function () {
            var f = validators.int(true);
            expect(f('-12', 42)).to.equal(42);
        });

        it('should return the negative provided value if it is valid', function () {
            var f = validators.int();
            expect(f('-12', 42)).to.equal(-12);
        });
    });
});
