// -3612829
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

var done = {},
	currentVertex = 1;

done[currentVertex] = true;

var reachable = [];

sum = 0;
while (Object.keys(done).length < vertices) {console.log(currentVertex)
	updateReachable(currentVertex);
	var closestVertex = getClosestVertex(reachable, sum);
	done[closestVertex] = true;
	currentVertex = closestVertex;
}

console.log(closestVertex, reachable, done)
console.log(sum);
function updateReachable(vertex) {
	reachableToStrings = reachable.map(function(x) { return x.toString(); });	// hacky and inefficient. 
	// Using above to make sure there are no duplicates added to reachable as in JavaScript, indexOf() doesn't work for subarrays but works for strings
	
	for (var k in graph[vertex]) {
		if (!(k in done)) {
			var weight = graph[vertex][k],
				from = vertex,
				to = k;
				edge = weight + ',' + from + ',' + to;

			if (reachableToStrings.indexOf(edge) === -1) {
				reachable.push([weight, from, parseInt(to, 10)]);
			}
		}
	}
}

// note: the order of items in reachable: [weight, from, to]
function getClosestVertex(reachable) {
 	reachable.sort(function(a, b) { return a[0] - b[0]; });

 	// make sure destination vertex isn't already in 'done'
 	do {
	 	var shortestEdge = [reachable[0][0], reachable[0][1], reachable[0][2]],
	 		to = shortestEdge[2];

	 	reachable.shift();		
 	} while (to in done);

 	sum += shortestEdge[0];
 	return shortestEdge[2];
}