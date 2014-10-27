var Queue = require('../Queue.js'); // used for maxOfAllSubArrays()
var BST = require('../BinarySearchTree.js');  // for binarySearchTreeToArray, countSmallerElementsOnRight
var Heap = require('../Heap.js'); // used for mergeKSortedArrays

function GeekForGeeks() {
  this.getMedianValue = getMedianValue;
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
  this.isSubArray = isSubArray;
  this.findMajority = findMajority;
  this.findMissingNumber = findMissingNumber;
  this.findPivotInRotatedArray = findPivotInRotatedArray;
  this.findMedianOfTwoSortedArrays = findMedianOfTwoSortedArrays;
  this.reverseArray = reverseArray;
  this.rotateArray = rotateArray;
  this.leadersInAnArray = leadersInAnArray;
  this.replaceWithNextGreatest = replaceWithNextGreatest;
  this.sortElementsByFrequency = sortElementsByFrequency;
  this.findTwoElementsWhoseSumIsClosestToZero = findTwoElementsWhoseSumIsClosestToZero;
  this.segregateOnesAndZeroes = segregateOnesAndZeroes;
  this.findTwoRepeatingElements = findTwoRepeatingElements;
  this.dutchNationalFlag = dutchNationalFlag;
  this.binarySearchTreeToArray = binarySearchTreeToArray;
  this._binarySearchTreeToArray = _binarySearchTreeToArray;
  this.unionOfTwoArrays = unionOfTwoArrays;
  this.intersectionOfTwoArrays = intersectionOfTwoArrays;
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
  this.getMaxLengthBitonicSubArray = getMaxLengthBitonicSubArray;
  this.findMaxInIncreasingDecreasing = findMaxInIncreasingDecreasing;
  this.countSmallerElementsOnRight = countSmallerElementsOnRight;
  this.findSubArrayWithGivenSum = findSubArrayWithGivenSum;
  this.findTwoNumsThatSumToN = findTwoNumsThatSumToN;
  this.findTripletThatSumsToN = findTripletThatSumsToN;
  this.findSortedSubSequenceOfThree = findSortedSubSequenceOfThree;
  this.largestSubArrayOfZeroesAndOnes = largestSubArrayOfZeroesAndOnes;
  this.maxProductSubArray = maxProductSubArray;
  this.formBiggestNumber = formBiggestNumber;
  this.biggestNumCompare = biggestNumCompare;
  this.mergeKSortedArrays = mergeKSortedArrays;
  this.smallestSubArrayWhoseSumIsGreaterThanN = smallestSubArrayWhoseSumIsGreaterThanN;
  this.findKClosestElementsToN = findKClosestElementsToN;
  this.maxSumPathBetweenTwoArrays = maxSumPathBetweenTwoArrays;
  this.sortDefinedBySecondArray = sortDefinedBySecondArray;
  this.alternatePositiveAndNegative = alternatePositiveAndNegative;
  this.findSmallestValueNotReppedBySubArraySum = findSmallestValueNotReppedBySubArraySum;
  this.findCommonElementsInThreeSortedArrays = findCommonElementsInThreeSortedArrays;

  // Strings
  this.areStringRotations = areStringRotations;
  this.printAnagrams = printAnagrams;
  this.findAllPossibleWordsFromPhoneDigits = findAllPossibleWordsFromPhoneDigits;
  this.printAllPermutations = printAllPermutations;
  this.printLexicographicPermutations = printLexicographicPermutations;
  this.printListItemsContainingWord = printListItemsContainingWord;
  this.reverseWords = reverseWords;
  this.runLengthEncoding = runLengthEncoding;
  this.smallestWindowContainingString = smallestWindowContainingString;
  this.printInterleavings = printInterleavings;
  this.removeFromString = removeFromString;
  this.removeAdjacentDuplicates = removeAdjacentDuplicates;
  this.findExcelColumnName = findExcelColumnName;
  this.isFirstStringSubsequenceOfSecond = isFirstStringSubsequenceOfSecond;
  this.suffixTree = suffixTree;
  this.trie = trie;
  this.ternarySearchTree = ternarySearchTree;
  this.KMP = KMP;
  this.RabinKarp = RabinKarp;
  this.finiteAutomata = finiteAutomata;

  // Mathematical Properties
  this.findExpPairs = findExpPairs;

  // Matrices
  this.maxSquareSubMatrix = maxSquareSubMatrix;
}

function getMedianValue(arr) {
  return Math.floor((arr.length - 1) / 2); // we add '- 1' since if we do something like binary search, the index never becomes zero if we don't have that
                                           // NOTE: found a new problem: the index never becomes the last index
}

