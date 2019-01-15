// 
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    vertices = input[0].split(' ')[0],
    edges = input[0].split(' ')[1],
    i;

input.shift();

var graph = [];
var length = input.length;

// initialize graph so that each node has an associated dictionary
for (i = 1; i <= vertices; i++) {
	graph[i] = {};
}

// note: the input implies an directed graph but is really an undirected graph
for (i = 0; i < length; i++) {
  input[i] = input[i].trim().split(' ').map(function(y) { return parseInt(y, 10); });
  var from = input[i][0],
  	  to = input[i][1],
  	  weight = input[i][2];

  // data format: 1 2 6807 (tail, head, weight)
  graph[from][to] = weight;
  graph[to][from] = weight;
}

var hash = [];
for (i = 0; i <= items; ++i) {
  hash[i] = [];
  hash[i][0] = 0; // set first column to be all zeroes
}

// set first row to be all zeroes
for (i = 0; i <= maxSize; ++i) {
  hash[0][i] = 0;
}

function BellmanFord(hash, values, weights, itemIndex, size) {
  if (itemIndex === weights.length) {
    return 0;
  }

  if (hash[itemIndex][size]) {
    return hash[itemIndex][size];
  }

  if (size - weights[itemIndex] < 0) {
    return hash[itemIndex][size] = BellmanFord(hash, values, weights, itemIndex + 1, size);
  } else {
    return hash[itemIndex][size] = Math.min(BellmanFord(hash, values, weights, itemIndex + 1, size),
                        BellmanFord(hash, values, weights, itemIndex + 1, size - weights[itemIndex]) + values[itemIndex]);
  }
}