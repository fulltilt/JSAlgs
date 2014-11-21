// http://www.geeksforgeeks.org/suffix-array-set-1-introduction/
function Suffix(index, suff) {
  this.index = index;
  this.suff = suff;
}

// main fxn that takes a string and builds and returns the suffix array for the given string (naive method: O(n^2 log n))
function buildSuffixArray1(str) {
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

// O(n log^2 n) implementation
function Suffix2() {
  this.index = 0;
  this.rank = [];
}

function compare2(a, b) {
  /*return (a.rank[0] === b.rank[0]) ? (a.rank[1] < b.rank[1] ? 1 : 0) :
          (a.rank[0] < b.rank[0] ? 1 : 0);
  */
  if (a.rank[0] < b.rank[0]) {
    return -1
  } else if (a.rank[0] > b.rank[0]) {
    return 1;
  } else {  // first ranks equal to each other so check second ranks
    if (a.rank[1] < b.rank[1]) {
      return -1
    } else if (a.rank[1] > b.rank[1]) {
      return 1;
    }
  }

  return 0;
}

function buildSuffixArray2(str) {
  var suffixes = [],
      length = str.length, i,
      asciia = 'a'.charCodeAt();

  // initialize suffixes. Needed to sort suffixes alphabetically and maintain their old indexes while sorting
  for (i = 0; i < length; i++) {
    suffixes[i] = new Suffix2();
    suffixes[i].index = i;
    suffixes[i].rank[0] = str[i].charCodeAt() - asciia;
    suffixes[i].rank[1] = ((i + 1) < length) ? (str[i + 1].charCodeAt() - asciia) : -1;
  }
  
  suffixes = suffixes.sort(compare2);
  
  // At this point, all suffixes are sorted according to first 2 characters. Let's sort suffixes according to first 4 characters, then 8, etc.
  var ind = []; // needed to get index in suffixes array from original index. This mapping is needed to get next suffix
  for (var k = 4; k < 2 * length; k = k * 2) {
    // assigning rank and index values to first suffix
    var rank = 0;
    var prevRank = suffixes[0].rank[0];
    suffixes[0].rank[0] = rank;
    ind[suffixes[0].index] = 0;

    // assigning rank to suffixes
    for(i = 1; i < length; i++) {
      
    }
  }
}

console.log(buildSuffixArray2('banana'));
//console.log(buildSuffixArray('bobocel'));