#!/usr/bin/env node

var program     = require('commander');
var sleep       = require('sleep');

var pjson       = require('../package.json');
var millipede   = require('../lib');
var validators  = require('./utils/validators');

// ## //

var windowInfo = process.stdout.getWindowSize();

program
    .version(pjson.version)
    .option('-s, --size <value>', 'size of the millipede', validators.int(true), 20)
    .option('-p, --position <value>', 'move the millipede forward, make it move!', validators.int(true))
    .option('-r, --reverse', 'reverse the millipede')
    .option('-H, --horizontal', 'rotate the millipede, and display it horizontally')
    .option('-t, --top <value>', 'add <value> lines of top padding', validators.int(true))
    .option('-l, --left <value>', 'add <value> lines of left padding', validators.int(true))
    .option('-a, --animate', 'animate the millipede')
    .option('-c, --center', 'center the millipede on the screen')
    .option('-S, --full-size', 'use a full size millipede!')
    .parse(process.argv);

try {
    var me = millipede(program.size, {
        reverse: program.reverse,
        horizontal: program.horizontal,
        position: program.position,
        top: program.top,
        left: program.left
    });

    if (program.fullSize) {
        if (me.horizontal) {
            me.size = Math.floor(windowInfo[0] / 2) - 2;
        }
        else {
            me.size = windowInfo[1] - 2;
        }
    }

    if (program.center) {
        if (me.horizontal) {
            me.top += Math.floor((windowInfo[1] - me.getLargestBodyPart()) / 2);
        }
        else {
            me.left += Math.floor((windowInfo[0] - me.getLargestBodyPart()) / 2);
        }
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
