// 106
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    nodes = parseInt(input[0], 10), i;

input.shift();
var len = input.length;

var parents = [],
	edges = []
	clusters = nodes;
for (i = 1; i <= nodes; i++) {
	parents[i] = i;	// set the parent to be itself
}

for (i = 0; i < len; i++) {
	input[i] = input[i].trim().split(' ').map(function(x) { return parseInt(x, 10); });
	var from = input[i][0],
		to = input[i][1],
		weight = input[i][2];

	edges.push([from, to, weight]);
}

edges.sort(function(a, b) { return a[2] - b[2]; });

var k = 4 - 1; 	// k represents the number of clusters we want (- 1 so we can get the longest remaining edge)
while (clusters > k) {
	do {
		var shortestEdge = edges[0],
			from = shortestEdge[0];
			to = shortestEdge[1];

		edges.shift();
	} while (findParent(parents, from) === findParent(parents, to));

	union(parents, from, to);

	clusters -= 1;
}
console.log(shortestEdge[2])

function findParent(parents, node) {
	if (parents[node] === node) {
		return node;
	}

	return findParent(parents, parents[node]);
}

function union(parents, node1, node2) {
	var leader1 = findParent(parents, node1),
		leader2 = findParent(parents, node2);

	parents[leader2] = leader1;
}

