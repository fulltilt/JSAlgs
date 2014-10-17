function GeekForGeeks() {
  this.findEquilibriumIndex = findEquilibriumIndex;
  this.findAngleBetweenClockHands = findAngleBetweenClockHands;
  this.binarySearch = binarySearch;
  this.recursiveBinarySearch = recursiveBinarySearch;
  this.searchSortedRotatedArray = searchSortedRotatedArray;
  this.power = power;
  this.findNthValue = findNthValue;
  this.findMedian = findMedian;
  this.partition = partition;

  // Arrays
  this.findMajority = findMajority;
  this.findMissingNumber = findMissingNumber;
  this.findPivotInRotatedArray = findPivotInRotatedArray;
  this.findMedianOfTwoSortedArrays = findMedianOfTwoSortedArrays;
  this.reverseArray = reverseArray;
  this.rotateArray = rotateArray;
  this.leadersInAnArray = leadersInAnArray;
  this.sortElementsByFrequency = sortElementsByFrequency;
  this.findTwoElementsWhoseSumIsClosestToZero = findTwoElementsWhoseSumIsClosestToZero;
  this.segregateOnesAndZeroes = segregateOnesAndZeroes;
  this.dutchNationalFlag = dutchNationalFlag;
  this.unionAndIntersectionOfTwoSortedArrays = unionAndIntersectionOfTwoSortedArrays;
  this.floorAndCeilOfSortedArray = floorAndCeilOfSortedArray;
  this.prodArrayPuzzle = prodArrayPuzzle;
  this.findMinUnsortedSubArray = findMinUnsortedSubArray;
  this.findDuplicates = findDuplicates;
  this.nextGreaterElement = nextGreaterElement;
  this.areAllElementsConsecutive = areAllElementsConsecutive;
  this.findSmallestMissingNumber = findSmallestMissingNumber;
  this.countNumberOfOccurrences = countNumberOfOccurrences;
  this.maxOfAllSubArrays = maxOfAllSubArrays; 
  this.minDistanceBetweenTwoNums = minDistanceBetweenTwoNums;
  this.findRepeatingAndMissing = findRepeatingAndMissing;
  this.fixedPointInArray = fixedPointInArray;
  this.maxLengthBitonicSubArray = maxLengthBitonicSubArray;
  this.findMaxInIncreasingDecreasing = findMaxInIncreasingDecreasing;
  this.countSmallerElementsOnRight = countSmallerElementsOnRight;
  this.impelementTwoStacksInAnArray = impelementTwoStacksInAnArray;
  this.findSubArrayWithGivenSum = this.findSubArrayWithGivenSum;
  this.findTripletThatSumsToN = findTripletThatSumsToN;
  this.findSortedSubSequenceOfThree = findSortedSubSequenceOfThree;
  this.largestSubArrayOfZeroesAndOnes = largestSubArrayOfZeroesAndOnes;
  this.maxProductSubArray = maxProductSubArray;
  this.formBiggestNumber = formBiggestNumber;
  this.sortElementsByFrequency = sortElementsByFrequency;
  this.mergeKSortedArrays = mergeKSortedArrays;
  this.smallestSubArrayWhoseSumIsLessThanN = smallestSubArrayWhoseSumIsLessThanN;
  this.findKClosestElementsToN = findKClosestElementsToN;
  this.maxSumPathBetweenTwoArrays = maxSumPathBetweenTwoArrays;
  this.sortDefinedBySecondArray = sortDefinedBySecondArray;
  this.alternatePositiveAndNegative = alternatePositiveAndNegative;
  this.findSmallestValueNotReppedBySubArraySum = findSmallestValueNotReppedBySubArraySum;
  this.findCommonElementsInThreeArrays = findCommonElementsInThreeArrays;
  this.printAnagrams = printAnagrams;
  this.findAllPossibleWordsFromPhoneDigits = findAllPossibleWordsFromPhoneDigits;

  // Strings
  this.suffixTree = suffixTree;
  this.trie = trie;
  this.areStringRotations = areStringRotations;
  this.printAllPermutations = printAllPermutations;
  this.printLexicographicPermutations = printLexicographicPermutations;
  this.printListItemsContainingWord = printListItemsContainingWord;
  this.reverseWords = reverseWords;
  this.runLengthEncoding = runLengthEncoding;
  this.smallestWindowContainingString = smallestWindowContainingString;
  this.KMP = KMP;
  this.RabinKarp = RabinKarp;
  this.finiteAutomata = finiteAutomata;
  this.printInterleavings = printInterleavings;
  this.removeFromString = removeFromString;
  this.removeAdjacentDuplicates = removeAdjacentDuplicates;
  this.findExcelColumnName = findExcelColumnName;
  this.isFirstStringSubsequenceOfSecond = isFirstStringSubsequenceOfSecond;

  // Mathematical Properties
  this.findExpPairs = findExpPairs;

  // Matrices
  this.maxSquareSubMatrix = maxSquareSubMatrix;
}

