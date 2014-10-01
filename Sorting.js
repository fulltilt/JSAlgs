function Sorting(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.print = print;
  this.setData = setData;
  this.swap = swap;
  
  for (var i = 0; i < numElements; ++i) {
    this.dataStore[i] = i;
  }

  this.bubbleSort = bubbleSort;
  this.selectionSort = selectionSort;
  this.insertionSort = insertionSort;
  this.shellSort = shellSort;
  this.mergeSort = mergeSort;
  this.quickSort = quickSort; // inplace version of quicksort
  this._quickSort = _quickSort;
  this.partition = partition;
  this.qSort = qSort; // non-inplace version of quicksort
  this._qSort = _qSort;

  this.binarySearch = binarySearch;
}

function setData() {
  for (var i = 0; i < this.numElements; i++) {
    this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
  }
}

function clear() {
  this.dataStore = [];
}

function insert(element) {
  this.dataStore[this.pos++] = element;
}

function print() {
  var output = '';
  for (var i = 0; i < this.numElements; i++) {
    output += this.dataStore[i] + ' ';
    if (i > 0 && i % 10 === 0) {
      output += '\n';
    }
  }
  console.log(output);
}

function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function bubbleSort() {
  var swapped = true;
  var length = this.dataStore.length;
  while (swapped) {
    swapped = false;
    for (var i = 0; i < length - 1; i++) {
      if (this.dataStore[i] > this.dataStore[i + 1]) {
        this.swap(this.dataStore, i, i + 1);
        swapped = true;
      }
    }
  }
}

function selectionSort() {
  var length = this.dataStore.length;
  for (var i = 0; i < length - 1; i++) {
    for (var j = i + 1; j < length; j++) {
      if (this.dataStore[j] < this.dataStore[i]) {
        this.swap(this.dataStore, i, j);
      }
    }
  }
}

function insertionSort() {
  var length = this.dataStore.length;
  for (var i = 1; i < length; i++) {
    for (var j = i; j > 0 && this.dataStore[j - 1] > this.dataStore[j]; j--) { // work backwards from the outer loop index
      this.swap(this.dataStore, j - 1, j);
    }
  }
}

function shellSort() {
  // dynamically compute gap length
  var N = this.dataStore.length;
  var h = 1;
  while (h < N / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (var i = h; i < N; i++) {
      for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j - h]; j -= h) { // we can take out the '&&' and use the 2nd clause as an if-statement but this his the loop earlier as there
        this.swap(this.dataStore, j, j - h);
      }
      /*  Below doesn't work. At first the above for loop looked weird but the reason they do this is because after comparing each element separated by
          a gap, the resulting elements should be in order. The code below only orders adjacent elements and wouldn't work with something like:
          85,68,29. The correct answer is 29,68,85 but the code below results in 68,29,85

          Also, we can take out the 'this.dataStore[j] < this.dataStore[j - h]' in the inner for loop and use it in an if-statement to enclose the swap fxn but 
          this exits the loop earlier than we need since the earlier elements should be sorted and we'd hi up with a lot of unnecessary comparisons by the time we are deep 
          into the array.

      for (var j = i; j + h < N; j += h) {
        console.log('comparing index ' + j + ' and index ' + (j + h));
        if (this.dataStore[j] > this.dataStore[j + h]) {
          swap(this.dataStore, j, j + h);
        }
      }
      */
    }
    h = (h - 1) / 3;  // after each outer iteration, decrease the gap size until the gap is 1
  }
}

/* ShellSort example run of 9 elements
1 1 2 8 0 2 6 2 2

gap: 4
0 1 2 8 1 2 6 2 2
0 1 2 8 1 2 6 2 2
0 1 2 8 1 2 6 2 2
0 1 2 2 1 2 6 8 2
0 1 2 2 1 2 6 8 2

gap: 1
0 1 2 2 1 2 6 8 2
0 1 2 2 1 2 6 8 2
0 1 2 2 1 2 6 8 2
0 1 1 2 2 2 6 8 2
0 1 1 2 2 2 6 8 2
0 1 1 2 2 2 6 8 2
0 1 1 2 2 2 6 8 2
0 1 1 2 2 2 2 6 8
0 1 1 2 2 2 2 6 8
*/

function mergeSort() {

}

function quickSort() {
  this._quickSort(this.dataStore, 0, this.dataStore.length - 1);
}

function _quickSort(arr, lo, hi) {
  if (hi <= lo) {
    return;
  }

  var j = this.partition(arr, lo, hi); // after this step, value at 'j' is in the correct position.
  this._quickSort(arr, lo, j - 1);     // Sort subarray left of the partition
  this._quickSort(arr, j + 1, hi);     // Sort subarray right of the partition
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
      this.swap(arr, i, j);
    }
  }
  this.swap(arr, lo, j);  // swap pivot into the correct position, swapping with the low value since values less than pivot should be on the left

  return j;
}

function qSort() {
  this.dataStore = this._qSort(this.dataStore);
}

function _qSort(arr) {
  if (arr.length === 0) {
    return [];
  }

  var lesser = [];
  var greater = [];
  var pivot = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      lesser.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }
  return this._qSort(lesser).concat(pivot, this._qSort(greater));
}

function binarySearch(arr, data) {
  var upperBound = arr.length - 1; 
  var lowerBound = 0;
  
  while (lowerBound <= upperBound) {
    var mid = Math.floor((upperBound + lowerBound) / 2); 
    if (arr[mid] < data) {
     lowerBound = mid + 1;
    } else if (arr[mid] > data) { 
      upperBound = mid - 1;
    } else {
      return mid; 
    }
  }
  
  return -1; 
}

module.exports = Sorting;