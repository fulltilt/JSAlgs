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
      swap(this.dataStore, j - 1, j);
    }
  }
}

module.exports = Sorting;