/* modified binary search that returns the index where the n is or returns the negative index of where n would be if it were in the list
  ex. [1, 2, 8, 10, 10, 12, 19]
  if n = 0: return 0; low = 0, high = -1, arr[low] = 1, arr[high] = undefined
  if n = 1: return true
  if n = 5: return 2; low = 2, high = 1, arr[low] = 8, arr[high] = 2
  if n = 20: return 7; low = 7, high = 6, arr[low] = undefined, arr[high] = 19
  Note: since negative zero doesn't exist, return -Infinity
*/
function binarySearch(arr, n) {
  var low = 0,
      high = arr.length - 1;

  while (high >= low) { // breaks if not >=
    var middle = Math.ceil((high + low) / 2);  // what happens if we use floor?
    // use middle = (low + (high - low)) / 2);  if we're talking an extremely huge high number

    if (arr[middle] === n) {
      return middle;
    } else if (n < arr[middle]) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  //return false;
  if (low === 0) {
    return -Infinity;
  } else {
    return -low;
  }
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

// O(n) version of finding median using randomization. Usually it would take O(nlogn) as we would have to sort the data first. 
// This algorithm can be generalized to find the nth sorted value in an array
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

// http://www.geeksforgeeks.org/find-whether-an-array-is-subset-of-another-array-set-1/
// determine whether arr2 is a subarray of arr1
function isSubArray(arr1, arr2) {

}

// http://www.geeksforgeeks.org/majority-element/ (unsorted) or http://www.geeksforgeeks.org/check-for-majority-element-in-a-sorted-array/
function findMajority(arr) {
  if (arr.length === 0) {
    return null;
  }

  var length = arr.length,
      biggestCount = 0;
  var table = {}
  for (var i = 0; i < length; i++) {
    if (table[arr[i]]) {
      ++table[arr[i]];
    } else {
      table[arr[i]] = 1;
    }

    if (biggestCount === 0) {
      biggestCount = i;
    } else if (table[arr[i]] > biggestCount) {
      biggestCount = arr[i];
    }
  }

  if (table[biggestCount] > Math.floor(length / 2)) {
    return biggestCount;
  } else {
    return null;
  }
}

// http://www.geeksforgeeks.org/find-the-missing-number/
function findMissingNumber(arr) {
  var subArrLength = arr.length;
  var length = subArrLength + 1;          // since the array is missing a number, we do arr.length + 1
  var sum = (length * (length + 1)) / 2;  // use formula to calculate sum of first n numbers where n is length
  for (var i = 0; i < subArrLength; i++) {
    sum -= arr[i];
  }

  return sum;
}

// http://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/  
// NOTE: doesn't work all the time if there are duplicates in the array: i.e. 2,2,3,0,2,2,2,2,2,2,2 and assumes the array is rotated (fails for non-rotated arrays)
function findPivotInRotatedArray(arr, start, end) {
  if (start === end) {
    return start;
  }

  var medianIndex = Math.floor((start + end) / 2); // don't have to worry about doing '- 1' as 'end' is zero-indexed

  if (arr[medianIndex + 1] < arr[medianIndex]) { // if the index to the right is less than the median, we found the rotation point
    return medianIndex;
  }

  if (arr[start] >= arr[medianIndex]) {
    return this.findPivotInRotatedArray(arr, start, medianIndex - 1);
  } else {
    return this.findPivotInRotatedArray(arr, medianIndex + 1, end);
  }
}

// http://www.geeksforgeeks.org/median-of-two-sorted-arrays/, does it take into account different sized arrays? (http://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-different-sizes/)
// naive solution: get the total length of both arrays. Then do a merge sort and once you find the (n / 2)nd element, return it (may have to tweak what to return for even lengthed arrays)
// TODO: O(log n) solution
function findMedianOfTwoSortedArrays(arr1, arr2) {
  var arr1Length = arr1.length,
      arr2Length = arr2.length,
      totalLength = arr1Length + arr2Length,
      medianIndex = Math.floor((totalLength - 1) / 2),
      arr1Ptr = 0,
      arr2Ptr = 0,
      newArray = [];

  while ((arr1Ptr < arr1Length) && (arr2Ptr < arr2Length)) {
    if (arr1[arr1Ptr] < arr2[arr2Ptr]) {
      newArray.push(arr1[arr1Ptr++]);
    } else {
      newArray.push(arr2[arr2Ptr++])
    }

    // if we want to be more efficient and end the loop once we reach the median. Problematic as we actually have to go 2 indexes beyond this point for when array length is even
    //if (newArray.length === (medianIndex + 2)) {
    //  break;
    //}
  }

  newArray.concat(arr1.slice(arr1Ptr)).concat(arr1.slice(arr2Ptr));

  if (totalLength % 2 === 0) {
    return ((newArray[medianIndex] + newArray[medianIndex + 1]) / 2);
  } else {
    return newArray[medianIndex];
  }
}

function reverseArray(arr, start, end) {
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

// http://www.geeksforgeeks.org/leaders-in-an-array/
function leadersInAnArray(arr) {
  var results = [],
      length = arr.length;
  
  results.push(arr[length - 1]); // the last element is always a leader
  for (var i = length - 2; i > 0; --i) {
    if (arr[i] > arr[i - 1]) {
      results.push(arr[i]);
    }
  }

  return results;
}

//http://www.geeksforgeeks.org/replace-every-element-with-the-greatest-on-right-side/
function replaceWithNextGreatest(arr) {
  var length = arr.length,
      max = arr[length - 1];
  arr[length - 1] = -1; // set to -1 since there is nothing to the right of the last element

  for (var i = length - 2; i >= 0; --i) {
    if (max > arr[i]) {
      arr[i] = max;
    } else {
      var oldMax = max;
      max = arr[i];
      arr[i] = oldMax;
    }
  }

  return arr;
}

// http://www.geeksforgeeks.org/sort-elements-by-frequency/ or http://www.geeksforgeeks.org/sort-elements-by-frequency-set-2/
// (there weren't any super clever solutions that didn't involve creating extra data structures and auxiliary arrays)
function sortElementsByFrequency(arr) {
  if (arr === null) {
    return;
  } else if (arr.length === 1) {
    return arr;
  }

  var countTable = {};
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    if (!countTable[arr[i]]) {
      countTable[arr[i]] = 1;
    } else {
      ++countTable[arr[i]];
    }
  }
  
  var sortable = [];
  for (var num in countTable) {
    sortable.push([num, countTable[num]]);
  }
  sortable.sort(function(a, b) { 
    return b[1] - a[1]; // orders from greatest to smallest
  });

  var result = [];
  for (i = 0; i < sortable.length; i++) {
    for (var j = 0; j < sortable[i][1]; j++) {
      result.push(parseInt(sortable[i][0]));
    }
  }

  return result;
}

// http://www.geeksforgeeks.org/two-elements-whose-sum-is-closest-to-zero/
// algorithm to get exactly zero assuming it exists: sort the array and have a pointers at the beginning and end. If their sums equal zero, return nums. Else if the sum is greater than zero, decrease the right pointer. Else increase left pointer
function findTwoElementsWhoseSumIsClosestToZero(arr) {
  if (arr === null || arr.length === 1) {
    return;
  }

  var lo = 0,
      hi = arr.length - 1,
      min_lo = lo,
      min_hi = hi,
      minDistance = Infinity;

  arr = arr.sort(function(a, b) { return a - b; });  // if I use the default sort, -10 is greater than -80
  while (lo < hi) {
    var sum = arr[lo] + arr[hi];

    if (Math.abs(sum) < Math.abs(minDistance)) {
      minDistance = sum;
      min_lo = lo;
      min_hi = hi;
    }

    // here is the trick: if the sum is less than zero, increase the sum by adding a greater number from the left. If it's greater than zero, decrease sum by adding a lesser number from the right
    if (sum < 0) {
      ++lo;
    } else {
      --hi;
    }
  }

  return [arr[min_lo], arr[min_hi]];
}

// Separate 0's to the left and 1's to the right
// algorithm: use quicksort partition logic
function segregateOnesAndZeroes(arr) {
  if (arr === null) {
    return;
  } else if (arr.length === 1) {
    return arr;
  }

  var length = arr.length,
      lo = 0,
      hi = length - 1;

  while (lo < hi) {
    while (arr[lo] === 0 && lo !== hi) {
      ++lo;
    }

    while (arr[hi] === 1 && hi !== lo) {
      --hi;
    }

    var temp = arr[hi];
    arr[hi] = arr[lo];
    arr[lo] = temp;
  }

  return arr;
}

// http://www.geeksforgeeks.org/find-the-two-repeating-elements-in-a-given-array/
// algorithm: have an auxiliary array that keeps an a count of each element. Once you hit an element twice that had a count, print it out. Do this twice.
// See method 3 for mathematical approach
function findTwoRepeatingElements(arr) {
  if (arr === null) {
    return;
  } else if (arr.length < 4) {
    throw new Error('Invalid input. Array has to be at least length 4.');
  }

  var length = arr.length,
      count = [],
      results = [],
      found = 0;

  for (var i = 0; i < length; i++) {
    if (!count[arr[i]]) {
      count[arr[i]] = true;
    } else {
      results.push(arr[i]);
      ++found;
      if (found === 2) {
        return results;
      }
    }
  }

  return false;
}

// http://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/ (look here for a more concise solution)
function dutchNationalFlag(arr) {
  var length = arr.length;
      lo = 0,
      mid = 0,
      hi = length - 1;

  while (mid < hi) {
    while (arr[lo] === 0 && lo !== hi) {
      ++lo;
    }

    while (mid < lo || arr[mid] === 1) {
      ++mid;
    }

    while (arr[hi] === 2 && hi !== lo) {
      --hi;
    }

    if (arr[mid] === 0) {
      var temp = arr[mid];
      arr[mid] = arr[lo];
      arr[lo] = temp;
    } else {
      var temp = arr[mid];
      arr[mid] = arr[hi];
      arr[hi] = temp;
    }
  }
  return arr;
}

function binarySearchTreeToArray(root) {
  var arr = [];
  this._binarySearchTreeToArray(root, arr);
  return arr;
}

function _binarySearchTreeToArray(node, arr) {
  if (node === null) {
    return null;
  }

  this._binarySearchTreeToArray(node.left, arr);
  arr.push(node.data);
  this._binarySearchTreeToArray(node.right, arr);
}

// http://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/
// if it's sorted, we can use the merge algorithm. However, it doesn't work if the arrays have duplicates
function unionOfTwoArrays(arr1, arr2) {
  var bst = new BST.BinarySearchTree();
  for (var i = 0; i < arr2.length; i++) {
    bst.insert(arr2[i]);
  }
  
  for (i = 0; i < arr1.length; i++) {
    if (!bst.find(arr1[i])) {
      bst.insert(arr1[i]);
    }
  }

  return this.binarySearchTreeToArray(bst.root);
}

// http://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/
// if it's sorted, we can use the merge algorithm. However, it doesn't work if the arrays have duplicates
function intersectionOfTwoArrays(arr1, arr2) {
  var bst = new BST.BinarySearchTree();
  for (var i = 0; i < arr2.length; i++) {
    bst.insert(arr2[i]);
  }
  
  var results = []
  for (i = 0; i < arr1.length; i++) {
    if (bst.find(arr1[i])) {
      results.push(arr1[i]);
    }
  }

  return results;
}

// http://www.geeksforgeeks.org/search-floor-and-ceil-in-a-sorted-array/
// The code is concise but there are so many corner cases and special exceptions. It's also heavily reliant on the modified binary search to return correct indices
function floorAndCeilOfSortedArray(arr, n) {
  if (arr === null) {
    return null;
  }

  var index = this.binarySearch(arr, n);

  if (index >= 0) { // the only time binary search will return a positive # is when the element is in the array
    return [arr[index], arr[index]];
  } else {          // if the value is negative, that means the element was not found. Get the absolute value of the returned value to use as an index
    index = Math.abs(index);
  }

  if (index === Infinity) {             // n is lower than the lowest item
    return [null, arr[0]];
  } else if (index === arr.length) {    // n is bigger than the biggest item
    return [arr[arr.length - 1], null];
  } else {                              // n would be in the middle of the array
    return [arr[index - 1], arr[index]];
  }
}

// http://www.geeksforgeeks.org/a-product-array-puzzle/ (clever solution)
function prodArrayPuzzle(arr) {
  if (arr === null) {
    return;
  } else if (arr.length === 1) {
    return arr;
  }

  var LtoRProducts = [],
      RtoLProducts = [],
      length = arr.length;

  LtoRProducts[0] = arr[0];
  for (var i = 1; i < length; i++) {
    LtoRProducts[i] = LtoRProducts[i - 1] * arr[i];
  }

  RtoLProducts[length - 1] = arr[length - 1];
  for (i = length - 2; i >= 0; i--) {
    RtoLProducts[i] = arr[i] * RtoLProducts[i + 1];
  }
  
  var result = [arr.length];
  result[0] = RtoLProducts[1];
  result[length - 1] = LtoRProducts[length - 2];
  for (i = 1; i < length - 1; i++) {
    result[i] = LtoRProducts[i - 1] * RtoLProducts[i + 1];
  }

  return result;
}

// http://www.geeksforgeeks.org/minimum-length-unsorted-subarray-sorting-which-makes-the-complete-array-sorted/
function findMinUnsortedSubArray(arr) {
  if (arr === null) {
    return;
  } else if (arr.length === 1) {
    return arr;
  }

  var lo = 0,
      hi = arr.length - 1,
      length = arr.length;

  // find first index from left to right where the next index is less than the current index
  for (var i = 0; i < length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      lo = i + 1;
      break;
    }
  }

  // find the first index from right to left where the next index is greater than the current index
  for (i = length - 1; i >= 0; i--) {
    if (arr[i] < arr[i - 1]) {
      hi = i - 1;
      break;
    }
  }

  // corner case when lo is greater than hi. In this case, just swap the indices
  if (lo > hi) {
    var temp = lo;
    lo = hi;
    hi = lo;
  }

  // now that we have the subarray range, find the smallest and largest value in the subarray to compare to the neighbors:
  // keep extending left of the range until you reach an element that is smaller than minValue and then keep extending right of the range until you
  // reach an element that is bigger than maxValue
  var minValue = arr[getMin(arr, lo, hi)],
      maxValue = arr[getMax(arr, lo, hi)];

  nextLo = lo - 1;
  while (arr[nextLo] > minValue && nextLo !== -1) {
    lo = nextLo;
    nextLo -= 1;
  }

  nextHi = hi + 1;
  while (arr[nextHi] < maxValue && nextHi !== length) {
    hi = nextHi;
    nextHi += 1;
  }

  return arr.slice(lo, hi + 1);
}

// helper fxn that gets smallest element within a subarray
function getMin(arr, lo, hi) {
  var lowest = Infinity,
      lowestIndex;

  for (var i = lo; i <= hi; i++) {
    if (arr[i] < lowest) {
      lowest = arr[i];
      lowestIndex = i;
    }
  }
  return lowestIndex;
}

// helper fxn that gets largest element within a subarray
function getMax(arr, lo, hi) {
  var highest = -Infinity,
      highestIndex;

  for (var i = lo; i <= hi; i++) {
    if (arr[i] > highest) {
      highest = arr[i];
      highestIndex = i;
    }
  }
  return highestIndex;
}

// http://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/
// note: this modifies the array and the assumes that the element values are less than the length of the array
//       Also doesn't work if there are zeroes. *** 
function findDuplicates(arr) {
  if (arr === null) {
    return;
  } else if (arr.length === 1) {
    return [];
  }

  var length = arr.length,
      results = [];
  for (var i = 0; i < length; i++) {
    var absVal = Math.abs(arr[i]);
    if (arr[absVal] < 0) {
      results.push(absVal);
    } else {
      arr[absVal] = -arr[absVal];
    }
  }
  return results;
}

// http://www.geeksforgeeks.org/next-greater-element/
// naive solution using an inner for-loop is O(n^2) if array is in decreasing order. Something to consider as the 
// O(n) solution below is kind of tricky
function nextGreaterElement(arr) {
  var stack = [],   // JavaScript array can mimic a stack
      results = {}; // use object literal as the algorithm doesn't set the values in order  
  
  // initially push the first element onto the stack
  stack.push(arr[0]);

  for (var i = 1; i < arr.length; i++) {
    next = arr[i];

    if (stack.length !== 0) {
      current = stack.pop();    // if stack is not empty, then pop an element from stack

      /* If the popped element is smaller than next, then
        a) print the pair
        b) keep popping while elements are smaller and stack is not empty */
      while (next > current) {
        results[current] = next;
        if (stack.length === 0) {
          break;
        }
        current = stack.pop();
      }

      // If current is greater than next, then push the current element back
      if (current > next) {
        stack.push(current);
      }
    }

    // push next to stack so that we can find next greater for it
    stack.push(next);
  }

  // any elements that are left in the stack don't have a next greatest so set their values to -1
  for (i = 0; i < stack.length; i++) {
    results[stack[i]] = -1;
  }

  return results;
}

// http://www.geeksforgeeks.org/check-if-array-elements-are-consecutive/
// algorithm: find min and max value and their difference should equal the length of the array + 1. Then make sure that there are no duplicates
function areAllElementsConsecutive(arr) {
  if (arr === null) {
    throw new Error('null input!');
  } else if (arr.length === 1) {
    return true;
  }

  var length = arr.length,
      min = getMin(arr, 0, length - 1),
      max = getMax(arr, 0, length - 1);
  if ((arr[max] - arr[min] + 1) === length) {
    // find if there are duplicates
    var table = {};
    for (var i = 0; i < length; i++) {
      if (!table[arr[i]]) {
        table[arr[i]] = 1;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

// http://www.geeksforgeeks.org/find-the-first-missing-number/
// assumption: array is sorted
// algorithm O(log n): use binary search: if the current mid-value is greater than the index, check the left subarray. Else check the right subarray.
// -naive is O(n) where we start from the first element and check that the element matches the index
// -the tricky part is that it checks the first element in each subarray
function findSmallestMissingNumber(arr, start, end) {
  /* this was in the original code. Not sure what it's needed for
  if(start  > end)
      return end + 1;
  */
  if (start != arr[start]) {
    return start;
  }

  var mid = Math.floor((start + end) / 2);

  if (arr[mid] > mid) {
    return this.findSmallestMissingNumber(arr, start, mid);
  } else {
    return this.findSmallestMissingNumber(arr, mid + 1, end);
  }
}

// http://www.geeksforgeeks.org/count-number-of-occurrences-in-a-sorted-array/
// algorithm: use binary search to find the first and last index that has n as its value. Return (last - first + 1)
function countNumberOfOccurrences(arr, n, lo, hi) {
  if (hi < lo) {
    return 0;
  }

  // case when whole subarray is filled with element n
  if (arr[lo] === n && arr[hi] === n) {
    return hi - lo + 1;
  }

  var mid = Math.floor((lo + hi) / 2),
      count = 0;

  if (arr[mid] === n) {
    ++count;
  }    

  // search the left side
  if (arr[mid] >= n) {
    count += this.countNumberOfOccurrences(arr, n, lo, mid - 1);
  }

  // search the right side
  if (arr[mid] <= n) {
    count += this.countNumberOfOccurrences(arr, n, mid + 1, hi);
  }

  return count;
}

// http://www.geeksforgeeks.org/maximum-of-all-subarrays-of-size-k/
function maxOfAllSubArrays(arr, k) {
  if (arr === null) {
    throw new Error('null array');
  } else if (k > arr.length) {
    throw new Error('k cannot be bigger than the size of the array');
  }

  var queue = new Queue(),
      length = arr.length,
      results = [];

  // initialize the queue with the first k elements in the array
  for (var i = 0; i < k; i++) {
    queue.maxEnqueue(arr[i]);
  }
  results.push(queue.getMax());

  // continue with the rest of the array, windows of k size at a time
  for (; i < length; i++) {
    queue.maxDequeue();
    queue.maxEnqueue(arr[i]);
    results.push(queue.getMax());
  }

  return results;
}

// http://www.geeksforgeeks.org/find-the-minimum-distance-between-two-numbers/
// assumption: x and y are guaranteed to be in the input
function minDistanceBetweenTwoNums(arr, x, y) {
  if (arr === null) {
    throw new Error('null array');
  } else if (arr.length === 1) {
    throw new Error('array length must be greater than 1')
  }

  var current = Infinity,
      lastIndex = -1,
      distance = Infinity,
      length = arr.length;

  for (var i = 0; i < length; i++) {
    if (arr[i] === x && current !== y) {
      current = x;
      lastIndex = i;
    } else if (arr[i] === x && current === y) {
      var tempDistance = i - lastIndex;
      if (tempDistance < distance) {
        distance = tempDistance;
      }
    }

    if (arr[i] === y && current !== x) {
      current = y;
      lastIndex = i;
    } else if (arr[i] === y && current === x) {
      var tempDistance = i - lastIndex;
      if (tempDistance < distance) {
        distance = tempDistance;
      }
    }

    /* didn't test this out all the way but the following worked while taking out the else if statements above:
    if ((arr[i] === x && current === y) || (arr[i] === y && current === x)) {
      var tempDistance = i - lastIndex;
      if (tempDistance < distance) {
        distance = tempDistance;
      }
    }*/
  }

  return distance;
}

// http://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/
// NOTE: the valid numbers are from 1 through n. Zero is not allowed
// algorithm: Traverse the array. While traversing, use absolute value of every element as index and make 
//   the value at this index as negative to mark it visited. If something is already marked negative then 
//   this is the repeating element. To find missing, traverse the array again and look for a positive value
// *** tough because of the of the '- 1' consideration and the indexes and it's values refer to other parts of the array
function findRepeatingAndMissing(arr) {
  if (arr === null) {
    throw new Error('null array');
  } else if (arr.length <= 2) {
    throw new Error('array must be greater than 2');
  }

  var length = arr.length,
      results = [];

  // find the repeating
  for (var i = 0; i < length; i++) {
    var absIndex = Math.abs(arr[i]) - 1;  // need the minus 1 as the input is not zero-indexed but the array is

    if (arr[absIndex] < 0) {  // found duplicate
      results.push(Math.abs(arr[i]));
      break;
    } else {
      arr[absIndex] = -arr[absIndex];
    }
  }

  // find missing element
  for (i = 0; i < length; i++) {
    if (arr[i] > 0) {
      results.push(i + 1);
      break;
    }
  }

  return results;
}

// http://www.geeksforgeeks.org/find-a-fixed-point-in-a-given-array/
function fixedPointInArray(arr) {
  var length = arr.length,
      lo = 0,
      hi = length - 1;

  while (hi > lo) {
    var mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === mid) {
      return mid;
    } else if (arr[mid] < mid) {  // check right subarray
      lo = mid + 1;
    } else {                      // check left subarray
      hi = mid - 1;
    }
  }

  return -1;
}

// http://www.geeksforgeeks.org/maximum-length-bitonic-subarray/
// reread algorithm. It's easy to implement but not 100% on why it works
function maxLengthBitonicSubArray(arr) {
  if (arr === null) {
    throw new Error('null array');
  }

  var length = arr.length - 1,
      inc = [length], // keeps track of increasing indices from left to right
      dec = [length]; // keeps track of increasing indices from right to left

  // fill in inc
  inc[0] = 1; // first element doesn't have a previous element to compare to so set it to 1
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      inc[i] = inc[i - 1] + 1;
    } else {
      inc[i] = 1;
    }
  }

  // fill in dec
  dec[arr.length - 1] = 1; // last element doesn't have a previous element to compare to so set it to 1
  for (i = arr.length - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) {
      dec[i] = dec[i + 1] + 1;
    } else {
      dec[i] = 1;
    }
  }
  
  var maxValue = inc[0] + dec[0] - 1;
  for (i = 1; i < arr.length; i++) {
    var temp = inc[i] + dec[i] - 1;
    if (temp > maxValue) {
      maxValue = temp;
    }
  }

  return maxValue;
}

function getMaxLengthBitonicSubArray(arr) {
if (arr === null) {
    throw new Error('null array');
  }

  var length = arr.length - 1,
      inc = [length], // keeps track of increasing indices from left to right
      dec = [length]; // keeps track of increasing indices from right to left

  // fill in inc
  inc[0] = 1; // first element doesn't have a previous element to compare to so set it to 1
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      inc[i] = inc[i - 1] + 1;
    } else {
      inc[i] = 1;
    }
  }

  // fill in dec
  dec[arr.length - 1] = 1; // last element doesn't have a previous element to compare to so set it to 1
  for (i = arr.length - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) {
      dec[i] = dec[i + 1] + 1;
    } else {
      dec[i] = 1;
    }
  }
  
  var maxValue = inc[0] + dec[0] - 1,
      maxIndex = 0;
  for (i = 1; i < arr.length; i++) {
    var temp = inc[i] + dec[i] - 1;
    if (temp > maxValue) {
      maxValue = temp;
      maxIndex = i;
    }
  }

  // get point where inc starts increasing into maxIndex
  var incIndex = maxIndex,
      decIndex = maxIndex;
  while (inc[incIndex] !== 1) {
    incIndex -= 1;
  }
  
  while (dec[decIndex] !== 1) {
    decIndex += 1;
  }

  return arr.slice(incIndex, decIndex + 1);
}

