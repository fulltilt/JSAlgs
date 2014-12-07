// sum of first n squares
function sumOfFirstNSquares(n) {
  return (1 / 6) * n * (n + 1) * (2 * n + 1);
}

// sum of first n cubes
function sumOfFirstNCubes(n) {
  return Math.pow((n * (n + 1)) / 2, 2);
}

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
    if (n % 2 === 1) {
      result *= a;
    }
    a *= a;
    n = Math.floor(n / 2);
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

console.log(sumOfFirstNSquares(4)); //1 + 4 + 9 + 16 = 30
console.log(sumOfFirstNSquares(6)); // 30 + 25 + 36 = 91
console.log(sumOfFirstNCubes(4)); //1 + 8 + 27 + 64 = 100
console.log(sumOfFirstNCubes(6)); // 100 + 125 = 441

console.log(gcm(16,10));
console.log(gcm2(16,10));

console.log(power(2, 10));


function getDigitSum(number) {
  var sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }

  return sum;
}
console.log(getDigitSum(35));
console.log(getDigitSum(38));