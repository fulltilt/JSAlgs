function Dynamic() {
  this.nthFibonacciRecursive = nthFibonacciRecursive;
  this.nthFibonacciIterative = nthFibonacciIterative;
  this.recursiveKnapsack = recursiveKnapsack;
  this.dynamicKnapsack = dynamicKnapsack;
  this.topDownKnapsack = topDownKnapsack;
  this.dynamicCoinChange = dynamicCoinChange;
  this.maxWines = maxWines;
  this.largestContiguousSumSubarray = largestContiguousSumSubarray;
  this.longestCommonSubsequence = longestCommonSubsequence;
  this.longestIncreasingSequence = longestIncreasingSequence;
  this.longestIncreasingSubsequence = longestIncreasingSubsequence;
  this.longestCommonSubstring = longestCommonSubstring;
  this.longestCommonSubstring2 = longestCommonSubstring2;
  this.wordBreak = wordBreak;
  this.editDistance = editDistance;
  this.stringAlignment = stringAlignment;
  this.minCostPath = minCostPath;
  this.maxSumOfNonAdjacentElements = maxSumOfNonAdjacentElements;
  this.minNumOfJumpsToEnd = minNumOfJumpsToEnd;
  this.countAllPossiblePaths = countAllPossiblePaths;
  this.removeMinElems = removeMinElems;
  this.binaryStringCountWithoutConsecutiveZeroes = binaryStringCountWithoutConsecutiveZeroes;
  this.longestSubstringWithoutRepeatedChars = longestSubstringWithoutRepeatedChars;
  this.palindromePartitioning = palindromePartitioning;
  this.longestPalindromicSubstring = longestPalindromicSubstring;
  this.possibleDecodings = possibleDecodings;
  this.minJumps = minJumps;
  this.binomialCoefficient = binomialCoefficient;
  this.eggDroppingProblem = eggDroppingProblem;
  this.cuttingRod = cuttingRod;
  this.longestBitonicSubsequence = longestBitonicSubsequence;
  this.wordWrap = wordWrap;
  this.boxStacking = boxStacking;
  this.optimalBST = optimalBST;
  this.subsetSum = subsetSum;
  this.largestIndependentSet = largestIndependentSet;
  this.minInsertionsToFormPalindrome = minInsertionsToFormPalindrome;
  this.diceThrow = diceThrow;
  this.toyGameStrategy = toyGameStrategy;
  this.areStringsInterleaving = areStringsInterleaving;
  this.assemblyLineScheduling = assemblyLineScheduling;
  this.longestArithmeticProgression = longestArithmeticProgression;
  this.maxProductCutting = maxProductCutting;
  this.nthCatalan = nthCatalan;
  this.countNumBinaryStringsWOConsecutiveOnes = countNumBinaryStringsWOConsecutiveOnes;
  this.countDecodings = countDecodings;
  this.numericKeypad = numericKeypad;
}

// http://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
function nthFibonacciRecursive(n, cache) {
  if (n === 0 || n === 1) {
    return 1;
  }

  if (cache[n]) {
    return cache[n];
  }

  return cache[n] = nthFibonacciRecursive(n - 1, cache) + nthFibonacciRecursive(n - 2, cache);
}

