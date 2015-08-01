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

        it('should have an initial left padding of 0', function () {
            expect(millipede().left).to.equal(0);
        });

        it('should have an initial top padding of 0', function () {
            expect(millipede().top).to.equal(0);
        });
    });

    describe('validation', function () {
        it('should throw if the size is too great', function () {
            var run = function () { millipede(100001); };

            expect(run).to.throw(millipede.MillipedeValidationError);
        });

        it('should throw if the left padding is too great', function () {
            var run = function () { millipede(10, { left: 100001 }); };

            expect(run).to.throw(millipede.MillipedeValidationError);
        });

        it('should throw if the top padding is too great', function () {
            var run = function () { millipede(10, { top: 100001 }); };

            expect(run).to.throw(millipede.MillipedeValidationError);
        });
    });

    describe('largest body part', function () {
        it('should return 11 for a millipede of 1', function () {
            expect(millipede(1).getLargestBodyPart()).to.equal(11);
        });

        it('should return 12 for a millipede of 6', function () {
            expect(millipede(6).getLargestBodyPart()).to.equal(12);
        });

        it('should return 13 for a millipede of 7', function () {
            expect(millipede(7).getLargestBodyPart()).to.equal(13);
        });

        it('should return 13 for a reversed millipede of 7', function () {
            expect(millipede(7, { reverse: true }).getLargestBodyPart()).to.equal(13);
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

        it('should render reversed a millipede of size 1 with 3 top padding', function () {
            expect(millipede(1, { reverse: true, top: 3 }).toString()).to.equal([
                '',
                '',
                '',
                '   ╔═(███)═╗',
                '     ╔⊙ ⊙╗'
          ].join('\n'));
        });

        it('should render a millipede of size 1 with 2 left padding', function () {
            expect(millipede(1, { left: 2 }).toString()).to.equal([
                '      ╚⊙ ⊙╝',
                '    ╚═(███)═╝'
          ].join('\n'));
        });

        it('should render an horizontal millipede of size 20', function () {
            expect(millipede(20, { horizontal: true }).toString()).to.equal([
                '        ╔                 ╔             ',
                '      ╔ ﹋╔             ╔ ﹋╔           ',
                '    ╔ ﹋﹏﹋╔         ╔ ﹋﹏﹋╔         ',
                '  ╔ ﹋﹏╚ ﹏﹋╔     ╔ ﹋﹏╚ ﹏﹋╔     ╔   ══',
                '╔ ﹋﹏╚   ╚ ﹏﹋╔ ╔ ﹋﹏╚   ╚ ﹏﹋╔ ╔ ﹋ ⊙',
                '﹋﹏╚       ╚ ﹏﹋﹋﹏╚       ╚ ﹏﹋﹋﹏ ⊙',
                '﹏╚           ╚ ﹏﹏╚           ╚ ﹏﹏╚   ══',
                '╚               ╚ ╚               ╚ ╚   '
            ].join('\n'));
        });

        it('should render a reversed horizontal millipede of size 1', function () {
            expect(millipede(1, { horizontal: true, reverse: true }).toString()).to.equal([
                '      ',
                '      ',
                '      ',
                '══  ╔ ',
                '  ⊙ ﹋',
                '  ⊙ ﹏',
                '══  ╚ '
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

        it('should add 2 top padding', function () {
            m.top = 2;

            expect(m.toString()).to.equal([
                '',
                '',
                '   ╔═(███)═╗',
                '     ╔⊙ ⊙╗'
            ].join('\n'));
        });

        it('should add 1 left padding', function () {
            m.left = 1;

            expect(m.toString()).to.equal([
                '',
                '',
                '    ╔═(███)═╗',
                '      ╔⊙ ⊙╗'
            ].join('\n'));
        });

        it('should rotate the millipede, horizontally', function () {
            m.horizontal = true;

            expect(m.toString()).to.equal([
                '',
                '',
                '      ',
                '      ',
                '      ',
                '══  ╔ ',
                '  ⊙ ﹋',
                '  ⊙ ﹏',
                '══  ╚ '
            ].join('\n'));
        });
    });
});
