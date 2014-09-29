var Graph = require('../Graph.js');

describe("Graph", function() {
  var g = new Graph(5);

  //beforeEach(function() {
    g.addEdge(0,1);
    g.addEdge(0,2);
    g.addEdge(1,3);
    g.addEdge(2,4);
  //});

  it("tests showGraph", function() { 
    g.showGraph();
  });

  it("tests dfs", function() { 
    g.dfs(0);  
  });  
});