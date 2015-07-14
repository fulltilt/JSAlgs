// fs = require('fs')
// fs.readFile('input/hackrank.txt', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   processData(data);
// });

function processData(input) {
    //Enter your code here
    input = input.split('\n');
    var cases = input.shift();
    for (var i = 0; i < cases; ++i) {
        // create big and small matrices
        var bigDimensions = input.shift().split(' ').map(function(x) { return parseInt(x, 10); }),
            bigRows = bigDimensions[0],
            bigColumns = bigDimensions[1]
            bigMatrix = [];

        for (var row = 0; row < bigRows; ++row) {
          bigMatrix[row] = input.shift();
        }    

        var smallDimensions = input.shift().split(' ').map(function(x) { return parseInt(x, 10); }),
            smallRows = smallDimensions[0],
            smallColumns = smallDimensions[1]
            smallMatrix = [];
        for (var row = 0; row < smallRows; ++row) {
          smallMatrix[row] = input.shift();
        }    

        // check if smaller is in bigger
        var xLen = bigColumns - smallColumns,
            yLen = bigRows - smallRows;
        for (var y = 0; y <= yLen; ++y) {
            var x = 0;
            while (x < xLen) {
              if (bigMatrix[y].indexOf(smallMatrix[0], x) !== -1) {
                var found = true;

              }
            }
        }
        //console.log(found);
    }  

} 

// running a script n times: cmd="node KargerMinCut.js kargerMinCut.txt"; for i in $(seq 100); do $cmd; done
function Trie() {
  this.wordTree = {};
  this.words = 0;
}

Trie.prototype = {
  addWord: function(word) {
    var root = this.wordTree,
        length = word.length,
        word = word.trim().toUpperCase();

    for (i = 0; i < length; i++) {
      var c = word[i];
      if (!root[c]) {
        root[c] = {};
      }
      root = root[c];

      if (i === length - 1) {
        this.words += 1;
        root.$ = 1;
      }
    }
  },

  isWord: function(word) {
    var root = this.wordTree,
        length = word.length,
        word = word.trim().toUpperCase(),
        i;

    for (i = 0; i < length; i++) {
      var c = word[i];
      if (!root[c]) {
        return false;
      }
      root = root[c];

      if (i === length - 1) {
        return (root.$ === 1);
      }
    }
  }
}

/*
var trie = new Trie();
trie.addWord('banana');
trie.addWord('anana');
trie.addWord('nana');
trie.addWord('ana');
trie.addWord('na');
trie.addWord('a');
console.log(trie.wordTree);
console.log(trie.isWord('nana'));
console.log(trie.isWord('nan'));
*/

function QuickSort(arr, lo, hi) {
  if (hi <= lo) {
    return;
  }

  var k = partition(arr, lo, hi);
  QuickSort(arr, lo, k - 1);
  QuickSort(arr, k + 1, hi);
}

