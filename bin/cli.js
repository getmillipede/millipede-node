#!/usr/bin/env node

var program     = require('commander');
var validator   = require('validator');
var sleep       = require('sleep');

var pjson       = require('../package.json');
var millipede   = require('../lib');

// ## //

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

var windowInfo = process.stdout.getWindowSize();

program
    .version(pjson.version)
    .option('-s, --size <value>', 'size of the millipede', int(true), 20)
    .option('-p, --position <value>', 'move the millipede forward, make it move!', int(true))
    .option('-r, --reverse', 'reverse the millipede')
    .option('-t, --top <value>', 'add <value> lines of top padding', int(true))
    .option('-l, --left <value>', 'add <value> lines of left padding', int(true))
    .option('-a, --animate', 'animate the millipede')
    .option('-c, --center', 'center the millipede on the screen')
    .option('-S, --full-size', 'use a full size millipede!')
    .parse(process.argv);

try {
    var me = millipede(program.size, {
        reverse: program.reverse,
        position: program.position,
        top: program.top,
        left: program.left
    });

    if (program.fullSize) {
        // The millipede current size will be overriden
        me.size = windowInfo[1] - 2;
    }

    if (program.center) {
        // This centers the millipede, by default
        // But you can always add more left padding!
        console.log(me.getLargestBodyPart());
        me.left += Math.floor((windowInfo[0] - me.getLargestBodyPart()) / 2);
    }

    if (program.animate) {
        do {
            process.stdout.write('\033[2J\033[0f');
            console.log(me.toString());
            me.position++;
            sleep.usleep(100000);
        } while (true);
    }
    else {
        console.log(me.toString());
    }
}
catch (err) {
    if (err instanceof millipede.MillipedeValidationError) {
        console.error('error:', err.message);
    }
    else {
        console.error('error: something unexpected happened');
        console.error(err.stack);
    }
    process.exit(1);
}
