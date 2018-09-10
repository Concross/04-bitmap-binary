'use strict';

const fs = require('fs');

class BitmapTransform {
  constructor() {

  }

  open(file, callback) {
    fs.readFile(file, (err, data) => {
      if (err) callback(err);

      callback(null, data);
    });
  }
}

module.exports = exports = BitmapTransform;