// http://www.geeksforgeeks.org/find-the-maximum-element-in-an-array-which-is-first-increasing-and-then-decreasing/
function findMaxInIncreasingDecreasing(arr) {
  if (arr === null) {
    throw new Error('null array');
  } else if (arr.length < 3) {
    throw new Error('array must be at least 3 items long');
  }

  var length = arr.length - 1,
      lo = 0,
      hi = length - 1;

  while (hi > lo) {
    // corner case of when there's 2 elements left
    if ((hi - lo) === 1) {
      return Math.max(arr[lo], arr[hi]);
    }

    var mid = Math.floor((lo + hi) / 2);

    if ((arr[mid - 1] < arr[mid]) && arr[mid + 1] < arr[mid]) { // if both neighbors are less than index, we found max
      return arr[mid];
    } else if ((arr[mid - 1] < arr[mid]) && arr[mid + 1] > arr[mid]) { // if neighbors and index are in increasing order, check right subarray
      lo = mid + 1;
    } else {  // neighbors and index are in decreasing order. Check left subarray
      hi = mid - 1;
    }
  }
}

// http://www.geeksforgeeks.org/find-subarray-with-given-sum/
// note: array is unordered
function findSubArrayWithGivenSum(arr, sum) {
  if (arr === null) {
    throw new Error('null array');
  } else if (arr.length === 0) {
    throw new Error('empty array');
  }

  var length = arr.length,
      start = 0,
      currentSum = arr[0];

  for (var i = 1; i < length; i++) {
    // keep removing trailing indices while currentSum is greater than sum
    while (currentSum > sum && start < i - 1) {
      currentSum -= arr[start];
      start += 1;
    }

    if (currentSum === sum) {
      return [start, i - 1];
    }

    if (i < length) {
      currentSum += arr[i];
    }
  }

  return false;
}

