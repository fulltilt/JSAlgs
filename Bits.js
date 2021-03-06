/*
https://www.i-programmer.info/programming/javascript/2550-javascript-bit-manipulation.html
-In JavaScript, bit manipulation works fine within 32 bits then it gets weird outside of that
-a hex letter represents 4 bits

Decimal 	Binary	    Hexadecimal
0	        0000	      0
1	        0001	      1
2	        0010	      2
3	        0011	      3
4	        0100	      4
5	        0101	      5
6	        0110	      6
7	        0111	      7
8	        1000	      8
9	        1001	      9
10	      1010	      A
11  	    1011	      B
12  	    1100	      C
13	      1101	      D
14	      1110	      E
15	      1111	      F
16	      0001 0000	  10 (1+0)
17	      0001 0001	  11 (1+1)

-bitwise negation example: https://stackoverflow.com/a/12084580/1202995
-unsigned int in JavaScript: https://stackoverflow.com/a/40884313/1202995
//Create var as array of length 1
var arr = new Uint32Array(1);
//set first value to 1
arr[0] = 1;
//output contents
console.log(arr); // 1
//substract to "negative"
arr[0] -= 2;
//output contents
console.log(arr); // 4294967295

11111111 11111111 11111111 11111111 = 4294967295 (unsigned) or -1 (signed)

-when subtracting 1 from a number, it flips everyting from (and including) the rightmost 1
-convert decimal to binary in JS: Number(23).toString(2)  // for negative numbers, it doesn't return unsigned 32 bit representaition

// OLD NOTES
-https://discuss.leetcode.com/topic/50315/a-summary-how-to-use-bit-manipulation-to-solve-problems-easily-and-efficiently/32
-least significant bit is the right-most bit. It has many uses such as determining whether a number is even or odd

-signed shift operator: >>
-unsigned shift operator: >>>

-Twos complement
ex. -35 
1. Find positive binary representation: 35 = 100011 in binary but add leading zero which will represent the negative #: 0100011
2. Flip bits: 1011100
3. Add one to #: 1011100
                 +     1
                 -------
                 1011101  = -64 + 16 + 8 + 4 + 1 = -35
-aside from 1, every bit sequence where the MSB is 1 and the rest is zero is a power of 2
2: 10
4: 100
8: 1000
16: 10000
32: 100000
etc.

another note is that 1 minus a power of 2, results in a number where all the digits are 1:
1: 1
3: 11
7: 111
15: 1111
31: 11111

A = 10 = 1010
B =  8 = 1000
C =  5 = 0101

Union
A | B = 10 = 2

intersection
A & B = 1000 = 8

Subtraction
A & ~B = 1010 & ~(1000) = 1010 & 0111 = 0010 = 2

Negation
~A = 0101 = 5 (dev tools returns -11)
  twos complement: ~(0101) => 1010 + 1 => 1011 => -11
-in javascript, they use twos complement to represent negative #s. Twos complements is where you invert all the bits and then add 1
-note on twos complement: when doing the bit operations, dont worry about twos complement. Just flipping the bits is fine
 -apparently twos complement applies in bitwise operations when theres a negative sign so -A = 1011 (or -11)
  so for 1010 => 0101 => 0110 = 5
-note: it flips bits for all 32 bits which is why negation results in a negative number. Also the result is signed 

Set bit
A != 1 << bit
A |= 1 << 0 = 1011 (set 0th bit which is the bit furthest to the right)
A |= 1 << 2 = 1010 | 0100 = 1110 = 14

Clear bit
A &= ~(1 << bit) (clear bit)
A &= ~(1 << 1) = 1010 & ~(0010) => 1010 & 1101 => 1000 = 8

Test bit
A & 1 << bit !== 0 (test bit)
(A & (1 << 0)) !== 0 (false)
(A & (1 << 1)) !== 0 (true)

Extract last bit (return rightmost 1 in binary representation of x)
A & -A or A & ~(A - 1) or A ^ (A & (A - 1))
A & -A = 1010 & 1011 = 10 (or 2); C & -C = 0101 & 1011 = 1 (or 1)
A & ~(A - 1) = 1010 & ~(1010 - 1) = 1010 & ~(1000) = 1010 & 0111 = 0010 (or 2)
 note: (1010 - 1) = 1010 - 0001 = 1001(using borrow method since theres a 0 - 1) - 0001 = 1000
A ^ (A & (A - 1)) = 1010 ^ (1010 & 1000) = 1010 ^ 1000 = 10 (or 2)

Remove last bit (or another way to say this is to remove the bit furthest to the right)
A & (A - 1) = 1010 & 1000 = 1000

Get all 1-bits
~0
*/

