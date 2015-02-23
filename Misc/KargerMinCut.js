/* https://class.coursera.org/algo-006/quiz/attempt?quiz_id=52
3--4-----5--6
|\/|     |\/|
|/\|     |/\|
2--1-----7--8
1 2 3 4 7
2 1 3 4
3 1 2 4
4 1 2 3 5
5 4 6 7 8
6 5 7 8
7 1 5 6 8
8 5 6 7

expected result: 2
cuts are [(1,7), (4,5)]

(randomly permuting the adjacency list, should get same result):
1 4 2 7 3
2 4 1 3
3 1 2 4
4 5 1 2 3
5 8 7 6 4
6 8 5 7
7 6 8 5 1
8 7 6 5

expected result: 2
cuts are [(1,7), (4,5)]
*/
var fs = require('fs');

function QuickSort(arr, lo, hi, comps) {
  if (hi <= lo) {
    return;
  }

  comps.comps += hi - lo; // directions says that count should be incremented by m - 1 where m is the length of the subarray. Since the length of the subarray is hi - lo + 1, m - 1 is basically hi - lo
  var k = partition(arr, lo, hi);
  QuickSort(arr, lo, k - 1, comps);
  QuickSort(arr, k + 1, hi, comps);
}

function partition(arr, lo, hi) {
  // for Question #2
  //swap(arr, lo, hi);

  // for Question #3
  //var middle = (hi + lo) >> 1,  // was making the mistake of using (hi + lo) / 2  which doesn't truncate the decimal
  //    medianIndex = getMedianOfThreeIndex(arr, lo, middle, hi);  
  //swap(arr, lo, medianIndex);    
  
  var pivot = arr[lo],
      i = lo + 1, j;

  for (j = lo; j <= hi; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i += 1;
    }
  }

  swap(arr, lo, i - 1);
  return i - 1;
}

function swap(arr, i, j) {
  var temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\r\n'),
    len = input.length, i;

// split input lines by tabs and then parse line where first number is the vertex # and the rest are its adjacent vertices
// note: the input reflects that this is an undirected graph
var graph = {};
for (i = 0; i < len; i++) {
  input[i] = input[i].trim().split('\t');
  graph[i + 1] = input[i].slice(1);
}

//console.log(graph[200]);
//console.log(graph[35]);
// console.log(Object.keys(graph).length);
// delete graph[3];
// console.log(Object.keys(graph).length);