// http://www.geeksforgeeks.org/write-a-c-program-that-given-a-set-a-of-n-numbers-and-another-number-x-determines-whether-or-not-there-exist-two-elements-in-s-whose-sum-is-exactly-x/
// assumption: array must be sorted
function findTwoNumsThatSumToN(arr, n) {
  var lo = 0,
      hi = arr.length - 1,
      currentSum;

  while (hi > lo) {
    currentSum = arr[lo] + arr[hi];

    if (currentSum === n) {
      return [arr[lo], arr[hi]];
    } else if (currentSum > n) {
      hi -= 1;
    } else {
      lo += 1;
    }
  }

  return -1;
}

// http://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/
function findTripletThatSumsToN(arr, n) {
  var length = arr.length,

  arr = arr.sort(function(a, b) { return a - b; }); // algorithm relies that the numbers are sorted

  for (var i = 0; i < length; i++) {
    var tempSum = n - arr[i],
        tempResult = this.findTwoNumsThatSumToN(arr, tempSum);

    if (tempResult !== -1) {
      tempResult.push(arr[i]);
      return tempResult;
    }
  }

  return -1;
}

// http://www.geeksforgeeks.org/find-a-sorted-subsequence-of-size-3-in-linear-time/
// Note: a subsequence is in order from left to right but isn't necessarily contiguous
// ex.  input = [12, 11, 10, 5, 6, 2, 30]
//      smaller = [ -1, -1, -1, -1, 3, -1, 5 ]
//      bigger = [ 6, 6, 6, 6, 6, 6, -1 ]
function findSortedSubSequenceOfThree(arr) {
  var length = arr.length,
      min = 0,
      max = length - 1,
      smaller = [length],
      bigger = [length];

  // Create an array that will store index of a smaller element on left side. If there is no smaller element on left side, then smaller[i] will be -1
  smaller[0] = -1; // first entry is always -1
  for (i = 1; i < length; i++) {
    if (arr[i] <= arr[min]) {
      min = i;
      smaller[i] = -1;
    } else {
      smaller[i] = min;
    }
  }

  // Create an array that will store index of a bigger element on right side. If there is no bigger element on right side, then bigger[i] will be -1
  bigger[length - 1] = -1; // last entry is always -1
  for (i = length - 2; i >= 0; i--) {
    if (arr[i] >= arr[max]) {
      max = i;
      bigger[i] = -1;
    } else {
      bigger[i] = max;
    }
  }

  // Now find a # which has both a greater # on right side and smaller # on left side
  for (i = 0; i < length; i++) {
    if (smaller[i] !== -1 && bigger[i] !== -1) {  // note: noticed that there isn't any checking if smaller[i] < bigger[i] in original source
      return [arr[smaller[i]], arr[i], arr[bigger[i]]];
    }
  }

  return -1;
}

