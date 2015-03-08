// 2599,2610,2947,2052,2367,2399,2029,2442,2505,3068
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    vertices = input[0].split(' ')[0],
    edges = input[0].split(' ')[1],
    i;

input.shift();
var length = input.length;

// note: the input reflects that this is an undirected graph
var graph = [];
for (i = 0; i < length; i++) {
  input[i] = input[i].trim().split(' ').map(function(y) { return parseInt(y, 10); });

  // data format: 1 2 6807 (tail, head, weight)
  graph.push(input[i]);
}

graph.sort(function(a, b) { return a[0] - b[0]; });

// var graph = [];
// for (i = 0; i < vertices; i++) {
//   input[i] = input[i].trim().split('\t');
//   graph[i + 1] = {};

//   // data format: 15	42,1789	22,3571	....
//   var temp = input[i].slice(1).map(function(x) { return x.split(',').map(function(y) { return parseInt(y, 10); }); });

//   // convert array of arrays into an associative array
//   for (var j = 0; j < temp.length; j++) {
//   	graph[i + 1][temp[j][0]] = temp[j][1];
//   }
// }
//console.log(graph)
// var done = {},
// 		currentVertex = 1, i;

// done[currentVertex] = true;

// var reachable = [];
// for (var i = 1; i <= vertices; ++i) {
// 	reachable[i] = Infinity;
// }
// reachable[currentVertex] = 0;

// while (Object.keys(done).length < vertices) {
// 	updateReachable(currentVertex);
// 	closestVertex = getClosestVertex(reachable);
// 	done[closestVertex] = true;
// 	currentVertex = closestVertex;
// }
// console.log(reachable[7],reachable[37],reachable[59],reachable[82],reachable[99],reachable[115],reachable[133],reachable[165],reachable[188],reachable[197])

// function updateReachable(vertex) {
// 	// reachableToStrings = reachable.map(function(x) { return x.toString(); });	// hacky and inefficient. 
// 	// // Using above to make sure there are no duplicates added to reachable as in JavaScript, indexOf() doesn't work for subarrays but works for strings
	
// 	// for (var k in graph[vertex]) {
// 	// 	if (!(k in done)) {
// 	// 		var weight = graph[vertex][k],
// 	// 				from = vertex,
// 	// 				to = k;
// 	// 				edge = weight + ',' + from + ',' + to;

// 	// 		if (reachableToStrings.indexOf(edge) === -1) {
// 	// 			reachable.push([weight, from, parseInt(to, 10)]);
// 	// 		}
// 	// 	}
// 	// }

// 	for (var neighbor in graph[vertex]) {
// 		if ((reachable[vertex] + graph[vertex][neighbor]) < reachable[neighbor]) {
// 			reachable[neighbor] = reachable[vertex] + graph[vertex][neighbor];
// 		}
// 	}
// }

// // note: the order of items in reachable: [weight, from, to]
// // fix: find the edge that minimizes. It isn't necessarily the shortest edge to an adjacent unexplored vertex
// function getClosestVertex(arr) {
//  	// reachable.sort(function(a, b) { return a[0] - b[0]; });

//  	// // make sure destination vertex isn't already in 'done'
//  	// do {
//  	// var shortestEdge = [reachable[0][1], reachable[0][2]],
//  	// 		to = shortestEdge[1];

//  	// reachable.shift();		
//  	// } while (to in done);

//  	// return shortestEdge;
//  	var shortestEdge = Infinity,
//  			closestVertex = -1;
//  	for (var i = 1; i <= arr.length; ++i) {
//  		if (arr[i] < shortestEdge && !(i in done)) {
//  			shortestEdge = arr[i];
//  			closestVertex = i;
//  		}
//  	}
//  	return closestVertex;
// }