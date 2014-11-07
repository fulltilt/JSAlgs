function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];  // adjacency list for Graph
  
  // initialize each Vertices adjacency list to an empty list
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
  }

  this.visited = [];  // array that determines whether a Vertex was visited or not. Initialize all Vertices to false
  for (i = 0; i < this.vertices; ++i) {
    this.visited[i] = false;
  }

  this.edgeTo = []; // use to determine shortest path
  
  this.pathTo = pathTo;
  this.detectCycleDirected = detectCycleDirected;
  this.detectCycleDirectedHelper = detectCycleDirectedHelper;
  this.detectCycleUndirected = detectCycleUndirected;
  this.unionFind = unionFind;
}

Graph.prototype = {
  addUndirectedEdge: function(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges += 1;
  },

  addDirectedEdge: function(v, w) {
    this.adj[v].push(w);
    this.edges += 1;
  },

  showGraph: function() {
    for (var i = 0; i < this.vertices; i++) {
      var vertex = i + ': ';
      for (var j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] !== undefined) {
          vertex += this.adj[i][j] + ' ';
        }
      }
      console.log(vertex);
    }
  },
    
  // http://stackoverflow.com/questions/5278580/non-recursive-depth-first-search-algorithm  
  dfs: function(startingVertex, target) {
    if (startingVertex === target) {
      return true;
    }
    this.visited[startingVertex] = true;

    var adjacencyList = this.adj[startingVertex];
    while (adjacencyList.length > 0) {
      var currentVertex = adjacencyList.shift();
      if (!this.visited[currentVertex]) {
        if (currentVertex === target) {
          return true;
        }
       
        this.visited[currentVertex] = true;
        
        // prepend current Vertex's adjacency list to the current one assuming the Node hasn't been visited
        var currentVertexAdjacencyList = this.adj[currentVertex];
        for (var i = 0; i < currentVertexAdjacencyList.length; i++) {
          if (!this.visited[currentVertexAdjacencyList[i]]) {
            adjacencyList.unshift(currentVertexAdjacencyList[i]);
          }
        }
      }
    }

    return false;
  },

/* recursive dfs that traverses all the reachable nodes from vertex
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
*/
  bfs: function(startingVertex, target) {
    if (startingVertex === target) {
      return true;
    }
    this.visited[startingVertex] = true;

    var currentVertices = [],
        adjacentVertices = [];

    currentVertices.push(startingVertex);
    while (currentVertices.length > 0) {
      for (var i = 0; i < currentVertices.length; i++) {
        var currentVertex = currentVertices[i];
        if (currentVertex === target) {
          return true;
        }
        this.visited[currentVertex] = true;

        var currentVertexAdjacencyList = this.adj[currentVertex];
        for (var j = 0; j < currentVertexAdjacencyList.length; j++) {
          if (!this.visited[currentVertexAdjacencyList[j]]) {
this.edgeTo[currentVertexAdjacencyList[j]] = currentVertex; // line explicitly for pathTo
            adjacentVertices.push(currentVertexAdjacencyList[j]);
          }
        }
      }
      currentVertices = adjacentVertices.slice(0);
      adjacentVertices = [];
    }

    return false;
  }
/*
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
*/

};

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

// http://www.geeksforgeeks.org/detect-cycle-in-a-graph/
function detectCycleDirected() {
  var recursiveStack = [];

  // Call the recursive helper fxn to detect cycle in different DFS tree
  for (var i = 0; i < this.vertices; i++) {
    if (this.detectCycleDirectedHelper(i, recursiveStack)) {
      return true;
    }
  }

  return false;
}

function detectCycleDirectedHelper(vertex, recursiveStack) {
  if (this.visited[vertex] === false) {
    // mark the current node as visited and part of the recursion stack
    this.visited[vertex] = true;
    recursiveStack[vertex] = true;

    // recur for all the vertices adjacent to this vertex
    var adjacencyList = this.adj[vertex];
    for (var i = 0; i < adjacencyList.length; i++) {
      var currentAdjacentVertex = adjacencyList[i];
      if (!this.visited[currentAdjacentVertex] && this.detectCycleDirectedHelper(currentAdjacentVertex, recursiveStack)) {
        return true;
      } else if (recursiveStack[currentAdjacentVertex]) { // adjacent Vertex has been visited in a previous call stack meaning there's a back edge. Return true
        return true;
      }
    }
  }
  recursiveStack[vertex] = false; // remove Vertex from recursion stack
  return false;
}

// http://www.geeksforgeeks.org/detect-cycle-undirected-graph/
function detectCycleUndirected() {

}

// http://www.geeksforgeeks.org/union-find/ or http://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/
function unionFind() {

}

// http://www.geeksforgeeks.org/find-if-there-is-a-path-between-two-vertices-in-a-given-graph/
function isPath(v1, v2) {

}

// http://www.geeksforgeeks.org/greedy-algorithms-set-5-prims-minimum-spanning-tree-mst-2/
function minSpanningPrim() {

}

// http://www.geeksforgeeks.org/greedy-algorithms-set-2-kruskals-minimum-spanning-tree-mst/
function minSpanningKruskal() {

}

// http://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/
function Dijkstra() {

}

// http://www.geeksforgeeks.org/bipartite-graph/
function isBipartite() {

}

// http://www.geeksforgeeks.org/maximum-bipartite-matching/
function maxBipartiteMatching() {

}

// http://www.geeksforgeeks.org/topological-sorting/
function topologicalSort() {

}

// http://www.geeksforgeeks.org/strongly-connected-components/ or http://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/
function stronglyConnectedComponents() {

}

// http://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/
function shortestPathDAG() {

}

// http://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/
function articulationPoints() {

}

// http://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/4
function printEulerianPath() {

}

// http://www.geeksforgeeks.org/given-array-strings-find-strings-can-chained-form-circle/
function canStringsBeChained() {

}

// http://www.geeksforgeeks.org/euler-circuit-directed-graph/
function EulerianCircuit() {

}

// http://www.geeksforgeeks.org/find-longest-path-directed-acyclic-graph/
function longestPathInDAG() {

}

// http://www.geeksforgeeks.org/find-edge-disjoint-paths-two-vertices/
function maxDisjointPaths() {

}

// http://www.geeksforgeeks.org/bridge-in-a-graph/
function bridges() {

}

// http://www.geeksforgeeks.org/biconnectivity-in-a-graph/
function isBiconnected() {

}

// http://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/
function FordFulkerson() {

}

// http://www.geeksforgeeks.org/minimum-cut-in-a-directed-graph/
function minCut() {

}

// http://www.geeksforgeeks.org/backtracking-set-7-hamiltonian-cycle/
function HamiltonianCycle() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-16-floyd-warshall-algorithm/
function FloydWarshall() {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/
function BellmanFord() {

}

// http://www.geeksforgeeks.org/johnsons-algorithm/
function Johnsons() {

}

// http://www.geeksforgeeks.org/transitive-closure-of-a-graph/
function transitiveClosure() {

}