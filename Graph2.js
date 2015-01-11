function IntegerPair(i, w) {
	this.id = i;
	this.weight = w;
}

function Graph(v) {
	this.vertices = v;
  this.adjacencyList = [];

  // initialize adjacency list
  for (var i = 0; i < this.vertices; i++) {
  	this.adjacencyList[i] = [];
  }

  /*this.DFS_WHITE = -1; // normal DFS
  this.DFS_BLACK = 1;
  this.DFS_GRAY = 2;*/
  this.UNVISITED = -1;
  this.VISITED = 1;
  this.visited = [];

  // initialize visited list
  for (i = 0; i < this.vertices; i++) {
  	this.visited[i] = this.UNVISITED;
  }
}

Graph.prototype = {
	// NOTE: input graph must be undirected
	dfs: function() {
		var connectedComponents = 0;

		for (var i = 0; i < this.vertices; i++) {
			if (this.visited[i] === this.UNVISITED) {
				console.log('Component ', ++connectedComponents, ', visit: ');
				this.dfsHelper(i);
			}
		}

		console.log('There are ', connectedComponents, ' connected components.')
	},

	dfsHelper: function(v) {
		console.log(v);
		var length = this.adjacencyList[v].length, i;
		this.visited[v] = this.VISITED;

		for (var i = 0; i < length; i++) {
			var neighborVertex = this.adjacencyList[v][i].id;
			
			if (this.visited[neighborVertex] === this.UNVISITED) {
				this.dfsHelper(neighborVertex);
			}
		}
	}
};

var Graph = function() {
  return {
    Graph: Graph,
    IntegerPair: IntegerPair
  }
}();

module.exports = Graph;