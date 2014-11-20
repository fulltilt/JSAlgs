// http://www.geeksforgeeks.org/suffix-array-set-1-introduction/
function Suffix(index, suff) {
  this.index = index;
  this.suff = suff;
}

// main fxn that takes a string and builds and returns the suffix array for the given string (naive method: O(n^2 log n))
function buildSuffixArray(str) {
  var suffixes = [];    // array to store suffixes and their indices

  // store suffixes and their indices in an array. This is needed to sort the suffixes alphabetically and maintain their old indexes while sorting
  var length = str.length, i;
  for (i = 0; i < length; i++) {
    suffixes[i] = new Suffix(i, str.substring(i));
  }
  console.log(suffixes);
  suffixes = suffixes.sort(compare);   // sort the suffixes
  
  // store indexes of all sorted suffixes in the suffix array
  var suffixArray = [];
  for (i = 0; i < length; i++) {
    suffixArray[i] = suffixes[i].index;
  }

  return suffixArray;
}

// compare 2 Suffixes
function compare(a, b) {
  return (a.suff < b.suff) ? -1 : ((a.suff > b.suff) ? 1 : 0);
}

//console.log(buildSuffixArray('banana'));
console.log(buildSuffixArray('bobocel'));