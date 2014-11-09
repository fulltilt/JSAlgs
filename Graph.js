function Edge() {
  this.src = src;
  this.dest = dest;
  this.weight = weight;
}

function Graph(v, e) {
  this.vertices = v;
  this.edges = e;
  this.adj = [];  // adjacency list for Graph
  this.edge = []; // this can represent an weighted, undirected graph
  
  // initialize each Vertices adjacency list to an empty list
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
  }

  // initialize edges
  for (i = 0; i < this.edges; ++i) {
    this.edge[i] = [];
  }

  this.visited = [];  // array that determines whether a Vertex was visited or not. Initialize all Vertices to false
  for (i = 0; i < this.vertices; ++i) {
    this.visited[i] = false;
  }

  this.edgeTo = []; // use to determine shortest path
  
  this.pathTo = pathTo;
  this.DFSCount = DFSCount;
  this.detectCycleDirected = detectCycleDirected;
  this.detectCycleDirectedHelper = detectCycleDirectedHelper;
  this.detectCycleUndirected = detectCycleUndirected;
  this.detectCycleUndirectedHelper = detectCycleUndirectedHelper;
  this.detectCycleUndirected2 = detectCycleUndirected2;
  this.union = union;
  this.find = find;
  this.minSpanningKruskal = minSpanningKruskal;
  this.minSpanningPrim = minSpanningPrim;
  this.Dijkstra = Dijkstra;
  this.shortestPathDAG = shortestPathDAG;
  this.isBipartite = isBipartite;
  this.maxBipartiteMatching = maxBipartiteMatching;
  this.topologicalSort = topologicalSort;
  this.topologicalSortUtil = topologicalSortUtil;
  this.printEulerianTour = printEulerianTour;
  this.printEulerUtil = printEulerUtil;
  this.isValidNextEdge = isValidNextEdge;
  this.canStringsBeChained = canStringsBeChained;
  this.EulerianCircuit = EulerianCircuit;
  this.articulationPoints = articulationPoints;
  this.stronglyConnectedComponents = stronglyConnectedComponents;
  this.bridges = bridges;
  this.longestPathInDAG = longestPathInDAG;
  this.maxDisjointPaths = maxDisjointPaths;
  this.isBiconnected = isBiconnected;
  this.FordFulkerson = FordFulkerson;
  this.minCut = minCut;
  this.HamiltonianCycle = HamiltonianCycle;
  this.FloydWarshall = FloydWarshall;
  this.BellmanFord = BellmanFord;
  this.Johnsons = Johnsons;
  this.transitiveClosure = transitiveClosure;
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

  removeEdge: function(v, w) {
    // find w in adjacency of v and replace it with -1
    var adjacencyList = this.adj[v];
    for (var i = 0; i < adjacencyList.length; i++) {
      if (adjacencyList[i] === w) {
        adjacencyList[i] = -1;
      }
    }

    adjacencyList = this.adj[w];
    console.log(adjacencyList);
    for (var i = 0; i < adjacencyList.length; i++) {
      if (adjacencyList[i] === v) {
        adjacencyList[i] = -1;
      }
    }
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

/* represents a subset for union-find
function Subset() {
  this.parent = parent;
  this.rank = rank;
}

// utility function to find set of an element i (uses path compression technique)
function find(subsets, i) {
  // find root and make root as parent of i (path compression)
  if (subsets[i].parent !== i) {
    subsets[i].parent = find(subsets, subsets[i].parent);
  }

  return subsets[i].parent;
}
*/

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
// For every visited vertex ‘v’, if there is an adjacent ‘u’ such that u is already visited and u is not parent of v, then there is a cycle in graph
function detectCycleUndirected() {
  for (var i = 0; i < this.vertices; i++) {
    if (!this.visited[i]) {
      if (this.detectCycleUndirectedHelper(i, -1)); {
        return true;
      }
    }
  }

  return false;
}

function detectCycleUndirectedHelper(vertex, parent) {
  this.visited[vertex] = true;

  // recur for all vertices adjacent to this vertex
  var adjacencyList = this.adj[vertex];
  for (var i = 0; i < adjacencyList.length; i++) {
    var currentAdjacentVertex = adjacencyList[i];

    if (!this.visited[currentAdjacentVertex]) {   // If adjacent vertex is not visited, recur for that adjacent vertex
      if (this.detectCycleUndirectedHelper(currentAdjacentVertex, vertex)) {
        return true;
      }
    } else if (currentAdjacentVertex !== parent) { // If an adjacent vertex is visited and not parent of current vertex, then there's a cycle
      return true;    
    }
  }

  return false;
}

// http://www.geeksforgeeks.org/union-find/
// detect cycle in an undirected graph using Union-Find algorithm
function detectCycleUndirected2() {
  // initially represents V single-element subsets and set values to -1
  var subsets = [];
  for (var i = 0; i < this.edges; i++) {
    subsets[i] = new Subset(i);
  }

  // iterate through all edges of graph, find subset of both vertices of every edge, if both subsets are same, then there's a cycle in grap
  for (i = 0; i < this.edges; i++) {
    var srcSubset = this.find(subsets, this.edge[i].src),
        destSubset = this.find(subsets, this.edge[i].dest);

    if (srcSubset === destSubset) {
      return true;
    }

    // both sets are disjoint so combine them
    this.union(subsets, srcSubset, destSubset);
  }

  return false;
}

// structure to represent a subset for Union-Find
function Subset(parent, rank) {
  this.parent = parent;
  this.rank = rank;
}

// utility function to find the subset of an element i
function find(subsets, i) {
  if (subsets[i].parent !== i) {
    subsets[i].parent = this.find(subsets, subsets[i].parent);
  }

  return subsets[i].parent;
}

// utility function to do union of 2 subsets (a more efficient version: see http://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/)
function union(subsets, src, dest) {
  var srcSet = this.find(subsets, src),
      destSet = this.find(subsets, dest);
  subsets[srcSet].parent = destSet;
}

// http://www.geeksforgeeks.org/greedy-algorithms-set-2-kruskals-minimum-spanning-tree-mst/
function minSpanningKruskal() {
  var vertices = this.vertices,
      result = [],  // will store resultant MST
      r = 0,        // index variable used for result[]
      s = 0,        // index variable used for sorted edges
      subsets = [];

  // Step 1: sort all the edges in non-decreasing order of their weight
  this.edge = this.edge.sort(function(a, b) { return a.weight - b.weight; });

  // create V single-element subsets
  for (var i = 0; i < vertices; i++) {
    subsets[i] = new Subset(i, 0);
  }

  // Number of edges to be taken is equal to vertices - 1
  while (r < vertices - 1) {
    // Step 2: pick the smallest edge and increment theindex for next iteration
    var nextEdge = this.edge[s++];

    var srcSet = this.find(subsets, nextEdge.src),
        destSet = this.find(subsets, nextEdge.dest);

    // If including this edge doesn't cause cycle, include it in result and increment the index of result for next edge
    // else discard nextEdge
    if (srcSet !== destSet) {
      result[r++] = nextEdge;
      this.union(subsets, srcSet, destSet);
    }
  }

  console.log('\nKruskal\'s Minimum Spanning Tree\nEdge        Weight');
  for (var i = 0; i < r; i++) {
    console.log(result[i].src, '-', result[i].dest,  ' ', result[i].weight);
  }

  return;
}

// http://www.geeksforgeeks.org/greedy-algorithms-set-5-prims-minimum-spanning-tree-mst-2/
// note: uses adjacency matrix. For a more efficient but longer implementation using adjacency lists see: 
// http://www.geeksforgeeks.org/greedy-algorithms-set-5-prims-mst-for-adjacency-list-representation/
function minSpanningPrim(graph) {
  var vertices = graph.length,
      parent = [],  // array to store constructed MST
      dist = [],     // key values used to pick minimum weight edge in cut (a cut is a group of edges that connects two set of vertices in a graph)
      mstSet = [];  // represents a set of vertices not yet include in MST

  // initialize all dist values to Infinity
  for (var i = 0; i < vertices; i++) {
    dist[i] = Infinity;
    mstSet[i] = false;
  }

  // Always include first vertex in MST
  dist[0] = 0;     // make key 0 so that this vertex is picked as first vertex
  parent[0] = -1; // first node is always root of MST

  // The MST will have V vertices
  for (var count = 0; count < vertices - 1; count++) {
    // pick the minimum distance vertex from the set of vertices not yet included in MST
    var minVertex = minDistance(dist, mstSet, vertices);

    // add the picked vertex to the MST set
    mstSet[minVertex] = true;

    // Update key value and parent index of the adjacent vertices of the picked vertex. Consider only those vertices
    // which are not yet included in the MST
    for (var v = 0; v < vertices; v++) {
      // graph[minVertex][v] is non-zero only for adjacent vertices of m
      // mstSet[v] is false for vertices not yet included in MST
      // Update the distance only if graph[u][v] is smaller than dist[v]
      if (graph[minVertex][v] && mstSet[v] === false && (graph[minVertex][v] < dist[v])) {
        parent[v] = minVertex;
        dist[v] = graph[minVertex][v];
      }
    }
  }

  // print MST
  console.log('\nPrim\'s Minimum Spanning Tree\nEdge        Weight');
  for (i = 1; i < vertices; i++) {
    console.log(parent[i], '-', i, ' ', graph[i][parent[i]]);
  }
}

// helper fxn for Prim's algorithm to find vertex with minimum dist value from set of vertices not yet included in minimum spanning tree
function minDistance(dist, mstSet, vertices) {
  var min = Infinity,
      minIndex;

  for (var v = 0; v < vertices; v++) {
    if (mstSet[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }

  return minIndex;
}

// http://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/
// algorithm is very similar to Prim's minimum spanning tree algorithm
// Assumptions: no negative edges
function Dijkstra(graph, startVertex) {
  var vertices = graph.length,
      dist = [],    // output array. Dist[i] will hold the shortest distance from startVertex to vertex i
      sptSet = [];  // sptSet[i] is true if vertex i is included in shortest path tree or shortest distance from startVertex to i is finalized

  // Initialize all distances to Infinity and stpSet entries to false
  for (var i = 0; i < vertices; i++) {
    dist[i] = Infinity;
    sptSet[i] = false;
  }

  dist[startVertex] = 0;  // distance of source vertex from itself is always 0

  // Find shortest path for all vertices
  for (var count = 0; count < vertices - 1; count++) {
    // pick the minimum distance vertex from the set of vertices not yet processed. minVertex is always equal to startVertex in first iteration
    var minIndex = minDistance(dist, sptSet, vertices);

    sptSet[minIndex] = true;  // set the min index to true

    // update distance value of the adjacent vertices of minIndex
    for (var v = 0; v < vertices; v++) {
      // Update dist[v] only if it isn't in sptSet, there is an edge from minIndex to v and total weight of
      // path from startVerte to v through minIndex is smaller than current value of dist[v]
      if (!sptSet[v] && graph[minIndex][v] && dist[minIndex] !== Infinity 
                     && dist[minIndex] + graph[minIndex][v] < dist[v]) {
        dist[v] = dist[minIndex] + graph[minIndex][v];
      }
    }
  }

  console.log('\nDijkstra\'s algorithm\nVertex   Distance from Source');
  for (i = 0; i < vertices; i++)
    console.log(i, '    ', dist[i]);
}

// http://www.geeksforgeeks.org/topological-sorting/
function topologicalSort() {
  var stack = [],
      visited = [];

  // mark all the vertices as not visited
  for (var i = 0; i < this.vertices; i++) {
    visited[i] = false;
  }

  // call recursive helper fxn to store topological sort starting from all vertices one by one
  for (i = 0; i < this.vertices; i++) {
    if (visited[i] === false) {
      this.topologicalSortUtil(i, visited, stack);
    }
  }

  var output = '';
  while (stack.length > 0) {
    output += stack.pop() + ' ';
  }

  return output.trim();
}

function topologicalSortUtil(vertex, visited, stack) {
  visited[vertex] = true; // mark current vertex as visited

  // recur for all vertices adjacent to this vertex
  var adjacencyList = this.adj[vertex];
  for (var i = 0; i < adjacencyList.length; i++) {
    if (!visited[adjacencyList[i]]) {
      this.topologicalSortUtil(adjacencyList[i], visited, stack);
    }
  }

  stack.push(vertex); // push current vertex to stack
}

// http://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/
// topological sort is on applicable to DAGs
// algorithm: modified DFS
function shortestPathDAG() {

}

// http://www.geeksforgeeks.org/bipartite-graph/
function isBipartite(graph, src) {
  // Create a color array to store colors assigned to all veritces. Vertex 
  // number is used as index in this array. The value '-1' of  colorArr[i] 
  // is used to indicate that no color is assigned to vertex 'i'.  The value 
  // 1 is used to indicate first color is assigned and value 0 indicates 
  // second color is assigned.
  var vertices = graph.length,
      colorArr = [];
  
  for (var i = 0; i < vertices; i++) {
    colorArr[i] = -1;
  }

  colorArr[src] = 1;  // assign first color to source

  // Create a queue of vertex numbers and enqueue source vertex for BFS traversal
  var queue = [];
  queue.push(src);

  // Run while there are vertices in queue (similar to BFS)
  while (queue.length > 0) {
    var currentVertex = queue.shift();

    // find all non-colored adjacent vertices
    for (var v = 0; v < vertices; v++) {
      // an edge from currentVertex to v exists and destination is not colored
      if (graph[currentVertex][v] === 1 && colorArr[v] === -1) {
        // assign alternate color to vertex v
        colorArr[v] = 1 - colorArr[currentVertex];  // if currentVertex is 1, 1 - 1 is 0. If it's 0, 1 - 0 is 1
        queue.push(v);
      }

      // An edge from currentVertex to v exists and destination is colored with same color as currentIndex
      if (graph[currentVertex][v] === 1 && colorArr[v] === colorArr[currentVertex]) {
        return false;
      }
    }
  }

  // If we reach here, then all adjacent vertices can be colored with alternate color
  return true;
}

// http://www.geeksforgeeks.org/given-array-strings-find-strings-can-chained-form-circle/
function canStringsBeChained() {

}

// http://www.geeksforgeeks.org/euler-circuit-directed-graph/
function EulerianCircuit() {

}

// http://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/
function articulationPoints() {

}

// http://www.geeksforgeeks.org/strongly-connected-components/ or http://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/
function stronglyConnectedComponents() {

}

// http://www.geeksforgeeks.org/bridge-in-a-graph/
function bridges() {

}

// http://www.geeksforgeeks.org/find-longest-path-directed-acyclic-graph/
function longestPathInDAG() {

}

// http://www.geeksforgeeks.org/find-edge-disjoint-paths-two-vertices/
function maxDisjointPaths() {

}

// http://www.geeksforgeeks.org/biconnectivity-in-a-graph/
function isBiconnected() {

}

// http://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/
function FordFulkerson() {

}

// http://www.geeksforgeeks.org/maximum-bipartite-matching/
function maxBipartiteMatching() {

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

// http://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/4
function printEulerianTour() {
  // find a vertex with odd degree
  var startingVertex;
  for (var i = 0; i < this.vertices; i++) {
    if (this.adj[i].length % 2 === 1) {
      startingVertex = i;
      break;
    }
  }
  
  // print tour starting from startingVertex
  this.printEulerUtil(startingVertex);
}

// Print Euler tour starting from vertex u
function printEulerUtil(startingVertex) {
  // recur for all vertices adjacent to this vertex
  var adjacencyList = this.adj[startingVertex];
  for (var i = 0; i < adjacencyList.length; i++) {
    var currentAdjacentVertex = adjacencyList[i];

    // if edge is not removed and it's a valid next edge
    if (currentAdjacentVertex !== -1 && this.isValidNextEdge(startingVertex, currentAdjacentVertex)) {
      console.log(startingVertex, '-', currentAdjacentVertex);
      this.removeEdge(startingVertex, currentAdjacentVertex);
      this.printEulerUtil(currentAdjacentVertex);
    }
  }
}

function isValidNextEdge(startingVertex, currentAdjacentVertex) {
  // the edge is valid in one of the following 2 cases

  // Case 1: If currentAdjacentVertex is the only adjacent vertex of startingVertex
  var count = 0,      // store count of adjacent vertices
      adjacencyList = this.adj[startingVertex];
  for (var i = 0; i < adjacencyList.length; i++) {
    if (adjacencyList[i] === -1) {
      count += 1;
    }
  }

  if (count === 1) {
    return true;
  }

  // Case 2: If there are multiple adjacent vertices, then edge is not a bridge.
  // Case 2a: count of vertices reachable from startingVertex
  var visited = [];
  for (i = 0; i < this.vertices; i++) {
    visited[i] = false;
  }
  var count1 = this.DFSCount(startingVertex, visited);

  // Case 2b: remove edge and after removing edge, count vertices reachable from startingVertex
  this.removeEdge(startingVertex, currentAdjacentVertex);
  for (i = 0; i < this.vertices; i++) {
    visited[i] = false;
  }
  var count2 = this.DFSCount(startingVertex, visited);

  // Case 2c: add edge back to the graph
  this.addUndirectedEdge(startingVertex, currentAdjacentVertex);

  // Case 2d: If count1 is greater, then edge is a bridge
  return (count1 > count2) ? false : true;
}

// DFS based fxn to count reachable vertices from v
function DFSCount(v, visited) {
  // mark current vertex as visited
  visited[v] = true;
  var count = 1,
      adjacencyList = this.adj[v];

  for (var i = 0; i < adjacencyList.length; i++) {
    var currentAdjacentVertex = adjacencyList[i];
    if (currentAdjacentVertex !== -1 && !visited[currentAdjacentVertex]) {
      count += this.DFSCount(currentAdjacentVertex, visited);
    }
  }

  return count;
}