// http://www.geeksforgeeks.org/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number/
function formBiggestNumber(arr) {
  var length = arr.length,
      output = '';

  arr = arr.sort(this.biggestNumCompare);

  for (var i = 0; i < length; i++) {
    output += arr[i];
  }

  return output;
}

// helper fxn for formBiggestNumber()
function biggestNumCompare(x, y) {
  x = (x).toString();
  y = (y).toString();

  var XY = x.concat(y),
      YX = y.concat(x);

  return parseInt(YX) - parseInt(XY);   
}

// http://www.geeksforgeeks.org/merge-k-sorted-arrays/
function mergeKSortedArrays(arr) {
  var heap = new Heap(function(x) { return x; }),
      rows = arr.length,
      columns = arr[0].length,
      result = [];

  // add all elements into heap
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      heap.push(arr[i][j]);
    }
  }

  // pop all elements from heap and into results array
  while (heap.size() > 0) {
    result.push(heap.pop());
  }

  return result;
}

// http://www.geeksforgeeks.org/minimum-length-subarray-sum-greater-given-value/
function smallestSubArrayWhoseSumIsGreaterThanN(arr, n) {
  var length = arr.length,
      sum = 0,
      minLength = Infinity,
      start = 0, minStart = 0,
      end = 0, minEnd = 0;

  while (end < length) {
    while (sum < n && end < length) {
      sum += arr[end];
      end += 1;
    }

    while (sum > n && start < end) {
      var tempLength = end - start;
      if (tempLength < minLength) {
        minLength = tempLength;
        minStart = start;
        minEnd = end;
      }

      sum -= arr[start];
      start += 1;
    }

    if (minLength === Infinity) {
      return -1;
    } else {
      return arr.slice(minStart, minEnd);
    }
  }
}