function findEquilibriumIndex(arr) {;
  var length = arr.length;
  if (length === 0) {
    return -1;
  } else if (length === 1) {
    return 0;
  }

  var leftToRight = [length - 1],
      rightToLeft = [length - 1];

  // create tables to store cumulative sums from both directions
  leftToRight[-1] = 0
  leftToRight[0] = arr[0];
  for (var i = 1; i < length; i++) {
    leftToRight[i] = arr[i] + leftToRight[i - 1];
  }

  rightToLeft[length - 1] = arr[length - 1];
  rightToLeft[length] = 0;
  for (i = length - 2; i >= 0; i--) {
    rightToLeft[i] = arr[i] + rightToLeft[i + 1];
  }

  for (i = 0; i < length; i++) {
    if (leftToRight[i - 1] === rightToLeft[i + 1]) {
      return i;
    }
  }
  return -1;
}

/* Find the angle between the minute hand and hour hand of a clock
-algorithm: we will use 12 o'clock as the reference point of angle 0
-note: to make this even more foolproof, if 60 is entered as minutes, set hour to: h = (h + 1) % 12
*/
function findAngleBetweenClockHands(hours, minutes) {
  if (hours < 0 || minutes < 0 || hours > 12 || minutes > 60)
        throw new Error('Invalid Input');

  var hours = (hours === 12) ? 0 : hours;
  var minutes = (minutes === 60) ? 0 : minutes;

  var hourAngle = hours * (360 / 12) + (30 / (60 / minutes)),
      minuteAngle = minutes * (360 / 60);

  return Math.abs(hourAngle - minuteAngle);
}

