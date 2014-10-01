function Dynamic() {
  this.lcs = lcs;

  this.recursiveKnapsack = recursiveKnapsack;
  this.dynamicKnapsack = dynamicKnapsack;
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

// inefficient as many subproblems are revisited
function recursiveKnapsack(capacity, size, value, n) {
  if (n == 0 || capacity == 0) {
    return 0; 
  }
  
  if (size[n-1] > capacity) {
    return this.recursiveKnapsack(capacity, size, value, n - 1);
  } else {
    return max(value[n - 1] + this.recursiveKnapsack(capacity - size[n - 1], size, value, n - 1), 
               this.recursiveKnapsack(capacity, size, value, n - 1));
  }
}


function dynamicKnapsack(capacity, size, value, n) {
  var K=[];
  for (var i = 0; i <= capacity + 1; i++) { 
    K[i] = [];
  } 

  for (var i = 0; i <= n; i++) {
var output = '';    
    for (var w = 0; w <= capacity; w++) { 
      if (i == 0 || w == 0) {
        K[i][w] = 0; 
      } else if (size[i - 1] <= w) {
        K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w]);
      } else {
        K[i][w] = K[i - 1][w];
      }
           
output += K[i][w] + ' ';
    }
console.log(output);
  }
console.log(K[n][capacity]);
  return K[n][capacity];
}

module.exports = Dynamic;