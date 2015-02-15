function IntegerPair(i, w) {
	this.id = i;
	this.weight = w;
}

function Graph(v) {
	this.vertices = v;
  this.adjacencyList = [];
  this.ts = [],     // store the topological sort in reverse order
  this.parent = []; // for graphCheck and articulationPointAndBridge
  
  // variables for articulationPointAndBridge
  this.dfsLow = [];
  this.dfsNumberCounter = 0;
  this.rootChildren = 0;
  this.articulationVertex = [];

  // initialize adjacency list
  for (var i = 0; i < this.vertices; i++) {
  	this.adjacencyList[i] = [];
  }

  this.UNVISITED = -1;
  this.VISITED = 1;
  this.EXPLORED = 2;  // for graphCheck
  this.visited = [];

  // initialize visited list
  for (i = 0; i < this.vertices; i++) {
  	this.visited[i] = this.UNVISITED;
  }

  this.wetlands = wetlands; 	// flood fill demo (note: has nothing to do with the flood fill in the prototype)
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

	// NOTE: got this example off of the Java companion code for the book which looks like a slighlty modified version of DFS and differs greatly from what the book does
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
	},

  // NOTE: every DAG has at least one and possibly more topological sort(s)
  // Algorithm: just like dfs but add an extra line
  topologicalSort: function() {
    for (var i = 0; i < this.vertices; ++i) {
      if (this.visited[i] === this.UNVISITED) {
        this.topologicalSortHelper(i)
      }
    }

    console.log(this.ts.reverse());
  },

  topologicalSortHelper: function(vertex) {
    this.visited[vertex] = this.VISITED;
    var neighbors = this.adjacencyList[vertex], 
        length = neighbors.length, i;
    for (i = 0; i < length; ++i) {
      var currentVertex = neighbors[i].id;
      if (this.visited[currentVertex] === this.UNVISITED) {
        this.topologicalSortHelper(currentVertex);
      }
    }

    this.ts.push(vertex); // additional line compared to vanilla dfs
  },

  // check if a graph is bipartite (or 2/bi-colorable)
  // Algo: use BFS . Inititalize source vertex (layer 1) with value 0, color the diret neighbors (later 2) with value 1, color those neighbors
  //       (layer 3) with value 0, etc. If we encounter any violations alongs the way (an edge with 2 endpoints having the same color), then we
  //       can conclude that the given graph is not bipartite
  // NOTE: this.visited is multipurpose but if it helps visualize better, image 'this.visited' is 'this.color'
  isBipartite: function() {
    var currentLevel = [],
        neighbors = [],
        nextLevel = [], i;

    currentLevel.push(0); // we can start at any vertex
    this.visited[0] = 0;
    while (currentLevel.length > 0) {
      // iterate through every vertex on the current level
      for (i = 0; i < currentLevel.length; ++i) {
        var currentVertex = currentLevel[i];

        // iterate through each neighbor of currentVertex
        neighbors = this.adjacencyList[currentVertex];
        for (j = 0; j < neighbors.length; ++j) {
          var neighborVertex = neighbors[j].id;
          if (this.visited[neighborVertex] === this.UNVISITED) {
            this.visited[neighborVertex] = this.visited[currentVertex] ^ 1; // use XOR to set neighbor vertex color to be opposite of current vertex (could have also done: 1 - this.visited[currentVertex])
            nextLevel.push(neighborVertex);
          } else if (this.visited[neighborVertex] === this.visited[currentVertex]) {
            return false;
          }
        }
      }

      currentLevel = nextLevel;
      nextLevel = [];
    }

    return true;
  },

  /* Running DFS on a connected graph generates a DFS spanning tree (or spanning forest if the graph is disconnected). With the help of one more vertex state: EXPLORED = 2 
     (visited but not yet completed) on top of VISITED (visited and completed) we can use this DFS spanning tree (or forest) to classify graph edges into 3 types:
     1. Tree edge: the edge traversed by DFS, i.e. and edge from a vertex currently with state: EXPLORED to a vertex with state: UNVISITED
     2. Back edge: edge that is part of a ccle, i.e. an edge from a vertex currently with state: EXPLORED to a vertex with state: EXPLORED too. This is an important application
        of this algorithm. Note that we usually do not count bi-directional edges as having a 'cycle'
     3. Forward/Cross edges from vertex with state: EXPLORED to vertex with state: VISITED. These 2 types of edges aren't typically tested in programming contest problems
  */
  graphCheck: function() {
    var numComponent = 0, i;
    for (var i = 0; i < this.vertices; ++i) {
      if (this.visited[i] === this.UNVISITED) {
        console.log('Component', ++numComponent, ':');
        this.graphCheckHelper(i);
      }
    }
  },

  graphCheckHelper: function(vertex) {
    this.visited[vertex] = this.EXPLORED; // color vertex as EXPLORED instead of VISITED
    var neighbors = this.adjacencyList[vertex], 
        length = neighbors.length, i;

    for (i = 0; i < length; ++i) {
      var currentNeighbor = neighbors[i].id;

      if (this.visited[currentNeighbor] === this.UNVISITED) {         // tree edge, EXPLORED -> UNVISITED
        this.parent[currentNeighbor] = vertex;
        this.graphCheckHelper(currentNeighbor);
      } else if (this.visited[currentNeighbor] === this.EXPLORED) {   // back or bi-directional edge: EXPLORED -> EXPLORED
        if (currentNeighbor === this.parent[vertex]) {  // bi-directional edge (as the neighbor equals the parent). This isn't considered to be a cycle
          console.log('Two ways (', vertex, ',', currentNeighbor, ') - (', currentNeighbor, ',', vertex, ')');
        } else {  // back edge. Most frequent application: check if the graph is cyclic
          console.log('Back edge (', vertex, ',', currentNeighbor, ') (Cycle)');
        }
      } else if (this.visited[currentNeighbor] === this.VISITED) {    // EXPLORED->VISITED
        console.log('Forward/Cross edge (', vertex, ',', currentNeighbor, ')');
      }
    }

    this.visited[vertex] = this.VISITED;  // after recursion, color vertex as VISITED (DONE)
  },

  articulationPointsAndBridges: function() {
  	for (var i = 0; i < this.vertices; ++i) {
  		this.dfsLow[i] = 0;
  		this.parent[i] = 0;
  		this.articulationVertex[i] = false;
  	}

  	console.log('Bridges:');
	  for (i = 0; i < this.vertices; i++) {
      if (this.visited[i] === this.UNVISITED) {
        this.dfsRoot = i; 
        this.rootChildren = 0;
        this.articulationPointsAndBridgeHelper(i);
        this.articulationVertex[this.dfsRoot] = (this.rootChildren > 1); // special case
      }
    }

    console.log('Articulation Points:');
    for (i = 0; i < this.vertices; i++) {
      if (this.articulationVertex[i]) {
        console.log('Vertex ', i);
      }
    }
  },

  articulationPointsAndBridgeHelper: function(vertex) {
  	this.visited[vertex] = this.dfsLow[vertex] = this.dfsNumberCounter++;	// dfsLow[vertex] <= visited[vertex]
  	var neighbors = this.adjacencyList[vertex],
  			length = neighbors.length, i;

  	for (var i = 0; i < length; ++i) {
  		var currentNeighbor = neighbors[i].id;
  		if (this.visited[currentNeighbor] === this.UNVISITED) {	// a tree edge
  			this.parent[currentNeighbor] = vertex;

  			if (vertex === this.dfsRoot) {	// special case if vertex is a root
  				this.rootChildren += 1;
  			}

  			this.articulationPointsAndBridgeHelper(currentNeighbor);

  			// for articulation point
  			if (this.dfsLow[currentNeighbor] >= this.visited[vertex]) {
  				this.articulationVertex[vertex] = true;	// store this information first
  			}

  			// for bridge
  			if (this.dfsLow[currentNeighbor] > this.visited[vertex]) {
  				console.log('Edge (', vertex, ',', currentNeighbor, ') is a bridge');
  			}

  			this.dfsLow[vertex] = Math.min(this.dfsLow[vertex], this.visited[currentNeighbor]);	// update dfsLow[vertex]
  		} else if (currentNeighbor !== this.parent[vertex]) {		// a back edge and not direct cycle
  			this.dfsLow[vertex] = Math.min(this.dfsLow[vertex], this.visited[currentNeighbor]);	// update dfsLow[vertex]
  		}
  	}
  }
};