function binarySearch(arr, n) {
  var low = 0,
      high = arr.length - 1;

  while (high >= low) {
    var middle = Math.ceil((high + low) / 2);
    // use middle = low + ((high + low) / 2);  if we're talking an extremely huge high number

    if (arr[middle] === n) {
      return true;
    } else if (n < arr[middle]) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
  return false;
}

function recursiveBinarySearch(arr, n, low, high) {
  if (low > high) {
    return false;
  } 

  var middle = Math.ceil((low + high) / 2);

  if (arr[middle] === n) {
    return true;
  } else if (n < arr[middle]) {
     return this.recursiveBinarySearch(arr, n, low, middle - 1);
  } else {
     return this.recursiveBinarySearch(arr, n, middle + 1, high);
  }
}

function searchSortedRotatedArray(arr, n) {
  // find rotation point
  var rotationPoint = -1;
  for (var i = 0; i < arr.length - 1; i++) { // '- 1' as we compare the current index to it's next index
    if (arr[i] > arr[i + 1]) {
      rotationPoint = i;
      break;
    }
  }
  if (arr[rotationPoint] === n) {
    return true;
  }

  // with the rotation point, if the n is less than the 0th index, search the right subarray, else search the left subarray
  if (n > arr[0]) {
    return this.recursiveBinarySearch(arr, n, 0, rotationPoint - 1);
  } else {
    return this.recursiveBinarySearch(arr, n, rotationPoint + 1, arr.length - 1);
  }
}

/* Function to calculate base raised by the power of exponent (note: doesn't work for negative exponents) */
function power(base, exponent) {
  if (exponent === 0)
    return 1;
  else 
    return base * this.power(base, exponent - 1);
}

// O(n) version of finding median using randomization. This algorithm can be generalized to find the nth sorted value in an array
function findMedian(arr) {
  return this.findNthValue(arr, 0 , arr.length - 1, Math.floor(arr.length / 2));
}

function findNthValue(arr, lo, hi, n) {
  var k = partition(arr, lo, hi);

  if (k === n) {
    return arr[k];
  } else if (n < k) { // pivot is less than the nth value so search the left subarray
    return this.findNthValue(arr, 0, k - 1, n);
  } else {            // pivot is greater than the nth value so search the right subarray
    return this.findNthValue(arr, k + 1, arr.length - 1, n);
  }
}

function partition(arr, lo, hi) {
  var i = lo,
      j = hi + 1,
      pivot = arr[lo];

  while (true) {
    while (arr[++i] < pivot) {
      if (i === hi) { // condition to avoid out of bounds exceptions if the list is already sorted
        break;
      }
    }

    while (pivot < arr[--j]) {
      if (j === lo) { // condition to avoid out of bounds exceptions if the list is already sorted*
        break;
      }
    }

    if (i >= j) { // when left and right pointers cross over, break. Else, swap pointer values
      break;
    } else {
      //this.swap(arr, i, j);
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }
  //this.swap(arr, lo, j);  // swap pivot into the correct position, swapping with the low value since values less than pivot should be on the left
  var temp = arr[j];
  arr[j] = arr[lo];
  arr[lo] = temp;

  return j;
}

// http://www.geeksforgeeks.org/majority-element/   http://www.geeksforgeeks.org/check-for-majority-element-in-a-sorted-array/
function findMajority(arr) {

}

// http://www.geeksforgeeks.org/find-the-missing-number/
function findMissingNumber(arr) {
  var subArrLength = arr.length;
  var length = subArrLength + 1;      // since the array is missing a number, we do arr.length + 1
  var sum = (length * (length + 1)) / 2;
  for (var i = 0; i < subArrLength; i++) {
    sum -= arr[i];
  }

  return sum;
}

// http://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/  
function findPivotInRotatedArray(arr) {

}

// http://www.geeksforgeeks.org/median-of-two-sorted-arrays/, does it take into account different sized arrays? (http://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-different-sizes/)
function findMedianOfTwoSortedArrays(arr1, arr2) {

}

function reverseArray(arr, start, end) {
  //console.log(arr);

  while (start <= end) {
    var temp = arr[end];
    arr[end] = arr[start];
    arr[start] = temp;
    ++start;
    --end;
  }

  return arr; 
}

// http://www.geeksforgeeks.org/program-for-array-rotation-continued-reversal-algorithm/
function rotateArray(arr, n) {
  this.reverseArray(arr, 0, n - 1);
  this.reverseArray(arr, n, arr.length - 1);
  this.reverseArray(arr, 0, arr.length - 1);
  return arr;
}

// http://www.geeksforgeeks.org/leaders-in-an-array/, http://www.geeksforgeeks.org/replace-every-element-with-the-greatest-on-right-side/
function leadersInAnArray(arr) {

}

// http://www.geeksforgeeks.org/sort-elements-by-frequency/
function sortElementsByFrequency(arr) {

}

// http://www.geeksforgeeks.org/two-elements-whose-sum-is-closest-to-zero/
function findTwoElementsWhoseSumIsClosestToZero(arr) {

}

function segregateOnesAndZeroes(arr) {

}

// http://www.geeksforgeeks.org/find-the-two-repeating-elements-in-a-given-array/
function dutchNationalFlag(arr) {

}

// http://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/
function maxSquareSubMatrix(arr) {

}

// http://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/
function unionAndIntersectionOfTwoSortedArrays(arr1, arr2) {

}

// http://www.geeksforgeeks.org/search-floor-and-ceil-in-a-sorted-array/
function floorAndCeilOfSortedArray(arr) {

}

// http://www.geeksforgeeks.org/a-product-array-puzzle/
function prodArrayPuzzle(arr) {

}

// http://www.geeksforgeeks.org/minimum-length-unsorted-subarray-sorting-which-makes-the-complete-array-sorted/
function findMinUnsortedSubArray(arr) {

}

// http://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/
function findDuplicates(arr) {

}

// http://www.geeksforgeeks.org/next-greater-element/
function nextGreaterElement(arr) {

}

// http://www.geeksforgeeks.org/check-if-array-elements-are-consecutive/
function areAllElementsConsecutive(arr) {

}

// http://www.geeksforgeeks.org/find-the-first-missing-number/
function findSmallestMissingNumber(arr) {

}

// http://www.geeksforgeeks.org/count-number-of-occurrences-in-a-sorted-array/
function countNumberOfOccurrences(arr) {

}

// http://www.geeksforgeeks.org/maximum-of-all-subarrays-of-size-k/
function maxOfAllSubArrays(arr) {

}

// http://www.geeksforgeeks.org/find-the-minimum-distance-between-two-numbers/
function minDistanceBetweenTwoNums(arr) {

}

// http://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/
function findRepeatingAndMissing(arr) {

}

// http://www.geeksforgeeks.org/find-a-fixed-point-in-a-given-array/
function fixedPointInArray(arr) {

}

// http://www.geeksforgeeks.org/maximum-length-bitonic-subarray/
function maxLengthBitonicSubArray(arr) {

}

// http://www.geeksforgeeks.org/find-the-maximum-element-in-an-array-which-is-first-increasing-and-then-decreasing/
function findMaxInIncreasingDecreasing(arr) {

}

// http://www.geeksforgeeks.org/count-smaller-elements-on-right-side/
function countSmallerElementsOnRight(arr) {

}

// http://www.geeksforgeeks.org/implement-two-stacks-in-an-array/
function impelementTwoStacksInAnArray(arr) {

}

// http://www.geeksforgeeks.org/find-subarray-with-given-sum/
function findSubArrayWithGivenSum(arr, n) {

}

// http://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/
function findTripletThatSumsToN(arr, n) {

}

// http://www.geeksforgeeks.org/find-a-sorted-subsequence-of-size-3-in-linear-time/
function findSortedSubSequenceOfThree(arr) {

}

// http://www.geeksforgeeks.org/largest-subarray-with-equal-number-of-0s-and-1s/
function largestSubArrayOfZeroesAndOnes(arr) {

}

// http://www.geeksforgeeks.org/maximum-product-subarray/
function maxProductSubArray(arr) {

}

// http://www.geeksforgeeks.org/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number/
function formBiggestNumber(arr) {

}

// http://www.geeksforgeeks.org/sort-elements-by-frequency-set-2/
function sortElementsByFrequency(arr) {

}

// http://www.geeksforgeeks.org/merge-k-sorted-arrays/
function mergeKSortedArrays(arr) {

}

// http://www.geeksforgeeks.org/find-number-pairs-xy-yx/
function findExpPairs(arr1, arr2) {

}

// http://www.geeksforgeeks.org/minimum-length-subarray-sum-greater-given-value/
function smallestSubArrayWhoseSumIsLessThanN(arr, n) {

}

// http://www.geeksforgeeks.org/find-k-closest-elements-given-value/
function findKClosestElementsToN(arr, k, n) {

}

// http://www.geeksforgeeks.org/maximum-sum-path-across-two-arrays/
function maxSumPathBetweenTwoArrays(arr1, arr2) {

}

// http://www.geeksforgeeks.org/sort-array-according-order-defined-another-array/
function sortDefinedBySecondArray(arr1, arr2) {

}

// http://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/
function alternatePositiveAndNegative(arr) {

}

// http://www.geeksforgeeks.org/find-smallest-value-represented-sum-subset-given-array/
function findSmallestValueNotReppedBySubArraySum(arr) {

}

// http://www.geeksforgeeks.org/find-common-elements-three-sorted-arrays/
function findCommonElementsInThreeArrays(arr1, arr2, arr3) {

}

// http://www.geeksforgeeks.org/pattern-searching-set-8-suffix-tree-introduction/
function suffixTree() {

}

// http://www.geeksforgeeks.org/pattern-searching-using-trie-suffixes/
function trie() {

}

// http://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other-or-not/
function areStringRotations(str1, str2) {

}

// http://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/ or http://www.geeksforgeeks.org/print-all-permutations-with-repetition-of-characters/
function printAllPermutations(str) {

}

// http://www.geeksforgeeks.org/given-two-strings-find-first-string-subsequence-second/
function isFirstStringSubsequenceOfSecond(str1, str2) {

}

// http://www.geeksforgeeks.org/lexicographic-permutations-of-string/
function printLexicographicPermutations(str) {

}

// http://www.geeksforgeeks.org/print-list-items-containing-all-characters-of-a-given-word/
function printListItemsContainingWord(list, word) {

}

// http://www.geeksforgeeks.org/reverse-words-in-a-given-string/
function reverseWords(list) {

}

// http://www.geeksforgeeks.org/run-length-encoding/
function runLengthEncoding(str) {

}

// http://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/
function smallestWindowContainingString(str1, str2) {

}

// http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/
function KMP(str1, str2) {

}

// http://www.geeksforgeeks.org/searching-for-patterns-set-3-rabin-karp-algorithm/
function RabinKarp(str1, str2) {

}

// http://www.geeksforgeeks.org/searching-for-patterns-set-5-finite-automata/
function finiteAutomata(str1, str2) {

}

// http://www.geeksforgeeks.org/print-all-interleavings-of-given-two-strings/
function printInterleavings(str1, str2) {

}

// http://www.geeksforgeeks.org/searching-for-patterns-set-5-finite-automata/
function finiteAutomata(str1, str2) {

}

// http://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/ or http://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together-set-2/
function printAnagrams(list) {

}

// http://www.geeksforgeeks.org/remove-a-and-bc-from-a-given-string/
function removeFromString(str) {

}

// http://www.geeksforgeeks.org/recursively-remove-adjacent-duplicates-given-string/
function removeAdjacentDuplicates(str) {

}

// http://www.geeksforgeeks.org/find-possible-words-phone-digits/
function findAllPossibleWordsFromPhoneDigits() {

}

// http://www.geeksforgeeks.org/find-excel-column-name-given-number/
function findExcelColumnName(num) {

}

// STAR PROBS
// http://www.geeksforgeeks.org/maximum-difference-between-two-elements/
// http://www.geeksforgeeks.org/given-an-array-arr-find-the-maximum-j-i-such-that-arrj-arri/
// http://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/
// http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/
// http://www.geeksforgeeks.org/maximum-contiguous-circular-sum/
// http://www.geeksforgeeks.org/suffix-array-set-1-introduction/
// http://www.geeksforgeeks.org/find-next-greater-number-set-digits/
// http://www.geeksforgeeks.org/an-in-place-algorithm-for-string-transformation/
// http://www.geeksforgeeks.org/find-first-non-repeating-character-stream-characters/
// http://www.geeksforgeeks.org/rearrange-a-string-so-that-all-same-characters-become-at-least-d-distance-away/

// MATRIX
// http://www.geeksforgeeks.org/turn-an-image-by-90-degree/
// http://www.geeksforgeeks.org/a-boolean-matrix-question/
// http://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/
// http://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/
// http://www.geeksforgeeks.org/print-unique-rows/
// http://www.geeksforgeeks.org/inplace-m-x-n-size-matrix-transpose/
// http://www.geeksforgeeks.org/print-matrix-diagonally/
// http://www.geeksforgeeks.org/strassens-matrix-multiplication/
// http://www.geeksforgeeks.org/kth-smallest-element-in-a-row-wise-and-column-wise-sorted-2d-array-set-1/
// http://www.geeksforgeeks.org/divide-conquer-set-6-search-row-wise-column-wise-sorted-2d-array/
// http://www.geeksforgeeks.org/given-n-x-n-square-matrix-find-sum-sub-squares-size-k-x-k/

module.exports = GeekForGeeks;