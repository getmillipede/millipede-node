/* global describe, it, expect */
/* jshint expr: true */

var millipede   = require('../lib');

// ## //

describe('millipede', function () {
    describe('render', function () {
        it('should render a millipede of size 1', function () {
            expect(millipede(1).toString()).to.equal([
                '    ╚⊙ ⊙╝',
                '  ╚═(███)═╝'
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
    });
});
