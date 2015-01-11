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
	},

	bfs: function(v) {
		var level = 0,
				currentLevel = [],
				nextLevel = [],
				neighbors = [], i, j;

		currentLevel.push(v);
		while (currentLevel.length > 0) {
			console.log('Level', level++, ':');

			// get neighbors
			for (i = 0; i < currentLevel.length; i++) {
				var currentVertex = currentLevel[i];
				
				if (this.visited[currentVertex] === this.UNVISITED) {
					this.visited[currentVertex] = this.VISITED;
					console.log('visit', currentVertex);

					// add neighbors of currentVertex to nextLevel
					neighbors = this.adjacencyList[currentVertex];
					for (j = 0; j < neighbors.length; j++) {
						if (this.visited[neighbors[j].id] === this.UNVISITED) {
							nextLevel.push(neighbors[j].id);
						}
					}
				}
			}

			currentLevel = nextLevel;
			nextLevel = [];
		}
	},

	floodFill: function() {
		var color = 0;

		for (var i = 0; i < this.vertices; i++) {
			if (this.visited[i] === this.UNVISITED) {
				this.floodFillHelper(i, ++color);
			}
		}

		for (i = 0; i < this.vertices; i++) {
			console.log('Vertex', i, 'has color', this.visited[i]);
		}
	},

	floodFillHelper: function(v, color) {
		this.visited[v] = color;
		var neighbors = this.adjacencyList[v],
				length = neighbors.length, i;
		for (i = 0; i < length; ++i) {
			currentVertex = neighbors[i].id;
			if (this.visited[currentVertex] === this.UNVISITED) {
				this.floodFillHelper(currentVertex, color);
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