function partition(arr, lo, hi) {
  var i = lo + 1,
      j = hi,
      pivot = arr[lo];

  while (true) {
    while (arr[i] < pivot) {
      i += 1;
      if (i === hi) {
        break;
      }
    }

    while (arr[j] > pivot) {
      j -= 1;
      if (j === lo) {
        break;
      }
    }

    if (i >= j) {
      break;
    }

    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  var temp = arr[j];
  arr[j] = arr[lo];
  arr[lo] = temp;

  return j;
}

/*
var arr = [10,5,2,161,8,9,4,15,33];
partition(arr, 0, arr.length - 1);
console.log(arr);
*/

function MergeSort(arr, count) {
  if (arr.length <= 1) {
    return arr;
  }

  var start = 0,
      mid = Math.floor((arr.length) / 2),
      end = arr.length - 1;

  var left = arr.slice(start, mid, count),
      right = arr.slice(mid, end + 1, count),
      merged = merge(MergeSort(left, count), MergeSort(right, count));

  return merged;
}

function merge(arr1, arr2) {
  var newArr = [],
      arr1Length = arr1.length,
      arr2Length = arr2.length,
      arr1Ptr = 0,
      arr2Ptr = 0;    

  while (arr1Ptr !== arr1Length && arr2Ptr !== arr2Length) {
    if (arr1[arr1Ptr] < arr2[arr2Ptr]) {
      newArr.push(arr1[arr1Ptr]);
      arr1Ptr += 1;
    } else {
      newArr.push(arr2[arr2Ptr]);
      arr2Ptr += 1;
count.count += arr1Length - arr1Ptr;      
    }
  }

  newArr = newArr.concat(arr1.slice(arr1Ptr)).concat(arr2.slice(arr2Ptr));
  return newArr;
}

/*console.log(merge([1,5,6,7,8],[2,3,19]));
//var arr = [10,5,2,161,8,9,4,15,33];
//var arr = [2,4,1,3,5];
var arr = [1, 20, 6, 4, 5];
var count = {count: 0};
MergeSort(arr, count);
console.log(count.count);
*/


function inversion(arr) {
  var length = arr.length, i, j, count = 0;
  for (i = 0; i < length; i++) {
    for (j = i + 1; j < length; j++) {
      if (i < j && arr[i] > arr[j]) {
        ++count;
      }
    }
  }
  console.log(count);
}

/*
inversion([2,4,1,3,5]);
inversion([1, 20, 6, 4, 5]);
inversion([10,5,2,161,8,9,4,15,33]);
*/
/*
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    cipher = 'vwduwljudeehghyhubwklqjlfrxogilqgsohdvhuhwxuqdqbeoxhsulqwviruydxowdqgdodupghvljqedvhgrqzklfkedqnbrxghflghrqldpvhwwlqjxsvdihkrxvhfr',
    shift = 7,
    output = '';

for (var i = 0; i < cipher.length; i++) {
  var letterIndex = (alphabet.indexOf(cipher[i]) - shift) % 26;

  if (letterIndex < 0) {
    letterIndex += 26;
  }
  output += alphabet[letterIndex];
}

console.log(output);
*/
//zename blackout worried that our cipher is too weak on next message switch to vigenere cipher keyword is the hidden symbol of death in my favorite holbeinend


/* backtracking
function dynamicCoinChange(sum, values, currentSum, result, count) {
  if (currentSum === sum) {
    if (result.length < count.count) {
      count.count = result.length;
    }
    console.log(result);
    return;
  } else if (currentSum > sum) {
    return;
  }

  var length = values.length, 
      results = [], i;
  for (i = 0; i < length; i++) {
    result.push(values[i]);
    dynamicCoinChange(sum, values, currentSum + values[i], result, count);
    result.pop();
  }
}
var result = [],
    count = { count: Infinity };
console.log(dynamicCoinChange(15, [1,3,9,10], 0, result, count));
console.log(count.count); */

function generateAllCombos(str) {
  var result = [],
      length = str.length, i;
  for (i = 1; i <= length; i++) {
    generateAllCombosUtil(str, 0, i, result);
  }
}

function generateAllCombosUtil(str, index, number, result) {
  if (number === 0) {
    console.log(result);
    return;
  }

  if (index === str.length) {
    return;
  }

  // select the character str[index]
  result.push(str[index]);
  generateAllCombosUtil(str, index + 1, number - 1, result);
  result.pop();

  // ignore the character str[index]
  generateAllCombosUtil(str, index + 1, number, result);
}

function hasSubsetWithSumZero(arr) {
  var perms = [],
      length = arr.length, i;

  getBitSetPermutations(arr.length, [], perms); // get all permutations of arr with repetitions
  
  var length2 = perms.length;
  for (i = 1; i < length2; i++) {
    sum = 0;
    for (var j = 0; j < length; j++) {
      if (perms[i][j] === 1) {
        sum += arr[j];
      }
    }

    if (sum === 0) {
      return perms[i];
    }
  }

  return null;
}

// Apress #91: How do you reverse the order of words in a sentence, but keep words themselves unchanged? Words in a sentence are separated by blanks. 
//             For instance, the reversed output should be “student. a am I” when the input is “I am a student.”.
function reverseWords(arr) {
  var lo = 0,
      length = arr.length,
      hi = length - 1, i;

  reverse(arr, 0, length - 1);  

  lo = 0;
  hi = lo + 1;

  while (lo < length && hi < length) {
    while (arr[hi] !== ' ' && hi < length) {
      hi += 1;
    }

    reverse(arr, lo, hi - 1);
    lo = hi + 1;
    while (arr[lo] === ' ' && lo < length) {
      lo += 1;
    }
    hi = lo + 1;
  }
  
  return arr.join('');
}

function reverse(arr, lo, hi) {
  while (hi > lo) {
    var temp = arr[lo];
    arr[lo] = arr[hi];
    arr[hi] = temp;
    lo += 1;
    hi -= 1;
  }
}

function Suffix(i, str) {
  this.index = i;
  this.str = str;
}

function naiveSuffixArray(str) {
  var suffixes = [];
  for (var i = 0; i < str.length; ++i) {
    suffixes.push(new Suffix(i, str.substring(i)));
  }

  console.log(suffixes);
  console.log(suffixes.sort(compare));
}

function compare(suff1, suff2) {
  if (suff1.str === suff2.str) {
    return 0;
  } else if (suff1.str < suff2.str) {
    return -1;
  } else {
    return 1;
  }
}

//naiveSuffixArray('GATAGACA$');

function perm(arr, currentIndex, str) {
  
  if (currentIndex === arr.length) {
    console.log(str);
    return;
  }

  for (var i = 0; i < arr.length; i++) {
    str = str + '' + arr[i];
    perm(arr, currentIndex + 1, str);
    str = str.substring(0, str.length - 1);
  }
}



//perm(['c','b','a'], 0, '');

function getPerms(arr, index, res) {
  if (arr.length === index) {
    console.log(res);
    return;
  }

  for (var i = index; i < arr.length; i++) { 
    var temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;

    res.push(arr[index]);
    getPerms(arr, index + 1, res);

    temp = arr[index];
    arr[index] = arr[i];
    arr[i] = temp;
    res.pop();
  }
}
//getPerms(['c','b','a'], 0, []);

/* LVL1
index = 0
i = 0
temp = arr[i] = 'c'
arr[i] = arr[index] = 'c'
arr[index] = temp = 'c'
arr = 'cba'
res = 'c'
recurse
arr = 'cba'
res = ''

i = 1
temp = arr[i] = 'b'
arr[i] = arr[index] = 'c'
arr[index] = temp = 'b'
arr = 'bca'
res = 'b'
recurse
arr = 'cba'
res = ''

// LVL2
index = 1
i = 1
temp = 'b'
arr[i] = arr[1] = 'b'
arr[index] = temp = 'b'
arr = 'cba'
res = 'cb'
recurse

// LVL 3
index = 2
i = 2
temp = 'a'
arr[i] = arr[2] = 'a'
arr[index] = temp = 'a'
arr = 'cba'
res = 'cba'
recurse
temp = arr[index] = 'a'
arr[index] = arr[2] = 'a'
arr[i] = temp;
res = 'cb'

// LVL 4
print 'cba'
*/

/*
1 2 3
4 5 6


4 1
5 2
6 3

0,0 -> 0,2
0,1 -> 1,2
0,2 -> 2,2
1,0 -> 0,1
1,1 -> 1,1
1,2 -> 2,1
2,0 -> 0,0
2,1 -> 1,0 
2,2 -> 2,0
*/

var table = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
for (var i = 0; i < table.length; i++) {
  table[i] = table[i].split('');
}
//console.log(table)
function p(num) {
  var tLength = table.length;
  for (var i = 0; i < tLength; i++) {

  }
}

//678

//Given an array filled up with 1 to n^2 in randomized order. Fill it in a square matrix of size n.
// algo: don't know how it works but this sorts the randomized array in order
var arr = [3,4,9,8,1,6,7,2,5];
var buff = [[],[],[]];
var n = Math.sqrt(arr.length);

for (var i = 0; i < arr.length; i++) {
  var row = Math.floor((arr[i] - 1) / n);
  var col = (arr[i] - 1) % n;
  buff[row][col] = arr[i];
}
//console.log(buff)

function nextGreater(arr) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    res[i] = -1;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        res[i] = arr[j];
        break;
      }
    }
  }
  console.log(res)
}