// http://www.geeksforgeeks.org/find-k-closest-elements-given-value/
// assumption: array is sorted
function findKClosestElementsToN(arr, k, n) {
  if (arr === null) {
    throw new Error('null input');
  } else if (arr.length < k) {
    throw new Error('k must be less than the length of the array')
  } else if (arr.length === k) {
    return arr;
  }

  var length = arr.length,
      lo = 0,
      hi = length - 1,
      crossoverPoint = -1;  // crossover point is index where elements are less than or equal to n and elements to the right are greater than n

  if (n <= arr[0]) {  // corner case when n is smaller than the smallest value in array
    crossoverPoint = 0
  } else if (n > arr[length - 1]) { // corner case when n is bigger than the largest value
    crossoverPoint = length - 1;
  } else {    // use binary search to find crossover point
    while (hi > lo) {
      var mid = Math.floor((lo + hi) / 2);  // (lo + (hi - lo)) / 2

      if (arr[mid] <= n && arr[mid + 1] > n) {
        crossoverPoint = mid;
        break;
      }

      if (arr[mid] > n) { // search left subarray
        hi = mid - 1;
      } else {            // search right subarray
        lo = mid + 1;
      }
    }
  }

  var elementCount = 0,
      lo = crossoverPoint,
      hi = crossoverPoint + 1,
      distanceFromLo,
      distanceFromHi,
      results = [];

  // corner case when n is in the array
  if (arr[crossoverPoint] === n) {
    lo = crossoverPoint - 1;
  }

  while (elementCount < k) {
    if (lo < 0) {
      distanceFromLo = Infinity;
    } else {
      distanceFromLo = Math.abs(arr[lo] - n);
    }

    if (hi >= length) {
      distanceFromHi = Infinity;
    } else {
      distanceFromHi = Math.abs(arr[hi] - n);
    }

    if (lo >= 0 && (distanceFromLo < distanceFromHi)) {
      results.push(arr[lo]);
      lo -= 1;
    } else if (hi < length && (distanceFromHi < distanceFromLo)) {
      results.push(arr[hi]);
      hi += 1;
    }

    elementCount += 1;
  }

  return results;
}

