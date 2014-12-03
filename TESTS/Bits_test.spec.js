var Bit = require('../Bits.js');

describe("Bits", function() {
  var b = new Bit();

  it('tests swap', function() {
    expect(b.swap(23, 65)).toEqual(65);
  });

  it('tests parity', function() {
    expect(b.parity(1)).toEqual(1);
    expect(b.parity(1)).toEqual(1);
    expect(b.parity(3)).toEqual(2);
    expect(b.parity(15)).toEqual(4);
  });

  it('tests clearLSB', function() {
    expect(b.clearLSB(4)).toEqual(0);
    expect(b.clearLSB(5)).toEqual(4);
  })

  it('tests extractLowestSetBit', function() {
    expect(b.extractLowestSetBit(1)).toEqual(1);
    expect(b.extractLowestSetBit(2)).toEqual(2);
    expect(b.extractLowestSetBit(3)).toEqual(1);
    expect(b.extractLowestSetBit(4)).toEqual(4);
    expect(b.extractLowestSetBit(5)).toEqual(1);
    expect(b.extractLowestSetBit(6)).toEqual(2);
    expect(b.extractLowestSetBit(7)).toEqual(1);
    expect(b.extractLowestSetBit(8)).toEqual(8);
  });

  it('tests numToGrayCode', function() {
    expect(b.numToGrayCode(1)).toEqual(1);
    expect(b.numToGrayCode(2)).toEqual(3);
    expect(b.numToGrayCode(3)).toEqual(2);
    expect(b.numToGrayCode(4)).toEqual(6);
    expect(b.numToGrayCode(5)).toEqual(7);
    expect(b.numToGrayCode(6)).toEqual(5);
    expect(b.numToGrayCode(7)).toEqual(4);
  });
});