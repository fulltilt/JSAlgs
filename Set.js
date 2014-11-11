var BST = require('./BinarySearchTree.js');

function Set() {
  this.dataStore = [];
  this.add = add;
  this.remove = remove;
  this.size = size;
  this.union = union;
  this.intersect = intersect;
  this.subset = subset;
  this.difference = difference;
  this.show = show;
  this.clear = clear;
  this.unionOfTwoArrays = unionOfTwoArrays;
  this.intersectionOfTwoArrays = intersectionOfTwoArrays;
  this.printSubsetsOfKElements = printSubsetsOfKElements;
  this.kLengthStringsFromNChars = kLengthStringsFromNChars;
  this.printFirstKIncSequenceFromNNumbers = printFirstKIncSequenceFromNNumbers;
}

function add(item) {
  if (this.dataStore.indexOf(item) === -1) {
    this.dataStore.push(item);
    return true;
  } else {
    return false;
  }
}

function remove(item) {
  var index = this.dataStore.indexOf(item);
  if (index !== -1) {
    this.dataStore.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function show() {
  return this.dataStore;
}

function size() {
  return this.dataStore.length;
}

function clear() {
  this.dataStore = [];
}

function union(set) {
  for (var i = 0; i < set.size(); i++) {
    if (this.dataStore.indexOf(set.dataStore[i]) === -1) {
      this.add(set.dataStore[i]);
    }
  }
}

function intersect(set) {
  var intersection = new Set();
  for (var i = 0; i < set.size(); i++) {
    if (this.dataStore.indexOf(set.dataStore[i]) !== -1) {
      intersection.add(set.dataStore[i]);
    }
  }

  return intersection;
}

function subset(set) {
  if (set.length > this.size()) {
    return false;
  }

  for (var i = 0; i < set.size(); i++) {
    if (this.dataStore.indexOf(set.dataStore[i]) === -1) {
      return false;
    }
  }
  return true;
}

function difference(set) {
  var set2 = new Set();
  for (var i = 0; i < this.size(); i++) {
    if (set.dataStore.indexOf(this.dataStore[i]) === -1) {
      set2.add(this.dataStore[i]);
    }
  }
  return set2;
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

// http://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/
function printSubsetsOfKElements(arr, K) {

}

// http://www.geeksforgeeks.org/print-all-combinations-of-given-length/
function kLengthStringsFromNChars(arr, k) {

}

// http://www.geeksforgeeks.org/print-increasing-sequences-length-k-first-n-natural-numbers/
function printFirstKIncSequenceFromNNumbers(k, n) {

}

module.exports = Set;