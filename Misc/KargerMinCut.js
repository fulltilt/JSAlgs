/* https://class.coursera.org/algo-006/quiz/attempt?quiz_id=52
Test cases: https://class.coursera.org/algo-006/forum/thread?thread_id=209
The algorithm below never got below 20 after running it hundreds of times. The correct answer is 17. Maybe the fact that I couldn't change the seed in JavaScript had something to do with it?
*/
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\r\n'),
    len = input.length, i;

// split input lines by tabs and then parse line where first number is the vertex # and the rest are its adjacent vertices
// note: the input reflects that this is an undirected graph
var graph = {};
for (i = 0; i < len; i++) {
  input[i] = input[i].trim().split('\t').map(function(x) { return parseInt(x, 10); });
  graph[i + 1] = input[i].slice(1);
}

//Math.floor((Math.random() * len) + 1) // generate a random number between 1 and the length of the graph inclusive
function getRandomEdge(graph) {
  var arr = Object.keys(graph),
      len = arr.length, x, y;

  // keep generating random indices until you get two indices that are in each others adjacency list      
  do {
    x = Math.floor((Math.random() * len));
    y = Math.floor((Math.random() * len));
  } while (graph[parseInt(arr[x])].indexOf(parseInt(arr[y])) === -1 || (x === y));  // need the x === y check because as graph contracts adjacency lists will have multiple duplicates

  return [parseInt(arr[x]), parseInt(arr[y])];
}

while (Object.keys(graph).length > 2) {
  var remainingVertices = Object.keys(graph),
      randomEdgeToDelete = getRandomEdge(graph);

  // consolidate vertices to the 2nd vertex in edge
  var dVertex = randomEdgeToDelete[0],        // disappearing vertex
      cVertex = randomEdgeToDelete[1],        // consolidated vertex
      dvList = graph[dVertex];                // list of adjacent nodes of disappearing Vertex

//console.log(graph, 'dVertex:', dVertex, 'cVertex:', cVertex, 'dvList:', dvList);
  // remove references between disappearing vertex and consolidated vertex
  graph[cVertex].splice(graph[cVertex].indexOf(dVertex), 1);  // remove reference to disappearing vertex from consolidated vertex
  graph[dVertex].splice(graph[dVertex].indexOf(cVertex), 1);  // remove reference to consolidated vertex from disappearing vertex

  // iterate through the soon to be deleted vertex and change references in other vertices to the consolidated vertex
  for (var i = 0; i < dvList.length; i++) {
    try {
      var index = graph[dvList[i]].indexOf(dVertex);
      graph[dvList[i]][index] = cVertex;
    } catch (err) {
      console.log(err)
      console.log(graph, 'dVertex:', dVertex, 'cVertex:', cVertex, 'dvList:', dvList, 'index:', index, 'i:', i);
      throw new Error('');
    }
  }

  graph[cVertex] = graph[cVertex].concat(graph[dVertex]);   // append disappearing vertex adjacency list to consolidated vertex adjacencylist
  delete graph[dVertex];                                    // delete disappearing vertex

  // remove self-loops from consolidated vertex's adjacency list
  var cvList = graph[cVertex].slice(0);
  i = 0;
  while (i < cvList.length) {
    if (cvList[i] === cVertex) {
      cvList.splice(i, 1);
      continue;
    }
    i += 1;
  }
  graph[cVertex] = cvList;
}

var keys = Object.keys(graph);
console.log(graph[keys[0]].length)
