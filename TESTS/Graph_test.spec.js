var Graph = require('../Graph.js');

describe("Graph", function() {
  var g = new Graph(5);

  beforeEach(function() {
    for (var i = 0; i < g.vertices; ++i) {
      g.adj[i] = [];
    }

    for (i = 0; i < g.vertices; ++i) {
      g.visited[i] = false;
    }

    g.addEdge(0,1);
    g.addEdge(0,2);
    g.addEdge(1,3);
    g.addEdge(2,4);
  });

  it("tests showGraph", function() { 
    g.showGraph();
  });

  it("tests dfs", function() { 
    g.dfs(0);  
  });

  it("tests bfs", function() {
    g.bfs(0);console.log(g.edgeTo[0]);
  });

});