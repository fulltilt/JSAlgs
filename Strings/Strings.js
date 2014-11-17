function Strings() {
  this.areStringRotations = areStringRotations;
  this.isFirstStringSubsequenceOfSecond = isFirstStringSubsequenceOfSecond;
  this.runLengthEncoding = runLengthEncoding;
  this.findAllPossibleWordsFromPhoneDigits = findAllPossibleWordsFromPhoneDigits;
  this.printListItemsContainingWord = printListItemsContainingWord;
  this.reverseWord = reverseWord;
  this.reverseWords = reverseWords;
  this.smallestWindowContainingString = smallestWindowContainingString;
  this.printInterleavings = printInterleavings;
  this.printInterleavingsRecur = printInterleavingsRecur;
  this.removeFromString = removeFromString;
  this.findExcelColumnName = findExcelColumnName;
  this.printAnagramsTogether = printAnagramsTogether;
  this.sameCharsNDistanceAway = sameCharsNDistanceAway;
  this.inPlaceStringTransform = inPlaceStringTransform;
  this.removeAdjacentDuplicates = removeAdjacentDuplicates;
}

// http://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other-or-not/
function areStringRotations(str1, str2) {
  var tempString = str1 + str1;
  return (tempString.indexOf(str2) === -1) ? false : true;
}

// http://www.geeksforgeeks.org/given-two-strings-find-first-string-subsequence-second/
function isFirstStringSubsequenceOfSecond(str1, str2) {
  var str1Length = str1.length,
      str2Length = str2.length,
      ptr1 = 0,
      ptr2 = 0;

  while (true) {
    if (str1[ptr1] === str2[ptr2]) {
      ptr1 += 1;
      ptr2 += 1;
    } else {
      ptr2 += 1;
    }

    if (ptr1 === str1Length) { // if we got to the end of str1, 1st string is a subsequence of 2nd string
      return true;
    } else if (ptr2 === str2Length) { // if we got to the end of str2 before the end of str1, str1 is not a subsequence of str2
      return false;
    }
  }
}

// http://www.geeksforgeeks.org/run-length-encoding/
function runLengthEncoding(str) {
  var length = str.length,
      result = '',
      current = str[0],
      count = 1;

  for (var i = 1; i < length; i++) {
    if (str[i] === current) {
      count += 1;
    } else {
      result += current + '' + count;
      current = str[i];
      count = 1;
    }
  }
  result += current + '' + count;
  return result;
}

// http://www.geeksforgeeks.org/print-list-items-containing-all-characters-of-a-given-word/
// this solution is kind of crazy as it handles repetitions in the base word
function printListItemsContainingWord(list, word) {
  var listLength = list.length,
      wordLength = word.length,
      wordTable = {},
      results = [];

  for (var i = 0; i < listLength; i++) {
    // initialize wordTable
    wordTable = {};
    for (var j = 0; j < wordLength; j++) {
      if (!wordTable[word[j]]) {
        wordTable[word[j]] = 1;
      } else {
        wordTable[word[j]] += 1;
      }
    }

    var currentWord = list[i],
        currentWordLength = currentWord.length,
        sum = 0;
    for (var k = 0; k < currentWordLength; k++) {
      if (wordTable[currentWord[k]]) {
        wordTable[currentWord[k]] -= 1;
        sum += 1;

        if (sum === wordLength) {
          results.push(currentWord);
          break;
        }

        if (wordTable[currentWord[k]] === 0) {
          delete wordTable[currentWord[k]];
        }
      }
    }
  }
  return results;
}

function reverseWord(str, lo, hi) {
  while (hi > lo) {
    var temp = str[lo];
    str[lo] = str[hi];
    str[hi] = temp;
    lo += 1;
    hi -= 1;
  }
  return str.join('');
}

// http://www.geeksforgeeks.org/reverse-words-in-a-given-string/ ***
function reverseWords(str) {
  var lo = 0,
      hi = 0,
      length = str.length,
      strArray;

  str = str.trim();
  strArray = str.split(''); // convert string to array

  // reverse each word
  while (true) {
    hi += 1;
    if (strArray[hi] === ' ' || hi === length) {
      this.reverseWord(strArray, lo, hi - 1);

      if (hi === length) {
        break;
      }
      lo = hi + 1;
      hi = lo;
    }
  }
  return this.reverseWord(strArray, 0, length - 1);
}

