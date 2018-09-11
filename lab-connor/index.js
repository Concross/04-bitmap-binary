'use strict';

let args = process.argv;

if (args.length < 5) {
  throw new Error('--ERROR--: node index.js <input-file> <output-file> <transform-name>');
}

let inputFile = args[2], outputFile = args[3], transform = args[4];

let msg = `Using ${transform} on ${inputFile} and saving to ${outputFile}...`;
console.log(msg);

const Event = require('events').EventEmitter;
const ee = new Event();

const BMPTransform = require('./lib/bmpTransform');
let bmpTransform = new BMPTransform();

bmpTransform.open(inputFile, (err, bitmap) => {
  if (err) throw err;

  ee.emit('fileLoaded', bitmap);
});

ee.on('fileLoaded', (bitmap) => {

  // TODO switch to bmpTransform[transform](...)
  bmpTransform.invert(bitmap, (err, bitmap) => {
    if (err) throw err;

    ee.emit('transformed', bitmap);
  });
});

ee.on('transformed', (bitmap) => {
  bmpTransform.save(outputFile, bitmap, (err) => {
    if (err) throw err;
    console.log('File transformed and saved successfully!');

  });
});