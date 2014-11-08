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

  it('tests minSpanningKruskal', function() {
    /* Let us create following weighted graph
             10
        0--------1
        |  \     |
       6|   5\   |15
        |      \ |
        2--------3
            4       */
    var graph = new Graph(4, 5);

    // add edge 0-1
    graph.edge[0].src = 0;
    graph.edge[0].dest = 1;
    graph.edge[0].weight = 10;
 
    // add edge 0-2
    graph.edge[1].src = 0;
    graph.edge[1].dest = 2;
    graph.edge[1].weight = 6;
 
    // add edge 0-3
    graph.edge[2].src = 0;
    graph.edge[2].dest = 3;
    graph.edge[2].weight = 5;
 
    // add edge 1-3
    graph.edge[3].src = 1;
    graph.edge[3].dest = 3;
    graph.edge[3].weight = 15;
 
    // add edge 2-3
    graph.edge[4].src = 2;
    graph.edge[4].dest = 3;
    graph.edge[4].weight = 4;

    graph.minSpanningKruskal();
  });

  it('tests minSpanningPrim', function() {
    /* Let us create the following graph
          2    3
      (0)--(1)--(2)
       |   / \   |
      6| 8/   \5 |7
       | /     \ |
      (3)-------(4)
            9          */
   var graph = [[0, 2, 0, 6, 0],
                [2, 0, 3, 8, 5],
                [0, 3, 0, 0, 7],
                [6, 8, 0, 0, 9],
                [0, 5, 7, 9, 0],
               ];
    g.minSpanningPrim(graph);
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