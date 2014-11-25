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
console.log(suffixes);  
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

// compares 2 strings up to a certain length
function strncmp(str1, str2, length) {
  var sub1 = str1.substring(0, length),
      sub2 = str2.substring(0, length);
  if (sub1 === sub2) {
    return 0;
  } else if (sub1 > sub2) {
    return 1;
  } else {
    return -1;
  }
}

// suffix array based search fxn to search a given pattern
function search(pattern, src, suffixArray) {
  var srcLength = src.length,
      patternLength = pattern.length;

  // do simple binary search for the pattern in src using the suffix array
  var lo = 0,
      hi = srcLength - 1;
  while (lo <= hi) {
    // see if pattern is prefix of middle suffix in suffix array
    var mid = Math.floor(lo + ((hi - lo) / 2)),
        result = strncmp(pattern, src.substring(suffixArray[mid]), patternLength);

    if (result === 0) {

// O(n) modification to return all occurrences of pattern in source
var count = 1,
    result = [],
    temp = mid;
result.push(src.substring(suffixArray[temp]));
while (strncmp(pattern, src.substring(suffixArray[++temp]), patternLength) === 0) {
  result.push(src.substring(suffixArray[temp]));
  count += 1;
}
temp = mid;
while (temp !== 0 && strncmp(pattern, src.substring(suffixArray[--temp]), patternLength) === 0) {
  result.push(src.substring(suffixArray[temp]));
  count += 1;
}
console.log(count, result);

      return true;
    } else if (result < 0) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return false;
}

// algorithm: use binary search to find the first and last index that has n as its value. Return (last - first + 1)
// note: see also solution that uses two specialized binary search fxns to find the first occurrence and last occurrence
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
/*console.log(strncmp('hello', 'goodbye', 2));
console.log(strncmp('hello', 'qw', 2));
console.log(strncmp('hello', 'heodbye', 2));*/
var sa = buildSuffixArray1('banana hello banana');
console.log(search('ana', 'banana hello banana', sa));
//var sa = buildSuffixArray1('banana');
//console.log(search('nan', 'banana', sa));
//console.log(buildSuffixArray2('banana'));