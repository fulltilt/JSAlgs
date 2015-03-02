// node --max-stack-size 32000 Kosaraju.js input/SCC.txt
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
console.log('Graph built')

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
console.log('Reversed graph');

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
	//console.log('Ranking', vertex)
	rank += 1;
	finish[vertex] = rank;
}

var visited = {},
		leaders = {},
		finish = {},
		rank = 0,
		vertices = Object.keys(graph).length,
		s;	// used to find the leader of strongly connected components

// 1st DFS-loop
for (i = vertices; i > 0; --i) {
	s = i;	// set the leader
	dfs(reversedGraph, i);
	//iterativeDFS(reversedGraph, i);
}

console.log('Completed 1st DFS loop')

// replace original graph vertices with finish #'s
var newGraph = {};
for (i = 1; i <= vertices; ++i) {
	if (graph[i]) {
		newGraph[finish[i]] = graph[i];

		// update the neighbors as well
		var neighbors = graph[i];
		for (var j = 0; j < neighbors.length; j++) {
			neighbors[j] = finish[neighbors[j]];
		}
	}
}
console.log('Created new graph');

// 2nd DFS-loop
rank = 0;
visited = {};
leaders = {};
for (i = vertices; i > 0; --i) {
	s = i;	// set the leader
	dfs(newGraph, i);
}
 // console.log(newGraph)
 // console.log(leaders);
console.log('Completed 2nd DFS loop')

/*
function iterativeDFS(graph, vertex) {
	if (visited[vertex]) {
		return;
	}

	var open = [vertex];
	while (open.length > 0) {
		var vertex = open[0]
		open.shift();
		if (visited[vertex]) {
			continue;
		}

		console.log('Visiting:', vertex);
		leaders[vertex] = s;
		visited[vertex] = true;

		if (graph[vertex]) {
			var neighbors = graph[vertex];
			for (var i = 0; i < neighbors.length; ++i) {
				var done = true;				
				if (visited[neighbors[i]] === undefined) {
					done = false;
					open.push(neighbors[i]);
				}

				if (done) {
					console.log('Ranking', vertex)
					rank += 1;
					finish[vertex] = rank;
				}
			}
		}
	}
}
*/