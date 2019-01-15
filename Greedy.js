var Heap = require('./Heaps.js')            // for Huffman Coding and connectRopes

function Greedy() {
  this.makeChange = makeChange;
  this.greedyKnapsack = greedyKnapsack;
  this.activitySelection = activitySelection;
  this.connectRopes = connectRopes;
  this.huffmanCoding = huffmanCoding;
}

function makeChange(origAmt, coins) {
  if (origAmt % .25 < origAmt) {
    coins[3] = parseInt(origAmt / .25);
    origAmt = origAmt % .25;
  }
  if (origAmt % .1 < origAmt) {
    coins[2] = parseInt(origAmt / .1);
    origAmt = origAmt % .1;
  }
  if (origAmt % .05 < origAmt) {
    coins[1] = parseInt(origAmt / .05);
    origAmt = origAmt % .05;
  }

  coins[0] = parseInt(origAmt / .01);

  return coins;
}

/*
A greedy algorithm can be used to solve the knapsack problem if the items we are placing
in the knapsack are continuous in nature. In other words, the items must be things that
cannot be counted discretely, such as cloth or gold dust. If we are using continous items,
we can simply divide the unit price by the unit volume to determine the value of the
item. An optimal solution in this case is to place as much of the item with the highest
value into the knapsack as possible until the item is depleted or the knapsack is full,
followed by as much of the second-highest-value item as possible, and so on. The reason
we can’t find an optimal greedy solution using discrete items is because we can’t put
“half a television” into a knapsack. Discrete knapsack problems are known as 0-1 prob‐
lems because you must take either all or none of an item.

This type of knapsack problem is called a fractional knapsack problem. Here is the
algorithm for solving fractional knapsack problems:

1. Knapsack has a capacity W and items have values V and weights w.
2. Rank items by v/w ratio.
3. Consider items in terms of decreasing ratio.
4. Take as much of each item as possible.
*/
function greedyKnapsack(values, weights, capacity) {
  var load = 0;
  var i = 0;
  var w = 0;
  
  while (load < capacity && i < values.length) {
    if (weights[i] <= (capacity - load)) {
     w += values[i];
     load += weights[i];
    } else {
      var r = (capacity - load) / weights[i]; 
      w += r * values[i];
      load += weights[i];
    } 
    ++i;
  }

  return w;
}

/*
  1st iteration: 
  2nd: 

  var values = [50, 140, 60, 60];
  var weights = [5, 20, 10, 12];
  var capacity = 30;
*/

// http://www.geeksforgeeks.org/greedy-algorithms-set-1-activity-selection-problem/
// assumes finishTimes is sorted. First activity is always selected first
// note: this is really not-optimal
function activitySelection(startTimes, finishTimes) {
  var result = [],
      activities = finishTimes.length,
      start = startTimes[0],
      finish = finishTimes[0];
  result.push(0);

  for (var i = 1; i < activities; i++) {
    start = startTimes[i];
    if (start >= finish) {
      result.push(i);
      finish = finishTimes[i];
    }
  }

  return result;
}

// http://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/
function connectRopes(arr) {
  var heap = new Heap.MinHeap(function(x) { return x; }),
      length = arr.length,
      cost = 0;
  // fill heap
  for (var i = 0; i < length; i++) {
    heap.push(arr[i]);
  }

  while (heap.size() !== 1) {
    var r1 = heap.pop(),
        r2 = heap.pop();

    cost += r1 + r2;
    heap.push(r1 + r2);
  }

  return cost;
}

// http://www.geeksforgeeks.org/greedy-algorithms-set-3-huffman-coding/
function huffmanCoding(arr, freq) {
  // create heap
  var length = arr.length,
      heap = new Heap.MinHeap(function(x) { return x.frequency; });
  for (var i = 0; i < length; i++) {
    heap.push(new Node(arr[i], freq[i]));
  }

  // create tree by iterating while size of heap doesn't become 1
  while (heap.size() !== 1) {
    // extract the 2 minimum frequency items from min heap
    var left = heap.pop(),
        right = heap.pop();

    // create a new internal node with frequency equal to the sum of left and right. Make left and right children of new node.
    // New node's char value will be a '$' to act as an unused placeholder
    var top = new Node('$', left.frequency + right.frequency);
    top.left = left;
    top.right = right;
    heap.push(top);
  }

  // print codes
  printCodes(heap.contents[0], [], 0);
}

// function that represents Nodes for Huffman Tree
function Node(char, frequency) {
  this.char = char;
  this.frequency = frequency;
  left = null;
  right = null;
}

// helper fxn for huffmanTree. This is basically print all paths binary tree algo
// if we go left, add 0 to the path; if we go right, add 1 to the path
function printCodes(node, path, index) {
  if (node === null) {
    return;
  }

  if (node.char !== '$') {  // we're at a leaf
    console.log(node.char, path.join(''));
    return;
  } else {
    path.push(0);
    printCodes(node.left, path);
    path.pop();

    path.push(1);
    printCodes(node.right, path);
    path.pop();
  }
}

module.exports = Greedy;

/* NOTES
-Greedy graph algorithms: Kruskal's minimum spanning tree, Prim's minimum spanning tree, Dijkstra's shortest path, graph coloring
*/