function nthFibonacciIterative(n) {
  var cache = [], i;
  cache[0] = 1;
  cache[1] = 1;
  
  for (i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}

// inefficient as many subproblems are repeated
function recursiveKnapsack(capacity, size, value, n) {
  if (capacity === 0 || n === size.length) {
    return 0;
  }

  // If weight of the nth item is more than Knapsack capacity W, then this item cannot be included in the optimal solution
  if (size[n] > capacity) {
    return recursiveKnapsack(capacity, size, value, n + 1);
  } else {
    // Return the maximum of two cases: (1) nth item included (2) not included (note: by adding condition of not included enables us to get permutations such as only last element being added)
    return Math.max(value[n] + recursiveKnapsack(capacity - size[n], size, value, n + 1),
                    recursiveKnapsack(capacity, size, value, n + 1));
  }
}

// same as above but added a memoization table
function dynamicKnapsack(capacity, size, value, n, table) {
  if (capacity === 0 || n === size.length) {
    return 0;
  }

  if (table[capacity][n] !== -1) {
    return table[capacity][n];
  }

  if (size[n] > capacity) {
    return table[capacity][n] = dynamicKnapsack(capacity, size, value, n + 1, table);
  } else {
    return table[capacity][n] = Math.max(value[n] + dynamicKnapsack(capacity - size[n], size, value, n + 1,table),
                    dynamicKnapsack(capacity, size, value, n + 1, table));
  }
}

/* original implemntations where fxns are initially called with n = length of size (rewrote as going right to left was harder for me to reason out)
function recursiveKnapsack(capacity, size, value, n) {
  if (n == 0 || capacity == 0) {
    return 0; 
  }
  
  if (size[n - 1] > capacity) {
    return this.recursiveKnapsack(capacity, size, value, n - 1);
  } else {
    return max(value[n - 1] + this.recursiveKnapsack(capacity - size[n - 1], size, value, n - 1), 
               this.recursiveKnapsack(capacity, size, value, n - 1));
  }
}

// n: number of items
// http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/
// Discrete or 0-1 Knapsack problem. For fractional knapsack problem use greedy algorithm
function dynamicKnapsack(capacity, size, value, n) {
  // initialize dynamic table (instead of just 'n', book initialized it to 'capacity + 1' which resulted in a lot of unused rows)
  var K = []; 
  for (var i = 0; i <= n; i++) { 
    K[i] = [];
  }

  for (var row = 0; row <= n; row++) {
    for (var col = 0; col <= capacity; col++) { 
      if (row == 0 || col == 0) { // this clause is to set the top row and far left row to all zeroes
        K[row][col] = 0; 
      } else if (size[row - 1] <= col) { // if size of current item <= column value (i.e. the current max capacity)
        // set the column to be the max between the cell directly above it and (the value of the current item) + K[previous row][(the value of the current capacity - the size of the current item)]
        K[row][col] = max(value[row - 1] + K[row - 1][col - size[row - 1]], K[row - 1][col]);
      } else {  // if size of current item > column value, set the index to equal the one above it
        K[row][col] = K[row - 1][col];
      }
    }
  }

  return K[n][capacity];
} */

/*
Notes for dynamicKnapsack: 
 -just like in least common substring problem, top row and far left row stay all zeroes
 -each row represents having the first n items available i.e. row 0 has no items available, row 1 only has the first item available, etc.
 -each column represents the total capacity i.e. the capacity is 0 in column 0, the capacity is 1 in column 1, etc.
 -the most confusing part is: K[row][col] = max(value[row - 1] + K[row - 1][col - size[row - 1]], K[row - 1][col]);

    var value = [4,5,10,11,13];
    var size = [3,4,7,8,9];
    var capacity = 16;
    var n = 5;

[ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
  [ 0, 0, 0, 4, 5, 5, 5, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
  [ 0, 0, 0, 4, 5, 5, 5, 10, 10, 10, 14, 15, 15, 15, 19, 19, 19 ],
  [ 0, 0, 0, 4, 5, 5, 5, 10, 11, 11, 14, 15, 16, 16, 19, 21, 21 ],
  [ 0, 0, 0, 4, 5, 5, 5, 10, 11, 13, 14, 15, 17, 18, 19, 21, 23 ] ]    
*/

// note: not 100% sure this is correct but it does go into the if exists in cache statement
function topDownKnapsack(capacity, size, value, n, cache) {
  if (capacity === 0 || n === size.length) {
    return 0;
  }

  if (cache[n][capacity]) {
    return cache[n][capacity];
  }
  
  // If weight of the nth item is more than Knapsack capacity W, then this item cannot be included in the optimal solution
  if (size[n] > capacity) {
    return cache[n][capacity] = topDownKnapsack(capacity, size, value, n + 1, cache);
  } else {
    // Return the maximum of two cases: (1) nth item included (2) not included (note: by adding condition of not included enables us to get permutations such as only last element being added)
    return cache[n][capacity] = Math.max(value[n] + topDownKnapsack(capacity - size[n], size, value, n + 1, cache),
                    topDownKnapsack(capacity, size, value, n + 1, cache));
  }
}  

// http://www.topcoder.com/tc?d1=tutorials&d2=dynProg&module=Static
// http://www.geeksforgeeks.org/dynamic-programming-set-7-coin-change/
/* backtracking
function dynamicCoinChange(sum, values, currentSum, result, count) {
  if (currentSum === sum) {
    if (result.length < count.count) {
      count.count = result.length;
    }
    console.log(result);
    return;
  } else if (currentSum > sum) {
    return;
  }

  var length = values.length, 
      results = [], i;
  for (i = 0; i < length; i++) {
    result.push(values[i]);
    dynamicCoinChange(sum, values, currentSum + values[i], result, count);
    result.pop();
  }
}
var result = [],
    count = { count: Infinity };
console.log(dynamicCoinChange(15, [1,3,9,10], 0, result, count));
console.log(count.count); */

/*
function dynamicCoinChange(sum, values) {
  var table = [];
  table[0] = 0
  for (var i = 1; i <= sum; i++) {
    table[i] = Infinity;
  }

  for (currentSum = 1; currentSum <= sum; currentSum++) {
    for (var currentCoin = 0; currentCoin < values.length; currentCoin++) {
      if (values[currentCoin] <= currentSum) {
        if ((table[currentSum - values[currentCoin]] + 1) < table[currentSum]) {
          if (table[currentSum] === Infinity) { // this clause is kind of out of place but we need this else table[currentSum] will be Infinity
            table[currentSum] = 0;
          }
          table[currentSum] = table[currentSum - values[currentCoin]] + 1;
        }
      }
    }
  }

  return table[sum];
}
*/

/* same as above but keeps track of which coins are used */
function dynamicCoinChange2(sum, values) {
  var table = [];
  table[0] = [0, 0, 0];
  for (var i = 1; i <= sum; i++) {
    table[i] = [Infinity, Infinity, Infinity];
  }

  for (currentSum = 1; currentSum <= sum; currentSum++) {
    for (var currentCoin = 0; currentCoin < values.length; currentCoin++) {
      if (values[currentCoin] <= currentSum) {
        if ((table[currentSum - values[currentCoin]][0] + 1) < table[currentSum][0]) {
          if (table[currentSum][0] === Infinity) { // this clause is kind of out of place but we need this else table[currentSum] will be Infinity
            table[currentSum][0] = 0;
          }
          table[currentSum][0] = table[currentSum - values[currentCoin]][0] + 1;
          table[currentSum][1] = currentSum - values[currentCoin];  // keep track of the smaller sum used to obtain this sum
          table[currentSum][2] = values[currentCoin];               // keep track of the coin used
        }
      }
    }
  }
  //console.log(table);
  for (i = table[sum]; i[2] !== 0; i = table[i[1]]) {
    //console.log(i[2]);
  }
  return table[sum][0];
}

// Refactored dynamicCoinChange() using backtracking and memoization table
function dynamicCoinChange(sum, values, n, table) {
  if (n === values.length || sum === 0) {
    return 0;
  }

  if (table[sum][n]) {
    return table[sum][n];
  }

  if (values[n] > sum) {
    return table[sum][n] = dynamicCoinChange(sum, values, n + 1, table);
  } else {
    return table[sum][n] = Math.max(1 + dynamicCoinChange(sum - values[n], values, n + 1, table),
                                        dynamicCoinChange(sum, values, n + 1, table));
  }
}

// http://www.quora.com/Are-there-any-good-resources-or-tutorials-for-dynamic-programming-besides-the-TopCoder-tutorial
/* backtrack
function maxWines(arr, lo, hi) {
  if (lo > hi) {
    return 0;
  }

  // (hi - lo + 1) is the # of unsold wines
  var year = arr.length - (hi - lo + 1) + 1;
  return Math.max(maxWines(arr, lo + 1, hi) + arr[lo] * year,
                  maxWines(arr, lo, hi - 1) + arr[hi] * year);
}
*/

function maxWines(arr, cache, lo, hi) {
  if (lo > hi) {
    return 0;
  }

  if (cache[lo][hi] !== -1) {
    return cache[lo][hi];
  }

  // (hi - lo + 1) is the # of unsold wines
  var year = arr.length - (hi - lo + 1) + 1;

  return cache[lo][hi] = Math.max(maxWines(arr, cache, lo + 1, hi) + arr[lo] * year,
                                  maxWines(arr, cache, lo, hi - 1) + arr[hi] * year);
}

// http://www.geeksforgeeks.org/largest-sum-contiguous-subarray/, http://www.geeksforgeeks.org/dynamic-programming-set-14-maximum-sum-increasing-subsequence/
function largestContiguousSumSubarray(arr) {
  var currentSum = arr[0],
      max = arr[0],
      i;

  for (i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    max = Math.max(currentSum, max);
  }

  return max;
}

// http://www.geeksforgeeks.org/dynamic-programming-set-4-longest-common-subsequence/
/* Backtracking
function longestCommonSubsequence(string1, string2) {
  if (string1.length === 0 || string2.length === 0) {
    return 0;
  }

  if (string1[0] === string2[0]) {
    return 1 + longestCommonSubsequence(string1.substring(1), string2.substring(1));
  } else {
    return Math.max(longestCommonSubsequence(string1, string2.substring(1)),
                    longestCommonSubsequence(string1.substring(1), string2));
  }
} */

function longestCommonSubsequence(string1, string2) {
  var length1 = string1.length,
      length2 = string2.length,
      cache = [], i, j;

  for (i = 0; i < length1; i++) {
    cache[i] = [];
    for (j = 0; j < length2; j++) {
      cache[i][j] = -1;
    }
  }

  return longestCommonSubsequenceHelper(string1, string2, 0, 0, cache);
/* for first test case ABCDGH and AEDFHR
[ [ 3, -1, -1, -1, -1, -1 ],
  [ -1, 2, 2, 1, 1, 0 ],
  [ -1, 2, 2, 1, 1, 0 ],
  [ -1, 2, 2, 1, 1, 0 ],
  [ -1, 1, 1, 1, 1, 0 ],
  [ -1, 1, 1, 1, 1, 0 ] ] */
}

function longestCommonSubsequenceHelper(string1, string2, n, m, cache) {
  if (n === string1.length || m === string2.length) {
    return 0;
  }

  if (cache[n][m] !== -1) {
    return cache[n][m];
  }

  if (string1[n] === string2[m]) {
    return cache[n][m] = 1 + longestCommonSubsequenceHelper(string1, string2, n + 1, m + 1, cache);
  } else {
    return cache[n][m] = Math.max(longestCommonSubsequenceHelper(string1, string2, n, m + 1, cache),
                    longestCommonSubsequenceHelper(string1, string2, n + 1, m, cache));
  }
}

// http://www.geeksforgeeks.org/longest-common-substring/
// Another recurrence relation: http://www.codeproject.com/Articles/11537/The-Longest-Common-Substring-with-Maximal-Consecut
// NOTE: this doesn't calculate the actual common substring but just returns the maximal length
function longestCommonSubstring(string1, string2) {
  var length1 = string1.length,
      length2 = string2.length,
      cache = [], i, j;

  for (i = 0; i < length1; i++) {
    cache[i] = [];
    for (j = 0; j < length2; j++) {
      cache[i][j] = 0;
    }
  }

  var answ =  longestCommonSubstringHelper(string1, string2, 0, 0, cache);
  //var answ =  longestCommonSubstringHelper(string1, string2, length1 - 1, length2 - 1, cache);
  //console.log(cache);
  return answ;
}

function longestCommonSubstringHelper(string1, string2, i, j, cache) {
  if (i === string1.length || j === string2.length) {
    return 0;
  }

  if (cache[i][j] !== 0) {
    return cache[i][j];
  }

  if (string1[i] === string2[j]) {
    return cache[i][j] = 1 + longestCommonSubstringHelper(string1, string2, i + 1, j + 1, cache);
  } else {
    return cache[i][j] = Math.max(longestCommonSubstringHelper(string1, string2, i, j + 1, cache),
                    longestCommonSubstringHelper(string1, string2, i + 1, j, cache));
  }
}

/* same as above but in reverse order
-don't know why but this fails for: expect(d.longestCommonSubstring('helohelhello', 'hello')).toEqual(5);
function longestCommonSubstringHelper(string1, string2, i, j, cache) {
  if (i === 0 || j === 0) {
    return 0;
  }

  if (cache[i][j] !== -1) {
    return cache[i][j];
  }

  if (string1[i] === string2[j]) {
    return cache[i][j] = 1 + longestCommonSubstringHelper(string1, string2, i - 1, j - 1, cache);
  } else {
    return cache[i][j] = Math.max(longestCommonSubstringHelper(string1, string2, i, j - 1, cache),
                                  longestCommonSubstringHelper(string1, string2, i - 1, j, cache));
  }
}*/

// http://www.geeksforgeeks.org/longest-common-substring/
// NOTE: This returns the common substring
function longestCommonSubstring2(string1, string2) {
  var lcsLength = 0;  // init max lcs length

  // initialize 2D array with all zeroes. The dimensions will be (string1.length + 1) X (string2.length + 1)
  // Each row represents the incrementing starting index of the first string. Because of this, the lower left half 'triangle' remain all zeroes
  var table = [];
      len1 = string1.length,
      len2 = string2.length;
  for (var row = 0; row <= len1; row++) {
    table[row] = [];
    for(var col = 0; col <= len2; col++) {
      table[row][col] = 0;
    }
  }

  // fill table
  var lcsEndIndex = 0;  // index in second string where the lcs ends. Used to return the actual lcs
  for (var i = 0; i < len1; i++) {
    for (var j = 0; j < len2; j++) {
      if(string1[i] === string2[j]) {
        table[i + 1][j + 1] = table[i][j] + 1;  // if string indices match, increment index that is one to the right and one below using the current index as a reference

        if(table[i + 1][j + 1] > lcsLength) {   // if updated index is greater than lcsLength, update lcsLength and update lcsEndIndex on the 2nd string
          lcsLength = table[i + 1][j + 1];
          lcsEndIndex = j + 1;
        }
      } else {  
        table[i + 1][j + 1] = 0;  // if no match, set the index that is one to the right and one below to zero
      }
    }
  }

  // splice the lcs out of the second string using lcsLength and lcsEndIndex
  var lcs = ''; 
  if (lcsLength === 0) {
    return ''; 
  } else {
    var startIndex = lcsEndIndex - lcsLength;
    for (i = startIndex; i < startIndex + lcsLength; ++i) {
      lcs += string2[i];
    }
  }
    return lcs;
}

/* 
Notes: 
 -the far left column and top column don't get touched but is used for the calculations
 -based on: http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring#JavaScript
 -each row represents the starting position in the first string and each column represents the corresponding index in the 2nd string (assuming 
  the first row and first column were omitted)
 -for the line: 'table[i + 1][j + 1] = table[i][j] + 1', I stripped out if/else statement as it seemed redundant. Check if there's errors later

 ex.('abbcc', 'dbbccc')
        d  b  b  c  c  c
[  [ 0, 0, 0, 0, 0, 0, 0 ],
  a[ 0, 0, 0, 0, 0, 0, 0 ],
  b[ 0, 0, 1, 1, 0, 0, 0 ],
  b[ 0, 0, 1, 2, 0, 0, 0 ],
  c[ 0, 0, 0, 0, 3, 1, 1 ],
  c[ 0, 0, 0, 0, 1, 4, 2 ] ]
*/

// 
function longestIncreasingSequence(arr) {
  var length = arr.length;
  if (length === 0) {
    return 0;
  }

  var table = [];
  table[0] = -Infinity;
  table[1] = 1; // first digit is increasing by default
  
  for (var i = 2; i <= length; i++) {
    table[i] = 0;
  }

  // the '+ 1''s are needed as the table as its zero index represents the zero part of the table that represents an array of size 0
  var indexOfEnd = 0, longestSequenceLength = 1;
  for (var currentDigit = 1; currentDigit < length; currentDigit++) {
    if (arr[currentDigit] < arr[currentDigit - 1]) { // since there isn't a -1 index for the array, above we set table[1] to 1
      table[currentDigit + 1] = 1;
    } else {
      table[currentDigit + 1] = table[currentDigit] + 1;

      // keep track of the longest sequence length and the index of where it ends
      if ((table[currentDigit + 1] > table[currentDigit]) && (table[currentDigit + 1] > longestSequenceLength)) {
        longestSequenceLength = table[currentDigit + 1];
        indexOfEnd = currentDigit;
      }
    }
  }

  // '- 1' because indexOfEnd includes the last index else it will splice an extra index at the end
  return arr.splice(indexOfEnd - (longestSequenceLength - 1), longestSequenceLength);
}

/* w/o dynamic programming
function lis(arr) {
  var length = arr.length,
      table = [],
      longestStreak = 1,
      currentStreak = 1,
      i;

//  table[0] = 1;
  for (i = 1; i < length; i++) {
    if (arr[i] > arr[i + 1] || currentStreak === 0) {
      currentStreak += 1;
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      currentStreak = 0;
    }
  }
  console.log(longestStreak);
}
*/

/* http://www.geeksforgeeks.org/dynamic-programming-set-3-longest-increasing-subsequence/
-Recurrence: LIS(0) = 1
             LIS(i) = max(LIS(j) + 1, For all j from 0 through i - 1 and A[j] < A[i] (recursive case))
*/
function longestIncreasingSubsequence(arr) {
  var lis = [], i, j, max = 0, length = arr.length;

  // initialize lis values for all indexes
  lis[0] = 1; // by definition, index 0 is a lis of length 1
  for (i = 1; i < length; i++) {
    lis[i] = 0;
  }

  // compute optimized lis values in bottom up manner
  for (i = 1; i < length; i++) {
    for (j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
        lis[i] = lis[j] + 1;

        if (max < lis[i]) { // check for max lis length
          max = lis[i];
        }
      }
    }
  }

/* 
[ 1, 0, 0, 0, 0, 0, 0, 0 ]
note: this is lis state after each iteration of the outer for loop
[ 1, 2, 0, 0, 0, 0, 0, 0 ]
[ 1, 2, 2, 0, 0, 0, 0, 0 ]
[ 1, 2, 2, 3, 0, 0, 0, 0 ]
[ 1, 2, 2, 3, 3, 0, 0, 0 ]
[ 1, 2, 2, 3, 3, 4, 0, 0 ]
[ 1, 2, 2, 3, 3, 4, 4, 0 ]
[ 1, 2, 2, 3, 3, 4, 4, 2 ] */

  return max;
}

// Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words
// http://www.geeksforgeeks.org/dynamic-programming-set-32-word-break-problem/
function wordBreak(words, input) {
  // base case  
  if (input.length === 0) {
    return true;
  }
  var length = input.length;

  for (var i = 1; i <= length; i++) {
//console.log(input.substr(0, i) + ' ' + input.substr(i, length - 1)); // interesting to see the algorithms progression
    if ((words.indexOf(input.substr(0, i)) !== -1) &&
         this.wordBreak(words, input.substr(i, length - i))) {
//console.log(input.substr(0, i)); // prints out words in reverse order if success
      return true;
    }
  }

  return false;
}

// http://www.geeksforgeeks.org/dynamic-programming-set-5-edit-distance/
// http://codercareer.blogspot.com/2011/12/no-25-edit-distance.html
// http://en.wikipedia.org/wiki/Levenshtein_distance
function editDistance(str1, str2) {
  var length1 = str1.length,
      length2 = str2.length,
      cache = [], i, j;

  // initialize cache
  for (i = 0; i <= length2; i++) {
    cache[i] = [];
    for (j = 0; j <= length1; j++) {
      cache[i][j] = 0;
    }
  }

  for (i = 0; i <= length1; i++) {
    cache[0][i] = i;
  }
  for (i = 0; i <= length2; i++) {
    cache[i][0] = i;
  }

  return editDistanceHelper(str1, str2, length1, length2, cache);
}

