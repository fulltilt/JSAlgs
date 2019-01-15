function Suffix(index, suff) {
  this.index = index;
  this.suff = suff;
}

// http://www.geeksforgeeks.org/suffix-array-set-1-introduction/
// main fxn that takes a string and builds and returns the suffix array for the given string (naive method: O(n^2 log n))
function buildSuffixArray1(str) {
  var suffixes = [];    // array to store suffixes and their indices

  // store suffixes and their indices in an array. This is needed to sort the suffixes alphabetically and maintain their old indexes while sorting
  var length = str.length, i;
  for (i = 0; i < length; i++) {
    suffixes[i] = new Suffix(i, str.substring(i));
  }
console.log(suffixes);
  suffixes = suffixes.sort(compare);   // sort the suffixes (this is where the bottleneck is in the algorithm)
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

// http://www.geeksforgeeks.org/suffix-array-set-2-a-nlognlogn-algorithm/ (O(n log^2 n))
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

// O(n) modification to return all occurrences of pattern in source by checking all indices before and after the current index
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

/* O(n)
  Uses permuted longest-common-prefix (PLCP). The isea is that it's easier to compute the LCP in the original position order of the suffixes instead
  of the lexicographic order of the suffixes
  -note: not quite understanding this
*/
function longestCommonPrefix(text, suffixArray) {
  var L, 
      phi = [], // stores the suffix index of the previous suffix of the suffix array in suffix array order
      PLCP = [], 
      LCP = [], 
      n = text.length, i;

  // compute phi[] in O(n)
  phi[suffixArray[0]] = -1; // by definition since there's no suffix before the very first suffix, set this value to -1
  for (i = 0; i < n; i++) {
    phi[suffixArray[i]] = suffixArray[i - 1];   // remember which suffix is behind this suffix
  }

// SA =  [8,7,5,3,1,6,4,0,2]
// phi = [4,3,0,5,6,7,1,8,-1]

  for (i = L = 0; i < n; i++) { // compute permuted longest-common-prefix in O(n)
    if (phi[i] === -1) {  // special case
      PLCP[i] = 0;
      continue;
    }

    while (text[i + L] === text[phi[i] + L]) {  // L increased max n times
      L += 1;
    }
    PLCP[i] = L;
    L = Math.max(L - 1, 0); // L decreased max n times (note: don't know why it's 'L - 1')
  }

  for (i = 0; i < n; i++) { // compute LCP in O(n)
    LCP[i] = PLCP[suffixArray[i]];  // put the permuted LCP to the correct position
  }
  console.log(PLCP);
  console.log(LCP);
}

// O(n log n) implementation (from Competitive Programming 3)
// http://www.comp.nus.edu.sg/~stevenha/visualization/suffixarray.html
function Suffix3() {
  this.index = 0;
  this.rank = [];
}



/*console.log(strncmp('hello', 'goodbye', 2));
console.log(strncmp('hello', 'qw', 2));
console.log(strncmp('hello', 'heodbye', 2));*/
//var sa = buildSuffixArray1('banana hello banana');
//console.log(search('ana', 'banana hello banana', sa));
//var sa = buildSuffixArray1('banana');
//console.log(search('nan', 'banana', sa));
//console.log(buildSuffixArray2('banana'));
var text = 'GATAGACA$';
var sa = buildSuffixArray1(text);
longestCommonPrefix(text, sa);
//PLCP: [ 2, 1, 0, 1, 0, 1, 0, 0, 0 ]
//LCP: [ 0, 0, 1, 1, 1, 0, 0, 2, 0 ]
/* Suffix Arrays are simpler to construct than Suffix Trees and for competitive programming contests, are preferably because of this simplicitly although Suffix Trees
   are faster (O(n) for suffix trees vs. O(n log n) for suffix arrays)
   
   (see. Competitive Programming 3 p.254 for diagram). Suffix Trees and Suffix Arrays are closely related. The tree traversal of a Suffix Tree visits the terminating vertices
   (the leaves) in Suffix Array order. An internal vertex of a Suffix Tree corresponds to a range in Suffix Array (a collection of sorted suffixes that share a common prefix).
   A terminating vertex (always at leaf due to the usage of a terminating character) in Suffix Tree corresponds to an individual index in Suffix Array (a single suffix). 

exercises: create phi in longestCommonPrefix
*/   