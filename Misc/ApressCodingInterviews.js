function Apress() {
  this.replaceBlanks = replaceBlanks;
  this.mergeSortedArrays = mergeSortedArrays;
  this.regexMatch = regexMatch;
}

/*  Question 9: Please implement a function to replace each blank in a string with “%20”. For instance, it outputs “We%20are%20happy.” if the input is “We are happy.”. 
-note: we can't use replace and we'e assuming C style arrays so we can't use split on spaces and then create a new array and iterate through a loop append '%20' at each iteration until the very last one
-algorithm: if we go from left to right, we have to constantly shift all indices to the right 1 and this can result in O(n^2). An O(n) solution is count the # of spaces and then create a new array
 and add elements from right to left which eliminates the need to constantly shift right
*/
function replaceBlanks(str) {
  var length = str.length,
      blanks = 0, i;

  // count number of blanks in string
  for (i = 0; i < length; i++) {
    if (str[i] === ' ') {
      blanks += 1;
    }
  }

  var newStr = [];
  newStr.length = str.length + (2 * blanks);  // we multiply by 2 instead of 3 since the original blank will be replaced by '0'
  var newStrIndex = newStr.length - 1;

  for (i = length - 1; i >= 0; i--) {
    if (str[i] === ' ') {
      newStr[newStrIndex--] = '0';
      newStr[newStrIndex--] = '2';
      newStr[newStrIndex--] = '%';
    } else {
      newStr[newStrIndex--] = str[i];
    }
  }

  return newStr.join('');
}

/* Question 10: Given two sorted arrays, denoted as array1and array2, please merge them into array1 and 
keep the merged array sorted. Suppose there is sufficient vacant memory at the end of array1to accommodate 
elements of array2
*/
function mergeSortedArrays(arr1, arr2) {
  var arr1Length = arr1.length,
      arr2Length = arr2.length,
      arr1Ptr = arr1Length - 1,
      arr2Ptr = arr2Length - 1;
  arr1Length = arr1Length + arr2Length;
  var arr3Ptr = arr1Length - 1;

  while (arr1Ptr >= 0 && arr2Ptr >= 0) {
    if (arr1[arr1Ptr] > arr2[arr2Ptr]) {
      arr1[arr3Ptr--] = arr1[arr1Ptr--];
    } else {
      arr1[arr3Ptr--] = arr2[arr2Ptr--];
    }
  }

  // we don't have to worry about arr1 overflow as they're already in the right place assuming we clear all of arr2's elements before arr1's
  while (arr2Ptr >= 0) {
    arr1[arr3Ptr--] = arr2[arr2Ptr--]; 
  }

  return arr1;
}

function regexMatch(str, pattern) {
  if (str === null || pattern === null) {
    return false;
  }

  return matchCore(str, pattern, 0, 0);
}

// Question 11: Implement a function to match regular expressions with ‘.’ and ‘*’ in patterns
function matchCore(str, pattern, strIndex, patternIndex) {
  var strLength = str.length,
      patternLength = pattern.length;
  
  if (strIndex === strLength && patternIndex === patternLength) {
    return true;
  }

  if (strIndex !== strLength && patternIndex === patternLength) {
    return false;
  }

  if (pattern[patternIndex + 1] === '*') {
    if ((pattern[patternIndex] === str[strIndex]) || (pattern[patternIndex] === '.' && strIndex !== strLength)) {
      return matchCore(str, pattern, strIndex + 1, patternIndex + 2) || // move on the next state
             matchCore(str, pattern, strIndex + 1, patternIndex) ||     // stay on the current state
             matchCore(str, pattern, strIndex, patternIndex + 2);       // ignore a '*'
    } else {
      return matchCore(str, pattern, strIndex, patternIndex + 2);       // ignore a '*'
    }
  }

  if ((pattern[patternIndex] === str[strIndex]) || (pattern[patternIndex] === '.' && strIndex !== strLength)) {
    return matchCore(str, pattern, strIndex + 1, patternIndex + 1);
  }

  return false;
}

module.exports = Apress;

/* SKIPPED: 13, 18 (next node in binary tree with pointers to parents), 34 (no test cases), 39, 40
*/