function Bits() {
  this.decimalToBinary = decimalToBinary;
  this.setNthBit = setNthBit;
  this.clearNthBit = clearNthBit;
  this.toggleNthBit = toggleNthBit;
  this.getRemainder = getRemainder;
  this.swap = swap;
  this.parity = parity;
  this.clearLSB = clearLSB;
  this.turnOnLastZero = turnOnLastZero;
  this.turnOnLastConsecutiveRunOfZeroes = turnOnLastConsecutiveRunOfZeroes;
  this.turnOffLastConsecutiveRunOfOnes = turnOffLastConsecutiveRunOfOnes;
  this.isPowerOf2 = isPowerOf2;
  this.getLSBIndex = getLSBIndex;
  this.isIthBitSet = isIthBitSet;
  this.turnOnAllBitsOfSizeN = turnOnAllBitsOfSizeN;
  this.extractLowestSetBit = extractLowestSetBit;
  this.countModifiedBits = countModifiedBits;
  this.numToGrayCode = numToGrayCode;
  this.numbersOccurringOnce = numbersOccurringOnce;
  this.clearBitsMSBthroughN = clearBitsMSBthroughN;
  this.clearBitsNthroughZero = clearBitsNthroughZero;
  this.bitVectorSort = bitVectorSort;
  this.bitVectorSort2 = bitVectorSort2;
  this.add = add;
  this.subtract = subtract;
  this.multiply = multiply;
  this.divide = divide;
  this.XOR1toN = XOR1toN;
}

function decimalToBinary(n) {
  var stack = [];

  while (n > 0) {
    stack.push(n % 2);
    n = n >> 1;
  }

  return stack.reverse().join("");
}

// https://stackoverflow.com/a/16155417/1202995 for explanation
function decimalToBinary2(n) {
  return (n >>> 0).toString(2); // the >>> makes the integer unsigned
}

/*
visualize 1 as: 00000000 00000000 00000000 00000001
and shift that 1 bit n spaces to the left, OR it with the number and return the result
*/
function setNthBit(num, n) {
  num = num | (1 << n);
  return num;
}

function testNthBit(num, n) {
  return (num & (1 << n)) !== 0;
}

/* ex. 42 (101010)
1 << 1: 000010
~(1 << 1): 111101
42 & ~(1 << 1) => 101010 & 111101 = 101000

logic is to create a mask with only the ith bit set to one, negate the mask, and then AND it with num
*/
function clearNthBit(num, n) {
  return num & ~(1 << n);
}

function toggleNthBit(num, n) {
  return num ^ (1 << n);
}

// assumption: n is a power of 2
function getRemainder(num, n) {
  return num & ~n;
}

/*
i.e. 
x = 10 (1010)
y = 5 (0101)

x = x ^ y;  // 1111
y = x ^ y;  // 1010
x = x ^ y;  // 0101
 */
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

    num = num >>> 1; // do unsigned shift else will fail on negative numbers
  }
  return count;
}

