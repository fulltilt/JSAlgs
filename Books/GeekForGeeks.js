function GeekForGeeks() {
  this.findEquilibriumIndex = findEquilibriumIndex;
  this.findAngleBetweenClockHands = findAngleBetweenClockHands;
  this.binarySearch = binarySearch;
  this.recursiveBinarySearch = recursiveBinarySearch;
  this.searchSortedRotatedArray = searchSortedRotatedArray;
  this.power = power;
  this.wordBreak = wordBreak;
  this.findNthValue = findNthValue;
  this.findMedian = findMedian;
  this.partition = partition;
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

// Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words
function wordBreak(words, input) {
  // base case  
  if (input.length === 0) {
    return true;
  }
  var length = input.length;

  for (var i = 1; i <= length; i++) {
console.log(input.substr(0, i) + ' ' + input.substr(i, length - 1)); // interesting to see the algorithms progression
    if ((words.indexOf(input.substr(0, i)) !== -1) &&
         this.wordBreak(words, input.substr(i, length - i))) {
//console.log(input.substr(0, i)); // prints out words in reverse order if success
      return true;
    }
  }

  return false;
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
      if (j === lo) { // condition to avoid out of bounds exceptions if the list is already sorted
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

module.exports = GeekForGeeks;