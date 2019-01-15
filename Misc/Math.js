// sum of first n squares
function sumOfFirstNSquares(n) {
  return (1 / 6) * n * (n + 1) * (2 * n + 1);
}

// sum of first n cubes
function sumOfFirstNCubes(n) {
  return Math.pow((n * (n + 1)) / 2, 2);
}

// http://www.programminglogic.com/fast-exponentiation-algorithms/
// fast exponentiation
function power(a, n) {
  if (n === 0) {
    return 1;
  }

  if (n === 1) {
    return a;
  }

  var t = power(a, Math.floor(n / 2));
  return t * t * power(a, n % 2);
}

// non-recursive version of above
function power2(a, n) {
  var result = 1;
  while (n) {
    if (n % 2 === 1) {  // exponent is odd
      result = result * a;
    }
    a = a * a;
    n = n >> 1;
  }
  return result;
}

// Apress #40: More robust power function that handles negative exponents and double bases (didn't finish)
function power3(base, exp) {
  if (exp === 0) {
    return 1;
  } else if (exp === 1) {
    return base;
  }

  var result = 1;
  while (exp > 0) {
    result = result * base;
    exp -= 1;
  }

  return result;
}

// get the greatest common multiple between 2 numbers
function gcm(a, b) {
  return (b === 0) ? a : gcm(b, a % b);
}

// non-recursive version of above
function gcm2(a, b) {
  while (b) {
    var r = a % b;
    a = b;
    b = r;
  }

  return a;
}

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Return a large random (usually 30-bit) int (Programming Pearls p.224)
// NOTE: 32767 is the min value MAX_RAND is in C++. Don't understand why we add the extra Math.random()
function bigrand() {
  return (32767 * Math.random() + Math.random()) >> 1;
}

// Get m random numbers from an array of size n (Programming Pearls p.126-7)
// Algorithm: visit each int in order so result is guaranteed to be sorted. 
function KnuthAlgorithmS(m, n) {
  for (var i = 0; i < n; i++) {
    // select m of remaining n - i
    if ((bigrand() % (n - i)) < m) {  // this conditional ensures that each subset is equally likely to be picked
      console.log(i);
      m -= 1;
    }
  }
}

// Shuffle an array of numbers
function shuffle(arr) {
  var length = arr.length, i, temp, randomIndex;

  for (i = 0; i < length; i++) {
    randomIndex = getRandomInt(i, length - 1);
    temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
}

// add each individual digit in a number and return its sum
function getDigitSum(number) {
  var sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }

  return sum;
}

// Programming Pearls p.220 #12 (not complete)
function HornersMethod() {
  y = a[n];
  for (i = n - 1; i >= 0; i--) {
    y = x * y + a[i];
  }
}
/*
console.log(sumOfFirstNSquares(4)); //1 + 4 + 9 + 16 = 30
console.log(sumOfFirstNSquares(6)); // 30 + 25 + 36 = 91
console.log(sumOfFirstNCubes(4)); //1 + 8 + 27 + 64 = 100
console.log(sumOfFirstNCubes(6)); // 100 + 125 = 441

console.log(gcm(16,10));
console.log(gcm2(16,10));

console.log(power(2, 10));

console.log(getDigitSum(35));
console.log(getDigitSum(38));

KnuthAlgorithmS(20,200);
*/

var arr = [1,2,3,4,5,6,7,8,9,10];
shuffle(arr);
console.log(arr);