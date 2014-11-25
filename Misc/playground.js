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

function MergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var start = 0,
      mid = Math.floor((arr.length) / 2),
      end = arr.length - 1;

  var left = arr.slice(start, mid),
      right = arr.slice(mid, end + 1),
      merged = merge(MergeSort(left), MergeSort(right));

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
    }
  }

  newArr = newArr.concat(arr1.slice(arr1Ptr)).concat(arr2.slice(arr2Ptr));
  return newArr;
}

/*
console.log(merge([1,5,6,7,8],[2,3,19]));
var arr = [10,5,2,161,8,9,4,15,33];
console.log(MergeSort(arr));
*/

// get the greatest common multiple between 2 numbers
function gcm(a, b) {
  return (b === 0) ? a : gcm(b, a % b);
}

console.log(gcm(3,1));
console.log(gcm(160,100));
console.log(gcm(33,3));
console.log(gcm(16,10));