function clearLSB(num) {
  return num & (num - 1);
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

function turnOnLastZero(num) {
  return num | (num + 1);
  /*var temp = num, 
      i = 0;
  while (num > 0) {
    num = num >> i;
    if ((num & 1) === 0) {
      break;
    } 
    i += 1;
  }

  return temp | (1 << i);*/
}
/* ex. 43
  101001
+      1
  ------
  101010
| 101001  // might be hard to see the '|' operator on the far left
  ------
  101011 */

function turnOffLastConsecutiveRunOfOnes(num) {
  return num & (num + 1);
}
/* ex. 39
  100111
+      1
  ------
  101000
& 100111
  ------
  100000 */

function turnOnLastConsecutiveRunOfZeroes(num) {
  return num | (num - 1);
}
/* ex. 36
  100100
-      1
  ------
  100011
| 100111  // might be hard to see the '|' operator on the far left
  ------
  100111 */

// ex. for n = 3:   8: 1000; 8 - 1 = 7: 111
function turnOnAllBitsOfSizeN(n) {
  return (1 << n) - 1;
}

// Apress #36: determine whether a number is a power of 2
// note: numbers that are a power of 2 only have one 1 bit set (ex. 4 = 100, 8 = 1000, etc.) while 1 minus those numbers have all their bits set (i.e. 7 is 0111). Uses this fact and applies clearLSB algorithm
function isPowerOf2(num) {
  return num !== 0 && (num & (num - 1)) === 0;
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
  return num ^ (num >> 1);
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
  while ((num & 1) === 0 && index < 32) {
    num = num >> 1;
    ++index;
  }

  return index;
}

// check whether ith bit is set
function isIthBitSet(num, i) {
  return ((num >> i) & 1) === 1; // shift number to the right until ith bit in num is the least significant bit and compare it to 1
  // can do: return num & (1 << i);   but the caller would have to test whether or not the returned value was 0 or not
  //return (num & (1 << i)) !== 0; // this works as well?
}

// clear all bits from the MSB through n (inclusive)
// algo: we create a mask with a 1 at the ith bit (1 << i) then we subtract 1 from it giving us a sequence of zeron's followed by n 1s.
// we then AND our # with this mask to leave just the last i bits
function clearBitsMSBthroughN(num, n) {
  return num & ((1 << n) - 1);
}

// clear all bits from n through 0 (inclusive)
// algo: we take a sequence of all 1s (which is -1) and shift it over by 31 - i bits. We want a logical shift (so that we move the sign bit),
// so we use the >>> operator. This gives us a sequence of 1s followed by i 0 bits
function clearBitsNthroughZero(num, n) {
  return num & ~(1 >>> (31 - i));
}

// Programming Pearls p.4: sort a disk file with up to n^7 non-duplicate numbers with a limited amount of memory. I believe merge and quicksort can't be used
function bitVectorSort(arr) {
  var length = arr.length,
    bit = [],
    bitVectorLength = Math.pow(10, 7),
    i;

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
      console.log(i);
    }
  }
}

// version of bitVectorSort that uses bitwise operators
function bitVectorSort2(arr) {
  var BITSPERWORD = 32,
    SHIFT = 5,
    MASK = 0x1f, // 31 or (1 * 16^1) + (15 * 16^0)
    N = 10000000,
    a = [],
    length = arr.length,
    i;

  function set(i) {
    a[i >> SHIFT] |= 1 << (i & MASK);
  }

  function clr(i) {
    a[i >> SHIFT] &= ~(1 << (i & MASK));
  }

  function test(i) {
    return a[i >> SHIFT] & (1 << (i & MASK));
  }

  for (i = 0; i < N; i++) {
    clr(i);
  }

  for (i = 0; i < length; i++) {
    set(arr[i]);
  }

  for (i = 0; i < N; i++) {
    if (test(i)) {
      console.log(i);
    }
  }
}

// Apress #100-103: implement basic math operations using only bits
function add(num1, num2) {
  var sum, carry;

  do {
    sum = num1 ^ num2;
    carry = (num1 & num2) << 1;
    num1 = sum;
    num2 = carry;
  } while (num2 !== 0);

  return num1;
}

/*
https://www.geeksforgeeks.org/add-1-to-a-given-number/
Method #1
To add 1 to a number x (say 0011000111), flip all the bits after the rightmost 0 bit (we get 0011000000). 
Finally, flip the rightmost 0 bit also (we get 0011001000) to get the answer


Method #2
Say, x is numerical value of a number, then

~x = -(x+1) [ ~ is for bitwise complement ]

(x + 1) is due to addition of 1 in 2’s complement conversion

To get (x + 1) apply negation once again. So, the final expression becomes (-(~x)).
*/
function addOneMethod1(x) {
  let m = 1;

  // Flip all the set bits until we find a 0
  while (x & m) {
    x = x ^ m;
    m = m << 1;
  }

  return x ^ m; // flip the rightmost 0 bit and return it
}

function addOneMethod2(x) {
  return -~x;
}

function subtract(num1, num2) {
  num2 = this.add(~num2, 1);
  return add(num1, num2);
}