// http://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/
// trick: observation that the first and last elements of the substring must be in str2
// assumes that there exists a substring that contains all the chars in str2
function smallestWindowContainingString(str1, str2) {
  var str1Length = str1.length,
      str2Length = str2.length,
      minLength = Infinity,
      countTable,
      lo = 0,
      minLo,
      hi = 1,
      minHi;

  while (true) {
    // create count table for str2
    countTable = {};
    for (var i = 0; i < str2Length; i++) {
      if (!countTable[str2[i]]) {
        countTable[str2[i]] = 1;
      } else {
        countTable[str2[i]] += 1;
      }
    }

    // find the next starting index
    while (!countTable[str1[lo]]) {
      lo += 1;
    }
    countTable[str1[lo]] -= 1;
    if (countTable[str1[lo]] === 0) {
      delete countTable[str1[lo]];
    }
    hi = lo;

    // starting from lo keep increasing hi until we find a substring that contains all the chars in str2
    // Once substring is found increment lo and repeat the process until hi hits the end
    while (Object.keys(countTable).length !== 0) {
      hi += 1;
      if (hi === str1.length) {
        break;
      }

      if (countTable[str1[hi]]) {
        countTable[str1[hi]] -= 1;
        if (countTable[str1[hi]] === 0) {
          delete countTable[str1[hi]];
        }  
      }
    }
    if (hi === str1.length) {
      break;
    }

    // calculate the substring length and update minLength if nceessary
    var tempLength = hi - lo;
    if (tempLength - minLength) {
      minLength = tempLength;
      minLo = lo;
      minHi = hi;
    }
    lo += 1;
  }
  return str1.substring(minLo, minHi + 1);
}

// http://www.geeksforgeeks.org/print-all-interleavings-of-given-two-strings/
function printInterleavings(str1, str2) {
  var iStr = [],
      results = [];
  this.printInterleavingsRecur(str1, str2, iStr, results, 0);
  return results;
}

// Main helper fxn for printInterleavings that recursively generates all interleavings
// iStr: used to store all interleavings (or output strings) one by one
// index: used to pass next available place in iStr
// The two if statements ensures the interleaving and order. If you look at the first test, notice that the interleavings only start with either 'A' or 'C'
function printInterleavingsRecur(str1, str2, iStr, results, index) {
  var str1Length = str1.length,
      str2Length = str2.length;

  // base case: if all characters of str1 and str2 have been included in output string, then push output string
  if (str1Length === 0 && str2Length === 0) {
    results.push(iStr.join(''));
  }

  // If some characters of str1 are left to be included then include the first character from the remaining chars and recur for the rest
  if (str1Length !== 0) {
    iStr[index] = str1[0];
    this.printInterleavingsRecur(str1.substring(1), str2, iStr, results, index + 1);
  }

  // If some characters of str2 are left to be included then include the first character from the remaining chars and recur for the rest
  if (str2Length !== 0) {
    iStr[index] = str2[0];
    this.printInterleavingsRecur(str1, str2.substring(1), iStr, results, index + 1);
  }
}

// http://www.geeksforgeeks.org/remove-a-and-bc-from-a-given-string/
// Note: the substrings to remove is fixed: remove 'b' and 'ac'
function removeFromString(str) {
  var length = str.length,
      result = [],
      lo = 0,
      hi = lo;

  str = str.split('');

  while (lo < length) {
    if (str[hi] === 'b') {
      str.splice(lo, 1);
    } else if (str[hi] === 'a') {
      if (hi + 1 === length) {  // we reached the end of the string so no need to iterate further
        break;
      }
      if (str[hi + 1] === 'c') {  // if we hit a 'c' after an 'a', splice the 2 indices. If not, advance the indices
        str.splice(lo, 2);
      } else {
        lo += 1;
        hi = lo;
      }
    } else {
      lo += 1;
      hi = lo;
      length = str.length;
    }
  }
  return str.join('');
}

// http://www.geeksforgeeks.org/find-excel-column-name-given-number/
// the tricky part is that if the remainder is zero, num equals Math.floor(num / 26) - 1. All other cases you don't have to do the '- 1'
function findExcelColumnName(num) {
  var column = 'ZABCDEFGHIJKLMNOPQRSTUVWXYZ',
      result = '';

  while (num > 0) {
    var remainder = num % 26;

    if (remainder === 0) {  // If reminder is zero, then append a 'Z'
      result = column[remainder] + result;
      num = Math.floor(num / 26) - 1;
    } else {                // if remainder is non-zero
      result = column[remainder] + result;
      num = Math.floor(num / 26);
    }
  }
  return result;
}

