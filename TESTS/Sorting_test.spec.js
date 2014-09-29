var CArray = require('../Sorting.js');

describe("Sorting", function() {
  var arr = new CArray();

  beforeEach(function() {
    
  });

  it("tests showGraph", function() { 
    g.showGraph();
  });

  it("tests dfs", function() { 
    g.dfs(0);  
  });

  it("tests bfs", function() {
    g.bfs(0);
  });
});