function multiply(num1, num2) {
  var minus = false;
  if ((num1 < 0 && num2 > 0) || (num1 > 0 && num2 < 0)) {
    minus = true;
  }

  if (num1 < 0) {
    num1 = this.add(~num1, 1);
  }
  if (num2 < 0) {
    num2 = this.add(~num2, 1);
  }

  var result = 0;
  while (num1 > 0) {
    if ((num1 & 0x1) !== 0) {
      // could have replaced '0x1' with '1'
      result = this.add(result, num2);
    }

    num2 = num2 << 1;
    num1 = num1 >> 1;
  }

  if (minus) {
    result = this.add(~result, 1);
  }

  return result;
}

/*
Multiply a given Integer with 3.5

Given a integer x, write a function that multiplies x with 3.5 and returns the integer result. 
You are not allowed to use %, /, *.

Trick: We can get x*3.5 by adding 2*x, x and x/2. To calculate 2*x, left shift x by 1 and to calculate x/2, right shift x by 2
*/
function multiplyBy3Point5(x) {
  return (x << 1) + x + (x >> 1);
}

function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error("num2 is zero.");
  }

  var minus = false;
  if ((num1 < 0 && num2 > 0) || (num1 > 0 && num2 < 0)) {
    minus = true;
  }

  if (num1 < 0) {
    num1 = this.add(~num1, 1);
  }
  if (num2 < 0) {
    num2 = this.add(~num2, 1);
  }

  var result = 0;
  for (var i = 0; i < 32; i = this.add(i, 1)) {
    result = result << 1;
    if (num1 >> (31 - i) >= num2) {
      num1 = this.subtract(num1, num2 << (31 - i));
      result = this.add(result, 1);
    }
  }

  if (minus) {
    result = add(~result, 1);
  }

  return result;
}

/* UVa 725: find and display all pairs of 5-digit #'s that collectively use the digits 0 through 9 once each such that the first # divided by the 2nd is equal to an interger N
 */
function divisionUsingAllInts() {
  var N = 62;

  for (var fghij = 1234; fghij <= 98765 / N; fghij++) {
    var abcde = fghij * N, // this way abcde and fghij are at most 5 digits
      tmp,
      used = 0;

    if (fghij < 10000) {
      // if digit f=0, then we have to flag the 0th bit
      used = 1; // set used to 1 which essentially sets the 0th bit
    }

    tmp = abcde;
    while (tmp > 0) {
      used |= 1 << tmp % 10;
      tmp /= 10;
    }

    tmp = fghij;
    while (tmp > 0) {
      used |= 1 << tmp % 10;
      tmp /= 10;
    }

    if (used === (1 << 10) - 1) {
      // 1023 = 1111111111 (bits 0-9 are set)  (note: uses trick from turnOnAllBitsOfSizeN())
      console.log(fghij + " / " + abcde + " = " + N);
    }
  }
}

module.exports = Bits;

// Count the number of ones in the binary representation of the given number
let countOnes = function(n) {
  let count = 0;

  while (n) {
    n = n & (n - 1); // remove last bit
    count++;
  }
  return count;
};

console.log(countOnes(13)); // 1101 = 3
console.log(countOnes(111)); // 1101111 = 6

let isPowerOfTwo = function(n) {
  return (n & (n - 1)) === 0;
};

console.log(isPowerOfTwo(32));
console.log(isPowerOfTwo(2342897));

let getSum = function(a, b) {
  return b === 0 ? a : getSum(a ^ b, (a & b) << 1);
};

console.log(getSum(9, 5)); //1001, 0101 = 14 (1110)
// 1: getSum(1001 ^ 0101, (1001 & 0101) << 1) => getSum(1100, 0001 << 1) => getSum(1100, 0010)
// 2: getSum(1100 ^ 0010, (1100 & 0010) << 1) => getSum(1110, 0 << 1) => getSum(1110, 0)
// 3: return 1110

// 268. Missing Number
// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array. For example, Given nums = [0, 1, 3] return 2. (Of course, you can do this by math.)
var missingNumber = function(nums) {
  let missing = 0,
    i = 0;
  for (i = 0; i < nums.length; ++i) {
    missing ^= i;
    missing ^= nums[i];
  }

  return missing ^ nums.length;
};
// ex.  [0, 1, 3]
// 1: 0 ^= 0 = 0; 0 ^= 0 = 0
// 2: 0 ^= 1 = 1; 1 ^= 1 = 0
// 3: 0 ^= 2 = 10; 10 ^= 11 = 1
// 4(out of loop): 1 ^ 11 = 10 (2)

