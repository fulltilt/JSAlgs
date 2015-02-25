/* https://class.coursera.org/algo-006/quiz/attempt?quiz_id=96
Test cases: https://class.coursera.org/algo-006/forum/thread?thread_id=209
The algorithm below never got below 20 after running it hundreds of times. The correct answer is 17. Maybe the fact that I couldn't change the seed in JavaScript had something to do with it?
*/
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\r\n'),
    len = input.length, i;

// note: the input reflects that this is an directed graph
var graph = [];
for (i = 0; i < len; i++) {
  input[i] = input[i].trim().split('\t');
  graph[i + 1] = {};

  // data format: 15	42,1789	22,3571	....
  var temp = input[i].slice(1).map(function(x) { return x.split(',').map(function(y) { return parseInt(y, 10); }); });
  
  // convert array of arrays into an associative array
  for (var j = 0; j < temp.length; j++) {
  	graph[i + 1][temp[j][0]] = temp[j][1];
  }
}

var visited = [],
		dist = [],
		source = 1, i;

dist[1] = 0;
visited[source] = true;

// initialize shortest distance for vertices 2 through 200 to 1000000
for (i = 2; i <= len; i++) {
	dist[i] = 1000000;
}

var reachable = {};

updateReachable(source);

while (Object.keys(reachable).length > 0) {
	getClosestVertex(reachable); 	
}

function updateReachable(vertex) {
	for (var k in graph[vertex]) {
		if (k in reachable) {
			if (graph[vertex][k] < reachable[k]) {
				reachable[k] = graph[vertex][k];
			}
		} else {
			reachable[k] = graph[vertex][k];
		}
	}
}

function getClosestVertex(arr) {
 	var closestLength = Infinity,
 			closestVertex,
 			len = Object.keys(arr).length;

 	for (var v in arr) {
 		if (arr[v] < closestLength) {
 			closestLength = arr[v];
 			closestVertex = v;
 		}
 	}

 	return closestVertex;
}