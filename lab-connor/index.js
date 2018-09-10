'use strict';

let args = process.argv;

if (args.length < 5) {
  throw new Error('--ERROR--: node index.js <input-file> <output-file> <transform-name>');
}

let inputFile = args[2], outputFile = args[3], transform = args[4];

let msg = `Using ${transform} on ${inputFile} and saving to ${outputFile}...`;
console.log(msg);


const BMPTransform = require('./lib/bmpTransform');
let bmpTransform = new BMPTransform();

bmpTransform.open(inputFile, (err, data) => {
  if (err) throw err;

  console.log(data);
});