// http://www.geeksforgeeks.org/maximum-sum-path-across-two-arrays/
// -the trick is to advance each array one at a time depending on who is the lowest value eventually you'll reach similar values assuming they exist
// -this algorithm also works if there are no similar elements in both arrays
function maxSumPathBetweenTwoArrays(arr1, arr2) {
  if (arr1 === null && arr2 === null) {
    throw new Error('both arrays are invalid');
  } else if (arr1 === null) {
    return; // TODO: return sum of arr2
  } else if (arr2 === null) {
    return; // TODO: return sum of arr1
  }

  var length1 = arr1.length,
      length2 = arr2.length,
      ptr1 = 0,
      ptr2 = 0,
      temp1Sum = 0,
      temp2Sum = 0,
      maxSum = 0;

  while (ptr1 !== length1 && ptr2 !== length2) {
    if (arr1[ptr1] === arr2[ptr2]) {
      maxSum = maxSum + Math.max(temp1Sum, temp2Sum) + arr1[ptr1];
      temp1Sum = temp2Sum = 0;
      ptr1 += 1;
      ptr2 += 1;
    } else if (arr1[ptr1] < arr2[ptr2]) {
      temp1Sum += arr1[ptr1];
      ptr1 += 1;
    } else {
      temp2Sum += arr2[ptr2];
      ptr2 += 1;
    }
  }

  // deal with leftovers
  if (ptr1 === length1) { // sum the rest of the 2nd array
    while (ptr2 !== length2) {
      temp2Sum += arr2[ptr2];
      ptr2 += 1;
    }
  } else if (ptr2 === length2) {
    while (ptr1 !== length1) {
      temp1Sum += arr1[ptr1];
      ptr1 += 1;
    }
  }
  maxSum += Math.max(temp1Sum, temp2Sum);

  return maxSum;
}

// http://www.geeksforgeeks.org/sort-array-according-order-defined-another-array/
function sortDefinedBySecondArray(arr1, arr2) {
  var length1 = arr1.length,
      length2 = arr2.length,
      arr1Table = {},
      arr2Leftovers = [];

  // enter all elements of arr1 into a hash table and keep count of # of occurrences
  for (var i = 0; i < length1; i++) {
    if (!arr1Table[arr1[i]]) {
      arr1Table[arr1[i]] = 1;
    } else {
      arr1Table[arr1[i]] += 1;
    }
  }

  // iterate through arr2 in order, search the hash table and add element x #'s of times according to the value
  arr1 = [];  // empty out arr1 and add in sorted order
  for (i = 0; i < length2; i++) {
    var key = arr2[i];
    if (arr1Table[key]) {
      var occurrences = arr1Table[key];
      for (var j = 0; j < occurrences; j++) {
        arr1.push(key);
      }
      delete arr1Table[key];  // remove key from table
    }
  }
  
  // get the remaining keys in arr1Table and add them to arr1 in normal sorted sorder
  var remainingKeys = Object.keys(arr1Table).sort(function(a, b) { return a - b; }),
      length = remainingKeys.length;
  for (i = 0; i < length; i++) {
    occurrences = arr1Table[remainingKeys[i]];
    for (j = 0; j < occurrences; j++) {
      arr1.push(parseInt(remainingKeys[i]));
    }
  }

  return arr1;
}

