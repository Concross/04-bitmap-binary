'use strict';

const fs = require('fs');

class BitmapTransform {
  constructor() {
    this.buf = null;
    this.fileHeaderBuf = null;
    this.detailHeaderBuf = null;
    this.imageBuf = null;
    this.fileHeader = null;
    this.detailHeader = null;
  }

  open(file, callback) {
    fs.readFile(file, (err, data) => {
      if (err) callback(err);

      this.buf = data;

      _parseBitmapBuffer(this);

      callback(null, this);
    });
  }

  invert(bitmap, callback) {
    console.log('inverting colors...');
    bitmap.imageBuf = new Buffer.from(Array.from(bitmap.imageBuf).map(bit => 255 - bit));
    console.log('colors inverted!');

    callback(null, bitmap);
  }

  darken(bitmap, callback) {

    bitmap.imageBuf = new Buffer.from(Array.from(bitmap.imageBuf).map(bit => bit / 4));
    callback(null, bitmap);
  }

  lighten(bitmap, callback) {
    bitmap.imageBuf = new Buffer.from(Array.from(bitmap.imageBuf).map(bit => {
      return bit > 220 ? 255 : bit + 35;
    }));

    callback(null, bitmap);
  }

  flipAndInvert(bitmap, callback) {
    bitmap.imageBuf = new Buffer.from(Array.from(bitmap.imageBuf).reverse());

    callback(null, bitmap);
  }


  save(outputFile, bitmap, callback) {
    // Write transformed bitmap to disk
    // NOTE: transformed colors might still be encoded, they need to be raw
    // NOTE: bitmap is NOT a Buffer, but fs.writeFile takes a Buffer
    let buf = new Buffer.concat([bitmap.fileHeaderBuf, bitmap.detailHeaderBuf, bitmap.imageBuf]);
    fs.writeFile(outputFile, buf, (err) => {
      if (err) throw err;
    });
    callback(null);
  }
}

const _parseBitmapBuffer = function (self) {
  self.fileHeaderBuf = self.buf.slice(0, 14);
  self.fileHeader = {
    fileType: self.fileHeaderBuf.toString('ascii', 0, 2),
    fileSize: self.fileHeaderBuf.readUInt32LE(2),
    reserved: self.fileHeaderBuf.readUInt32LE(6),
    dataOffset: self.fileHeaderBuf.readUInt32LE(10),

  };

  self.detailHeaderBuf = self.buf.slice(14, 54);
  self.detailHeader = {
    headerSize: self.detailHeaderBuf.readUInt32LE(0),
    pxWidth: self.detailHeaderBuf.readUInt32LE(4),
    pxHeight: self.detailHeaderBuf.readUInt32LE(8),
    planes: self.detailHeaderBuf.readUInt16LE(12),
    bitPerPx: self.detailHeaderBuf.readUInt16LE(14),

  };

  self.imageBuf = self.buf.slice(54);
};

module.exports = exports = BitmapTransform;