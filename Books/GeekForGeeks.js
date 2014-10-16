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

// http://www.geeksforgeeks.org/median-of-two-sorted-arrays/
function findMedianOfTwoSortedArrays(arr1, arr2) {

}

function reverseArray(arr) {
  console.log(arr);
  var start = 0,
      end = arr.length - 1;

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

}

// http://www.geeksforgeeks.org/leaders-in-an-array/
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


// *http://www.geeksforgeeks.org/maximum-difference-between-two-elements/
// http://www.geeksforgeeks.org/turn-an-image-by-90-degree/

module.exports = GeekForGeeks;