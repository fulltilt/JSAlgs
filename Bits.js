function Bits() {
  this.swap = swap;
  this.parity = parity;
  this.clearLSB = clearLSB;
  this.isPowerOf2 = isPowerOf2;
  this.getLSBIndex = getLSBIndex;
  this.isIthBitSet = isIthBitSet;
  this.extractLowestSetBit = extractLowestSetBit;
  this.countModifiedBits = countModifiedBits;
  this.numToGrayCode = numToGrayCode;
  this.numbersOccurringOnce = numbersOccurringOnce;
  this.bitVectorSort = bitVectorSort;
}

function swap(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return a;
}

// return number of set bits in a number
function parity(num) {
  var count = 0;
  while (num !== 0) {
    if ((num & 1) === 1) {
      count += 1;
    }

    num = num >>> 1;  // do unsigned shift else will fail on negative numbers
  }
  return count;
}

// clear least-significant (rightmost) bit (see explanation in Apress p.103)
/* ex. 
  1100
-    1
  ----
  1011
& 1100
  ----
  1000 */ 
function clearLSB(num) {
  return num & (num - 1);
  // or return num & ~1;
}

// Apress #36: determine whether a number is a power of 2
// note: numbers that are a power of 2 only have one 1 bit set (ex. 4 = 100, 8 = 1000, etc.). Uses this fact and applies clearLSB algo
function isPowerOf2(num) {
  return ((num !== 0) && ((num & (num - 1)) === 0));
}

// extract lowest set bit
// note: don't know how this works yet
function extractLowestSetBit(num) {
  return num & ~(num - 1);
}

// Apress #37: how many bits must be changed to change one number to another
function countModifiedBits(num1, num2) {
  return parity(num1 ^ num2);
}

// convert a number to it's binary reflection/Gray code
function numToGrayCode(num) {
  return num ^ num >> 1;
}

// in an array of numbers that occur twice except one, return the number that occurs only once
function numberOccurringOnce(arr) {
  var length = arr.length,
      result = 0;
  for (var i = 0; i < length; i++) {
    result = result ^ arr[i];
  }

  return result;
}

// Apress #38: in an array of numbers, get the 2 numbers that occurs only once
function numbersOccurringOnce(arr) {
  var length = arr.length,
      XORresult = 0;
  for (var i = 0; i < length; i++) {
    XORresult = XORresult ^ arr[i];
  }
  
  var indexOf1 = getLSBIndex(XORresult);

  // with the XOR result, we have eliminated duplicates and have the result of XOR'g leftover 2 numbers. By definition of XOR, both numbers differ
  // on the XORresult bit where the 1 is set. Using this info, 'partition' array where the 1 bit is set and where it isn't set
  var isSet = 0, 
      notSet = 0;
  for (i = 0; i < length; i++) {
    if (isIthBitSet(arr[i], indexOf1)) {
      isSet = isSet ^ arr[i];
    } else {
      notSet = notSet ^ arr[i];
    }
  }
  
  return [isSet, notSet];
}

// return zero-based index of least significant (rightmost) set bit
function getLSBIndex(num) {
  var index = 0;
  while (((num & 1) === 0) && (index < 32)) {
    num = num >> 1;
    ++index;
  }

  return index;
}

// check whether ith bit is set
function isIthBitSet(num, i) {
  return ((num >> i) & 1) === 1;
}

// Programming Pearls p.4: sort a disk file with up to n^7 non-duplicate numbers with a limited amount of memory. I believe merge and quicksort can't be used
function bitVectorSort(arr) {
  var length = arr.length, 
      bit = [], 
      bitVectorLength = Math.pow(10, 7), i;
  
  // initialize bit vector to all zeroes
  for (i = 0; i < bitVectorLength; i++) {
    bit[i] = 0;
  }

  // go through array and set appropriate bits
  for (i = 0; i < length; i++) {
    bit[arr[i]] = 1;
  }

  // output set bits to file in order
  for (i = 0; i < bitVectorLength; i++) {
    if (bit[i] === 1) {
      console.log(i)
    }
  }
}
module.exports = Bits;

/* NOTES
-least significant bit is the normally the right-most bit. It has many uses such as determining whether a number is even or odd
 http://stackoverflow.com/questions/16535335/what-does-least-significant-byte-mean; http://stackoverflow.com/questions/22919049/clearing-least-significant-bit

-signed shift operator: >>
-unsigned shift operator: >>>

*/