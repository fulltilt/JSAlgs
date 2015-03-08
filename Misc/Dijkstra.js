// 2599,2610,2947,2052,2367,2399,2029,2442,2505,3068
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    vertices = input.length, i;

// note: the input reflects that this is an undirected graph
var graph = [];
for (i = 0; i < vertices; i++) {
  input[i] = input[i].trim().split('\t');
  graph[i + 1] = {};

  // data format: 15	42,1789	22,3571	....
  var temp = input[i].slice(1).map(function(x) { return x.split(',').map(function(y) { return parseInt(y, 10); }); });

  // convert array of arrays into an associative array
  for (var j = 0; j < temp.length; j++) {
  	graph[i + 1][temp[j][0]] = temp[j][1];
  }
}

var done = {},					// vertices whose shortest paths has been found
	currentVertex = 1,  		// source vertex. 1 indicates that vertex 1 is the source vertex
	i;

done[currentVertex] = true;	// source vertex is found by default

// reachable is array that keeps track of current shortest path length to each vertex
var reachable = [];
for (var i = 1; i <= vertices; ++i) {
	reachable[i] = Infinity;
}
reachable[currentVertex] = 0;	// path length to source vertex is 0

while (Object.keys(done).length < vertices) {
	updateReachable(currentVertex);
	closestVertex = getClosestVertex(reachable);
	done[closestVertex] = true;
	currentVertex = closestVertex;
}
console.log(reachable[7],reachable[37],reachable[59],reachable[82],reachable[99],reachable[115],reachable[133],reachable[165],reachable[188],reachable[197])

// each time a new vertex is found, recalculate reachable to see if there are new reachable vertices and if there are shorter paths to previously visited vertices
function updateReachable(vertex) {
	for (var neighbor in graph[vertex]) {
		if ((reachable[vertex] + graph[vertex][neighbor]) < reachable[neighbor]) {
			reachable[neighbor] = reachable[vertex] + graph[vertex][neighbor];
		}
	}
}

// returns the vertex that is closest using the reachable array
function getClosestVertex(arr) {
 	var shortestEdge = Infinity,
 			closestVertex = -1;
 	for (var i = 1; i <= arr.length; ++i) {
 		if (arr[i] < shortestEdge && !(i in done)) {
 			shortestEdge = arr[i];
 			closestVertex = i;
 		}
 	}
 	return closestVertex;
}