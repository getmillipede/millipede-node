/* global describe, it, expect */
/* jshint expr: true */

var millipede   = require('../lib');

// ## //

describe('millipede', function () {
    describe('default values', function () {
        it('should default to 20 if the size is undefined', function () {
            expect(millipede().size).to.equal(20);
        });

        it('should revert to the default if the size is 0', function () {
            expect(millipede(0).size).to.equal(20);
        });

        it('should allow a size of 1', function () {
            expect(millipede(1).size).to.equal(1);
        });

        it('should not be reversed by default', function () {
            expect(millipede().reverse).to.be.false;
        });

        it('should have an initial position of 0', function () {
            expect(millipede().position).to.equal(0);
        });
    });

    describe('validation', function () {
        it('should throw if the size is too great', function () {
            var run = function () { millipede(100001); };

            expect(run).to.throw(millipede.MillipedeValidationError);
        });
    });

    describe('render', function () {
        it('should render a millipede of size 1', function () {
            expect(millipede(1).toString()).to.equal([
                '    ╚⊙ ⊙╝',
                '  ╚═(███)═╝'
            ].join('\n'));
        });

        it('should render reversed a millipede of size 1', function () {
            expect(millipede(1, { reverse: true }).toString()).to.equal([
                '   ╔═(███)═╗',
                '     ╔⊙ ⊙╗'
          ].join('\n'));
        });

        it('should render a millipede of size 24', function () {
            expect(millipede(24).toString()).to.equal([
                '    ╚⊙ ⊙╝',
                '  ╚═(███)═╝',
                ' ╚═(███)═╝',
                '╚═(███)═╝',
                ' ╚═(███)═╝',
                '  ╚═(███)═╝',
                '   ╚═(███)═╝',
                '    ╚═(███)═╝',
                '    ╚═(███)═╝',
                '   ╚═(███)═╝',
                '  ╚═(███)═╝',
                ' ╚═(███)═╝',
                '╚═(███)═╝',
                ' ╚═(███)═╝',
                '  ╚═(███)═╝',
                '   ╚═(███)═╝',
                '    ╚═(███)═╝',
                '    ╚═(███)═╝',
                '   ╚═(███)═╝',
                '  ╚═(███)═╝',
                ' ╚═(███)═╝',
                '╚═(███)═╝',
                ' ╚═(███)═╝',
                '  ╚═(███)═╝',
                '   ╚═(███)═╝'
           ].join('\n'));
        });

        it('should render a reversed millipede of size 24', function () {
            expect(millipede(24, { reverse: true }).toString()).to.equal([
                ' ╔═(███)═╗',
                '  ╔═(███)═╗',
                '   ╔═(███)═╗',
                '    ╔═(███)═╗',
                '    ╔═(███)═╗',
                '   ╔═(███)═╗',
                '  ╔═(███)═╗',
                ' ╔═(███)═╗',
                '╔═(███)═╗',
                ' ╔═(███)═╗',
                '  ╔═(███)═╗',
                '   ╔═(███)═╗',
                '    ╔═(███)═╗',
                '    ╔═(███)═╗',
                '   ╔═(███)═╗',
                '  ╔═(███)═╗',
                ' ╔═(███)═╗',
                '╔═(███)═╗',
                ' ╔═(███)═╗',
                '  ╔═(███)═╗',
                '   ╔═(███)═╗',
                '    ╔═(███)═╗',
                '    ╔═(███)═╗',
                '   ╔═(███)═╗',
                '     ╔⊙ ⊙╗'
            ].join('\n'));
        });
    });

    describe('mutability', function () {
        var m = millipede(1);

        it('should display a forward millipede of 1', function () {
            expect(m.toString()).to.equal([
                '    ╚⊙ ⊙╝',
                '  ╚═(███)═╝'
            ].join('\n'));
        });

        it('should reverse the millipede', function () {
            m.reverse = true;

            expect(m.toString()).to.equal([
                '   ╔═(███)═╗',
                '     ╔⊙ ⊙╗'
            ].join('\n'));
        });
    });
});