// http://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/
// algorithm: even indices should be negative and odd indices should be positive. Use 2 pointers to facilitate the swapping to make thisso
// note: this algorithm doesn't maintain the sorted order
function alternatePositiveAndNegative(arr) {
  var i,
      leading,
      length = arr.length,
      swap;

  for (i = 0; i < length; i++) {
    leading = i + 1;
    swap = false;
    if (i % 2 === 0 && arr[i] >= 0) { // we have a positive # in an even cell. Search for the next negative # and then swap
      while (arr[leading] >= 0 && leading !== length) {
        leading += 1;
      }
      swap = true;
    } else if (i % 2 === 1 && arr[i] < 0) { // we have a negative # in an odd cell. Search for the next positive # and then swap
      while (arr[leading] < 0 && leading !== length) {
        leading += 1;
      }
      swap = true;
    }

    if (swap) {
      if (leading === length) {
        break;
      } else {
        var temp = arr[leading];
        arr[leading] = arr[i];
        arr[i] = temp; 
      }
    }
  }

  return arr;
}

// http://www.geeksforgeeks.org/find-smallest-value-represented-sum-subset-given-array/
function findSmallestValueNotReppedBySubArraySum(arr) {
  var result = 1,
      length = arr.length;;

  // Traverse the array and increment 'result' if arr[i] is smaller than or equal to 'result'
  for (var i = 0; i < length && arr[i] <= result; i++) {
    result = result + arr[i];
  }

  return result;
}

// http://www.geeksforgeeks.org/find-common-elements-three-sorted-arrays/
function findCommonElementsInThreeSortedArrays(arr1, arr2, arr3) {
  var length1 = arr1.length,
      length2 = arr2.length,
      length3 = arr3.length,
      ptr1 = 0,
      ptr2 = 0,
      ptr3 = 0,
      results = [];

  while (ptr1 < length1 && ptr2 < length2 && ptr3 < length3) {  // once we reach the end of an array, we're done
    if (arr1[ptr1] === arr2[ptr2] && arr2[ptr2] === arr3[ptr3]) { // all three indices are the same
      results.push(arr1[ptr1]);
      ptr1 += 1;
      ptr2 += 1;
      ptr3 += 1;
    }

    // advance ptr1 until what it's pointing at is greater than or equal to what ptr2 is pointing at
    while (ptr1 !== length1 && arr1[ptr1] < arr2[ptr2]) {
      ptr1 += 1;
    }

    // advance ptr2 until what it's pointing at is greater than or equal to what ptr3 is pointing at
    while (ptr2 !== length2 && arr2[ptr2] < arr3[ptr3]) {
      ptr2 += 1;
    }

    // advance ptr3 until what it's pointing at is greater than or equal to what ptr1 is pointing at
    while (ptr3 !== length3 && arr3[ptr3] < arr1[ptr1]) {
      ptr3 += 1;
    } 
  }

  return results;
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

// http://www.geeksforgeeks.org/print-all-interleavings-of-given-two-strings/
function printInterleavings(str1, str2) {

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

// http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/
function KMP(str1, str2) {

}

// http://www.geeksforgeeks.org/searching-for-patterns-set-3-rabin-karp-algorithm/
function RabinKarp(str1, str2) {

}

// http://www.geeksforgeeks.org/searching-for-patterns-set-5-finite-automata/
function finiteAutomata(str1, str2) {

}

// http://www.geeksforgeeks.org/pattern-searching-set-8-suffix-tree-introduction/
function suffixTree() {

}

// http://www.geeksforgeeks.org/pattern-searching-using-trie-suffixes/
// http://www.geeksforgeeks.org/trie-insert-and-search/
// http://www.geeksforgeeks.org/trie-delete/
// http://www.geeksforgeeks.org/longest-prefix-matching-a-trie-based-solution-in-java/
function trie() {

}

// http://www.geeksforgeeks.org/ternary-search-tree/
function ternarySearchTree() {

}

// http://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/
function maxSquareSubMatrix(arr) {

}

// http://www.geeksforgeeks.org/find-number-pairs-xy-yx/
function findExpPairs(arr1, arr2) {

}

// http://www.geeksforgeeks.org/maximum-product-subarray/
// assumption: input array always has a positive output
function maxProductSubArray(arr) {

}

// http://www.geeksforgeeks.org/largest-subarray-with-equal-number-of-0s-and-1s/
// algorithm: consider all zero values as -1. The problem now reduces to find the max length subarray with sum = 0
// see: http://stackoverflow.com/questions/5534063/zero-sum-subarray ;we can do a similar approach combining above and instead
//  of looking for an index with the same value, look for an index with the same value plus 1 (apparently we have to do this since
//    we treat zeroes as '-1'. I'm not sure why this is so.) and do a binary search to the right of the index for these values making
//    algorithm O(n logn). The problem is when we have multiple sets where the index is the same and comparing their lengths
function largestSubArrayOfZeroesAndOnes(arr) {
  var length = arr.length,
      lo = 0,
      hi = length -1,
      sum = 0;

  // get sum of array treating zeroes as '-1'
  for (var i = 0; i < length; i++) {
    if (arr[i] === 0) {
      sum += -1;
    } else {
      sum += 1;
    }
  }

}

// http://www.geeksforgeeks.org/count-smaller-elements-on-right-side/
// TODO: not finished as the O(nlog n) solution requires a modified AVL Tree which is at this point a lot of work for a solution I don't understand
function countSmallerElementsOnRight(arr) {
  var avl = new BST.AVLTree(),
      length = arr.length,
      results = [];

  for (var i = length - 1; i >= 0; i--) {
    avl.AVLInsert(arr[i]);
  }

  for (i = 0; i < length; i++) {
    var currentNode = avl.find(arr[i]);
    if (currentNode.left !== null) {
      results[i] = avl._size(currentNode.left);
    } else {
      results[i] = 0;
    }
  }
  return results;
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

// PRACTICE - search '***'

// DIDN'T COMPLETELY UNDERSTAND: nextGreaterElement, findSmallestMissingNumber, countNumberOfOccurrences,
// maxLengthBitonicSubArray, compare findSubArrayWithGivenSum with findTwoNumsThatSumToN, findSortedSubSequenceOfThree,
// biggestNumCompare, findSmallestValueNotReppedBySubArraySum

// MATHY: findRepeatingAndMissing
module.exports = GeekForGeeks;