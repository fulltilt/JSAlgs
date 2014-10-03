/*
Common themes with dynamic programming solutions:
 -there is always a table to store previous values. This can be either a 1-dimensional or 2-dimensional array.
 -if it's a 1-dimensional array, the 0th column is always zero. For a 2-dimensional array, the first row is all zeroes and the 0th column is all zeroes
 -there is a lot of potential fence post errors that one must be wary of
 -updating the table can get crazy but the code tends to be relatively short. However, to get the actual values could bloat the code a lot
  The reason it gets bloated is another pitfall: you have to keep track of the index of longest/greatest/etc and you also have to keep track 
  of the value
*/
function Dynamic() {
  this.lcs = lcs;

  this.recursiveKnapsack = recursiveKnapsack;
  this.dynamicKnapsack = dynamicKnapsack;
  this.dynamicCoinChange = dynamicCoinChange;
  this.longestIncreasingSequence = longestIncreasingSequence;
}

function lcs(string1, string2) {
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

[ [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 1, 0, 0, 0 ],
  [ 0, 0, 1, 2, 0, 0, 0 ],
  [ 0, 0, 0, 0, 3, 1, 1 ],
  [ 0, 0, 0, 0, 1, 4, 2 ] ]
*/

function max(a, b) {
  return (a > b) ? a : b;
}

// inefficient as many subproblems are repeated
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
}

/*
Notes: 
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

// http://www.topcoder.com/tc?d1=tutorials&d2=dynProg&module=Static
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
  console.log(table);
  for (i = table[sum]; i[2] !== 0; i = table[i[1]]) {
    console.log(i[2]);
  }
  return table[sum][0];
}

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

module.exports = Dynamic;

