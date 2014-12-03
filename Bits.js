function Bits() {
  this.swap = swap;
  this.parity = parity;
  this.clearLSB = clearLSB;
  this.extractLowestSetBit = extractLowestSetBit;
  this.numToGrayCode = numToGrayCode;
}

function swap(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return a;
}

function parity(num) {
  var count = 0;
  while (num !== 0) {
    if ((num & 1) === 1) {
      count += 1;
    }

    num = num >> 1;
  }
  return count;
}

// clear least-significant bit
function clearLSB(num) {
  return num & (num - 1);
  // or return num & ~1;
}

// extract lowest set bit
function extractLowestSetBit(num) {
  return num & ~(num - 1);
}

// convert a number to it's binary reflection/Gray code
function numToGrayCode(num) {
  return num ^ num >> 1;
}

module.exports = Bits;

/* NOTES
-least significant bit is the normally the right-most bit. It has many uses such as determining whether a number is even or odd
 http://stackoverflow.com/questions/16535335/what-does-least-significant-byte-mean; http://stackoverflow.com/questions/22919049/clearing-least-significant-bit

*/