//nextGreater([4, 5, 2, 25]);
//nextGreater([13, 7, 6, 12]);

// http://www.geeksforgeeks.org/count-number-ways-reach-given-score-game/
// using backtracking
function waysToScore(goal, score, path) {
  // base cases: score === goal and score > goal
  if (score === goal) {
    console.log(path);
    return;
  }

  if (score > goal) {
    return;
  }

  path.push(3);
  waysToScore(goal, score + 3, path);
  path.pop();

  path.push(5);
  waysToScore(goal, score + 5, path);
  path.pop();

  path.push(10);
  waysToScore(goal, score + 10, path);
  path.pop();
}
//waysToScore(13, 0, []);

// http://ideone.com/QI4pcj
function recursiveKnapsack(capacity, size, value, n, cache) {
  if (capacity === 0 || n === size.length) {
    return 0;
  }

  if (cache[n][capacity]) {
    return cache[n][capacity];
  }
  
  // If weight of the nth item is more than Knapsack capacity W, then this item cannot be included in the optimal solution
  if (size[n] > capacity) {
    return cache[n][capacity] = recursiveKnapsack(capacity, size, value, n + 1, cache);
  } else {
    // Return the maximum of two cases: (1) nth item included (2) not included (note: by adding condition of not included enables us to get permutations such as only last element being added)
    return cache[n][capacity] = Math.max(value[n] + recursiveKnapsack(capacity - size[n], size, value, n + 1, cache),
                    recursiveKnapsack(capacity, size, value, n + 1, cache));
  }
}

