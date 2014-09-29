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

function dfs(vertex) {

}

module.exports = Graph;