let reverseBits = function(n) {
  var re = 0;
  for (let i = 0; i < 32; i++) {
    re = (re << 1) | (n & 1);
    n >>>= 1;
  }

  return re >>> 0; // use unsignedness of >>> to cast to an unsigned integer
};

console.log(reverseBits(15));
console.log(reverseBits(14));

// Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this
// range, inclusive. For example, given the range [5, 7], you should return 4.
// 5 = 0101
// 6 = 0101
// 7 = 0111
// 5 & 6 & 7 = 0100 = 4
let rangeBitwiseAnd = function(m, n) {
  let a = 0;
  while (m !== n) {
    m >>= 1;
    n >>= 1;
    a++;
  }

  return m << a;
};

console.log(rangeBitwiseAnd(5, 7));
/*
1:
5 >>= 1 => 0101 >> 1 = 0010
7 >>= 1 => 0111 >> 1 = 0011
a = 1

2:
2 >>= 1 => 0001
3 >>= 1 => 0001
a = 2

return 0001 << 2 = 0100 = 4
*/

// also known as hamming weight
let numberOfOneBits = function(n) {
  let count = 0;

  while (n) {
    n = n & (n - 1);
    count++;
  }

  return count;
};

console.log(numberOfOneBits(5));
console.log(numberOfOneBits(6));
console.log(numberOfOneBits(7));

let hammingDistance = function(x, y) {
  let distance = 0;
  while (x || y) {
    if ((x & 1) ^ ((y & 1) === 1)) {
      distance++;
    }
    x >>= 1;
    y >>= 1;
  }

  return distance;
};

console.log(hammingDistance(1, 4));

/* Given a number n, the task is to find the XOR from 1 to n (https://www.geeksforgeeks.org/calculate-xor-1-n/)

-this pattern repeats every 4 digits
Number Binary-Repr  XOR-from-1-to-n
1         1           [0001]
2        10           [0011]
3        11           [0000]  <----- We get a 0
4       100           [0100]  <----- Equals to n
5       101           [0001]
6       110           [0111]
7       111           [0000]  <----- We get 0
8      1000           [1000]  <----- Equals to n
9      1001           [0001]
10     1010           [1011]
11     1011           [0000] <------ We get 0
12     1100           [1100] <------ Equals to n
NOTE: to get the of XOR-from-1-to-n, take the value of Binary-Repr on the same line and XOR it with the previous XOR-from-1-to-n value
 ex. for Binary-Repr of 6 (110) to get it's XOR-from-1-to-n, XOR it with XOR-from-1-to-n of 5 (0001) which is 0111
*/
let XOR1toN = function(n) {
  switch (
    n & 3 // same as n % 4 (assuming 4 bits, n & 3 => n & 0011)
  ) {
    case 0:
      return n; // if n is multiple of 4 (or remainder is 0), return 0
    case 1:
      return 1; // If remainder is 1, return 1
    case 2:
      return n + 1; // If remainder is 2, value is n + 1
    case 3:
      return 0; // If remainder is 3, return 0 which XOR returns just before a multiple of 4
  }
};

/* Count number of set bits
n = 23
23 & 22 = 10110 & 10111 => 10110 (22)
22 & 21 = 10110 & 10101 => 10100 (20)
20 & 19 = 10100 & 10011 => 10000 (16)
16 & 15 = 10000 & 01111 => 0 (0)
-trick: subtracting one from a # flips all bits from (and including) rightmost 1
*/
let countBits = function(n) {
  let count = 0;
  while (n) {
    n = n & (n - 1);
    ++count;
  }
  return count;
};

// console.log(countBits(23));

function areOppositeSigns(x, y) {
  return (x & y) >> 31 === 0; // (x ^ y) >> 31 should work but doesn't seem to in JS
}

/*
Let the input number be n. n-1 would have all the bits flipped after the rightmost set bit 
(including the set bit). So, doing n&(n-1) would give us the required result.
*/
function clearLSB(x) {
  return x & (x - 1);
}

// more primitive way of doing above
function clearLSBSelf(x) {
  let m = 1;
  while ((x & m) === 0) {
    m = m << 1;
  }
  return x ^ m;
}

console.log(clearLSB(12));
console.log(clearLSBSelf(12));
console.log(clearLSB(7));
console.log(clearLSBSelf(7));

// function countOnes(x) {}