// http://www.geeksforgeeks.org/find-possible-words-phone-digits/ (see link for keypad diagram)
function findAllPossibleWordsFromPhoneDigits(num, currentIndex, result) {
  var keypad = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

  // base case: if current output word is prepared
  if (currentIndex === num.length) {
    console.log(result.join(''));
    return;
  }

  // try all possible characters for current digit in num and recur for remaining digits
  var currentDigit = num[currentIndex];
  if (currentDigit === 0 || currentDigit === 1) {   // edge case when digit is 0 or 1 since they don't have letters associated with them
    result[currentIndex] = '';  
    this.findAllPossibleWordsFromPhoneDigits(num, currentIndex + 1, result);
  } else {
    for (var i = 0; i < keypad[currentDigit].length; i++) {
      result[currentIndex] = keypad[currentDigit][i];
      this.findAllPossibleWordsFromPhoneDigits(num, currentIndex + 1, result);
    }
  }
}

// http://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/ or http://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together-set-2/
function printAnagramsTogether(list) {
  var length = list.length,
      wordsAux = list.slice();  // copy word list to auxiliary list

  // initialize index
  for (var i = 0; i < length; i++) {
    wordsAux[i] = { word: list[i],
                    index: i };
  }

  // sort each individual word in wordsAux by individual character
  for (i = 0; i < length; i++) {
    wordsAux[i].word = wordsAux[i].word.split('').sort().join('');
  }

  // with each individual word sorted, sort the array by each word
  wordsAux = wordsAux.sort(compare);

  // with words sorted, print out the original index entry as per the current wordAux entry
  for (i = 0; i < length; i++) {
    console.log(list[wordsAux[i].index]);
  }
}

// helper fxn to compare 2 strings. Can't do 'return a.word - b.word' as that returns 'NaN'
function compare(a, b) {
  if (a.word < b.word) {
    return -1;
  }

  if (a.word > b.word) {
    return 1;
  }
  return 0;
}

// http://www.geeksforgeeks.org/rearrange-a-string-so-that-all-same-characters-become-at-least-d-distance-away/
function sameCharsNDistanceAway(str, n) {
  var length = str.length,
      result = [],
      dict = {};
  // create a dictionary that keeps track of characters and their frequencies
  for (var i = 0; i < length; i++) {
    if (!dict[str[i]]) {
      dict[str[i]] = 1;
    } else {
      dict[str[i]] += 1;
    }
  }

  // insert dictionary values into an array so that we can sort by frequencies
  var frequencies = [];
  for (var key in dict) {
    frequencies.push([key, dict[key]]);
  }
  frequencies = frequencies.sort(function(a, b) { return b[1] - a[1]; }); // sort descending
 
  var freqLength = frequencies.length;
  for (i = 0; i < freqLength; i++) {
    // find the first undefined index in array. This will be where we start inserting. From here we will be inserting every n spots
    var j = i;
    while (result[j] !== undefined) {
      j += 1;
    }

    // insert current character as per the frequency, spaced out by n spots
    for (var k = 0; k < frequencies[i][1]; k++) {
      if (j > length) { // if the next index goes past length of the array, an arrangement isn't possible
        return false;
      }

      result[j] = frequencies[i][0];
      j += n;
    }
  }

  return result.join('');
}

// *** http://www.geeksforgeeks.org/an-in-place-algorithm-for-string-transformation/
// move even indices to the end. Keep everything in order
function inPlaceStringTransform(str) {
  var length = str.length,
      arr = str.split(''),
      i, j;
  for (i = 0; i < Math.floor(length / 2); i++, j = i) {
    //if ((i % 2) === 0) {  // we're at an even index

    //}
  }    
}

function swap(arr, x, y) {
  var temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

// http://www.geeksforgeeks.org/recursively-remove-adjacent-duplicates-given-string/
// NOTE: fails some test cases
function removeAdjacentDuplicates(str, index, previous) {
  if (index === str.length || str.length === 0) {
    return str;
  }

  var ch = str[index];
//console.log(index + ' ' + ch + ' ' + previous);
  if (str[index] === previous) {  // we know we're going to have to splice from one index before this one
    var start = index - 1,
        end = 0,  // end index of last consecutive occurrence of previous char
        previousAndCurrent = 2; // represents the last index and the current index which are consecutive duplicates

    // find any other consecutive duplicates that match previous
    while ((index + end + 1) !== str.length && str[index + end + 1] === previous) {
      end += 1;
    }

    end += previousAndCurrent;
    str.splice(start, end);
//console.log(str);
    this.removeAdjacentDuplicates(str, index - end, str[index]);  // since we spliced out 'end' number of values, make index go back that many indices
  } else {
    this.removeAdjacentDuplicates(str, index + 1, ch);
  }

  return str.join('');
}

module.exports = Strings;