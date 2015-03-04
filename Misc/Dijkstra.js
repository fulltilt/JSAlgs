/* https://class.coursera.org/algo-006/quiz/attempt?quiz_id=96
Test cases: https://class.coursera.org/algo-006/forum/thread?thread_id=209
The algorithm below never got below 20 after running it hundreds of times. The correct answer is 17. Maybe the fact that I couldn't change the seed in JavaScript had something to do with it?
*/
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    //input = text.split('\r\n'),
    input = text.split('\n'),
    vertices = input.length, i;

// note: the input reflects that this is an undirected graph
var graph = [];
for (i = 0; i < vertices; i++) {
  //input[i] = input[i].trim().split('\t');
  input[i] = input[i].trim().split(' ');
  graph[i + 1] = {};

  // data format: 15	42,1789	22,3571	....
  var temp = input[i].slice(1).map(function(x) { return x.split(',').map(function(y) { return parseInt(y, 10); }); });

  // convert array of arrays into an associative array
  for (var j = 0; j < temp.length; j++) {
  	graph[i + 1][temp[j][0]] = temp[j][1];
  }
}

//[ '1 2,5 3,1', '2 4,10 1,5', '3 4,1 1,1', '4 2,10 3,1' ]
// [ ,
//   { '2': 5, '3': 1 },
//   { '1': 5, '4': 10 },
//   { '1': 1, '4': 1 },
//   { '2': 10, '3': 1 } ]

var done = {},
		currentVertex = 1, i;

done[1] = 0;
//visited[source] = true;

// initialize shortest distance for vertices 2 through 200 to 1000000
// for (i = 2; i <= vertices; i++) {
// 	done[i] = Infinity;
// }

var reachable = {};
while (Object.keys(done).length < vertices) {
	updateReachable(currentVertex);
	//console.log(reachable)
	var closestVertex = getClosestVertex(reachable);
	// bug: closest vertex isn't always reachable from currentVertex; it can be reachable from previously visited vertex
	done[closestVertex] = done[currentVertex] + graph[currentVertex][closestVertex]; 
	//console.log(currentVertex)
	currentVertex = closestVertex;
console.log(reachable, closestVertex, done)
}
console.log(done)

/* code used to see what nodes are reachable
	while (Object.keys(reachable).length > 0) {
	var neighbors = Object.keys(reachable); 
	for (var i = 0; i < neighbors.length; i++) {
		var vertex = neighbors[i];
		if (!visited[vertex]) {
			console.log(vertex)
			updateReachable(vertex);
			visited[vertex] = true;
			delete reachable[vertex];
		}
	}
} */

function updateReachable(vertex) {
	for (var k in graph[vertex]) {
		if (!(k in done)) {
			if (k in reachable) {	// handle case when vertex is reachable from a prior visited vertex but wasn't marked done
				reachable[k] = (reachable[k] < graph[vertex][k]) ? reachable[k] : graph[vertex][k];
			} else {
				reachable[k] = graph[vertex][k];
			}
		}
	}
}

function getClosestVertex(arr) {
 	var closestLength = Infinity,
 			closestVertex,
 			len = Object.keys(arr).length;

 	for (var v in arr) {
 		if (graph[v] && arr[v] < closestLength) {
 			closestLength = arr[v];
 			closestVertex = v;
 		}
 	}

 	delete reachable[closestVertex];
 	return closestVertex;
}