function editDistanceHelper(str1, str2, length1, length2, cache) {
  var i, j, deletion, insertion, substitution;

  // fill out table row by row. Solution will be last index of last column of last row
  for (i = 1; i <= length2; i++) {
    for (j = 1; j <= length1; j++) {
      if (str1[j - 1] === str2[i - 1]) {
        cache[i][j] = cache[i - 1][j - 1];
      } else {
        deletion = cache[i][j - 1] + 1;
        insertion = cache[i - 1][j] + 1;
        substitution = cache[i - 1][j - 1] + 1;

        cache[i][j] = Math.min(deletion, Math.min(insertion, substitution));
      }
    }
  }
  
  return cache[length2][length1];
}
/*        S  A  T  U  R  D  A  Y  
   [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
S    [ 1, 0, 1, 2, 3, 4, 5, 6, 7 ],
U    [ 2, 1, 1, 2, 2, 3, 4, 5, 6 ],
N    [ 3, 2, 2, 2, 3, 3, 4, 5, 6 ],
D    [ 4, 3, 3, 3, 3, 4, 3, 4, 5 ],
A    [ 5, 4, 3, 4, 4, 4, 4, 3, 4 ],
Y    [ 6, 5, 4, 4, 5, 5, 5, 4, 3 ] ]
-deletion: left to right
-insertion: top to bottom
-substitution: upper-left diagonal
-examples of what's going on in indices: 
 [0][8]: 'SATURDAY' -> ''
 [6][0]: '' -> 'SUNDAY'
 [4][6]: 'SATURD' -> 'SUND'
 [6][8]: 'SATURDAY' -> 'SUNDAY'
*/

