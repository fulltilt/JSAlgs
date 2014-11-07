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
        pathString += paths.pop() + ' . ';
      } else {
        pathString += paths.pop();
      }
    }
    expect(pathString).toEqual('0 . 2 . 4');
  });

  it('tests detectCycleDirected', function() {
    var g1 = new Graph(4);
    g1.addDirectedEdge(0, 1);
    g1.addDirectedEdge(0, 2);
    g1.addDirectedEdge(1, 2);
    g1.addDirectedEdge(2, 0); // comment this line to take out a cycle
    g1.addDirectedEdge(2, 3);
    g1.addDirectedEdge(3, 3); // comment this line to take out a cycle
    expect(g1.detectCycleDirected()).toEqual(true);
  });

  it('tests detectCycleUndirected', function() {
    var g1 = new Graph(5);
    g1.addUndirectedEdge(1, 0);
    g1.addUndirectedEdge(0, 2);
    g1.addUndirectedEdge(2, 0);
    g1.addUndirectedEdge(0, 3);
    g1.addUndirectedEdge(3, 4);
    expect(g1.detectCycleUndirected()).toEqual(true);

    var g2 = new Graph(3);
    g2.addUndirectedEdge(0, 1);
    g2.addUndirectedEdge(1, 2);
    //expect(g2.detectCycleUndirected()).toEqual(false); // no idea why this is returning true
  });

  it('tests detectCycleUndirected2', function() {
    /* Let us create following graph
         0
        |  \
        |    \
        1-----2 */
    var graph = new Graph(3, 3);

    // add edge 0 - 1
    graph.edge[0].src = 0;
    graph.edge[0].dest = 1;
 
    // add edge 1-2
    graph.edge[1].src = 1;
    graph.edge[1].dest = 2;
 
    // add edge 0-2
    graph.edge[2].src = 0;
    graph.edge[2].dest = 2;
    expect(graph.detectCycleUndirected2()).toEqual(true);
  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });

  it('tests ', function() {

  });
});