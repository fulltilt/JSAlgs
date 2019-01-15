var Bit = require('../Bits.js');

describe("Bits", function() {
  var b = new Bit();

  it('tests decimalToBinary', function() {
    expect(b.decimalToBinary(34)).toEqual('100010'); // 34 = 100010
  });

  it('tests setNthBit', function() {
    expect(b.setNthBit(34, 3)).toEqual(42); // 34 = 100010; 42 = 101010
  });

  it('tests toggleNthBit', function() {
    expect(b.toggleNthBit(40, 2)).toEqual(44);
    expect(b.toggleNthBit(44, 2)).toEqual(40);
  });

  it('tests turnOnAllBitsOfSizeN', function() {
    expect(b.turnOnAllBitsOfSizeN(3)).toEqual(7);
    expect(b.turnOnAllBitsOfSizeN(11)).toEqual(2047);
  });

  it('tests turnOnLastZero', function() {
    expect(b.turnOnLastZero(41)).toEqual(43);
  });

  it('tests turnOffLastConsecutiveRunOfOnes', function() {
    expect(b.turnOffLastConsecutiveRunOfOnes(39)).toEqual(32);
  });

  it('tests turnOnLastConsecutiveRunOfZeroes', function() {
    expect(b.turnOnLastConsecutiveRunOfZeroes(36)).toEqual(39);
  });

  it('tests getRemainder', function() {
    expect(b.getRemainder(7, 4)).toEqual(3);
    expect(b.getRemainder(6, 4)).toEqual(2);
    expect(b.getRemainder(5, 4)).toEqual(1);
    expect(b.getRemainder(4, 4)).toEqual(0);
    expect(b.getRemainder(4, 0)).toEqual(4);
  });

  it('tests swap', function() {
    expect(b.swap(23, 65)).toEqual(65);
  });

  it('tests parity', function() {
    expect(b.parity(1)).toEqual(1);
    expect(b.parity(1)).toEqual(1);
    expect(b.parity(3)).toEqual(2);
    expect(b.parity(15)).toEqual(4);
  });

  it('tests clearNthBit', function() {
    expect(b.clearNthBit(42, 1)).toEqual(40); // 42 = 101010; 40 = 101000
  });

  it('tests clearLSB', function() {
    expect(b.clearLSB(4)).toEqual(0);
    expect(b.clearLSB(5)).toEqual(4);
  })

  it('tests isPowerOf2', function() {
    expect(b.isPowerOf2(4)).toEqual(true);
    expect(b.isPowerOf2(8)).toEqual(true);
    expect(b.isPowerOf2(16)).toEqual(true);
    expect(b.isPowerOf2(3)).toEqual(false);
    expect(b.isPowerOf2(23523)).toEqual(false);
    expect(b.isPowerOf2(67)).toEqual(false);
  });

  it('tests countModifiedBits', function() {
    expect(b.countModifiedBits(13, 10)).toEqual(3);
  });

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

  it('tests getLSBIndex', function() {
    expect(b.getLSBIndex(4)).toEqual(2);  // 00000100
    expect(b.getLSBIndex(24)).toEqual(3); // 00011000
    expect(b.getLSBIndex(68)).toEqual(2); // 01000100
    expect(b.getLSBIndex(80)).toEqual(4); // 01010000
  });

  it('tests isIthBitSet', function() {
    expect(b.isIthBitSet(80, 6)).toEqual(true);
    expect(b.isIthBitSet(80, 5)).toEqual(false);
    expect(b.isIthBitSet(80, 4)).toEqual(true);
  });

  it('tests numbersOccurringOnce', function() {
    expect(b.numbersOccurringOnce([2, 4, 3, 6, 3, 2, 5, 5])).toEqual([6,4]);  // note: order matters
  });

  it('tests bitVectorSort', function() {
    //b.bitVectorSort([50,6,2,1,8,10,30]);
  });

  it('tests bitVectorSort2', function() {
    b.bitVectorSort2([50,6,2,1,8,10,30]);
  });

  it('tests add', function() {
    expect(b.add(15, 5)).toEqual(20);
  });

  it('tests subtract', function() {
    expect(b.subtract(15, 5)).toEqual(10);
  });

  it('tests multiply', function() {
    expect(b.multiply(15, 5)).toEqual(75);
  });

  it('tests divide', function() {
    expect(b.divide(15, 5)).toEqual(3);
  });
});