// trick to explore an implicit 2D grid. Simulate each permutation of a direction (2^3). Each index for both arrays are used in tandem. 
// i.e. for index 0, add 1 to row and 0 to column; for index 3 add -1 to row and 1 to column.
var dr = [1,1,0,-1,-1,-1,0,1],
    dc = [0,1,1,1,0,-1,-1,-1];

function wetlands(row, column) {
  var grid = 
  [['L','L','L','L','L','L','L','L','L'],
   ['L','L','W','W','L','L','W','L','L'],
   ['L','W','W','L','L','L','L','L','L'],
   ['L','W','W','W','L','W','W','L','L'],
   ['L','L','L','W','W','W','L','L','L'],
   ['L','L','L','L','L','L','L','L','L'],
   ['L','L','L','W','W','L','L','W','L'],
   ['L','L','W','L','W','L','L','L','L'],
   ['L','L','L','L','L','L','L','L','L']]
  return wetlandsHelper(grid, row, column, 'W', '.');
}

function wetlandsHelper(grid, row, column, c1, c2) {
  var rows = grid.length,
      columns = grid[0].length;

  // check to make sure current index is within the grid
  if (row < 0 || row >= rows || column < 0 || column >= columns) {
    return 0;
  }

  // check to see if the current index has color c1
  if (grid[row][column] !== c1) {
    return 0;
  }

  grid[row][column] = c2;  // recolor vertex to avoid cycling
  var moves = 8, 
      answer = 1, // set answer to 1 because vertex(r, c) has c1 as its color 
      i;
  for (i = 0; i < moves; ++i) {
    answer += wetlandsHelper(grid, row + dr[i], column + dc[i], c1, c2);
  }
  return answer;
}

var Graph = function() {
  return {
    Graph: Graph,
    IntegerPair: IntegerPair
  }
}();

module.exports = Graph;

/*
-Eulerian paths have at least two vertices that have an odd n degree. Eulerian cycles have vertices that all have an even n degree. In that problem provided, we 
 see that two nodes have 3 edges connecting them. If all the nodes had even edges connecting them, then we would have a Eulerian tour.
*/