// From Competitive Programming 3 (Needleman-Wunsch algorithm (bottom-up)) 
// -I guess there's a difference between 'Edit Distance' and 'String Alignment' (http://mynixworld.info/2012/09/24/how-to-measure-the-similarity-between-two-words/)
// -I might have to stick to the previous implementation of editDistance as this is given oddly similar but different results. Haven't figured out why this is yet
function stringAlignment(str1, str2) {
    var length1 = str1.length,
      length2 = str2.length,
      cache = [], i, j;
/* original code. I switched the word positions so that it's similar to editDistance
  // initialize cache
  for (i = 0; i <= length1; i++) {
    cache[i] = [];
    for (j = 0; j <= length2; j++) {
      cache[i][j] = 0;
    }
  }

  for (i = 0; i <= length1; i++) {
    cache[i][0] = i * -1;
  }
  for (i = 0; i <= length2; i++) {
    cache[0][i] = i * -1;
  }

  for (i = 1; i <= length1; i++) {
    for (j = 1; j <= length2; j++) {
      // match = 2 points, mismatch = -1 point
      cache[i][j] = cache[i - 1][j - 1] + (str1[i - 1] === str2[j - 1] ? 2 : -1); // cost for match or mismatch
      // insert/delete = -1 point
      cache[i][j] = Math.max(cache[i][j], cache[i - 1][j] - 1); // delete
      cache[i][j] = Math.max(cache[i][j], cache[i][j - 1] - 1); // insert
    }
  } */
  // initialize cache
  for (i = 0; i <= length2; i++) {
    cache[i] = [];
    for (j = 0; j <= length1; j++) {
      cache[i][j] = 0;
    }
  }

  for (i = 0; i <= length1; i++) {
    cache[0][i] = i;
  }
  for (i = 0; i <= length2; i++) {
    cache[i][0] = i;
  }

  for (i = 1; i <= length2; i++) {
    for (j = 1; j <= length1; j++) {
      // match = 2 points, mismatch = -1 point
      cache[i][j] = cache[i - 1][j - 1] + (str1[i - 1] === str2[j - 1] ? 2 : -1); // cost for match or mismatch
      // insert/delete = -1 point
      cache[i][j] = Math.max(cache[i][j], cache[i - 1][j] - 1); // insert?
      cache[i][j] = Math.max(cache[i][j], cache[i][j - 1] - 1); // delete?
    }
  }

  return cache[i - 1][j - 1]; // or cache[length1][length2]
}
/*         A   G   C   A   T   G   C
  [ [  0, -1, -2, -3, -4, -5, -6, -7 ],
A   [ -1,  2,  1,  0, -1, -2, -3, -4 ],
C   [ -2,  1,  1,  3,  2,  1,  0, -1 ],
A   [ -3,  0,  0,  2,  5,  4,  3,  2 ],
A   [ -4, -1, -1,  1,  4,  4,  3,  2 ],
T   [ -5, -2, -2,  0,  3,  6,  5,  4 ],
C   [ -6, -3, -3,  0,  2,  5,  5,  7 ],
C   [ -7, -4, -4, -1,  1,  4,  4,  7 ] ] */

