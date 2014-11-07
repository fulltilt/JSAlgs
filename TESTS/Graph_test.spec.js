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

    g.edgeTo = [];
    g.addUndirectedEdge(0,1);
    g.addUndirectedEdge(0,2);
    g.addUndirectedEdge(1,3);
    g.addUndirectedEdge(2,4);
  });

  it("tests showGraph", function() { 
    //g.showGraph();
  });

  it("tests dfs", function() { 
    expect(g.dfs(0, 4)).toEqual(true);
    g.visited = [];
    expect(g.dfs(0, 5)).toEqual(false);
  });

  it("tests bfs", function() {
    expect(g.bfs(0, 4)).toEqual(true);
    g.visited = [];
    //expect(g.bfs(0, 5)).toEqual(false);
  });

  it("tests pathTo", function() {
    var start = 0, end = 4;
    var paths = g.pathTo(start, end);
    var pathString = '';
    while (paths.length > 0) {
      if (paths.length > 1) {
        pathString += paths.pop() + ' -> ';
      } else {
        pathString += paths.pop();
      }
    }
    console.log('Path from vertex ' + start + ' to vertex ' + end + ': ' + pathString);
  });
});