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
function lcss(arr) {
  var currentSum = 0,
      maxSum = 0,
      length = arr.length;

  for (var i = 0; i < length; i++) {
    currentSum += arr[i];
    if (currentSum < 0) {
      currentSum = 0;
    }    

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }
  return maxSum;
}

function lcss2(arr) {
  var currentMax = arr[0],
      max = arr[0], i;

  for (i = 0; i < arr.length; i++) {
    currentMax = Math.max(arr[i], currentMax + arr[i]);
    max = Math.max(currentMax, max)
  }

  return max;
}
var arr = [-2, -3, 4, -1, -2, 1, 5, -3];
//console.log(lcss2(arr));

arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
function lis(arr) {
  var length = arr.length,
      table = [],
      longestStreak = 1,
      currentStreak = 1,
      i;

  table[0] = 1;
  for (i = 1; i < length; i++) {
    if (arr[i] > arr[i + 1] || currentStreak === 0) {
      currentStreak += 1;
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      currentStreak = 0;
    }
  }
  console.log(longestStreak);
}
lis(arr);