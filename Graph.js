function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
  }

  this.addEdge = addEdge;
  this.showGraph = showGraph;

  this.dfs = dfs;
  this.visited = [];
  for (i = 0; i < this.vertices; ++i) {
    this.visited[i] = false;
  }

  this.bfs = bfs;
  this.edgeTo = []; // use to determine shortest path
  this.pathTo = pathTo;

  this.topologicalSort = topologicalSort;
}

function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

function showGraph() {
  for (var i = 0; i < this.vertices; i++) {
    var vertex = i + ': ';
    for (var j = 0; j < this.vertices; j++) {
      if (this.adj[i][j] !== undefined) {
        vertex += this.adj[i][j] + ' ';
      }
    }
    console.log(vertex);
  }
}

function dfs(vertex) {
  if (this.visited[vertex] === false) {
    console.log('Visiting vertex ' + vertex);
    this.visited[vertex] = true;
  }

  for (var i = 0; i < this.adj[vertex].length; i++) {
    var currentAdjacentVertex = this.adj[vertex][i];
    if (this.visited[currentAdjacentVertex] === false) {
      this.dfs(this.adj[vertex][i]);
    }
  }
}

/*
function bfs(vertex) {
  this.visited[vertex] = true;
  console.log('Visiting vertex ' + vertex);

  var adjacentVertices = this.adj[vertex];
  for (var i = 0; i < adjacentVertices.length; i++) {
    var currentVertex = adjacentVertices[i];
    if (this.visited[currentVertex] === false) {
      this.visited[currentVertex] = true;
      console.log('Visiting vertex ' + currentVertex);      
    }

    // for every vertex on the current level, push their adjacent unvisited vertices to the back of the adjacent Vertices list
    var currentVertexAdjacencyList = this.adj[currentVertex];
    for (var j = 0; j < currentVertexAdjacencyList.length; j++) {
      if (this.visited[currentVertexAdjacencyList[j]] === false) {
        adjacentVertices.push(currentVertexAdjacencyList[j]);
      }
    }
  }
}
*/

function bfs(s) {
  var graph = this; // need this due to the closure in the forEach loop
  var queue = [];
  this.visited[s] = true;
  console.log("Visited vertex: " + s);
  queue.push(s);          // add to back of queue 
  
  while (queue.length > 0) {
    var v = queue.shift();  // remove from front of queue
    
    this.adj[v].forEach(function(w) {
      if (graph.visited[w] === false) {
        graph.edgeTo[w] = v; 
        graph.visited[w] = true;
        console.log("Visited vertex: " + w);
        queue.push(w);
      } 
    });
  } 
}

function pathTo(start, end) {
  // build graph in terms of the start vertex
  this.bfs(start);

  if (start === end) {
    return start;
  }

  if (this.edgeTo[end] === undefined) {
    return undefined;
  }

  var path = [];
  for (var i = end; i !== start; i = this.edgeTo[i]) {
    path.push(i);
  }
  path.push(start);
  return path;
}

module.exports = Graph;