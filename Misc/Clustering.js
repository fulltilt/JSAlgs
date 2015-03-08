// 
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    nodes = parseInt(input[0], 10), i;

input.shift();
var len = input.length;

var graph = [];
for (i = 1; i <= nodes; i++) {
	graph[i] = [];
}

for (i = 0; i < len; i++) {
	input[i] = input[i].trim().split(' ').map(function(x) { return parseInt(x, 10); });
	var from = input[i][0],
		to = input[i][1],
		weight = input[i][2];

	graph[from][to] = weight;
	graph[to][from] = weight;
}

console.log(graph)