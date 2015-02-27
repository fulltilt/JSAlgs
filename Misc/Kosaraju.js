var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
input = text.split('\n'),
    //input = text.split('\r\n'),
    len = input.length, i;

// note: the input reflects that this is an directed graph
var graph = {}, i;
for (i = 0; i < len; i++) {
  var edge = input[i].trim().split(' ');
  if (!(edge[0] in graph)) {
  	graph[edge[0]] = [];
  }
  graph[edge[0]].push(parseInt(edge[1], 10));
}
//console.log(graph)

// reverse graph for 1st DFS pass
var reversedGraph = {};
for (var vertex in graph) {
	var neighbors = graph[vertex];
	for (i = 0; i < neighbors.length; ++i) {
		if (!(neighbors[i] in reversedGraph)) {
			reversedGraph[neighbors[i]] = [];
		}
		reversedGraph[neighbors[i]].push(vertex);
	}
}
//console.log(reversedGraph);


var visited = {},
		leaders = {},
		finish = {},
		rank = 0, 
		s;	// used to find the leader of strongly connected components

function dfs(graph, vertex) {
	if (visited[vertex]) {
		return;
	}

	visited[vertex] = true;
	//console.log('Visiting:', vertex);
	leaders[vertex] = s;

	var neighbors = graph[vertex];
	if (neighbors !== undefined) {
		for (var i = 0; i < neighbors.length; i++) {
			dfs(graph, neighbors[i]);
		}
	}
	rank += 1;
	finish[vertex] = rank;
}

// 1st DFS-loop
for (i = 13; i > 0; --i) {
	s = i;	// set the leader
	dfs(reversedGraph, i);
}

//console.log(graph)
// console.log(leaders);
// console.log(finish);

// replace original graph vertices with finish #'s
var newGraph = {};
for (i = 1; i <= 13; ++i) {
	if (graph[i]) {
		newGraph[finish[i]] = graph[i];
	}
}

// console.log(graph)
// console.log(finish)
 console.log(newGraph)
// 1st DFS-loop
rank = 0;
visited = {};
leaders = {};
for (i = 13; i > 0; --i) {
	s = i;	// set the leader
	dfs(newGraph, i);
}

// console.log(newGraph)
// console.log(leaders);
// console.log(finish);

/*
1,3,4,5,6
10,11,12,13
7,9
2
8
*/