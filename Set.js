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

  var result = [];
  binarySearchTreeToArray(bst.root, result);

  return result;
}

function binarySearchTreeToArray(node, arr) {
  if (node === null) {
    return null;
  }

  binarySearchTreeToArray(node.left, arr);
  arr.push(node.data);
  binarySearchTreeToArray(node.right, arr);
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
// assumptions: no negative numbers and no duplicates
// note: can use a variation of printPermutations where result is a Set data structure. As it stands it adds every permutation of length k into result
function printSubsetsOfKElements(arr, result, usedChars, k) {
  var length = arr.length;

  for (var i = 0; i < length; i++) {
    var ch = arr.splice(i, 1)[0];
    usedChars.push(ch);

    if (usedChars.length === k) {
      result.push(usedChars.slice());
    }

    this.printSubsetsOfKElements(arr, result, usedChars, k);

    // put array back to its original state and remove the char from usedChars. This is so every index becomes the starting index before the first recursion. Basically, backtrack
    arr.splice(i, 0, ch); 
    usedChars.pop();
  }
}

// http://www.geeksforgeeks.org/print-all-combinations-of-given-length/
function kLengthStringsFromNChars(arr, prefix, k) {
  // base case: k is 0, print prefix
  if (k === 0) {
    console.log(prefix);
    return;
  }

  // one by one add all characters from set and recursively call for k equals to k - 1
  for (var i = 0; i < arr.length; i++) {
    // nxt character of input added
    var newPrefix = prefix + arr[i];

    // k is decreased because we have added a new character
    this.kLengthStringsFromNChars(arr, newPrefix, k - 1);
  }
}

// *** http://www.geeksforgeeks.org/print-increasing-sequences-length-k-first-n-natural-numbers/
function printFirstKIncSequenceFromNNumbers(n, k, index, arr) {
  if (index === k) {
    console.log(arr);
    //arr.pop();
    return;
  }

  /* Decide the starting number to put at current position. If length is 0, then there are no previous elements.
     So start putting new numbers with 1. If length is not 0, then start from value of previous element plus 1 */
  var i = (index === 0) ? 1 : arr[index - 1] + 1;

  index += 1; // increase index

  // put all numbers (which are greater than the previous element) at new position
  while (i <= n) {
    arr[index - 1] = i;
    this.printFirstKIncSequenceFromNNumbers(n, k, index, arr);
    i += 1;
  }

  // this is important as 'index' is shared among all fxn calls in recursion tree. Its value must be brought back before next iteration of loop
  index -= 1;
}

module.exports = Set;