var val = [8,4,0,5,3],//[4,5,10,11,13],
    wt = [1,2,3,2,2],//[3,4,7,8,9],
    W = 4,//16,
    cache = [];

for (var i = 0; i < val.length; i++) {
  cache[i] = [];
}
//4
//console.log(recursiveKnapsack(W, wt, val, 0, cache));

// { '1': [ 2, 3, 4, 7 ],
//   '2': [ 1, 3, 4 ],
//   '3': [ 1, 2, 4 ],
//   '4': [ 1, 2, 3, 5 ],
//   '5': [ 4, 6, 7, 8 ],
//   '6': [ 5, 7, 8 ],
//   '7': [ 1, 5, 6, 8 ],
//   '8': [ 5, 6, 7 ] } 
// [2,8]
// { '1': [ 2, 3, 4, 7 ],
//   '2': [ 1, 3, 4 ],
//   '3': [ 1, 2, 4 ],
//   '4': [ 1, 2, 3, 5 ],
//   '5': [ 4, 6, 7, 8 ],
//   '6': [ 5, 7, 8 ],
//   '7': [ 1, 5, 6, 8 ],
//   '8': [ 5, 6, 7 ] } 

// JavaScript lexicographic sort (JavaScript sort uses lexicographic sort by default if no compare function is supplied)
var x = [1,2,3,4,5,6,7,8,9],
    y = ['a','b','c','d','e','f','g'];

console.log(x.sort(function(x, y) {
  return x.toString().localeCompare(y.toString());
}));

console.log(x.sort())
/*
20,2,2 2220
52,5,3 5352
lexicographically order numbers (they have to be strings)
*/