// http://www.geeksforgeeks.org/dynamic-programming-set-6-min-cost-path/
function minCostPath() {

}

// http://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/
function maxSumOfNonAdjacentElements(arr) {

}

// http://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/
function minNumOfJumpsToEnd(arr) {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-18-partition-problem/
function partitionProblem(arr) {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-20-maximum-length-chain-of-pairs/
function maxLengthChainOfPairs(arr) {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-27-max-sum-rectangle-in-a-2d-matrix/
function maxSumRectangle(arr) {

}

// http://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/
function countAllPossiblePaths(m, n) {

}

// http://www.geeksforgeeks.org/remove-minimum-elements-either-side-2min-max/
function removeMinElems(arr) {

}

// http://www.geeksforgeeks.org/count-number-binary-strings-without-consecutive-1s/
function binaryStringCountWithoutConsecutiveZeroes(n) {

}

// http://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/
function longestSubstringWithoutRepeatedChars(str1) {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-17-palindrome-partitioning/
function palindromePartitioning(str1) {

}

// http://www.geeksforgeeks.org/longest-palindrome-substring-set-1/
// http://www.geeksforgeeks.org/dynamic-programming-set-12-longest-palindromic-subsequence/
function longestPalindromicSubstring(str) {

}

// http://www.geeksforgeeks.org/count-possible-decodings-given-digit-sequence/
function possibleDecodings(str) {

}

// http://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/
function minJumps() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-9-binomial-coefficient/
function binomialCoefficient() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-11-egg-dropping-puzzle/
function eggDroppingProblem() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-13-cutting-a-rod/
function cuttingRod() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-15-longest-bitonic-subsequence/
function longestBitonicSubsequence() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-18-word-wrap/
function wordWrap() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-21-box-stacking-problem/
function boxStacking() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-24-optimal-binary-search-tree/
function optimalBST() {

}

// http://www.geeksforgeeks.org/dynamic-programming-subset-sum-problem/
function subsetSum() {

}

// http://www.geeksforgeeks.org/largest-independent-set-problem/
function largestIndependentSet() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-28-minimum-insertions-to-form-a-palindrome/
function minInsertionsToFormPalindrome() {

}

// http://www.geeksforgeeks.org/dice-throw-problem/
function diceThrow() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-31-optimal-strategy-for-a-game/
function toyGameStrategy() {

}

// http://www.geeksforgeeks.org/check-whether-a-given-string-is-an-interleaving-of-two-other-given-strings-set-2/
function areStringsInterleaving(str1, str2, str3) {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-34-assembly-line-scheduling/
function assemblyLineScheduling() {

}

// http://www.geeksforgeeks.org/length-of-the-longest-arithmatic-progression-in-a-sorted-array/
function longestArithmeticProgression() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-36-cut-a-rope-to-maximize-product/
function maxProductCutting() {

}

// http://www.geeksforgeeks.org/program-nth-catalan-number/
function nthCatalan() {

}

// http://www.geeksforgeeks.org/count-number-binary-strings-without-consecutive-1s/
function countNumBinaryStringsWOConsecutiveOnes() {

}

// http://www.geeksforgeeks.org/count-possible-decodings-given-digit-sequence/
function countDecodings() {

}

// http://www.geeksforgeeks.org/mobile-numeric-keypad-problem/
function numericKeypad() {

}

module.exports = Dynamic;

/* NOTES
Common themes with dynamic programming solutions:
 -there is always a table to store previous values. This can be either a 1-dimensional or 2-dimensional array.
 -if it's a 1-dimensional array, the 0th column is always zero. For a 2-dimensional array, the first row is all zeroes and the 0th column is all zeroes
 -there is a lot of potential fence post errors that one must be wary of
 -updating the table can get crazy but the code tends to be relatively short. However, to get the actual values could bloat the code a lot
  The reason it gets bloated is another pitfall: you have to keep track of the index of longest/greatest/etc and you also have to keep track 
  of the value
  -update: you should be able to deduce the 'path' from the table making the code bloat unnecessary (https://class.coursera.org/algo2-003/lecture/221)

-http://www.quora.com/Are-there-any-good-resources-or-tutorials-for-dynamic-programming-besides-the-TopCoder-tutorial
-top-down DP only visits the required states whereas bottom-up DP visits all distinct states 
-top-down is recursive backtracking with a memoization table. bottom-up is iterative with a memoization table
-it seems that top-down is good for getting a single value but bottom-up is easier to get the actual data itself (i.e. for lcs, top-down can easily return the
 length of the longest common substring but getting the substring is hard whereas with bottom-up it's easier)
-some people call top-down dynamic programming 'memoization' (i.e. memoized fibonacci) and only use 'dynamic programming' to refer to bottom-up work (i.e. 
 iterative fibonacci) 
*/