//                               abc

//               abc,a                       bac,b   bca,b

//      bc,ab            cb,ac 

// c,abc    b,abc     b,acb    b,acb
var str = ['a', 'b', 'c'];

function perms(str) {
  permsH(str, '');
}

function permsH(str, res) {
  console.log(str)
  if (str.length === 1) {
    console.log('*', res + str);
    return;
  }

  for (var i = 0; i < str.length; ++i) {
    var temp = str[0];
    str[0] = str[i];
    str[i] = temp;

    permsH(str.slice(1), res + str[0]);

    temp = str[0];
    str[0] = str[i];
    str[i] = temp;
  }
}

//perms(['a', 'b', 'c']);

/* CtCI 1.4 - Palindrome Permutation
// check if permutation of string b is equivalent to string s
function check(b, s) {
  if (b.length !== s.length) {
    return false;
  }

  // create hash table for all letters of b
  var hash = {};
  for (var i = 0; i < s.length; ++i) {
    if (hash[s[i]] === undefined) {
      hash[s[i]] = 1;
    } else {
      hash[s[i]] += 1;
    }
  }

  // using hash table check every letter in s to the hash table and decrement matches. Return false, if hash lookup equals 0 or undefined. 
  // no need to check for leftovers as we check for equivalent lengths at the start of the fxn
  for (i = 0; i < b.length; ++i) {
    if (hash[b[i]] === undefined || hash[b[i]] === 0) {
      return false;
    } else {
      hash[b[i]] -= 1;
    }
  }
  return true;
}

// check if permutations of smaller string b is in bigger string s
function permsInStr(b, s) {
  var len = s.length - b.length;
  for (var i = 0; i < len; ++i) {
    if (check(b, s.substr(i, b.length))) {
      console.log(i, s.substr(i, b.length));
    }
  }
}

permsInStr('abbc', 'cbabadcbbabbcbabaabccbabc');
*/

/* CtCI 1.5 - One Away
function oneAway(str1, str2) {
  var len1 = str1.length,
      len2 = str2.length,
      threshold = 1 - Math.abs(len1 - len2), i;

  if (threshold < 0) {
    return false;
  }

  // initialize hash table for first string
  var hash = {};
  for (i = 0; i < len1; ++i) {
    if (hash[str1[i]] === undefined) {
      hash[str1[i]] = 1;
    } else {
      hash[str1[i]] += 1;
    }
  }

  // compare second string to hash table. If letter isn't found or hash value is zero, decrement threshold
  for (i = 0; i < len2; ++i) {
    if (hash[str2[i]] === undefined || hash[str2[i]] === 0) {
      threshold -= 1;
    } else {
      hash[str2[i]] -= 1;
    }

    if (threshold < 0) {
      return false;
    }
  }

  return true;
}

console.log(oneAway('pale', 'ple'));
console.log(oneAway('pales', 'pale'));
console.log(oneAway('pale', 'bale'));
console.log(oneAway('pale', 'bake'));
*/

/* CtCI 1.5 - String Compression
function stringCompression(str) {
  var len = str.length,
      cStr = '',
      i = 0;

  while (true) {
    var curr = str[i],
        count = 1
        i += 1;

    while (str[i] === curr && i < len) {
      ++count;
      ++i;
    }    
    cStr += curr + '' + count;
    if (i >= len) {
      break;
    }
  }

  return cStr;
}

console.log(stringCompression('aabcccccaaa'));  //a2b1c5a3
*/

// function convertFromBase(num, base) {
//   if (base < 2 || (base > 10 && base !== 16)) {
//     return false;
//   }

//   var value = 0;
//   for (var i = num.length - 1; i >= 0; --i) {
//     var digit = digitToValue(num.charAt(i));
//     if (digit < 0 || digit >= base) {
//       return false;
//     }

//     var exp = num.length - 1 - i;
//     value += digit * Math.pow(base, exp);
//   }
//   return value;
// }